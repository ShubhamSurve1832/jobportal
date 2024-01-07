import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Field, Form, Formik, useFormik } from "formik";
import { CandidateSignUpSchema } from "./validation/Schema";
import { useState } from "react";
import { CandidateJobPortalApiBaseURL, jobPortalBaseURL, urlConstants } from "../constants/urlConstants";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from 'react-hot-toast';
import CountryPhone from "../pages/job/AllCountryPhoneCode/PhoneCodes.json";





const CandidateSignUp = () => {
  const router = useRouter()
  let handleRefresh = () =>{
      router.reload()
  }

  let {CountryPhoneCodes} = CountryPhone
  let [PhoneVerified,setPhoneverified] = useState(false);
  let [OTP,setOTP] = useState('');
  let [OTPError,setOTPError] = useState('')
  // console.log(CountryPhoneCodes)

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [btnText, setBtnText] = useState('Sign Up')
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [termsConditions, settermsConditions] = useState(false);
  const [termsConditionsError, settermsConditionsError] = useState("");
  let [showPass,setshowPass] = useState("Show");

  // console.log(selectedCountryCode)

  const ShowPassword = () =>{
    let ele =  document.getElementById('Password');
    if(ele.type==='password'){
     ele.type='text'
     setshowPass("Hide");
    }else{
     ele.type='password'
     setshowPass("Show");
    }
 }


  let {replace} = useRouter();
  let [show,setShow] = useState(false);
  let Exist = secureLocalStorage.getItem("Candidate")
  
  useEffect(()=>{
    if(Exist!==null){
        replace('/job/CandidateUploadCv')
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
})

  const initialValue = {
    firstName: "",
    lastName : "",
    email: "",
    password: "",
    phoneNo:"",
    type : "student"
  };

  let { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValue,
      validationSchema: CandidateSignUpSchema,

      onSubmit: (values) => {
        let phoneNum =selectedCountryCode + + values.phoneNo
        let newVal = {
          firstName: values.firstName,
          lastName : values.lastName,
          email: values.email,
          password: values.password,
          phoneNo:phoneNum,
          type : "student",
          termsConditions: termsConditions,
        };
        if(termsConditions){
          settermsConditionsError('');
          setBtnText('Sending OTP...')
          SignUpNewCandidate(newVal);
        }else{
          settermsConditionsError('Agree to Terms and Conditions.');
          setBtnText('Sign Up')
        }
        // console.log("last call",newVal)
      },
    });


// console.log(values)


    let [RegisteredREsponse,setRegisteredResponse] = useState();

    //signup function is here 
    const SignUpNewCandidate = async(CandidateData)=>{
      try{
        let response = await axios.post(CandidateJobPortalApiBaseURL,CandidateData,{
          headers : {
            "Content-Type" : "application/json"
          }
        })

       
        if(response.status===201){
          setRegisteredResponse(response)
          SendOTP(values.email);
          secureLocalStorage.setItem('CandidateToken',response.data.data.token);
        }

      }catch(err){
        // console.log("err",err)
           toast.error(err.response.data.message ? err.response.data.message : err.message);
           setBtnText('SignUp');
      }
    }




    const handleCountryCode = (event) => {
      setSelectedCountryCode(event.target.value);
    };

    let tryagaincount = 1;
    let [verifyId,setverifyId] = useState('');
    const SendOTP = async(email) =>{

      setPhoneverified(true)

          try{
            let Credential = {
             "email" : email
          }

          
          let response = await axios.post(`${jobPortalBaseURL}user/email-otp`,Credential,{
            headers : {
              "Content-Type" : "application/json",
            }
          })
          
          if(response.status===200){
            // console.log(response);
                toast.success(`OTP Sent On ${email}`);
                setverifyId(response.data.data.otp)
                setBtnText("Verify OTP")

                TickTick();
          }

          }catch(error){
            tryagaincount=tryagaincount-1;
            if(tryagaincount>0){
              SendOTP(values.email)
          }else{
            toast.error(`Failed To Send OTP On ${email}..!`)
            console.log(error);
          }
          }
    }





      
 let verifyTimeCountForResend = 59;
 let [countdown,setCountDown] = useState(59);
  //countdown to resend otp
  const TickTick = () =>{
    if(verifyTimeCountForResend>0){
      setTimeout(()=>{
        verifyTimeCountForResend=verifyTimeCountForResend-1;
        setCountDown(verifyTimeCountForResend)
        TickTick()
      },1000)
    }else{
      // toast.success('Now You Can Resend OTP..!')
    }
  }

    const handleVerifyOTP = async(e) =>{
      e.preventDefault();
      
      if(OTP==='' || OTP.length<4 || OTP.length>4){
        setOTPError(`Enter 4 Digits OTP Sent On ${values.email}`)
      }else{
         if(+OTP===verifyId){
              try{
                let res = await axios.patch(`${jobPortalBaseURL}user/email-verify/${RegisteredREsponse.data.data._id}`,{"isEmailVerify" : true},{headers:{"Content-Type" : "application/json"}});
                if(res.status===200){
                  setBtnText('OTP Verified')
                  setButtonDisabled(true)
                  secureLocalStorage.setItem('Candidate',RegisteredREsponse.data.data._id);
                  toast.success(`Candidate Registered Successfully`);
                  secureLocalStorage.setItem('LogoutMode',"Candidate");
                  secureLocalStorage.removeItem('mode');
                  replace('/job/CandidateUploadCv')
                  handleRefresh()
                }
              }catch(error){
                console.log(error);
              }
         }else{
          toast.error("Wrong OTP")
          setOTPError(`Enter 4 Digits OTP Sent On ${values.email}`)
         }
      }
      
    }


  return (
    <>
      {
        show ? <section className="job_candidatelogin-section">
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
            One Click
            <br />
            Closer to Your
            <br />
            Dream Job
          </h2>
        </div>
        <div className="can-login-righttbox mb-4">
          <div className="text-center">
            <h3 className="heading03">{!PhoneVerified ? "Sign Up" : `Verify OTP Sent On \n ${values.email}`}</h3>
           {
            !PhoneVerified &&
            <p>
            Already have an account?
            <span>
              <Link className="heading04" href="/job/CandidateLogin">
                {" "}
                Log in
              </Link>
            </span>
          </p>
           }
          </div>

          <form action="" className="canloginform" onSubmit={!PhoneVerified ? handleSubmit : handleVerifyOTP}>
            {
              !PhoneVerified 

                  ?

                  <>
                  <div className="input_field">
              <input
                type="text"
                name="firstName"
                id=""
                className="w-100"
                placeholder="Enter First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
              />
              {errors.firstName && touched.firstName ? (
                <span className="danger">{errors.firstName}</span>
              ) : null}
              <br />
            </div>
            <div className="input_field mt-4">
              <input
                type="text"
                name="lastName"
                id=""
                className="w-100"
                placeholder="Enter Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
              />
              {errors.lastName && touched.lastName ? (
                <span className="danger">{errors.lastName}</span>
              ) : null}
              <br />
            </div>
            <div className="input_field mt-4">
              <input
                type="text"
                name="email"
                id=""
                className="w-100"
                placeholder="Enter Email Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <span className="danger">{errors.email}</span>
              ) : null}
              <br />
            </div>
            <div className="input_field mt-4" >
             
                  <div  style={{width : "100%"}}>
                  {/* <select style={{fontSize:"1.8rem" }} value={selectedCountryCode} onChange={handleCountryCode}>
        <option value="">Select</option>
{
  CountryPhoneCodes.map((data,ind)=>{
    console.log("codes",data)
    let{dial_code} = data
    return(
      <>
      <option  key={ind} value={dial_code}>
            {dial_code}
      </option>
      </>
    )
  })
}
        
      </select> */}
                    <input
                        type="number"
                        name="phoneNo"
                        id=""
                        className="w-100"
                        placeholder="Enter Phone Number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phoneNo}
                      />
                      {errors.phoneNo && touched.phoneNo ? (
                        <span className="danger">{errors.phoneNo}</span>
                      ) : null}
                      <br />
                  </div>
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
              <span className="pass-hideshow" id="showPass" style={{cursor :"pointer"}} onClick={ShowPassword}>{showPass}</span>
            </div>
            <div className="input_field mt-4 radiobtn-box pointer">
              <input
              className="pointer"
                type="checkbox"
                name="termsConditions"
                value={values.termsConditions}
                onChangeCapture={(e) =>{settermsConditions(() => (termsConditions ? false : true))  , settermsConditionsError('')}}
              />
              <Link href="/job/TermsAndConditions" target="_blank" >
                <label>

                I agree to the <span className="pointer">Terms and Conditions.</span>
                </label>
              </Link>
            </div>
            {termsConditionsError && <span className="danger">{termsConditionsError}</span>}<br/>
                  </>

                  :

                  <div className="input_field mt-4">
                      <input
                        type="number"
                        // inputMode="numeric"
                        pattern="[0-9]"
                        name="OTP"
                        className="w-100"
                        id="OTP"
                        placeholder="Enter OTP"
                        onChange={(e)=>setOTP(e.target.value)}
                      />
                      {errors.OTP && touched.OTP ? (
                        <span className="danger">{errors.OTP}</span>
                      ) : <span className="danger">{OTPError}</span>}
                      <br />
                      { 
                      countdown!==0 
                         ?
                         <span className="pass-hideshow">00 : {countdown}</span>
                         :
                         <span className="pass-hideshow" style={{cursor :"pointer"}} onClick={()=>SendOTP(values.email)}>Resend</span>
                        }
                </div>
            }
            <div className="jcloginBtn mt-4">
              <input
                type="submit"
                value={btnText}
                className={`w-100 text-center btn maroon-btn maroon-btn-arrow ${isButtonDisabled ? 'disabled' : ''}`}
              />
            </div>
            {
              PhoneVerified && <Link href={'/job/CandidateLogin'} className="pass-hideshow" style={{textDecoration : "underline"}}><p>Back To Login</p></Link>
            }
          </form>
        </div>
      </section> : <h1 className="heading03 text-center mt-4"><img src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="Loader" /></h1>
      }
    </>
  );
};

export default CandidateSignUp;
