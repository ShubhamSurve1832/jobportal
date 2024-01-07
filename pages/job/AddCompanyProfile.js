import React, { useState } from "react";
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import { AddCompanyFormSchema } from "../../job/validation/Schema";
import { Field, Form, Formik, useFormik } from "formik";
import { CompanyBaseURL,jobPortalBaseURL } from "../../constants/urlConstants";
import AuthorizeSim from "./AuthorizeSimandharAdmin/AuthorizeSim";

const AddCompanyProfile = () => {
  let Token = secureLocalStorage.getItem('SIMTK');
  let { replace } = useRouter();

  let [btnText, setBtnText] = useState("Submit");
  let [logo, setlogo] = useState("");
  let [CeoAvatar, setCeoAvatar] = useState("");
  let [Photos, setPhotos] = useState([]);

  const initialValue = {
    name: "",
    size: "",
    industry: "",
    ceo: "",
    yearOfEstd: "",
    revenue: "",
    website: "",
    description: "",
    location: "",
    createdBy: "" + secureLocalStorage.getItem("RecID"),
  };

  let {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: AddCompanyFormSchema,

    onSubmit: (values) => {
      setBtnText("Posting...");
      let newObj = {
        ...values,
        logo: logo,
        ceoAvatar: CeoAvatar,
        photos: [...Photos],
        size: +values.size,
        revenue: +values.revenue,
        yearOfEstd: +values.yearOfEstd,
      };

      //AddCompany
      AddCompany(newObj);
    },
  });

  //AddCompany is here
  const AddCompany = async (Data) => {
    try {
      let response = await axios.post(CompanyBaseURL, Data, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${Token}`
        },
      });

      if (response.status === 201) {
        toast.success("Company Posted.");
        setBtnText("Submit");
        resetForm();
        setlogo("");
        setCeoAvatar("");
        setPhotos([]);
        replace("/job/EducationCompanyManagement")
      }
    } catch (err) {
      setBtnText("Submit");
      let status = err.response.data.statusCode
      let error = err.response.data.message ?err.response.data.message: err.response.data.error[0].path[0]
      toast.error(status === 422 ? error === "logo"? "Company logo is required.":"CEO photo is required." : err.response.data.message)  // "Company logo and CEO photo is required."
      ;
    }
  };

  //HandleAdd is here
  const HandleAdd = (e, which) => {
    e.preventDefault();
    document.getElementById(which).click();
  };

  //AddLogo is here
  const HandleLogoChange = async (e, which) => {
    e.preventDefault();
    const { name, value, files } = e.target;

    const allowedTypes = ["image/jpeg", "image/png"];

    if (files[0]) {
      if (allowedTypes.includes(files[0].type)) {
        let size = files[0] ? Math.round(files[0].size / 1024) : "";
        if (size < 5120) {
          toast.success("Uploading...");
          try {
            if (which === "logo") {
              let response = await axios.post(
                `${jobPortalBaseURL}storage`,
                { file: files[0] },
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${Token}`
                  },
                }
              );

              if (response.status === 200) {
                toast.success("Logo Added.");
                setlogo(response.data.data.path);
              }
            } else if (which === "ceoAvatar") {
              let response = await axios.post(
                `${jobPortalBaseURL}storage`,
                { file: files[0] },
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${Token}`
                  },
                }
              );

              if (response.status === 200) {
                toast.success("Ceo Photo Added.");
                setCeoAvatar(response.data.data.path);
              }
            }
          } catch (error) {
            toast.error("Failed To Add " + which);
          }
        } else {
          toast.error("File size is big, please select a file less than 5mb");
        }
      } else {
        toast.error("Supported Formats: Jpeg , Png  upto 5 MB");
      }
    } else {
      toast.error("Nothing Selected ?");
    }
  };

  //addPhotoGallary is here
  const addPhotoGallary = (e) => {
    e.preventDefault();
    document.getElementById("addPhotoGallary").click();
  };

  //handleAddPhotoGallary is here
  const handleAddPhotoGallary = async (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    const allowedTypes = ["image/jpeg", "image/png"];
    let size = files[0] ? Math.round(files[0].size / 1024) : "";

    if (files[0]) {
      if (allowedTypes.includes(files[0]?.type)) {
        if (size < 5120) {
          if (Photos.length < 4) {
            toast.success("Uploading...");
            try {
              let response = await axios.post(
                `${jobPortalBaseURL}storage`,
                { file: files[0] },
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${Token}`
                  },
                }
              );

              if (response.status === 200) {
                toast.success("Photo Added To Gallary.");
                setPhotos([...Photos, response.data.data.path]);
              }
            } catch (error) {
              toast.error("Failed To Add Photos.");
            }
          } else {
            toast.error("You Cannot Add More Than 4 Images");
          }
        } else {
          toast.error("File size is big, please select a file less than 5mb");
        }
      } else {
        toast.error("Supported Formats: Jpeg , Png  upto 5 MB");
      }
    } else {
      toast.error("Nothing Selected.");
    }
  };

  //handleDeletePhotoFromGallary is here
  const handleDeletePhotoFromGallary = (e, ind) => {
    e.preventDefault();
    setPhotos(() => {
      return Photos.filter((data, id) => {
        return ind !== id;
      });
    });
  };

  return (
    <>
      <Head>
        <title>Add Company - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      {/* <Jobheader showData3={false} /> */}
      <section className="section AddCompanyProfile">
        <form
          onSubmit={handleSubmit}
          className="container jobportal-right-section"
        >
          <h3>Add Company Profile</h3>

          <div className="wrapper mt-4">
            <div className="left-box">
              <p className="basicpara">Basic details :</p>
              <div className="inputFeilds mt-4">
                <p>
                  <input
                    type="text"
                    placeholder="Enter Company Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                  />
                  {errors.name && touched.name ? (
                    <span className="danger">{errors.name}</span>
                  ) : null}
                  <br />
                </p>
                <p>
                  <input
                    type="text"
                    placeholder="Enter Company Size "
                    name="size"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.size}
                  />
                  {errors.size && touched.size ? (
                    <span className="danger">{errors.size}</span>
                  ) : null}
                  <br />
                </p>
                <p>
                  <input
                    type="text"
                    placeholder="Enter Industry Name"
                    name="industry"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.industry}
                  />
                  {errors.industry && touched.industry ? (
                    <span className="danger">{errors.industry}</span>
                  ) : null}
                  <br />
                </p>
              </div>
            </div>
            <div className="right-box">
              <p className="basicpara">Company logo :</p>
              <span className="Dimensions">
                *Dimensions : WxH | Format : .jpg, .png
              </span>
              <div className="inner-right-box mt-4">
                <div className="logo">
                  <input
                    type="file"
                    id="CompanyLogoAdd"
                    onChange={(e) => HandleLogoChange(e, "logo")}
                    hidden
                  />
                  {logo && <img src={logo} alt="logo" />}
                </div>
                <div className="Addremove-btn">
                  <a
                    href=""
                    className="btn maroon-border-btn prev-btn"
                    onClick={(e) => HandleAdd(e, "CompanyLogoAdd")}
                  >
                    Upload
                  </a>
                  <a
                    href=""
                    className="btn maroon-border-btn prev-btn"
                    onClick={(e) => {
                      e.preventDefault(), setlogo("");
                    }}
                  >
                    Remove
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="wrapper mt-4">
            <div className="left-box">
              <p className="basicpara">About the company :</p>
              <div className="inputFeilds mt-4">
                <p>
                  <input
                    type="text"
                    placeholder="Enter CEO Name"
                    name="ceo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.ceo}
                  />
                  {errors.ceo && touched.ceo ? (
                    <span className="danger">{errors.ceo}</span>
                  ) : null}
                  <br />
                </p>
                <p>
                  <input
                    type="text"
                    placeholder="Enter Founded Year"
                    name="yearOfEstd"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.yearOfEstd}
                  />
                  {errors.yearOfEstd && touched.yearOfEstd ? (
                    <span className="danger">{errors.yearOfEstd}</span>
                  ) : null}
                  <br />
                </p>
                <p>
                  <input
                    type="text"
                    placeholder="Enter Revenue"
                    name="revenue"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.revenue}
                  />
                  {errors.revenue && touched.revenue ? (
                    <span className="danger">{errors.revenue}</span>
                  ) : null}
                  <br />
                </p>
                <p>
                  <input
                    type="text"
                    placeholder="Enter Website Link"
                    name="website"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.website}
                  />
                  {errors.website && touched.website ? (
                    <span className="danger">{errors.website}</span>
                  ) : null}
                  <br />
                </p>
                <p>
                  <input
                    type="text"
                    placeholder="Enter Company Location"
                    name="location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                  />
                  {errors.location && touched.location ? (
                    <span className="danger">{errors.location}</span>
                  ) : null}
                  <br />
                </p>
              </div>
            </div>
            <div className="right-box">
              <p className="basicpara">CEO photo :</p>
              <span className="Dimensions">
                *Dimensions : WxH | Format : .jpg, .png
              </span>
              <div className="inner-right-box mt-4">
                <div className="logo">
                  <input
                    type="file"
                    id="CompanyCeoAvatarAdd"
                    onChange={(e) => HandleLogoChange(e, "ceoAvatar")}
                    hidden
                  />
                  {CeoAvatar && <img src={CeoAvatar} alt="logo" />}
                </div>
                <div className="Addremove-btn">
                  <a
                    href=""
                    className="btn maroon-border-btn prev-btn"
                    onClick={(e) => HandleAdd(e, "CompanyCeoAvatarAdd")}
                  >
                    Upload
                  </a>
                  <a
                    href=""
                    className="btn maroon-border-btn prev-btn"
                    onClick={(e) => {
                      e.preventDefault(), setCeoAvatar("");
                    }}
                  >
                    Remove
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-area">
            <p className="basicpara ">Why join us? :</p>
            <p className="mt-4">
              <textarea
                name="description"
                id="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
              ></textarea>
              {errors.description && touched.description ? (
                <span className="danger">{errors.description}</span>
              ) : null}
            </p>
          </div>

          <div className="mt-4 mainsetimgs">
            <p className="basicpara">Photos :</p>
            <div className="flex mt-4">
              {Photos &&
                Photos.map((img, ind) => {
                  return (
                    <div className="setimgs" style={{ position: "relative" }}>
                      {img && (
                        <img
                          src={img}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          alt="img"
                        />
                      )}
                      <AiFillDelete
                        onClick={(e) => handleDeletePhotoFromGallary(e, ind)}
                        style={{
                          position: "absolute",
                          inset: "0",
                          margin: "auto",
                          fontSize: "35px",
                          background: "#760B28",
                          color: "#fff",
                          padding: "5px",
                          borderRadius: "2px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  );
                })}

              <div className="setimgs">
                <div className="addimgBtn">
                  <input
                    type="file"
                    id="addPhotoGallary"
                    onChange={handleAddPhotoGallary}
                    hidden
                  />
                  <a
                    href=""
                    className="btn maroon-border-btn prev-btn"
                    onClick={addPhotoGallary}
                  >
                    Add
                  </a>
                </div>
              </div>
            </div>

            <div className="Addremove-btn mt-4">
              <input
                type="submit"
                className="btn maroon-btn maroon-btn-arrow"
                value={btnText}
              />
              <a className="btn maroon-border-btn prev-btn" onClick={()=>{replace("/job/EducationCompanyManagement")}}>Cancel</a>
            </div>
          </div>
        </form>
      </section>

      <Jobfooter />
    </>
  );
};
export default AuthorizeSim(AddCompanyProfile);
