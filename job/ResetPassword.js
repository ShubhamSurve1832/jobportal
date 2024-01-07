import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Field, Form, Formik, useFormik } from "formik";
import { ResetPasswordJobPortal } from "./validation/Schema";
import { useRouter } from "next/router";
import { toast } from 'react-hot-toast';
import { jobPortalBaseURL, urlConstants } from "../constants/urlConstants";
import axios from "axios";



const ResetPassword = () => {

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [btnText, setBtnText] = useState('Reset Password')


  
  let [showPass,setShowPass] = useState("Show");
  const ShowPassword = (eleid) =>{
     let ele =  document.getElementById(eleid);
     if(ele.type==='password'){
      ele.type='text'
      setShowPass("Hide");
     }else{
      ele.type='password'
      setShowPass("Show");
     }
  }


  const {isReady,push,replace,query,pathname} = useRouter();

  const initialValue = {
    Password: "",
    ConfirmPassWord: "",
    token : ""
  };

  let { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValue,
      validationSchema: ResetPasswordJobPortal,

      onSubmit: (values) => {
        let newObj = {
          password : values.Password,
        }
        setBtnText('Processing...')
        ResetPassword(newObj);
      },
    });




    //ResetPassword function is here
    const ResetPassword = async(obj) =>{
      try{
        const response = await axios.patch(`${jobPortalBaseURL}user/password/${query?.token}`, obj,{
          headers : {
            "Content-Type" : "application/json"
          }
        });

        if (response.status === 200) {
            setBtnText('Reset Successfull')
            toast.success('Password updated successfully!');
            replace('/job/CandidateLogin')
        }
      }catch(error){
        toast.error(error.response.data.message)
        setBtnText('Login')
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
            Candidate
            <br />Reset <br />
            Password
          </h2>
        </div>
        <div className="can-login-righttbox">
          <div className="text-center">
            <h3 className="heading03">Choose New Password</h3>
            <p>Almost Done. Enter your new password and you’re all set.</p>
          </div>

          <form action="" className="canloginform" onSubmit={handleSubmit}>
            <div className="input_field mt-4">
              <input
                type="password"
                name="Password"
                id="Password"
                className="w-100"
                placeholder="Enter New Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.EmailAddress}
              />
              {errors.Password && touched.Password ? (
                <span className="danger">{errors.Password}</span>
              ) : null}
              <br />
              <span className="pass-hideshow pointer" onClick={()=>ShowPassword("Password")}>Show</span>
            </div>
            <div className="input_field mt-4">
              <input
                type="password"
                name="ConfirmPassWord"
                id="CPassword"
                className="w-100"
                placeholder="Confirm New Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ConfirmPassWord}
              />
              {errors.ConfirmPassWord && touched.ConfirmPassWord ? (
                <span className="danger">{errors.ConfirmPassWord}</span>
              ) : null}
              <br />
              <span className="pass-hideshow pointer" onClick={()=>ShowPassword("CPassword")}>Show</span>
            </div>
          <div className="jcloginBtn mt-4">
            <input
              type="submit"
              value={btnText}
              className="w-100 text-center btn maroon-btn maroon-btn-arrow"
            />
          </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
