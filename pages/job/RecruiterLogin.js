import React from "react";
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import Image from "next/image";
import Link from "next/link";
import { Field, Form, Formik, useFormik } from "formik";
import { RecruiterLoginSchema } from "../../job/validation/Schema";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { urlConstants ,RecruiterLoginAPI} from "../../constants/urlConstants";
import axios from "axios";
import { toast } from "react-hot-toast";

const RecruiterLogin = () => {

  const router = useRouter()
  let handleRefresh = () =>{
      router.reload()
  }


  const {replace} = useRouter()
  let Exist = secureLocalStorage.getItem("RecID")
  const [Show,setShow] = useState(false);
  useEffect(()=>{
    if(Exist!==null){
        replace('/job/RecruiterDashboardJobs')
    }else{
        setShow(true)
        secureLocalStorage.removeItem(`Pr1`);
        secureLocalStorage.removeItem(`Pr2`);
        secureLocalStorage.removeItem(`Pr3`);
        secureLocalStorage.removeItem(`Pr4`);
        secureLocalStorage.removeItem(`Pr5`);
        secureLocalStorage.removeItem(`Pr6`);
        secureLocalStorage.removeItem('mode');
        secureLocalStorage.removeItem("Candidate");
        secureLocalStorage.removeItem("RecID");
        secureLocalStorage.removeItem("mode");
        secureLocalStorage.removeItem("SIMTK");
        secureLocalStorage.removeItem("IsHiringManager");
        secureLocalStorage.removeItem("SIMLoginData");
        secureLocalStorage.removeItem("LogoutMode");
    }
})





  
  let [process,setProcess] = useState("Login")

  const initialValue = {
    EmailAddress: "",
    Password: "",
  };

  let { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValue,
      validationSchema: RecruiterLoginSchema,

      onSubmit: (values) => {
        const data = {
          email : values.EmailAddress,
          password : values.Password
        }
        setProcess('Loading...')
        setTimeout(() => {
          Authenticate(data,RecruiterLoginAPI);
       }, 1000);
      },
    });



    const [APIERROR,setAPISERROR] = useState("");

    const Authenticate = async(LoginData,Url)=>{
      try{
          let res = await axios.post(Url,LoginData,{
            headers:{"Content-Type":"application/json"}
          });
// console.log("all res rec",res)
      if(res.status===200){
          if(res.data.data.type!=='student'){
                  setProcess('Access Granted')
                  toast.success("Logged In Successfully")
                  secureLocalStorage.setItem('IsHiringManager', res.data.data.isHiringManager);
                  secureLocalStorage.setItem('RecID',res.data.data._id);
                  secureLocalStorage.setItem('RecruiterToken',res.data.data.token);
                  secureLocalStorage.setItem('RecCompanyID',res.data.data.companyId);
                  secureLocalStorage.setItem('LogoutMode',"Rec");
                  replace('/job/RecruiterDashboardJobs')
                  handleRefresh()
          }else{
            setProcess('Login');
        }
      }

    
  }catch(error){
      setAPISERROR("Invalid Credentials")
      setProcess('Login')

  }
 
  }






  let [showPassword,setShowPassword] = useState(false);


  return (
    <>
      <Head>
        <title>Recruiter Login - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      {/* <Jobheader showData3={true} /> */}
      <section className="job_candidatelogin-section">
        <div className="can-login-leftbox">
          <Image
            src="/img/can_login_banner.png"
            layout="fill"
            className="resp-img mobile "
            alt="img"
          />
          <h2 className="heading02">
            Empower
            <br /> Your Hiring Strategy
          </h2>
        </div>
        <div className="can-login-righttbox">
          <div className="text-center">
            <h3 className="heading03">Login as Employer</h3>
            {/* <p>
              Don't have an account?{" "}
              <span>
                <Link className="heading04" href="/job/RecruiterSignin">
                  Sign Up
                </Link>
              </span>
            </p> */}
          </div>

          <form action="" className="canloginform" onSubmit={handleSubmit}>
            <div className="input_field ">
              <input
                type="text"
                name="EmailAddress"
                id=""
                className="w-100"
                placeholder="Enter Your Email ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.EmailAddress}
              />
                  {errors.EmailAddress && touched.EmailAddress ? (
                <span className="danger">{errors.EmailAddress}</span>
              ) : <span className="danger">{APIERROR}</span>}
              <br />
            </div>
            <div className="input_field mt-4">
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="Password"
                className="w-100"
                id=""
                placeholder="Enter Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Password}
              />
                  {errors.Password && touched.Password ? (
                <span className="danger">{errors.Password}</span>
              ) : null}
              <br />
              <span className="pass-hideshow pointer" onClick={()=>setShowPassword(()=>showPassword ? false : true)}>{`${showPassword ? "Hide" : "Show"}`}</span>
            </div>
            <Link className="forgot-pass" href="/job/RecruiterForgotPass">
              Forgot Password?
            </Link>
          <div className="jcloginBtn mt-4 text-center">
            <input type="submit" value={process}
              className="text-center btn maroon-btn maroon-btn-arrow"
            />
          </div>
          </form>
          {/* <div className='login-or text-center'> <span className=' '>Or</span></div> */}
          {/* <div className='jobsignup-google'>
                    <Link href="/shoppingCart"><Image src="/img/google-login.png" alt="" layout="fill" className='resp-img text-center' /></Link>
                    </div> */}
        </div>
      </section>
      <Jobfooter />
    </>
  );
};

export default RecruiterLogin;
