'use client'
import React, { useEffect, useRef, useState } from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import CandidateJobProcess from './CandidateJobProcess';
import { useRouter } from 'next/router';
import AuthorizeCandidate from '../../job/AuthorizeCandidate/AuthorizeCan';
import axios from 'axios';
import { CandidateJobPortalApiBaseURL } from '../../constants/urlConstants';
import { toast } from 'react-hot-toast';
import secureLocalStorage from 'react-secure-storage'; 


const CandidateConfirm = () => {



  useEffect(()=>{
    let scrolltoEle = () =>{
      let ele = document.getElementById('TakeToProcess_ELEMENT');
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
  let CandidateID = secureLocalStorage.getItem('Candidate');
  let Token = secureLocalStorage.getItem('CandidateToken');
  let [showpage,setshowpage] = useState(false);
  useEffect(()=>{
    if(modeEdit!==null){
      push('/job/CandidateDashboard');
    }else{
      setshowpage(true);
    }
  },[])

  const {push} = useRouter();

	const [btnText, setBtnText] = useState('Save');
  const [CvReady,setCvReady] = useState();

  const handleSubmit = (e) =>{
    e.preventDefault();
    setBtnText("Processing...")
    confermProcessForm();
  }



  const confermProcessForm = async() =>{
    if(CvReady!=='NotSelected'){
      try{
        let response = await axios.patch(`${CandidateJobPortalApiBaseURL}/confirm-status/${CandidateID}`,{updatedAt : 2},{
          headers:{
            "Content-Type" : "application/json",
            'Authorization': `Bearer ${Token}`
          }
        });
        if(response.status===200){
          if(CvReady===true){
            setBtnText('Almost Done.')
            toast.success("Almost Done.")
            push('/job/CandidatePreview')
          }else{
            toast.error("CV is Not Ready.!")
            push('/job/CandidateBasicInfo')
          }
        }
      }catch(eror){
        console.log(eror.message);
        toast.error(eror.message);
      }
    }else{
      toast.error('Select Yes or No Option.')
      setBtnText('Save')
    }
  }

  const handleBack = () =>{
    push('/job/CandidateSkill')
  }


  // console.log(CvReady);
	return (
		<>

    <a href="#ConfirmElement" id="TakeToProcess_ELEMENT">{null}</a>

			{
        showpage && 
        <>
        <Head>
				<title>Confirm Page - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>

			</Head>
			{/* <Jobheader showData3={true} /> */}
			{/* <CandidateJobProcess /> */}
			<div className="process-row">
        <div className="process-box">
          <dl className="active select">
            <dt>Upload CV</dt>
            {/* <dd className='number-box'>1</dd> */}
            <dd className='tick-box'></dd>
          </dl>
          <dl className="active select">
            <dt>Basic information</dt>
            {/* <dd>2</dd> */}
            <dd className='tick-box'></dd>
          </dl>
          <dl className='active select'>
            <dt>Education</dt>
            {/* <dd>3</dd> */}
            <dd className='tick-box'></dd>
          </dl>
          <dl className='active select'>
            <dt>Work Experience</dt>
            {/* <dd>4</dd> */}
            <dd className='tick-box'></dd>
          </dl>
          <dl className='active select'>
            <dt>Certifications And Skills</dt>
            {/* <dd>5</dd> */}
						<dd className='tick-box'></dd>
          </dl>
          <dl id="ConfirmElement" className='active select'>
            <dt >Confirm</dt>
            <dd>6</dd>
          </dl>
        </div>
      </div>
			<div className='process-container CandidateConfirm'>
      
				<form onSubmit={handleSubmit}>
          <div className='form-box mt-0'>
            <p className='d-ib v-middle fz-24 fw-m'>Is Your Profile /CV Ready? </p>
            <p className='d-ib v-middle radio-field custom-radio fz-20 v-middle'> Yes
              <input type='radio' onChange={()=>setCvReady(true)} name='profile'/>
              <span className='checkmark'></span>
            </p>
            <p className='d-ib v-middle radio-field custom-radio fz-20 v-middle'> No
              <input type='radio' onChange={()=>setCvReady(false)} name='profile'/>
              <span className='checkmark'></span>
            </p>
          </div>
          <div className="btn-wrap flex space-between">
            <a className="btn maroon-border-btn" onClick={handleBack}>Back</a>
            <input type="submit" className={`btn maroon-btn maroon-btn-arrow ${ CvReady === undefined ? 'disabled' : ''}`} value={btnText} />
          </div>
				</form>
			</div>
			<Jobfooter />
        </>
      }
		</>
	)
}
export default AuthorizeCandidate(CandidateConfirm)