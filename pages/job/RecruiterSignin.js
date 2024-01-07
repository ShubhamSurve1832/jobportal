import React from "react";
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import Link from "next/link";
import Image from "next/image";
import { Field, Form, Formik, useFormik } from "formik";
import { RecruiterSignUpSchema } from "../../job/validation/Schema";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CompanyBaseURL, jobPortalBaseURL } from "../../constants/urlConstants";
// import industry from "./listOFIndustries/industries";
import industry from "./listOFIndustries/industries.json";
import CountryPhone from "./AllCountryPhoneCode/PhoneCodes.json";
import Jobportalaside from "../../components/Jobportalaside";
import AuthorizeSim from "./AuthorizeSimandharAdmin/AuthorizeSim";

const RecruiterSignin = () => {

  // let {CountryPhoneCodes} = CountryPhone
  let Token = secureLocalStorage.getItem('SIMTK');

  let [PhoneVerified,setPhoneverified] = useState(false);
  let [OTP,setOTP] = useState('');
  let [OTPError,setOTPError] = useState('')

  let [showPass, setshowPass] = useState("Show");
  let [showPass1, setshowPass1] = useState("Show");

  let [lastnameerror,setLastNameerror] = useState('');

  const [termsConditionsError, settermsConditionsError] = useState("");
  // const [HiringError, setHiringError] = useState("");

  const ShowPassword = (which) => {
    if (which === "pass") {
      let ele = document.getElementById("Password");
      if (ele.type === "password") {
        ele.type = "text";
        setshowPass("Hide");
      } else {
        ele.type = "password";
        setshowPass("Show");
      }
    } else {
      let ele = document.getElementById("CPassword");
      if (ele.type === "password") {
        ele.type = "text";
        setshowPass1("Hide");
      } else {
        ele.type = "password";
        setshowPass1("Show");
      }
    }
  };

  let { replace } = useRouter();

  let Exist = secureLocalStorage.getItem("RecID");
  const [Show, setShow] = useState(false);
  useEffect(() => {
    if (Exist !== null) {
      replace("/job/EducationJobs");
    } else {
      setShow(true);
        // secureLocalStorage.removeItem(`Pr1`);
        // secureLocalStorage.removeItem(`Pr2`);
        // secureLocalStorage.removeItem(`Pr3`);
        // secureLocalStorage.removeItem(`Pr4`);
        // secureLocalStorage.removeItem(`Pr5`);
        // secureLocalStorage.removeItem(`Pr6`);
        // secureLocalStorage.removeItem('mode');
        // secureLocalStorage.removeItem("Candidate");
        // secureLocalStorage.removeItem("RecID");
        // secureLocalStorage.removeItem("mode");
        // secureLocalStorage.removeItem("SIMTK");
        // secureLocalStorage.removeItem("SIMLoginData");
        // secureLocalStorage.removeItem("LogoutMode");
    }
  });

  // const [Hiring, setHiring] = useState('NotSelected');
  const [Agree, setAgree] = useState(false);

  const [initialValue, setInitialValue] = useState({
    firstName: "",
    LastName: "",
    EmailAddress: "",
    Password: "",
    ConfirmPassword: "",
    PhoneNumber: "",
    CompanyName: "",
    Industry: "",
    Designation: "",
    Location : "",
  });

  let [btnText, setBtnText] = useState("Sign Up");

  let { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValue,
      validationSchema: RecruiterSignUpSchema,

      onSubmit: (values) => {
// console.log("Values",values)
        let obj = {
          firstName: values?.firstName,
          LastName: values?.LastName,
          email: values?.EmailAddress,
          password: values?.Password,
          phoneNumber: values?.PhoneNumber,
          companyName: values?.CompanyName,
          employeeSize: values?.EmpoyeeSize,
          selectIndustry: values?.Industry,
          yourDesignation: values?.Designation,
          location : values.Location,
          termConditions: Agree,
          isHiringManager:1,
          createdBy: "Recruiter",
          status: 'Active',
        };

          if(Agree){
            // if(Hiring!=='NotSelected'){
              settermsConditionsError('');
           
              // setBtnText('Sending OTP...')
              SingUpRecruiter(obj);
              console.log("reached in line 134")
            // }else{
            //    setHiringError('Select Are You Hiring ?')
            // }
          }else{
            settermsConditionsError('Agree to Terms and Conditions.');
            setBtnText('Sign Up')
          }        
      }
    });



  //SingUpRecruiter
  let [RegisteredREsponse,setRegisteredResponse] = useState();
  const SingUpRecruiter = async (data) => {
    // try {
     
console.log("reached in line 151")
      // if (response.status === 201) {
        // setRegisteredResponse(data)
        try{
          console.log("reached in line 247")
          let response = await axios.post(
            `${jobPortalBaseURL}recruiter/`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${Token}`
              },
            }
          );
          if(response.status===201){
            toast.success("Registration Successfull");
            replace("/job/EducationJobs");
            secureLocalStorage.setItem("RecID", response.data.data._id);
            secureLocalStorage.setItem('LogoutMode',"Rec");
          }
        }catch(err){
          console.log(err)
             toast.error(err.response.data.message ? err.response.data.message : err.message);
            //  setBtnText("Verify OTP");
        }
        // SendOTP(values.EmailAddress);
    //   }
    // } catch (err) {
   
    // }
  };












  // let tryagaincount = 1;
  // let [verifyId,setverifyId] = useState('');
  // const SendOTP = async(EmailAddress) =>{

  //   setPhoneverified(true)

  //       try{
  //         let Credential = {
  //           "email" : EmailAddress
  //        }

         
  //        let response = await axios.post(`${jobPortalBaseURL}user/email-otp`,Credential,{
  //          headers : {
  //            "Content-Type" : "application/json",
  //            'Authorization': `Bearer ${Token}`
  //          }
  //        })
          
  //       if(response.status===200){
  //             toast.success(`OTP Sent On ${EmailAddress}`);
  //             setverifyId(response.data.data.otp)
  //             setBtnText("Verify OTP")
  //             TickTick();
  //       }

  //       }catch(error){
  //         tryagaincount=tryagaincount-1;
  //         if(tryagaincount>0){
  //           SendOTP(values.EmailAddress)
  //         }else{
  //           toast.error(`Failed To Send OTP On ${EmailAddress}..!`)
  //           console.log(error);
  //         }
  //       }
  // }







  // let verifyTimeCountForResend = 59;
  // let [countdown,setCountDown] = useState(59);
  //  //countdown to resend otp
  //  const TickTick = () =>{
  //    if(verifyTimeCountForResend>0){
  //      setTimeout(()=>{
  //        verifyTimeCountForResend=verifyTimeCountForResend-1;
  //        setCountDown(verifyTimeCountForResend)
  //        TickTick()
  //      },1000)
  //    }else{
  //      toast.success('Now You Can Resend OTP..!')
  //     console.log('.')
  //    }
  //  }





  const handleVerifyOTP = async(e) =>{
    e.preventDefault();
    console.log("reached in line 238")
    
    // if(OTP==='' || OTP.length<4 || OTP.length>4){
    //   setOTPError(`Enter 4 Digits OTP Sent On ${values.EmailAddress}`)
    // }else{
      // if(+OTP===verifyId){


        // try{
        //   console.log("reached in line 247")
        //   let response = await axios.post(
        //     `${jobPortalBaseURL}recruiter/`,
        //     RegisteredREsponse,
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //         'Authorization': `Bearer ${Token}`
        //       },
        //     }
        //   );

          // if(response.status===201){
            // try{
            //   let res = await axios.patch(`${jobPortalBaseURL}recruiter/email-verify/${response.data.data._id}`,{isEmailVerify : true},{headers:{"Content-Type" : "application/json",
            //   'Authorization': `Bearer ${Token}`}});
              // if(res.status===200){
                // setBtnText('OTP Verified')
                // toast.success("Registration Successfull");
                // replace("/job/EducationJobs");
                // secureLocalStorage.setItem("RecID", res.data.data._id);
                // secureLocalStorage.setItem('LogoutMode',"Rec");
              // }
            // }catch(error){
            //   console.log(error);
            // }
        //   }
        // }catch(err){
        //      toast.error(err.response.data.message ? err.response.data.message : err.message);
        //      setBtnText("Verify OTP");
        // }
       
  //  }else{
  //   toast.error("Wrong OTP")
  //   setOTPError(`Enter 4 Digits OTP Sent On ${values.EmailAddress}`)
  //  }
    // }
    
  }



  let [company, setcompany] = useState([]);
  useEffect(() => {
    fetchCompany();
    // fetchEmployeeSize();
  }, []);

  const fetchCompany = async () => {
    try {
      let response = await axios.get(CompanyBaseURL,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      });
      if (response.status === 200) {
        setcompany(response.data.data);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  //calculare employess size
  let [EmployeeSize, setEmployeeSize] = useState(["0-10","10-20","20-50","50-100","100-500","500+"]);
  // const fetchEmployeeSize = () => {
  //   let size = 0;
  //   for (let i = 0; i < 50; i++) {
  //     size += 10;
  //     EmployeeSize.push(size);
  //   }
  // };
  

  return (
    <>
      {Show ? (
        <>
          <Head>
            <title>Recruiter SignUp - Simandhar Education</title>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
          </Head>
          {/* <Jobheader showData3={false} /> */}
          <section className="job_RecruiterSignin-section jp-admin-wrapper educationjobpage">
            <Jobportalaside />
            <div className="can-login-righttbox jobportal-right-section container">
              <div className="text-center">
                <h3 className="heading03">{!PhoneVerified ? 'Sign Up Employer' : 'Verify OTP'}</h3>
              {/* {
                !PhoneVerified
                  &&
                  <p>
                  Already have an account?
                  <span>
                    <Link
                      className="heading04"
                      href="/job/RecruiterLogin"
                    >
                      {" "}
                      Log in
                    </Link>
                  </span>
                </p>
              } */}
              </div>

              <form action="" className="canloginform" onSubmit={handleSubmit}>
               


               {
                !PhoneVerified 

                    ?

                    <>
                     <div className="input_field mt-4">
                  <input
                    type="text"
                    name="firstName"
                    id=""
                    className="w-100"
                    placeholder="Enter Your First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                  />
                  {errors.firstName && touched.firstName ? (
                    <span className="danger">{errors.firstName}</span>
                  ) :  null}
                </div>


                <div className="input_field mt-4">
                  <input
                    type="text"
                    name="LastName"
                    id=""
                    className="w-100"
                    placeholder="Enter Your Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.LastName}
                  />
                  {errors.LastName && touched.LastName ? (
                    <span className="danger">{errors.LastName}</span>
                  ) :  <span className="danger">{lastnameerror}</span>}
                </div>


                <div className="input_field mt-4">
                  <input
                    type="text"
                    name="EmailAddress"
                    id=""
                    className="w-100"
                    placeholder="Enter Email ID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.EmailAddress}
                  />
                  {errors.EmailAddress && touched.EmailAddress ? (
                    <span className="danger">{errors.EmailAddress}</span>
                  ) : null}
                </div>
                <div className="input_field mt-4">
                  <input
                    type="password"
                    name="Password"
                    className="w-100"
                    id="Password"
                    placeholder="Enter Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Password}
                  />
                  {errors.Password && touched.Password ? (
                    <span className="danger">{errors.Password}</span>
                  ) : null}
                  <span
                    className="pass-hideshow pointer"
                    onClick={() => ShowPassword("pass")}
                  >
                   {showPass}
                  </span>
                </div>
                <div className="input_field mt-4">
                  <input
                    type="password"
                    name="ConfirmPassword"
                    className="w-100"
                    id="CPassword"
                    placeholder="Confirm Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.ConfirmPassword}
                  />
                  {errors.ConfirmPassword && touched.ConfirmPassword ? (
                    <span className="danger">{errors.ConfirmPassword}</span>
                  ) : null}
                  <span
                    className="pass-hideshow pointer"
                    onClick={() => ShowPassword("CPass")}
                  >
                   {showPass1}
                  </span>
                </div>
               

                <div className="input_field" style={{display : "flex" , justifyContent : 'center' , alignItems : 'center'}}>
              {/* <div className="input_field custom-dropdown mt-4">
                    <select
                      name="PhoneCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={{width : "100%" , border : '1px solid #760B28'}}
                    >
                      <option value="">Choose Country Code</option>
                      {CountryPhoneCodes &&
                        CountryPhoneCodes?.map((list, ind) => {
                          return <option value={list?.dial_code}>{list?.dial_code + " " + list?.name}</option>;
                        })}
                    </select>
                    {errors.PhoneCode && touched.PhoneCode ? (
                      <span className="danger">{errors.PhoneCode}</span>
                    ) : null}
                  </div> */}

                  <div  style={{width : "100%" , paddingTop : "15px"}}>
                    <input
                        type="text"
                        name="PhoneNumber"
                        id=""
                        className="w-100"
                        placeholder="Enter Phone Number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.PhoneNumber}
                      />
                      {errors.PhoneNumber && touched.PhoneNumber ? (
                        <span className="danger">{errors.PhoneNumber}</span>
                      ) : null}
                      <br />
                  </div>
            </div>
               
                <div className="input_field custom-dropdown mt-4">
                  <select className="pointer"
                    name="CompanyName"
                    onBlur={handleBlur}
                    onChange={handleChange}>
                    <option value="">Choose Company</option>
                    {company &&
                      company.map((com, ind) => {
                        return <option value={com?.name}>{com?.name}</option>;
                      })}
                  </select>
                  {errors.CompanyName && touched.CompanyName ? (
                    <span className="danger">{errors.CompanyName}</span>
                  ) : null}
                </div>

                {/* <div className="input_field custom-dropdown mt-4">
                  <select
                    name="EmpoyeeSize"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option value="">Enter Total Employee Size</option>
                    {EmployeeSize &&
                      EmployeeSize.map((data, ind) => {
                        return <option value={data}>{data}</option>;
                      })}
                  </select>
                  {errors.EmpoyeeSize && touched.EmpoyeeSize ? (
                    <span className="danger">{errors.EmpoyeeSize}</span>
                  ) : null}
                </div> */}

                <div className="input_field custom-dropdown mt-4">
                  <select 
                    className="pointer"
                    name="Industry"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option value="">Choose Industry</option>
                    {industry.industry &&
                      industry.industry.map((list, ind) => {
                        return <option value={list}>{list}</option>;
                      })}
                  </select>
                  {errors.Industry && touched.Industry ? (
                    <span className="danger">{errors.Industry}</span>
                  ) : null}
                </div>

                <div className="input_field mt-4">
                  <input
                    type="text"
                    name="Designation"
                    id=""
                    className="w-100"
                    placeholder="Enter Your Designation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Designation}
                  />
                  {errors.Designation && touched.Designation ? (
                    <span className="danger">{errors.Designation}</span>
                  ) : null}
                </div>


                <div className="input_field mt-4">
                  <input
                    type="text"
                    name="Location"
                    id=""
                    className="w-100"
                    placeholder="Enter Your Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Location}
                  />
                  {errors.Location && touched.Location ? (
                    <span className="danger">{errors.Location}</span>
                  ) : null}
                </div>

                {/* <div className="input_field mt-2 radiobtn-box radiobtn-box01">
                  <label htmlFor="">Are you a hiring manager?</label>
                  <label htmlFor="">
                    <input
                      type="radio"
                      name="Hiring"
                      onChange={() => setHiring(true)}
                      className="custom-radio"
                    />
                    <span>Yes</span>{" "}
                  </label>
                  <label htmlFor="">
                    <input
                      type="radio"
                      name="Hiring"
                      onChange={() => setHiring(false)}
                      className="custom-radio"
                    />
                    <span>No</span>{" "}
                  </label>
                </div>
                  {HiringError && <span className="danger">{HiringError}</span>}<br/> */}


                <div className="input_field mt-2 radiobtn-box radiobtn-box02 ">
                  <input
                  className="pointer"
                    type="radio"
                    name="Agree"
                    onChange={() => setAgree(true)}
                  />
                  {errors.Agree && touched.Agree ? (
                    <span className="danger">{errors.Agree}</span>
                  ) : null}
                  <label htmlFor="">
                    I agree to the 
                     <Link href='/job/RecruiterTermsAndConditions' target="_blank"> Terms and Conditions.</Link>
                  </label>
                </div>
                {termsConditionsError && <span className="danger">{termsConditionsError}</span>}<br/>
                    </>

                    :

                    
             <div className="input_field mt-4">
                    <input
                      type="number"
                      name="OTP"
                      pattern="[0-9]"
                      className="w-100"
                      id="OTP"
                      placeholder="Enter OTP"
                      onChange={(e)=>setOTP(e.target.value)}
                    />
                    {errors.OTP && touched.OTP ? (
                      <span className="danger">{errors.OTP}</span>
                    ) : <span className="danger">{OTPError}</span>}
                    <br />
                    {/* <span className="pass-hideshow" style={{cursor :"pointer"}} onClick={()=>SendOTP(values.EmailAddress)}>Resend</span> */}
                    { 
                      countdown!==0 
                         ?
                         <span className="pass-hideshow">00 : {countdown}</span>
                         :
                         <span className="pass-hideshow" style={{cursor :"pointer"}} onClick={()=>SendOTP(values.EmailAddress)}>Resend</span>
                        }
            </div>
                
               }




                <div className="jcloginBtn mt-4 text-center">
                  <input
                    type="submit"
                    value={btnText}
                    className="text-center btn maroon-btn maroon-btn-arrow"
                  />
                </div>
              </form>
            </div>
          </section>
          <Jobfooter />
        </>
      ) : (
        <h1 className="text-center m-4">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
            alt="Loader"
          />
        </h1>
      )}
    </>
  );
};
export default AuthorizeSim(RecruiterSignin);
