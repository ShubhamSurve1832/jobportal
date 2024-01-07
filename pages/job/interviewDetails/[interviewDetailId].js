import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { size } from "lodash";
import { useRouter } from "next/router";
import {
  InterviewJobPortalBaseURL,
  jobPortalBaseURL,
  RecruiterPostJobBaseURL,
  CompanyBaseURL,
  CandidateJobPortalApiBaseURL,
} from "../../../constants/urlConstants";
import Head from "next/head";
import Jobfooter from "../JobFooter";
// import Jobheader from "../JobHeader";
// import JobDetail from "./[interviewDetailId]";
import parse from "html-react-parser";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { differenceInDays } from "date-fns";
import Spinner from "../../../components/comman/Spinner";
import AuthorizeCandidate from "../../../job/AuthorizeCandidate/AuthorizeCan";

const interviewDetailId = () => {
  let Token = secureLocalStorage.getItem('CandidateToken');
  let SimandharAdminToken = secureLocalStorage.getItem('SIMTK');


  let router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.query.interviewDetailId, router.isReady]);


  const [InterviewData, setInterviewData] = useState({});
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const[show,setShow] = useState(false)


  let fetchData = async () => {
    try {
      let response = await axios.get(`${InterviewJobPortalBaseURL}${router.query.interviewDetailId}`,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      }
      );
      setInterviewData({ ...response.data.data });
      fetchJobDetail(response.data.data.job)
      if(response.status === 200){
        setShow(true)
      }
      
    } catch (err) {
      console.log(err);
      router.push('/404.js')
    }
  };

  let fetchJobDetail = async (jobID) => {
    try {
      let response = await axios.get(`${RecruiterPostJobBaseURL}${jobID}`,{
        headers: {
           'Authorization': `Bearer ${Token ? Token : SimandharAdminToken}`
      }
      });
      fetchCompanyDetail(response?.data?.data?.company)
      setJobTitle(response?.data?.data?.title);
     
    } catch (err) {
      console.log(err);
    }
  };

  let fetchCompanyDetail = async (companyID) => {
    try {
      let response = await axios.get(`${CompanyBaseURL}${companyID}`,{
        headers: {
           'Authorization': `Bearer ${Token ? Token : SimandharAdminToken}`
      }
      });
      setCompanyLogo(response?.data?.data?.logo);
      setCompanyName(response?.data?.data?.name);      
    } catch (err) {
      console.log(err);
    }
  };

  let {
  } = InterviewData;


  return (
    <>
      <Head>
        <title>Interview Details - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
{
  show ?

  <section className="section joblisting-section job-interview-section">
     <h3 className='heading03 theme-color text-center mt-4'>Interview Details</h3><br /><br /><br />
  <div className="joblisting-container">
  <div  className="jl-detail-row" style={{gridTemplateColumns:"90% auto"}}>
                   
                      <div className="jl-box">
                        <div className="flex">

                        <h3>{companyName}</h3>
                       
                        </div>
                        {/* <h4>{companyName}</h4> */}
                        <div className="jl-icons-row flex-start" >
                          <div className="jlyear-box">                           
                            <p> <p className="title01"> Candidate Name : </p> {InterviewData?.candidateName}</p>
                          </div>
                          <div className="jlyear-box">                           
                            <p> <p className="title01"> Job Title : </p> {jobTitle}</p>
                          </div>
                          <div className="jlyear-box">                            
                            <p> <p className="title01"> Interview Platform :</p> {InterviewData?.description ?InterviewData?.description:"On Location"}</p>
                          </div>
                          
                         
                        </div>
                        <div className="jl-icons-row flex-start">
                        <div className="jlyear-box">                           
                            <p> <p className="title01"> Interview Date : </p> { new Date(InterviewData?.interviewDate).toDateString()}</p>
                          </div>
                          <div className="jlyear-box">                           
                            <p> <p className="title01"> Interview Mode : </p> {InterviewData?.interviewMode}</p>
                          </div>
                          <div className="jlyear-box">
                          <p> <p className="title01"> Interview Time : </p> {InterviewData?.interviewTime}</p>
                          </div>
                        </div>
                        <div className="jl-icons-row flex-start display-block">
                        <div className="jlyear-box">                           
                        {
                          InterviewData?.interviewLink ? <p> <p className="title01">Interview Link :</p> <a href={InterviewData?.interviewLink} target="_blank">{InterviewData?.interviewLink}</a></p> :<p className="title01"> Interview Address : <p>{InterviewData?.interviewAddress} </p></p>
                        }
                            {/* <p> <p className="title01">{InterviewData?.interviewLink ? "Interview Link :":"Interview Address :"} </p> {InterviewData?.interviewLink ? InterviewData?.interviewLink : InterviewData?.interviewAddress}</p> */}
                          </div>
                        </div>

                        
                      </div>
  
                      <div className="flex">                                             
                      <span className="simandhar-logo">
                        <img
                          loading="lazy"
                          src={companyLogo? companyLogo:"/img/simandhar_detail-icon.jpg"}
                          fill={true}
                          sizes="100vw"
                          className="resp-img mobile "
                          alt="img"
                        />
                      </span>                       
                      </div>                   
                  </div>

                
  </div>
  </section>
  
  :
      <div>
        <Spinner />
      </ div>
}
      <Jobfooter />
    </>
  );
};

export default AuthorizeCandidate(interviewDetailId);
