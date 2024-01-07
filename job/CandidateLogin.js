import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Field, Form, Formik, useFormik } from "formik";
import { CandidateLoginSchema } from "./validation/Schema";
import { CandidateLoginApi, urlConstants } from "../constants/urlConstants";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { toast } from 'react-hot-toast';



const CandidateLogin = () => {

  const [isButtonDisabled, setButtonDisabled] = useState(false);




  let [showPass,setShowPass] = useState("Show");
  const ShowPassword = () =>{
     let ele =  document.getElementById('Password');
     if(ele.type==='password'){
      ele.type='text'
      setShowPass("Hide");
     }else{
      ele.type='password'
      setShowPass("Show");
     }
  }

  let [process,setProcess] = useState("Login")



  let [show,setShow] = useState(false);
  let Exist = secureLocalStorage.getItem("Candidate")
  
  useEffect(()=>{
    if(Exist!==null){
      console.log("candidate job search page")
        replace('/job/CandidateDashboard')
        // window.location.reload();
    }else{
        setShow(true)
        secureLocalStorage.removeItem('mode');
        secureLocalStorage.removeItem("Candidate");
        secureLocalStorage.removeItem("RecID");
        secureLocalStorage.removeItem("mode");
        secureLocalStorage.removeItem("SIMTK");
        secureLocalStorage.removeItem("SIMLoginData");
        secureLocalStorage.removeItem("LogoutMode");
    }
},[])


  let {push,replace} = useRouter();

  const initialValue = {
    email: "",
    password: "",
  };

  const [APIERROR,setAPISERROR] = useState("");

  let { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValue,
      validationSchema: CandidateLoginSchema,

      onSubmit: (values) => {
        setProcess('Loading...')
        setTimeout(() => {
          Authenticate(values,CandidateLoginApi);
       }, 1000);
      },
    });


    const Authenticate = async(LoginData,Url)=>{
      try{
          let res = await axios.post(Url,LoginData,{
            headers:{
              "Content-Type" : "application/json"
            }
          });
          // console.log(res.data.data)
      if(res.status===200){
        // let jobID = secureLocalStorage.getItem('jobID');
          if (res.data.data.type==='student'){
                  setProcess('Access Granted')
                  toast.success("Logged In Successfully")
                  setButtonDisabled(true)
                  secureLocalStorage.setItem('Candidate',res.data.data._id);
                  secureLocalStorage.setItem('CandidateToken',res.data.data.token);
                  secureLocalStorage.setItem('CandidateEmail',res.data.data.email);
                  secureLocalStorage.setItem('LogoutMode',"Candidate");
                  window.location.reload();
                }
                push(`/job/search`)
      }
  }catch(error){
      setAPISERROR("Invalid Credentials")
      setProcess('Login')
  }

  }



  return (
    <>
      {
        show ?  <div>
        <section className="job_candidatelogin-section">
          <div className="can-login-leftbox">
            <Image
              src="/img/can_login_banner.png"
              fill={true}
              sizes="100vw"
              className="resp-img mobile "
              alt="img"
            />
            <h2 className="heading02">
              Step into
              <br /> Your <br />
              Dream Job
            </h2>
          </div>
          <div className="can-login-righttbox">
            <div className="text-center">
              <h3 className="heading03">Login</h3>
              <p>
                Don't have an account?{" "}
                <span>
                  <Link className="heading04" href="/job/CandidateSignUp">
                    Sign Up
                  </Link>
                </span>
              </p>
            </div>
  
            <form action="" className="canloginform" onSubmit={handleSubmit}>
              <div className="input_field ">
                <input
                  type="text"
                  name="email"
                  id=""
                  className="w-100"
                  placeholder="Enter Your Email ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <span className="danger">{errors.email}</span>
                ) : <span className="danger">{APIERROR}</span>}
                <br />
              </div>
              <div className="input_field mt-4">
                <input
                  type="password"
                  name="password"
                  className="w-100"
                  id="Password"
                  placeholder="Enter Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <span className="danger">{errors.password}</span>
                ) : null}
                <br />
                <span className="pass-hideshow" onClick={ShowPassword} style={{cursor : "pointer"}}>{showPass}</span>
              </div>
              <Link className="forgot-pass" href="/job/CandidateForgotPass">
                Forgot Password?
              </Link>
  
              <div className="jcloginBtn mt-4">
                <input
                  type="submit"
                  className={`w-100 text-center btn maroon-btn maroon-btn-arrow ${isButtonDisabled ? 'disabled' : ''}`}
                  value={process}
                />
              </div>
            </form>
  
            {/* <div className='login-or text-center'> <span className=' '>Or</span></div> */}
            {/* <div className='jobsignup-google'>
                      <Link href="/shoppingCart"><Image loading='lazy' src="/img/google-login.png" alt=""fill={true} sizes='100vw'  className='resp-img text-center' /></Link>
                      </div> */}
          </div>
        </section>
      </div> :  <h1 className="heading03 text-center mt-4"><img src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="Loader" /></h1>
      }
    </>
  );
};

export default CandidateLogin;
