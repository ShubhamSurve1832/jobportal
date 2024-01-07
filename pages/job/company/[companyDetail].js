import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Jobfooter from "../JobFooter";
import Jobheader from "../JobHeader";
import { IoIosArrowBack } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { HiLocationMarker } from "react-icons/hi";
import { GiFactory } from "react-icons/gi";
import { LuFileText } from "react-icons/lu";
import { MdHomeRepairService } from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { BiTime } from "react-icons/bi";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import {
  CompanyBaseURL,
  RecruiterPostJobBaseURL,
} from "../../../constants/urlConstants";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";
import { differenceInDays, differenceInHours } from "date-fns";
import Spinner from "../../../components/comman/Spinner";

const CompanyMgmtDetailPage = () => {
  let Token = secureLocalStorage.getItem("SIMTK");
  let [show, setShow] = useState(false);
  let routeBack = secureLocalStorage.getItem("fromAdmin");
  let RecID = secureLocalStorage.getItem("RecID");
  let router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.query.companyDetail, router.isReady]);

  const [companyData, setcompanyData] = useState({});

  // console.log("companyData",companyData)
  let fetchData = async () => {
    try {
      let response = await axios.get(
        `${CompanyBaseURL}${router.query.companyDetail}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      if (response.status === 200) {
        setShow(true);
        setcompanyData({ ...response.data.data });
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(companyData);
  const {
    logo,
    name,
    industry,
    size,
    description,
    location,
    ceoAvatar,
    ceo,
    website,
    yearOfEstd,
    revenue,
    createdAt,
    createdBy,
    _id,
  } = companyData;

  const [jobsData, setJobsData] = useState([]);

  let getData = async () => {
    let res = await axios.get(RecruiterPostJobBaseURL, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    fetchCompanyJobs(router.query.companyDetail, res?.data?.data?.records);
  };

  let DeleteCompany = async () => {
    setShow(false);
    // console.log("checcking company id",_id)
    let payload = {
      deleteBy: "admin",
    };
    try {
      if (confirm("Do you want delete company ?")) {
        let res = await axios.delete(`${CompanyBaseURL}${_id}`, {
          data: payload,
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        if (res.status === 200) {
          router.replace("/job/EducationCompanyManagement");
          setShow(true);
        }
      } else {
        setShow(true);
      }

      // console.log("delete res",res)
    } catch (err) {
      console.log(err);
    }
  };

  let [TotalJobInTheCurrentCompany, setTotalJobInTheCurrentCompany] =
    useState(0);
  const fetchCompanyJobs = (companyId, data) => {
    setJobsData(() => {
      return data.filter((job, ind) => {
        return job?.company?._id === companyId;
      });
    });

    let TotalJobInTheCOmpany = data.filter((job, ind) => {
      return job?.company?._id === companyId;
    });
    setTotalJobInTheCurrentCompany(TotalJobInTheCOmpany?.length);
  };

  return (
    <>
      <Head>
        <title>Job Profile - Simandhar Education</title>
      </Head>
      {/* <Jobheader showData3={false} /> */}
      <section className="section companymgmtdetail">
        <div className="container">
          <div className="dashbordBtn">
            <Link
              className="btn maroon-btn maroon-btn-arrow"
              href={`${
                routeBack !== null
                  ? "/job/EducationCompanyManagement"
                  : "/job/company/companyListing"
              }`}
            >
              <IoIosArrowBack /> Back to dashboard{" "}
            </Link>
            {Token && (
              <button
                className="btn maroon-btn maroon-btn-arrow "
                onClick={DeleteCompany}
              >
                Delete <RiDeleteBin6Line />
              </button>
            )}
          </div>
          {show ? (
            <>
              <div className="result-box mt-4">
                <div className="co-logo">
                  <img src={logo ? logo : "/img/company_icon.png"} />
                </div>
                <div className="co-info">
                  <h2>
                    {name} - {location}
                  </h2>
                  <div className="data-box">
                    <p>
                      <i>
                        <AiFillStar />
                      </i>{" "}
                      <span>4.7 / 5</span>
                    </p>
                    <p>
                      <i>
                        <GiFactory />
                      </i>{" "}
                      <span>{industry}</span>
                    </p>
                    <p>
                      <i>
                        <IoIosPeople />
                      </i>{" "}
                      <span>{size}</span>
                    </p>
                    {/* <p><i><HiLocationMarker /></i> <span>Mumbai</span></p> */}
                  </div>
                </div>
              </div>
              <div className="Detailpage">
                <div className="companymgmt Detailpagemag mt-4">
                  <h3 className="heading05 mb-2">
                    <span>About the company</span>
                  </h3>
                  <div className="detailcompanygrid">
                    <div className="detailcompany">
                      <div className="detailcompanyimg">
                        <img src={ceoAvatar} alt="CEO" />
                      </div>
                      <div className="detailcompanytext">
                        <p className="mb-2">
                          <strong>CEO : </strong> {ceo}
                        </p>
                        <p className="mb-2">
                          <strong>Founded : </strong>
                          {yearOfEstd}
                        </p>
                        <p className="mb-2">
                          <strong>Company size : </strong>
                          {size}+
                        </p>
                        <p className="mb-2">
                          <strong>Revenue : </strong>
                          {new Intl.NumberFormat("en-us", {
                            style: "currency",
                            currency: "INR",
                          }).format(revenue)}
                        </p>
                        <p className="">
                          <strong>Link : </strong>
                          <a href={website}>{name}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="companymgmt mt-4">
                  <p className="mb-2">
                    <strong>Why Join Us?</strong>
                  </p>
                  <p>{description} </p>
                </div>
              </div>
              <div className="companymgmt mt-4">
                <p>
                  <strong>
                    {TotalJobInTheCurrentCompany} Jobs openings at {name}
                  </strong>
                </p>
              </div>
              <br />
              <br />
              <br />
              <br />
            </>
          ) : (
            <Spinner />
          )}

          {jobsData?.length > 0 ? (
            jobsData.map((data, ind) => {
              let {
                title,
                reportAddress,
                yearOfExperience,
                jobType,
                createdAt,
                _id,
                aboutCompany,
                payRange,
                max,
                min,
                company,
              } = data;

              let Hours = differenceInHours(Date.now(), new Date(createdAt));
              // console.log(title);
              return (
                <Link href={`/job/${_id}`} className="result-section">
                  <div className="result-container">
                    <div className="result-box">
                      <div className="co-logo">
                        <img
                          src={
                            company?.logo
                              ? company?.logo
                              : "/img/simandhar_detail-icon.jpg"
                          }
                        />
                      </div>
                      <div className="co-info">
                        {differenceInDays(Date.now(), new Date(createdAt)) <
                        2 ? (
                          <h2>
                            {title}
                            <span className="active">New</span>
                          </h2>
                        ) : (
                          <h2>{title}</h2>
                        )}
                        <p>{company?.name}</p>
                        <div className="data-box">
                          <p>
                            <i>
                              <MdHomeRepairService />
                            </i>{" "}
                            <span>0 - {yearOfExperience} years</span>
                          </p>
                          <p>
                            <i>
                              <HiLocationMarker />
                            </i>{" "}
                            <span>
                              {reportAddress !== "Null"
                                ? reportAddress.slice(0, 50) + "..."
                                : "Not report to specific address"}
                            </span>
                          </p>
                          <p>
                            <i>
                              <HiOutlineCurrencyRupee />
                            </i>{" "}
                            <span>
                              {payRange ? payRange : `${max} To ${min}`} P.A.
                            </span>
                          </p>
                          <p>
                            <i>
                              <BiTime />
                            </i>{" "}
                            <span>{jobType}</span>
                          </p>
                        </div>
                        <div className="data-box-newicon">
                          <p>
                            <i>
                              <LuFileText />
                            </i>
                            {aboutCompany.slice(0, 100)}...
                          </p>
                        </div>

                        <div className="days mt-4">
                          {/* <p>{DD} days ago</p> */}
                          {Hours >= 24 ? (
                            <p className="days">
                              {differenceInDays(
                                Date.now(),
                                new Date(createdAt)
                              )}{" "}
                              days ago
                            </p>
                          ) : (
                            <p className="days">{Hours} Hours ago</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <h3 className="heading03 theme-color text-center">
              No Job Openings
            </h3>
          )}
        </div>
      </section>

      <Jobfooter />
    </>
  );
};

export default CompanyMgmtDetailPage;
