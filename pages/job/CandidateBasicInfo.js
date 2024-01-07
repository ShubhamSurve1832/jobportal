import React from "react";
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import CandidateJobProcess from "./CandidateJobProcess";
import { useRouter } from "next/router";
import { Field, Form, Formik, useFormik } from "formik";
import { CandidateBasicInforFormSchema } from "../../job/validation/Schema";
import AuthorizeCandidate from "../../job/AuthorizeCandidate/AuthorizeCan";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { CandidateJobPortalApiBaseURL } from "../../constants/urlConstants";
import secureLocalStorage from "react-secure-storage";
import { Country , State , City } from "country-state-city";

const CandidateBasicInfo = () => {
  let Token = secureLocalStorage.getItem('CandidateToken');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    let scrolltoEle = () =>{
      let ele = document.getElementById('TakeToProcess_ELEMENT_SKill');
      if(ele){
      setTimeout(() => {
        ele.click();
      }, 0);
    }
    }
  
    setTimeout(() => {
      scrolltoEle()
      window.scrollTo(0,0)
    }, 0);
  },[])


  let modeEdit = secureLocalStorage.getItem('mode');
  let CandidateID = secureLocalStorage.getItem("Candidate");

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [btnText, setBtnText] = useState("Save and Next");

  const { push } = useRouter();

  const [BasicData, setBasicData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    street: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
  });



  useEffect(() => {
    fetchPreviousInfo();
  }, []);

  //fetchPreviousInfo
  const fetchPreviousInfo = async () => {
    try {
      let res = await axios.get(
        `${CandidateJobPortalApiBaseURL}/${CandidateID}`,
        {
          headers: {
             'Authorization': `Bearer ${Token}`
        }
        }
      );
      if (res.status === 200) {
        let { firstName, lastName, email, phoneNo} = res.data.data;
        let {street , country , state , city , postalCode} = res.data.data.addresses.length>0 && res.data.data.addresses[res.data.data.addresses.length-1];
   
        setBasicData({
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Phone: phoneNo,
          street: street,
          country: country,
          state:state,
          city: city,
          postalCode: postalCode,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    setBtnText('Processing...')
    PostBasicInfoData();
    // console.log(educationData,addressData);
  };

  //PostBasicInfoData function is here
  const PostBasicInfoData = () => {
    let educationData = {
      firstName: BasicData.FirstName,
      lastName: BasicData.LastName,
      email: BasicData.Email,
      phoneNo: BasicData.Phone,
      updatedBy:secureLocalStorage.getItem('Candidate') 
    }

    let addressData = [
      {
        id : secureLocalStorage.getItem('Candidate'),
        street: BasicData.street,
        country: BasicData.country,
        state: BasicData.state,
        city: BasicData.city,
        postalCode: BasicData.postalCode,
        type: "home",
        updatedBy:secureLocalStorage.getItem('Candidate') 
      }
    ];

    let typeApi = ["basic-info", "address"];
    typeApi.map(async (data, ind) => {
      try {
        let res = await axios.patch(
          `${CandidateJobPortalApiBaseURL}/${data}/${CandidateID}`,
          data === "basic-info" ? educationData : addressData,
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${Token}`
            },
          }
        );

        if (res.status === 200) {
          if(ind===1){
            toast.success("Basic Info Updated Successfully..!");
          }
          setButtonDisabled(true);
          setBtnText("Added Successfully");
          if(ind===1){
            push(`/job/${modeEdit!==null ? 'CandidateDashboard' : 'CandidateMoreEducation'}`)
          }
        }
      } catch (error) {
        toast.error(`${error.response.data.message ? error.response.data.message : error.message  }`);
        setButtonDisabled(false);
        console.log(error);
        setBtnText('Save and Next')
      }
    });
   
  };

  let handleBack = () => {
    push("/job/CandidateUploadCv");
  };

  const OnchangeBasicData = (e) => {
    const value = e.target.value;
    setBasicData({
      ...BasicData,
      [e.target.name]: e.target.value,
    });
    const hasMultipleSpaces = /\s{2,}/.test(value);

    if(hasMultipleSpaces){
      setErrorMessage('Input cannot contain multiple spaces');
    } else {
      setErrorMessage('');
    }
  };




  //country state and city data
  let [Countries,setCountry] = useState(()=>{
    let name = Country.getAllCountries().map((data,ind)=>data.name + "-" + data.isoCode);
    return [...name];
  })

  let [states,setStates] = useState([]);
  let [Cities,setCities] = useState([]);




  //list state by country
  useEffect(()=>{
    ListStates(BasicData.country?.split('-')[1]);
  },[BasicData.country])


  //ListStates
  const ListStates = (countryCode) =>{
    setStates(()=>{
      return State.getStatesOfCountry(countryCode).map((data,ind)=>data.name + "-" + data.isoCode);
    })
  }



  //list cities
  useEffect(()=>{
      listCities(BasicData.country?.split('-')[1],BasicData.state?.split('-')[1])
  },[BasicData.state])



  const listCities = (countryCode,StateCode) =>{
    setCities(()=>{
      return City.getCitiesOfState(countryCode,StateCode).map((data,ind)=>data.name)
    })
  }





  //SkipProcess
	const SkipProcess = () =>{
		if(confirm("Want To Skip The Process ?")){
			push('/job/CandidateDashboard')
			secureLocalStorage.setItem('mode','edit');
		}
	}

  

  return (
    <>
      <Head>
        <title>Basic Information - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>

      </Head>
      {/* <Jobheader showData3={true} /> */}


      <a href="#CandidateBasicInfoElement" id="TakeToProcess_ELEMENT_SKill">{null}</a>

      {

      modeEdit===null && 

      <div className="process-row">
        <div className="process-box">
          <dl className="active select">
            <dt>Upload CV</dt>
            {/* <dd className='number-box'>1</dd> */}
            <dd className="tick-box"></dd>
          </dl>
          <dl id="CandidateBasicInfoElement" className="active">
            <dt>Basic Information</dt>
            <dd>2</dd>
            {/* <dd className='tick-box'></dd> */}
          </dl>
          <dl>
            <dt>Education</dt>
            <dd>3</dd>
          </dl>
          <dl>
            <dt>Work Experience</dt>
            <dd>4</dd>
          </dl>
          <dl>
            <dt>Certifications And Skills</dt>
            <dd>5</dd>
          </dl>
          <dl>
            <dt>Confirm</dt>
            <dd>6</dd>
          </dl>
        </div>
      </div>
      }

      
      <div className="process-container">
        <form onSubmit={HandleSubmit}>
          <div className="form-box mt-0">
            <div className="head">
              <h3>Basic Information</h3>
            </div>
            <div className="input_field">
              <input
                type="text"
                name="FirstName"
                minlength="2"
                value={BasicData.FirstName}
                onChange={OnchangeBasicData}
                required
                id=""
                className="w-100"
                placeholder="First Name"
               
              />
            </div>
            <div className="input_field">
              <input
                type="text"
                name="LastName"
                minlength="2"
                value={BasicData.LastName}
                onChange={OnchangeBasicData}
                id=""
                className="w-100"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="input_field">
              <input
                type="email"
                name="Email"
                minlength="4"
                value={BasicData.Email}
                // onChange={OnchangeBasicData}
                id=""
                className="w-100"
                placeholder="Email"
                required
              />
            </div>
            <div className="input_field">
              <input
                type="number"
                // pattern="[0-9]\d{14}$"
                name="Phone"
                value={BasicData.Phone}
                onChange={OnchangeBasicData}
                className="w-100"
                placeholder="Phone Number"
                required
                onInvalid={(e)=>{e.target.value==='' ? e.target.setCustomValidity("Phone Number is Requird") : e.target.setCustomValidity("Enter Valid Phone Number")}}
                onInput={(e)=>e.target.setCustomValidity('')}
              />
            </div>
          </div>
          <div className="form-box">
            <div className="head">
              <h3>Location</h3>
            </div>
            <div className="input_field">
              <input
                type="text"
                name="street"
                minlength="10"
                value={BasicData.street}
                onChange={OnchangeBasicData}
                id=""
                className="w-100"
                placeholder="Street Address"
                required
                onInvalid={(e)=>{e.target.value==='' ? e.target.setCustomValidity("Street Address is Requird") : e.target.setCustomValidity("")}}
                onInput={(e)=>e.target.setCustomValidity('')}
              />
              {errorMessage && <span className="danger">{errorMessage}</span>}
            </div>
            <div className="w-row">
              <div className="input_field select-field w-50">
                <select
                  name="country"
                  value={BasicData.country}
                  onChange={OnchangeBasicData}
                  required
                >
                  <option value="">Country</option>
                  {

                    Countries && Countries.map((data,ind)=>{
                      return(
                        <option value={data}>{data}</option>
                      )
                    })

                  }
                </select>
              </div>
              <div className="input_field select-field w-50">
                <select
                  name="state"
                  value={BasicData.state}
                  onChange={OnchangeBasicData}
                  required
                >
                  <option value="">Select State</option>
                  {
                    states && states.map((data,ind)=>{
                      return(
                        <option value={data}>{data}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className="w-row">
              <div className="input_field select-field w-50">
                <select
                  name="city"
                  value={BasicData.city}
                  onChange={OnchangeBasicData}
                  required
                >
                  <option value="">City</option>
                  {
                    Cities && Cities.map((data,ind)=>{
                      return(
                         <option value={data}>{data?.toUpperCase()}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="input_field w-50">
                <input
                  type="text"
                  value={BasicData.postalCode}
                  onChange={OnchangeBasicData}
                  name="postalCode"
                  pattern="[0-9]{6}" 
                  className="w-100"
                  placeholder="Pincode"
                  required
                  onInvalid={(e)=>{e.target.value==='' ? e.target.setCustomValidity("Pincode is Requird") : e.target.setCustomValidity("Pincode Must Be 6 Digits")}}
                  onInput={(e)=>e.target.setCustomValidity('')}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="btn-wrap flex space-between">
           {
            modeEdit===null &&  
             <a className="btn maroon-border-btn" onClick={handleBack}>
              Back
             </a>
           }
            <input
              type="submit"
              className={`btn maroon-btn maroon-btn-arrow  ${
                isButtonDisabled || errorMessage.length > 1 ? "disabled" : ""
              }`}
              value={btnText}
            />
          </div>
          {/* {
						modeEdit===null && 
					<div className='btn-wrap text-right'>
						<input type='button' onClick={SkipProcess} className="btn maroon-btn maroon-btn-arrow" value="Skip Process." />
			     	</div>
					} */}
        </form>
      </div>
      <Jobfooter />
    </>
  );
};
export default AuthorizeCandidate(CandidateBasicInfo);
