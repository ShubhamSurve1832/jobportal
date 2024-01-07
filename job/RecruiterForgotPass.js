import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { Field, Form, Formik, useFormik } from "formik";
import { CandidateForgotPassSchema, RecruiterForgotPassSchema } from "./validation/Schema";
import axios from "axios";
import { FRONTEND_BASE_URL, jobPortalBaseURL, urlConstants } from "../constants/urlConstants";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/router";


const RecruiterForgotPass = () => {


  let router = useRouter();

  let [baseulr,setbaseurl] = useState('');

  useEffect(()=>{
    let href = window.location.href;
    if(href.includes('localhost')){
      setbaseurl('http://localhost:3000')
    }else if(href.includes('dev')){
      setbaseurl('https://dev.simandhareducation.com')
    }else{
      setbaseurl('https://simandhareducation.com')
    }
  },[])


  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [btnText, setBtnText] = useState('Submit')

  const initialValue = {
    email: "",
  };


  let { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValue,
      validationSchema: CandidateForgotPassSchema,

      onSubmit: (values) => {
        let obj = {
          ...values,
          redirectUrl : `${baseulr}/job/ResetRecruiterPortalPassword`
        }
        setBtnText('Sending Mail...')
        ForgotPass(obj);
      },
    });



    //forgot password function is  here
    const ForgotPass = async(CandidateData) =>{
      try{
        let response = await axios.post(`${jobPortalBaseURL}recruiter/forgot-password`,CandidateData,{
          headers : {
            "Content-Type" : "application/json"
          }
        });
        if (response.status === 200) {
          setButtonDisabled(true);
          setBtnText('Email Sent...')
          toast.success(`Your Password Reset link has been sent to ${CandidateData.email}`);
      }
      }catch(err){
        setBtnText('Submit')
        toast.error(`Failed To Send Reset Email on ${CandidateData.email} .!`)
        setButtonDisabled(false);
        console.log(err);

      }
    }

  return (
    <>
      <section className="job_candidatelogin-section">
        <div className="can-login-leftbox">
          <Image
            loading="lazy"
            src="/img/can_login_banner.png"
            fill={true}
            sizes="100vw"
            className="resp-img mobile "
            alt="img"
          />
          <h2 className="heading02">
            Recruiter
            <br />Forgot <br />
            Password
          </h2>
        </div>
        <div className="can-login-righttbox">
          <div className="text-center">
            <h3 className="heading03">Forgot Password?</h3>
            <p>
              Please enter you email address and we will mail you a link to
              reset your password.
            </p>
          </div>

          <form action="" className="canloginform" onSubmit={handleSubmit}>
            <div className="input_field ">
              <input
                type="text"
                name="email"
                id=""
                className="w-100"
                placeholder="Enter Your Email Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <span className="danger">{errors.email}</span>
              ) : null}
              <br />
            </div>
            <div className="jcloginBtn mt-4">
              <input
                type="submit"
                value={btnText}
                href="javascript:;"
                className={`w-100 text-center btn maroon-btn maroon-btn-arrow ${isButtonDisabled ? 'disabled' : ''}`}
              />
            </div>
          </form>
          <p className="text-center">
            {" "}
            <FaAngleLeft /> Back to{" "}
            <span>
              <Link className="heading04" href="/job/RecruiterLogin">
                {" "}
                Log in
              </Link>
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default RecruiterForgotPass;
