import React from "react";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Image from 'next/image'
import axios from "axios";
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { urlConstants as urlConstant } from '../constants/urlConstants';
import { getCookie, setCookie } from 'cookies-next';
import toast from "react-hot-toast";


// you can use yup for default error message
const DownloadFormComponents1 = ({ showHeading, setCourse, showHeading2, indexData, formName, DownloadForm, Qualification, heading3 }) => {
  // console.log(DownloadForm.form1)
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { register, handleSubmit, formState: { errors }, formState, reset } = useForm();
  const router = useRouter()
  const buttonRef = useRef()


  const [values, setValues] = useState({})

  useEffect(() => {
    let url;
    if (window.location.href.includes('utm_source') && window.location.href.includes('utm_medium') && window.location.href.includes('utm_campaign')) {
      url = window.location.href;
      let utmSource = url.split('&')[0].split('?')[1].split('=')[1]
      setCookie('utmSource', utmSource)

      let utmMedium = url.split('&')[1].split("=")[1]
      setCookie('utmMedium', utmMedium)

      let utmCampaign = url.split('&')[2].split('=')[1]
      setCookie('utmCampaign', utmCampaign)
    }
    let utmSource = getCookie('utmSource');
    let utmMedium = getCookie('utmMedium');
    let utmCampaign = getCookie('utmCampaign');
    // console.log(utmSource,utmMedium,utmCampaign);

    setValues({
      name: "",
      email: "",
      number: "",
      city: "",
      course: setCourse ? setCourse :"",
      qualification: "",
      formName: { formName },
      MainSource: utmSource ? utmSource : "Direct Traffic",
      utm_medium: utmMedium ? utmMedium : "",
      utm_campaign: utmCampaign ? utmCampaign : ""
    })
  }, [])
  // console.log(values)
  const [success, setSuccess] = useState(false);
  const [hideBtn, setHideBtn] = useState(false);
  const { name, email, number, city, MainSource, qualification, utm_medium, utm_campaign,course } = values;

  const hideDwnBtn = () => { setHideBtn(true); router.push("/thankyou") }

  const onFormSubmit = async (e) => {
    setButtonDisabled(true)
    try {

      let data = {
        "emailAddress": email,
        "firstName": name,
        "phone": number,
        "city": city,
        "mxCourse":course,
        "mxMainsource": formName,
        "mxLeadSubSource": MainSource,
        "SourceMedium": utm_medium,
        "SourceCampaign": utm_campaign,
        "qualification": qualification

      };
      // let config = {
      //   method: 'post',
      //   maxBodyLength: Infinity,
      //   url: urlConstant.commonForm,
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   data: data
      // };
      // await axios.request(config)
      //   .then((response) => {
      //     console.log(JSON.stringify(response.data));
      //     setSuccess({ success: true })
      //     clearState()

      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      let res = await axios.post(urlConstant.commonForm, data, {
        headers: {
          'Content-Type': 'application/json'
        }, maxContentLength: Infinity
      })

      if (res.data.Status === "Success") {
        setSuccess(true)
        clearState();
      }

      buttonRef.current.click()
      // clearState()
      // router.push("/thankyou")
    }
    catch (err) {
      console.log(err)
      // toast.error(err.response.data.ExceptionMessage)
      setButtonDisabled(false)
    }

  }
  const clearState = () => {
    setValues({
      name: "",
      email: "",
      number: "",
      city: "",
      formName: "",
      MainSource: ""
    })
  }




  return (
    <>
      <div className='enq-form'>
        <div className='form-header'>
          <i className='resp-img-box'><Image loading='lazy' src="/img/enq_icon.svg" alt="enquire icon" fill={true} sizes='100vw' className='resp-img' /></i>
          {
            showHeading ?
              <p>We assure a Price match <br /> Guarantee with any Becker Partner</p> : ""
          }
          {
            // showHeading2 ? <p>{indexData.heading}</p> : " "
            showHeading2 ? <p>Download CPA 2024 Booklet</p> : " "
          }
        </div>
        <div className='form-box'>
          {heading3 ? <h6>Take The First Step!</h6> : ""}
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className='input-box'>
              <input type="text" name="name" placeholder='Enter your Name' minLength="2"
                value={name}
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: "Enter letters only"
                  },
                  onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                })}
                className={errors.name ? 'error-border' : null}
              //onChange={handleChange}

              />
              {errors.name && <span className='error-message'>{errors.name?.message}</span>}
            </div>
            <div className='input-box'>
              <input type="text" name="email" placeholder='Enter Your Email Address'
                {...register("email", {
                  required: "Email Id is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Enter valid email id"
                  },
                  onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                })}
                className={errors.email ? 'error-border' : null}
                //onChange={handleChange}
                value={email}
              />
              {errors.email && <span className='error-message'>{errors.email?.message}</span>}
            </div>

            <div className='input-box'>
              <input id="enquiry" name="enquiry" type="tel" placeholder="Enter Your Mobile Number" minLength="10" maxLength="15"
                {...register("number",
                  {
                    required: "Number is required",
                    pattern: {
                      value: /^[5-9]\d{9,14}/,
                      message: "Enter Valid Number"
                    },
                    minLength: {
                      value: 10,
                      message: "Enter Min 10 Number"
                    },
                    maxLength: {
                      value: 15,
                      message: "Enter Max 15 Number"
                    },
                    onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                  })}
                className={errors.number ? 'error-border' : null}
                //onChange={handleChange}
                value={number}
              />
              {errors.number && <span className='error-message'>{errors.number?.message}</span>}
            </div>

            <div className='input-box custom-select'>
              <input type="text" name="city" placeholder='Enter City'
                value={city}
                {...register("city", {
                  required: "City is required",
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: "Enter letters only"
                  },
                  onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                })}
                className={errors.city ? 'error-border' : null} />
              {errors.city && <span className='error-message'>{errors.city?.message}</span>}

              {errors.course && <span className='error-message'>{errors.course?.message}</span>}
            </div>



            {/* <div className='input-box custom-select'>
              <select id="select-course" name="course" placeholder='Select Course'
                {...register("course",
                  {
                    required: "Select Course",
                    onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                  })}
                className={errors.course ? 'error-border' : null}
                //onChange={handleChange}
                value={course}
              >
                <option value="" selected>Select Course</option>
                <option value="US CPA">US CPA</option>
                <option value="US CMA">US CMA</option>
                <option value="EA">EA</option>
                <option value='CIA'>CIA</option>
                <option value='IFRS'>IFRS</option>
                <option value='Data Analytics'>Data Analytics</option>
                <option value='Data Analytics'>Simandhar Saamarth</option>
              </select>
              {errors.course && <span className='error-message'>{errors.course?.message}</span>}
            </div> */}

            {
              Qualification ?
                <div className='input-box'>
                  <input type="text" name="qualification" placeholder='Qualification' minLength="2"
                    value={qualification}
                    {...register("qualification", {
                      required: "qualification is required",

                      onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                    })}
                    className={errors.qualification ? 'error-border' : null}


                  />
                  {errors.qualification && <span className='error-message'>{errors.qualification?.message}</span>}
                </div> : ""
            }

            <div className='input-box'>

              <button type="submit" className={`btn maroon-border-btn maroon-border-btn-arrow ${isButtonDisabled ? 'disabled' : ''}`}>Submit</button>
              {success && (hideBtn ? " " : <a href="https://simandhareducation-files.s3.ap-south-1.amazonaws.com/img/2307-451758-cpa-exam-booklet.pdf" target="_blank" download={true} className='btn maroon-btn maroon-btn-arrow dwn-btn' onClick={hideDwnBtn}>Download PDF</a>)}

            </div>
          </form>
        </div>
      </div>


    </>
  )
}

export default DownloadFormComponents1
