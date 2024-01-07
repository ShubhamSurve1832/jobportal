import React, { useEffect, useState } from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import { TbMathGreater } from 'react-icons/tb';
// import JoditEditor from 'jodit-react';
// import { useState, useRef } from 'react';
import RichTextEditor from '../../job/RichTextEditor'
import { useRouter } from 'next/router';
import AuthorizeCandidate from '../../job/AuthorizeCandidate/AuthorizeCan';
import axios from 'axios';
import { CandidateJobPortalApiBaseURL } from '../../constants/urlConstants';
import { toast } from 'react-hot-toast';
import secureLocalStorage from 'react-secure-storage';



const CandidatePreview = () => {
    let Token = secureLocalStorage.getItem('CandidateToken');
    let CandidateID = secureLocalStorage.getItem('Candidate');

   const {push} = useRouter();

   const [previewData,setPreviewData] = useState({});
    

   useEffect(()=>{
    fetchCandidateAllData();
   },[])



   //fetch all data here
   const fetchCandidateAllData = async() =>{
    try{
        let response = await axios.get(`${CandidateJobPortalApiBaseURL}/${CandidateID}`,{
            headers: {
               'Authorization': `Bearer ${Token}`
          }
          });
        if(response.status===200){
            setPreviewData({...response?.data.data})
        }
    }catch(error){
        toast.error(error.message);
    }
}







  const handleSubmit = (e) =>{
    e.preventDefault();
    toast.success('Profile Updated Successfully..!')
    secureLocalStorage.setItem('mode','edit');
    push('/job/CandidateDashboard')
  }

  const handleBack = () =>{
    push('/job/CandidateConfirm')
  }


    let CVName =  previewData?.curriculumVitae && previewData?.curriculumVitae?.split('document/')[1].split('%20').join(' ').split('_')[0].split('%')[0]
	let CVExtension = previewData?.curriculumVitae && previewData?.curriculumVitae?.split('.')[5]


    let certificate =  previewData?.certificates && previewData?.certificates[previewData?.certificates.length-1]?.file

    let CertificateName =  certificate && certificate?.split('document/')[1].split('%20').join(' ').split('_')[0].split('%')[0]
	let CertificateExtension = certificate && certificate?.split('.')[5]





    return (
        <>
            <Head>
                <title>Preview - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            {/* <Jobheader showData3={true} /> */}
            {/* <CandidateJobProcess /> */}
            <div className="process-row mt-4 PostaJobProvideBasicinfo">
                <h2 className='heading03'><span> Preview </span></h2>
            </div>


            <div className="process-container IncludeDetails Preview">

                <div className="previewCon">
                    <div className="div01">
                        <h3>Upload CV</h3>
                        <div className='previewpara'>
                            {
                                previewData.curriculumVitae
                                ?
                                <p><strong>{CVName?.includes('.') ? CVName : CVName+"."+CVExtension} :</strong> Uploded on {new Date(previewData?.createdAt).toString()?.split(" ")?.slice(0,4)?.join(' ')}</p>
                                :
                                <p><strong>CV Not Added Yet.</strong></p>
                            }
                            
                        </div>
                    </div>
                    <div className="div01 div001 mt-4">
                        <h3>Basic Information</h3>
                        <div className='previewpara'>
                            <p><strong>First Name : </strong>{previewData?.firstName}</p>
                            <p><strong>Last Name : </strong>{previewData?.lastName}</p>
                            <p><strong>Phone Number : </strong>{previewData?.phoneNo}</p>
                            <p><strong>Email Address : </strong>{previewData?.email}</p>
                        </div>
                    </div>

                    <div className="div01 div002">
                        <br /><br /><br /><br />
                        <h3>Location</h3>
                        <div className='previewpara'>
                            <p><strong>Country : </strong>{previewData.addresses && previewData?.addresses[previewData?.addresses?.length-1]?.country?.split('-')[0]}</p>
                            <p><strong>Street Address : </strong>{previewData.addresses &&  previewData?.addresses[previewData?.addresses?.length-1]?.street}</p>
                            <p><strong>City : </strong>{previewData.addresses &&  previewData?.addresses[previewData?.addresses?.length-1]?.city}</p>
                            <p><strong>State : </strong>{previewData.addresses &&  previewData?.addresses[previewData?.addresses?.length-1]?.state?.split('-')[0]}</p>
                            <p><strong>Pincode : </strong>{previewData.addresses && previewData?.addresses[previewData?.addresses?.length-1]?.postalCode}</p>
                        </div>
                    </div>
                    <div className="div01 mt-4">
                        <h3>Education</h3>
                        {
                            previewData?.education?.length > 0 ? previewData.education.map((data,ind)=>{
                                return(
                                    <div className='previewpara'>
                                        <p><strong>{ind+1 + ')'}  Level of Education : </strong>{data.level}</p>
                                        {data?.fieldStudy && <p><strong>Field of Study : </strong>{data.fieldStudy}</p>}
                                       {data.board && <p><strong>Board : </strong>{data.board}</p>}
                                        <p><strong>School Name : </strong>{data?.instituteName}</p>
                                        {data?.course && <p><strong>Course : </strong>{data?.course}</p>}
                                        {data?.courseType && <p><strong>Course Type : </strong>{data?.courseType}</p>}
                                        {data?.courseSpecialization && <p><strong>Course Specialization : </strong>{data?.courseSpecialization}</p>}
                                        {data?.certificate && <p><strong>Certificate : </strong>{data?.certificate?.split('document/')[1]?.split('%20').join('-')}</p>}

                                        <p><strong>Passing Year : </strong>{data.passingYear}</p>
                                        {/* <p>May 2020 To April 2022</p> */}<br/><br /><br /><br />
                                    </div>
                                )
                            }) : <p><strong>Education Not Added Yet.</strong></p>
                        }
                        
                    </div>
                    <div className="div01 mt-4">
                        <h3>Work Experience</h3>
                       {
                        previewData?.experiences?.length > 0  ? previewData.experiences.map((data,ind)=>{
                            return(
                            <div className='previewpara'>
                                <p><strong>{ind+1 + ')'} Job Title : </strong>{data?.jobTitle}</p>
                                <p><strong>Company Name : </strong>{data?.companyName}</p>
                                {/* <p><strong>Offer any supplemental pay :</strong> Performance bonus, Commission pay</p> */}
                                <p><strong>Time Period : </strong>{data.currentlyWorking ? `From ${data.fromYear} -  Present` : `From ${data.fromYear} To ${data.toYear}`}</p>
                                <p><strong>Job Description :</strong></p>
                                <p>{data.description}</p>
                                <br/><br /><br /><br />
                            </div>
                            )
                        }) : <p><strong>Work Experience Not Added Yet.</strong></p>
                       }
                        
                    </div>
                    <div className="div01 mt-4">
                        <h3>Certifications and Skills</h3>
                        <div className='previewpara'>
                            {
                                previewData?.skillSets
                                ?
                                <p><strong>What are Your Skill : </strong>{previewData.skillSets && previewData?.skillSets?.split(",").join(", ")}</p>
                                :
                                <p><strong>What are Your Skill : </strong>Skills Not Added Yet.</p>
                            }
                            {
                                previewData?.certificates?.length > 0
                                ?
                                <p><strong>Certification : </strong>{CertificateName?.includes('.') ? CertificateName : CertificateName+"."+CertificateExtension}</p>
                                :
                                <p><strong>Certification : </strong>Certificate is Not Added Yet.</p>
                            }
                        </div>
                    </div>
                </div>


                <div className="div03 mt-4">
                    <div className="jobtitlebtn mt-4">
                        <a class="btn maroon-border-btn  mt-4" onClick={handleBack}>Back</a>
                        <a class="btn maroon-btn maroon-btn-arrow mt-4" onClick={handleSubmit}>Confirm</a>
                    </div>
                </div>
            </div>
            <Jobfooter />
        </>
    )
}
export default AuthorizeCandidate(CandidatePreview)