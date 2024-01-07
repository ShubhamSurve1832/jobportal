import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import AuthorizeCandidate from "../../job/AuthorizeCandidate/AuthorizeCan";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { jobPortalBaseURL } from "../../constants/urlConstants";
import secureLocalStorage from "react-secure-storage";
import { differenceInDays, differenceInHours } from "date-fns";
import { FaAngleLeft } from "react-icons/fa";
import _ from 'lodash'

function AppliedJob() {
  let Token = secureLocalStorage.getItem('CandidateToken');
  let CandidateId = secureLocalStorage.getItem('Candidate');
  useEffect(()=>{
    getAllSavedJobs();
  },[])



  let [allAppliedJobs,setallAppliedJobs] = useState([]);
  let[interviewStatus,setInterviewStatus] = useState([])
  // console.log("allAppliedJobs",allAppliedJobs)
  // console.log("allAppliedJobs",interviewStatus)

  //getAllSavedJobs
  const getAllSavedJobs = async() =>{
    try{
      let response = await axios.get(`${jobPortalBaseURL}apply/user-data/${CandidateId}`,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      })
      // console.log("res",response.data)
      if(response.status===200){
        let Data = response.data.data.map((data,ind)=>{
          return {...data.company,...data.job,...data.interview};
         })
        //  console.log("Data",Data)
         setallAppliedJobs([...Data.reverse()])

         let InterviewData = response.data.data.map((data,ind)=>{
          return {...data.interview};
         })
        //  console.log("InterviewData",InterviewData)
         setInterviewStatus([...InterviewData.reverse()])

        //  setInterviewStatus(response.data.data)
      }

    }catch(error){
      toast.error(error.message);
      console.log(error)
    }
  }


  return (
    <>
      <Head>
        <title>Applied Jobs - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>

      </Head>
      {/* <Jobheader showData3={false} /> */}

      

      <section className="section joblisting-section">
      <div className="container-m">
        <Link
            href={"/job/search"}
            className="btn maroon-btn maroon-btn-arrow d-iflex" style={{ backgroundImage: "none", paddingRight:"4rem" }}
          >
            <FaAngleLeft />
            Back To Job Search
          </Link>
        </div>
      <h3 className='heading03 theme-color text-center mt-4'>Your Applied Jobs</h3><br /><br /><br />
       
        <div className="joblisting-container">

          {allAppliedJobs ?
            allAppliedJobs.map((jobs, index) => {
              let {
                title,
                reportAddress,
                yearOfExperience,
                jobType,
                createdAt,
                _id,
                payRange,
                approveAdmin,
                name,
                logo,
                aboutCompany
              } = jobs;
              let Hours = differenceInHours(Date.now(), new Date(createdAt));

           let length = interviewStatus[index][0]
          //  console.log(length)
                return (
                  <div key={index}>
                    <Link
                      href={jobs[0]?._id ? `/job/interviewDetails/${jobs[0]?._id}` :""}
                      style={{ cursor: jobs[0]?._id ?"pointer":"initial" }}
                      className="jl-detail-row"
                    >
                      <div className="jl-box">
                        <h3>{title}</h3>
                        <h4>{name}</h4>
                        <div className="jl-icons-row">
                          <div className="jlyear-box">
                            <span>
                              <Image
                                loading="lazy"
                                src="/img/years.png"
                                fill={true}
                                sizes="100vw"
                                className="resp-img mobile "
                                alt="img"
                              />
                            </span>
                            <p>{yearOfExperience}+ years</p>
                          </div>
                          <div className="jlyear-box">
                            <span>
                              <Image
                                loading="lazy"
                                src="/img/location.png"
                                fill={true}
                                sizes="100vw"
                                className="resp-img mobile "
                                alt="img"
                              />
                            </span>
                            <p>{reportAddress}</p>
                          </div>
                          <div className="jlyear-box">
                            <span>
                              <Image
                                loading="lazy"
                                src="/img/calender.png"
                                fill={true}
                                sizes="100vw"
                                className="resp-img mobile "
                                alt="img"
                              />
                            </span>
                            <p>Immediate joiner</p>
                          </div>
                        </div>
                        <div className="jl-icons-row">
                          <div className="jlyear-box">
                            <span>
                              <Image
                                loading="lazy"
                                src="/img/ruppes.png"
                                fill={true}
                                sizes="100vw"
                                className="resp-img mobile "
                                alt="img"
                              />
                            </span>
                            <p>{payRange}</p>
                          </div>
                          <div className="jlyear-box">
                            <span>
                              <Image
                                loading="lazy"
                                src="/img/full_time.png"
                                fill={true}
                                sizes="100vw"
                                className="resp-img mobile "
                                alt="img"
                              />
                            </span>
                            <p>{jobType}</p>
                          </div>
                        </div>
                        <div className="jl-icons-row display-block">
                          <div className="jlyear-box">
                            <span>
                              <Image
                                loading="lazy"
                                src="/img/job-desc.png"
                                fill={true}
                                sizes="100vw"
                                className="resp-img mobile "
                                alt="img"
                              />
                            </span>
                            <p>
                            {aboutCompany?.slice(0,65)}...
                            </p>
                          </div>
                        </div>
                        {Hours >= 24 ? (
                          <p className="days">
                            {differenceInDays(Date.now(), new Date(createdAt))}{" "}
                            days ago
                          </p>
                        ) : (
                          <p className="days">{Hours} Hours ago</p>
                        )}
                      </div>
  
                      <div className="flex">
                        
                      <div className="status">
                        <p className="title01">Status :{
                          length ? <span className="green"> Interview scheduled </span>  :  <span className="redColor"> Interview not schedule</span> 
                        }</p>
                        
                        </div>
                      <span className="simandhar-logo">
                        <img
                          loading="lazy"
                          src={logo?logo:"/img/simandhar_detail-icon.jpg"}
                          fill={true}
                          sizes="100vw"
                          className="resp-img mobile "
                          alt="img"
                        />
                      </span>

                        
                      </div>
                    </Link>
                  </div>
                );
              
            }) : <center><p  style={{fontSize:"30px"}}>No Jobs Found</p></center>
          }

        
        </div>
      </section>



      <Jobfooter />
    </>
  )
}

export default AuthorizeCandidate(AppliedJob)