import React, { useState } from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import CandidateJobProcess from './CandidateJobProcess';
import { useRouter } from 'next/router';
import AuthorizeCandidate from '../../job/AuthorizeCandidate/AuthorizeCan';
import secureLocalStorage from 'react-secure-storage';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from "axios";
import { CandidateJobPortalApiBaseURL } from '../../constants/urlConstants';


const CandidateUploadCv = () => {
	let Token = secureLocalStorage.getItem('CandidateToken');


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
	let CandidateID = secureLocalStorage.getItem('Candidate');

	let {push} = useRouter();

	const [isButtonDisabled, setButtonDisabled] = useState(false);
	const [btnText, setBtnText] = useState('Save and Next')

	let [file,setfile] = useState({});
	let [error,setError] = useState("");


	useEffect(()=>{
		getPreviousData();
	},[])


	const [previousCv,setpreviousCv] = useState('');
	const getPreviousData = async() =>{
		try{
			let res = await axios.get(`${CandidateJobPortalApiBaseURL}/${CandidateID}`,{
				headers: {
				   'Authorization': `Bearer ${Token}`
			  }
			  });
			if(res.status===200){
				setpreviousCv(res.data.data.curriculumVitae);
			}
		}catch(err){
			console.log(err);
		}
		
	}

	const handleUploadCv = (e) => {
		const {name,value,files} = e.target;

		const allowedTypes = ["application/pdf"];
		// const allowedTypes = ["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

		let size = files[0] ? Math.round(files[0].size / 1024) : ""
		if (size > 5120) {
		  setError("File size is big, please select a file less than 5mb")
		}else{
			
			if(allowedTypes?.includes(files[0]?.type)){
				setfile(files[0])
				setError("")
				setpreviousCv('');
			}else{
				setError("Supported Formats: pdf, upto 5 MB")
				// setError("Supported Formats: doc, docx, rtf, pdf, upto 5 MB")
			}
			
		}
	}

	

	const handleSubmit = (e) =>{
		e.preventDefault();
		setBtnText('Uploading...')
		UploadCv();
		setButtonDisabled(true);
		
	}


	
	//upload cv function is here
	const UploadCv = async() =>{

		try{
			let response = await axios.patch(`${CandidateJobPortalApiBaseURL}/curriculum-vitae/${CandidateID}`,{file : file},{
				headers : {
					"Content-Type" : "multipart/form-data",
					'Authorization': `Bearer ${Token}`
				}
			})
			
			if(response.status===200){
				toast.success('Cv Uploaded successfully!');
				push(`/job/${modeEdit!==null ? 'CandidateDashboard' : 'CandidateBasicInfo'}`)
				setBtnText('Uploaded Successfully')
			}
		}catch(error){
			toast.error(error.message)
			console.log(error);
			setButtonDisabled(false);
			setBtnText('Save and Next')

		}
	}




	//SkipProcess
	const SkipProcess = () =>{
		if(confirm("Want To Skip This Process ?")){
			push('/job/CandidateBasicInfo')
		}
	}




	
	let CVName =  previousCv && previousCv?.split('document/')[1].split('%20').join(' ').split('_')[0].split('%')[0]
	let CVExtension = previousCv && previousCv?.split('.')[5]


	return (
		<>
			<Head>
				<title>Upload Resume - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>
			{/* <Jobheader showData3={true} /> */}

			<a href="#CandidateUploadCVElement" id="TakeToProcess_ELEMENT_SKill">{null}</a>

			{modeEdit===null && <CandidateJobProcess />}
			<div className='process-container'>
				<form action="" onSubmit={handleSubmit}>
					<div className="input_field upload-field">
						{previousCv ? <input type="file" name="" id="" onChange={handleUploadCv} className='w-100' placeholder='Upload Resume' /> : <input type="file" required name="" id="" onChange={handleUploadCv} className='w-100' placeholder='Upload Resume' />}
						<span>{file.name ? file.name : previousCv ? CVName.includes('.') ? CVName : CVName+"."+CVExtension : 'Upload Resume'}</span>
					</div>
					{/* <p>{file.name ? file.name : previousCv}</p> */}
					<p className='danger' id='errorDanger'>{error}</p>
					<div className='btn-wrap text-right'>
						{previousCv ? <a className={`btn maroon-btn maroon-btn-arrow ${isButtonDisabled ? 'disabled' : ''}`} onClick={()=>push('/job/CandidateBasicInfo')}>Save and Next</a>  : <input type='submit' className={`btn maroon-btn maroon-btn-arrow ${isButtonDisabled ? 'disabled' : ''}`} value={btnText} /> }
					</div>
					{/* {
						modeEdit===null && 
					<div className='btn-wrap text-right'>
						<input type='button' onClick={SkipProcess} className="btn maroon-btn maroon-btn-arrow" value="Skip" />
			     	</div>
					} */}
				</form>
				
			</div>
			<Jobfooter />
		</>
	)
}
export default AuthorizeCandidate(CandidateUploadCv)