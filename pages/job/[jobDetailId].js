import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { size } from "lodash";
import { useRouter } from "next/router";
import {
  RecruiterPostJobBaseURL,
  jobPortalBaseURL,
  CompanyBaseURL,
  CandidateJobPortalApiBaseURL,
} from "../../constants/urlConstants";
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import JobDetail from "./[jobDetailId]";
import parse from "html-react-parser";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { differenceInDays } from "date-fns";
import Spinner from "../../components/comman/Spinner";

const JobDetails = () => {

  let CandidateId = secureLocalStorage.getItem('Candidate')
  let Token = secureLocalStorage.getItem('CandidateToken');
  let RecruiterToken = secureLocalStorage.getItem('RecruiterToken');
  let SimandharAdminToken = secureLocalStorage.getItem('SIMTK');
  // console.log("CandidateId",CandidateId)


  let JobVisitFromfromAdmin = secureLocalStorage.getItem(
    "JobVisitFromfromAdmin"
  );

  let router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.query.jobDetailId, router.isReady]);

  const [jobsData, setJobsData] = useState({});
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const[show,setShow] = useState(false)
  const [Qualification, setQualification] = useState([]);
  const [AlreadySaved,setAlreadySaved] = useState(false);
  const [AlreadyApplied,setAlreadyApplied] = useState(false);
  const[expiredMsg,setExpiredMsg]= useState(false)


  let fetchData = async () => {
    try {
      let response = await axios.get(`${RecruiterPostJobBaseURL}${router.query.jobDetailId}`,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      }
      );
      // console.log("response",response.data.data)
      setJobsData({ ...response.data.data });
      fetchCompanyDetail(response.data.data.company);
      if(response.status === 200){
        setShow(true)
      }
      
      //check already exist or not saved and applied
      if(CandidateId!==null){
        checkAlreadySavedandApplied();
      }
      
    } catch (err) {
      console.log(err);
      router.push('/404.js')
    }
  };

  let fetchCompanyDetail = async (companyID) => {
    try {
      let response = await axios.get(`${CompanyBaseURL}${companyID}`,{
        headers: {
           'Authorization': `Bearer ${Token ? Token : SimandharAdminToken}`
      }
      });
      // console.log("FetchCompanyRESPONSE",response)
      setCompanyLogo(response.data.data.logo);
      setCompanyName(response?.data?.data?.name);
    } catch (err) {
      console.log(err);
    }
  };

  let {
    aboutCompany,
    createdAt,
    description,
    jobType,
    educationLevel,
    payRange,
    hiringSlot,
    noOfHiring,
    reportAddress,
    schedule,
    startDate,
    deadlineDate,
    title,
    max,
    min,
    yearOfExperience,
    totalAppliedCount,
    isExpired,
    _id,
  } = jobsData;

  // console.log(jobsData)

  let DD = differenceInDays(Date.now(), new Date(createdAt));

  


  //checkAlreadySavedandApplied function is here 
  const checkAlreadySavedandApplied = async() =>{
    let AppliedAndSaved = [
      {
        url : `${jobPortalBaseURL}apply/user-data/${CandidateId}`
      }
      ,{
        url : `${jobPortalBaseURL}favourite/users-data/${CandidateId}`
      }
    ]

    
    AppliedAndSaved.map(async(urls,ind)=>{
      try{
        let response = await axios.get(urls.url ,{
          headers:{
            Authorization:`Bearer ${Token ? Token : SimandharAdminToken }`
          }
        });
        // checkAlreadyApplied()
        let ExtractJobsOnly = response.data.data.map((j,ind)=>{
         
          return {jobId : j.job._id};
        })
        // checkExpired()
        if(ind===0){
          checkAlreadyApplied(ExtractJobsOnly);
        }else if (ind!==0){
          checkAlreadySaved(ExtractJobsOnly);
        }
      }catch(error){
        console.log(error.message)
      }
    })
  }


  //checkAlreadyApplied is here 
  const checkAlreadyApplied = (jobs) =>{
    let currentPageJobId = router.query.jobDetailId;
    // console.log("currentPageJobId",currentPageJobId)
    let allJobsId = jobs.map((data,ind)=>{
      // console.log("data",data)
      return data?.jobId;
    })
    
    if(allJobsId?.includes(currentPageJobId)){
      setAlreadyApplied(true)
    }else{
      setAlreadyApplied(false)
    }
  }


  //checkAlreadySaved is here
  const checkAlreadySaved = (jobs) =>{
    let currentPageJobId = router.query.jobDetailId;
    let allJobsId = jobs.map((data,ind)=>{
      return data?.jobId;
    })
    if(allJobsId?.includes(currentPageJobId)){
      setAlreadySaved(true)
    }else{
      setAlreadySaved(false)
    }
  }


  let date = new Date()
  let deadLineDate = new Date(deadlineDate)
  // let newDate = deadLineDate
  // console.log(date,deadLineDate,newDate) 

  // let checkExpired =()=>{
  //   if(date > deadLineDate ){
  //     // console.log("job expired") 
  //     setAlreadyApplied(true)
  //     setExpiredMsg(true)
  //   }else{
  //     console.log("job not expired")
  //   }
  // }

// let checkQualification =async () =>{
//   try{
//     let res = await axios.get(`https://devjobapi.simandhareducation.com/api/v1/user/qualification/${CandidateId}`)
// if(res.status === 200){
//   // console.log("176 res",res)
//   setQualification(res?.data?.data)
// }



// // else if(jobsData?.educationLevel[1] === Qualification[1][0]){
// //   console.log("second condition")
// // }else if(jobsData?.educationLevel[1] === Qualification[2][0]){
// // console.log("Third condition")
// // }else if(jobsData?.educationLevel[1] === Qualification[3][0]){
// //   console.log("Fourth condition")
// // }else{
// //   console.log("please update quaification")  
// // }

//   } catch(err){
//     console.log(" 177 err",err)
//   }
// }

// CHECKING QUALIFICATION FOR JOB AND CANDIDATE
// let quaification0 = Qualification[0] ? Qualification[0] : "Secondary (10th Pass)"
// let quaification1 = Qualification[1] ? Qualification[1] : "Higher Secondary"
// let quaification2 = Qualification[2] ? Qualification[2] : "Null"
// let quaification3 = Qualification[3] ? Qualification[3] : "Null"
// let quaification4 = Qualification[4] ? Qualification[4] : "D"
// console.log("jobsData?.educationLevel",jobsData?.educationLevel)
// console.log("Qualification",quaification2)
// let checkEduQualification = () =>{
//   if(jobsData?.educationLevel[1]=== quaification0[0] || jobsData?.educationLevel[1]=== quaification1[0] || jobsData?.educationLevel[1]=== quaification2[0] || jobsData?.educationLevel[1]=== quaification3[0] || jobsData?.educationLevel[1]=== quaification4[0]  ){
//     // alert(`Please update ${jobsData?.educationLevel} `)
//     } else{
//         alert(`Please update ${jobsData?.educationLevel} to apply for this job role.`)
//       }
//     }

  // APPLY JOB IS HERE 👇
  const apllyJob = async() => {
    let candidate = secureLocalStorage.getItem("Candidate");
    if (candidate === null) {
      secureLocalStorage.setItem("jobID", _id);
      toast.error("Please Login");
      router.replace("/job/CandidateLogin");
    } else {
      // checkEduQualification()
      let res = await axios.get(CandidateJobPortalApiBaseURL+'/'+candidate,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      });
      if(res.status===200){
        if(res.data.data?.curriculumVitae){
          applyingJob();
        }else{
          toast.error("Please Upload Your Updated Resume Before Applying..!")
        }
      }
    }
  };

  const applyingJob = async () => {
    let data = {
      jobId: _id,
      userId: secureLocalStorage.getItem("Candidate"),
      createdBy: secureLocalStorage.getItem("Candidate"),
      status : 'New Application'
    };
    try {
      let response = await axios.post(jobPortalBaseURL + "apply", data, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${Token}`
        },
      });
      if (response.status === 201) {
        toast.success("Job Applied");
        setAlreadyApplied(true)
      }
    } catch (err) {
      toast.error(err.response.data.message ? err.response.data.message : err.message);
      setAlreadyApplied(true)
    }
  };
  // APPLY JOB IS HERE 👆


  //save job with this function
  const SavedJob = async() =>{
    if(CandidateId!==null){
      let obj = {
        "userId":secureLocalStorage.getItem('Candidate'),
        "jobId":_id,
        "createdBy":secureLocalStorage.getItem('Candidate')
      }
      try{
        let response = await axios.post(`${jobPortalBaseURL}favourite`,obj,{
          headers : {
            "Content-Type" : "application/json",
            'Authorization': `Bearer ${Token}`
          }
        })
        if(response.status===201){
          toast.success("Job Has Been Saved.!");
          setAlreadySaved(true)
        }
      }catch(err){
        toast.error(err.response.data.message ? err.response.data.message : err.message);
        setAlreadySaved(false)
      }
    }else{
      toast.error('Please Login')
      router.replace("/job/CandidateLogin");
      
    }
  }





  //UnSaveJob function is here
  const UnSaveJob = async() =>{
    if(CandidateId!==null){
      let obj = {
          "userId":secureLocalStorage.getItem('Candidate'),
          "jobId":_id,
          "deletedBy":secureLocalStorage.getItem('Candidate')
      }

      try{
        let response = await fetch(`${jobPortalBaseURL}favourite`,{
          method : "DELETE",
          body : JSON.stringify(obj),
          headers : {
            "Content-Type" : "application/json",
            'Authorization': `Bearer ${Token}`
          }
        })

        let data = await response.json()
        if(data.statusCode===200){
          toast.success("Job Removed From Saved Job.!");
            setAlreadySaved(false)
        }
      }catch(err){
        setAlreadySaved(true)
      }
    }else{
      toast.error('Please Login')
      router.replace("/job/CandidateLogin");
      
    }
  }

  return (
    <>
      <Head>
        <title>Job Details - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      {/* <Jobheader showData3={false} /> */}
{
  show ?

      <section className="section job-deatil-section">
        <div className="job-details-container">
          <Link
            href={
              JobVisitFromfromAdmin !== null
                ? "/job/EducationJobs"
                : "/job/search"
            }
            className="btn maroon-btn maroon-btn-arrow d-iflex"
          >
            <FaAngleLeft />
            {JobVisitFromfromAdmin !== null
              ? "Back to Dashboard"
              : " Back to Job Search"}
          </Link>

          <div className="job-deatils-row">
            <div className="jd-left-box">
              <div className="jd-left-firstbox">
                <h3>{title}</h3>
                <h4>{companyName ? companyName : ''}</h4>
              </div>
              <div className="jd-left-secondbox">
                <div className="jd-evalution">
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
                <div className="jd-evalution">
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
                  <p>{payRange? payRange : `${min} To ${max}`} Per Annum</p>
                </div>
                <div className="jd-evalution">
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
                  <p>{reportAddress !=="Null"? reportAddress :"Not report to specific address"}</p>
                </div>
                <div className="jd-evalution">
                  <span>
                    <Image
                      loading="lazy"
                      src="/img/clock_full_time.png"
                      fill={true}
                      sizes="100vw"
                      className="resp-img mobile "
                      alt="img"
                    />
                  </span>
                  <p>{jobType?.split(",").join(', ')}</p>
                </div>
                <div className="jd-evalution">
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
                  <p>{hiringSlot}</p>
                </div>
              </div>
            </div>
            <div className="jd-right-box">
              <div className="jd-inner-right">
                <div className="simandhar-logo">
                  <img
                    loading="lazy"
                    src={
                      companyLogo
                        ? companyLogo
                        : "/img/simandhar_detail-icon.jpg"
                    }
                    fill={true}
                    sizes="100vw"
                    className="resp-img mobile "
                    alt="img"
                  />
                </div>
                {/* <div className="btn"> */}
                {
                  !RecruiterToken && !SimandharAdminToken && 
               

                <div className="heart-flex">
                  
                  {
                      AlreadySaved &&!isExpired 
                      ?
                      <AiFillHeart onClick={UnSaveJob} className="pointer" style={{ fontSize: "5rem", color: 'red' }} />
                      :
                      <> 
                      {!isExpired &&

                        <AiOutlineHeart onClick={SavedJob} className="pointer" style={{ fontSize: "5rem", color: '#ccc' }} />
                      }
                      </>
                    }
                  <a
                    onClick={apllyJob}
                    className={`btn maroon-btn maroon-btn-arrow ${AlreadyApplied || isExpired? 'disabled' :""}`}
                    
                  >
                    {AlreadyApplied ? 'Applied' :isExpired?'Job Expired': "Apply Now"}
                  </a> 
                </div>
 }

                {/* </div> */}
              </div>
            </div>
          </div>
          <div className="jd-opning">
            <p>Posted : {DD} days ago</p>
            <p>Openings : {noOfHiring}</p>
            <p>Job Applicants : {totalAppliedCount}</p>
          </div>
          <div className="job-details-row">
            <div className="inner-job-details">
              <p>Job Role : <span>{title}</span>  </p>
              <p>Experience : <span>{yearOfExperience}+ years</span> </p>
              <p>Job Location : <span> {reportAddress !=="Null"? reportAddress :"Not report to specific address"}</span></p>
              <p>Mode of Work : <span>{jobType?.split(",").join(", ")} </span> </p>
              <p>Eligibility Criteria : <span>{educationLevel}</span> </p>
              <p>
                {" "}
                Description :</p><p className="mt-2">{description && parse(description)}</p>
              

            
            </div>
            <div className="jd-aboutcompaney">
              <p>About Company</p>

              <p>{aboutCompany}</p>
            </div>
            {
              !RecruiterToken && !SimandharAdminToken &&
            <a onClick={apllyJob} className={`btn maroon-btn maroon-btn-arrow ${AlreadyApplied || isExpired? 'disabled' :""}`} >
               {AlreadyApplied ? 'Applied' :isExpired?'Job Expired': "Apply Now"}
            </a>
            }
          </div>
        </div>
      </section> :
      <div>
        <Spinner />
      </ div>
}
      <Jobfooter />
    </>
  );
};

export default JobDetails;
