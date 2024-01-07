// import React from 'react'
// import { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { urlConstants as urlConstant } from '../constants/urlConstants';
import { getCookie, setCookie } from 'cookies-next';
import toast from 'react-hot-toast';



// you can use yup for default error message
const FormComponents = ({ isactive, showPopup, formName }) => {
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


    setValues(
      {
        name: "",
        email: "",
        course: "",
        number: "",
        formName: { formName },
        MainSource: utmSource ? utmSource : "Direct Traffic",
        utm_medium: utmMedium ? utmMedium : "",
        utm_campaign: utmCampaign ? utmCampaign : ""
      }
    )
  }, [])
  // console.log(values)
  const { name, email, utmSource, number, utm_medium, utm_campaign, course, MainSource } = values;
  const onFormSubmit = async (e) => {
    setButtonDisabled(true)
    try {

      let data = JSON.stringify({
        "emailAddress": email,
        "firstName": name,
        "phone": number,
        "mxCourse": course,
        "mxMainsource": formName,
        "mxLeadSubSource": MainSource,
        "SourceMedium": utm_medium,
        "SourceCampaign": utm_campaign
      });
      // let config = {
      //   method: 'post',
      //   maxBodyLength: Infinity,
      //   url: urlConstant.commonForm,
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   data: data
      // };
      // // console.log("data to our Database", data);
      // await axios.request(config)
      //   .then((response) => {
      //     console.log(JSON.stringify(response.data));
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      let res = await axios.post(urlConstant.commonForm, data, {
        headers: {
          'Content-Type': 'application/json'
        }, maxContentLength: Infinity
      })

      buttonRef.current.click()
      // console.log("Server Working")
      // console.log(res)
      // console.log(data)

      clearState()
      router.push("/thankyou")

    }
    catch (err) {
      // console.log(err)
      toast.error(err.response.data.ExceptionMessage)
      setButtonDisabled(false)
    }
  }
  const clearState = () => {
    setValues({
      name: '',
      email: '',
      course: '',
      number: '',
    })
  }

  return (
    <>
      <div className={'enq-form' + ' ' + (isactive ? 'active' : '')}>
        <button className='close-form resp-img-box' onClick={showPopup} ref={buttonRef}><Image loading='lazy' src="/img/form_arrow.svg" alt="form arrow" fill={true} sizes='100vw' className='resp-img' /></button>
        <div className='form-header'>
          <i className='resp-img-box'><Image loading='lazy' src="/img/enq_icon.svg" alt="enquire icon" fill={true} sizes='100vw' className='resp-img' /></i>
          <p>We assure a Price match <br /> Guarantee with any Becker Partner</p>
        </div>
        <div className='form-box'>
          <h6>Take The First Steps!</h6>
          <form method="post" onSubmit={handleSubmit(onFormSubmit)}>
            <input type="hidden" value={utmSource} />
            <input type="hidden" value={utm_medium} />
            <input type="hidden" value={utm_campaign} />
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
              <select id="select-course" name="course" placeholder='Select Course'
                {...register("course",
                  {
                    required: "Select Course",
                    onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                  })}
                className={errors.course ? 'error-border' : null}
                value={course}
              >
                <option value="">Select Course</option>
                <option value="CPA">CPA</option>
                <option value="CMA">US CMA</option>
                <option value="EA">EA</option>
                <option value="ACCA Skill Level">ACCA Skill Level</option>
                <option value='CIA'>CIA</option>
                <option value='IFRS'>IFRS</option>
                <option value='Data-Analytics'>Data Analytics</option>
                <option value='Samarth'>FNF</option>
              </select>
              {errors.course && <span className='error-message'>{errors.course?.message}</span>}
            </div>
            <div className='input-box'>
              <button className={`btn maroon-border-btn maroon-border-btn-arrow ${isButtonDisabled ? 'disabled' : ''}`}>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="overlay" onClick={showPopup} style={{ display: (isactive ? "block" : 'none') }}></div>

    </>
  )
}

export default FormComponents
