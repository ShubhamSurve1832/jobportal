import React, { useRef } from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import CandidateJobProcess from './CandidateJobProcess';
import { useState } from 'react';
import { useRouter } from 'next/router';
import AuthorizeCandidate from '../../job/AuthorizeCandidate/AuthorizeCan';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { CandidateJobPortalApiBaseURL } from '../../constants/urlConstants';
import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';


const CandidateSkill = () => {

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


  const {push} = useRouter();


  const [isButtonDisabled, setButtonDisabled] = useState(false);
	const [btnText, setBtnText] = useState('Save and Next');

  const [Skills,setSkills] = useState(["Customer service","Organisational skill","Microsoft office","Cashiering"]);

  const [addSkill,setAddSkill] = useState([]);


  let [prevCertificate,setPreCertificate] = useState('');
  useEffect(()=>{
    (async function(){
      let res = await axios.get(CandidateJobPortalApiBaseURL+`/${CandidateID}`,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      });
       if(res.data.data.skillSets){
        let skill = res.data.data.skillSets.split(',');
       setAddSkill([...skill]);
       }

       if(res.data.data.certificates){
         setPreCertificate(res.data.data.certificates[res.data.data.certificates.length-1]?.file);
       }
    })();
  },[])


  // console.log(prevCertificate);

  const handleAddSkill = (data) =>{
     if(!addSkill.includes(data)){
      setAddSkill([...addSkill,data]);
     }else{
      alert("Already Added")
     }
  }

  const handleRemoveSkill = (ind) =>{
    setAddSkill(()=>{
      return addSkill.filter((d,i)=>{
        return i!==ind;
      })
    })


    setSkillError('')
  }


  const [certificate,setCertificate] = useState({});
  const [ErrorMsg,setErrorMsg] = useState("");

  const handleFileChange = (e) =>{
    const {name,value,files} = e.target; 
    
    const allowedTypes = ["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

    let size = files[0] ? Math.round(files[0].size / 1024) : ""
		if (size > 1024) {
		  setErrorMsg("File size is big, please select a file less than 1 mb")
		}else{
      
			if(allowedTypes?.includes(files[0]?.type)){
				setCertificate(files[0])
				setErrorMsg("")
				setPreCertificate('')
			}else{
				setErrorMsg("Supported Formats: doc, docx, rtf, pdf, upto 1 MB")
			}

		} 
  }



  const handleSubmit = (e) =>{
    e.preventDefault();
    setBtnText('Updating...')
    PostSkills();
  }



  console.log("certificate",certificate)
  const PostSkills = () =>{
    let status = [
      {
        "file" : certificate 
      }
      ,
      {
        "skillSets":addSkill.join(','),
        "recommendationSets":Skills.join(','),
        "updatedBy":secureLocalStorage.getItem('Candidate')
      }
    ]
    
    status.map(async(data,ind)=>{
      // console.log("DATA",data)
      toast.dismiss()
      try{
        // console.log("line 144")
        let res = await axios.patch(`${CandidateJobPortalApiBaseURL}/${ind===0 ? !data.file.name.length >0 ?"skill-sets" :"certificate" : "skill-sets"}/${CandidateID}`,data,{
          headers : data.skillSets!==undefined ? {
            "Content-Type" : "application/json",
            'Authorization': `Bearer ${Token}`
          } : {
            "Content-Type" : "multipart/form-data",
            'Authorization': `Bearer ${Token}`
          }
        });

        // console.log("res",res)
  
        if(res.status===200){
          // console.log("line number 155")
          setButtonDisabled(true)
          setTimeout(() => {
            if(data.skillSets!==undefined){
              setBtnText('Added Successfully')
              toast.success(`Data Updated Successfully..!`);
              setTimeout(() => {
                push(`/job/${modeEdit!==null ? 'CandidateDashboard' : 'CandidateConfirm'}`)
              }, 2000);
          }
          }, 3000);
        }
      }catch(error){
        toast.dismiss()
        setTimeout(() => {
          push(`/job/${modeEdit!==null ? 'CandidateDashboard' : 'CandidateConfirm'}`)
        }, 2000);
        // setButtonDisabled(false);
        setBtnText("Save and Next")
      }
      // toast.dismiss()
    })


  }

  const handleBack = () =>{
    push('/job/CandidateWorkExperience')
  }


  let [Skillerror,setSkillError]=useState('');
  let moreskills = useRef('');

  const AddMoreSkills = () =>{

    setSkillError('');

    if(addSkill.length<5){
      if(moreskills.current.value!==''){
        if(!addSkill.includes(moreskills.current.value)){
          if(!moreskills.current.value.includes(',')){
            if(moreskills.current.value.length <= 25 ){
              setAddSkill([...addSkill,moreskills?.current?.value]);
              moreskills.current.value='';
            }else{
              setSkillError('Add Maximum 25 Character At a Time..!')
            }
          }else{
            setSkillError('Add One Skill At a Time..!')
          }
      }else{
              setSkillError('Skill Already Exist.')
            }
      }else{
        setSkillError('Skill is Required')
      }
    }else{
      setSkillError("Max 5 skills can be get added");
    }

  }









  
        //SkipProcess
        const SkipProcess = () =>{
          if(confirm("Want To Skip This Process ?")){
            push('/job/CandidateConfirm')
          }
        }


  let CertificateName =  prevCertificate && prevCertificate?.split('document/')[1].split('%20').join(' ').split('_')[0].split('%')[0]
  let CertificateExtension = prevCertificate && prevCertificate?.split('.')[5]


	return (
		<>
			<Head>
				<title>Add Skills - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>
			{/* <Jobheader showData3={true} /> */}

      <a href="#CandidateSkillelement" id="TakeToProcess_ELEMENT_SKill">{null}</a>

      {
         modeEdit===null && 

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
          <dl id='CandidateSkillelement' className='active'>
            <dt>Certifications and Skills</dt>
            <dd>5</dd>
          </dl>
          <dl>
            <dt>Confirm</dt>
            <dd>6</dd>
          </dl>
        </div>
      </div>
      }
			<div className='process-container'>
        
				<form onSubmit={handleSubmit}>
        <div className='form-box mt-0'>
            <div className="input_field">
              <input type="text" style={{fontSize:"15px"}} name="More SKills" ref={moreskills}  className='w-100' placeholder='Enter Your Skills' />
              <span className='add-skill fw-m pointer' style={{fontSize:"30px"}} onClick={AddMoreSkills}>+</span>
            </div>
            <p className='danger'>{Skillerror}</p>
        </div><br /><br /><br /><br />
          <div className='form-box mt-0  border-bottom pb-20'>
            <h4 className='fz-24 fw-m'>What Are Your Skills? (Max 5)</h4>
            <div className='skil-row'>
              {
                addSkill?.map((data,ind)=>{
                  return(
                    <a style={{display : !data && "none"}} required className='btn maroon-border-btn active' onClick={()=>handleRemoveSkill(ind)}>{data} -</a>
                  )
                })
              }
            </div>
            {/* <button className='add-skill fz-24 fw-m'>+</button> */}
          </div>
          <div className='form-box'>
            <h4 className='fz-24 fw-m'>Recommendation for skills</h4>
            <div className='skil-row'>
              
             {
              Skills.map((data,ind)=>{
                return(
                 <>
                  {addSkill?.includes(data) ? <a className='btn maroon-border-btn' onClick={()=>handleAddSkill(data)}>{data} +</a> : <a className='btn maroon-border-btn active' onClick={()=>handleAddSkill(data)}>{data} +</a>}
                 </>
                )
              })
             }

            </div>
          </div>
          <div className='form-box'>
            <h4 className='fz-24 fw-m'>Certifications? (Optional)</h4>
            <div className="input_field upload-field c-skill-upload">
              <input type="file" name="certificate" onChange={handleFileChange} id="" className='w-100'/>
              <span>Add a Certification</span>
            </div>
            <p>{prevCertificate?.length>0 ? CertificateName.includes('.') ? CertificateName : CertificateName+'.'+CertificateExtension : certificate.name ? certificate.name : ''}</p>
            <p className='danger'>{ErrorMsg}</p>
          </div>
          <div className="btn-wrap flex space-between">
          {
            modeEdit===null &&  
             <a className="btn maroon-border-btn" onClick={handleBack}>
              Back
             </a>
           }
            {prevCertificate && !addSkill ? <a className={`btn maroon-btn maroon-btn-arrow ${isButtonDisabled ? 'disabled' : ''}`} onClick={()=>push('/job/CandidateConfirm')}>Save and Next</a> : <input type="submit" className={`btn maroon-btn maroon-btn-arrow ${isButtonDisabled ? 'disabled' : ''}`} value={btnText} />}
          </div>

          {
						modeEdit===null && 
					<div className='btn-wrap text-right'>
						<input type='button' onClick={SkipProcess} className="btn maroon-btn maroon-btn-arrow" value="Skip" />
			     	</div>
					}
				</form>
			</div>
			<Jobfooter />
		</>
	)
}
export default AuthorizeCandidate(CandidateSkill)