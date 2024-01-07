import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import JobListingComponent from "../../job/JobListing";
import { JobSearchBaseURL, RecruiterPostJobBaseURL, jobPortalBaseURL } from "../../constants/urlConstants";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const JobListing = () => {
  const [jobsData, setJobsData] = useState([])

  let {replace , push , query , isReady } = useRouter();

  useEffect(() => {
    if(isReady){
      fetchData()
    }
  },[isReady,query])
  

  let fetchData = async () => {
    let querySearch = query?.search ? query?.search.split(' ') : ''
    let SKills = query?.search ? querySearch[0] : ''
    let Experience = query?.search ? parseInt(querySearch[1]) : ''
    let Location = query?.search ? querySearch[2] : ''
    let JobTyp = query?.jobType ? query?.jobType?.split(' ')[0]?.split('-').join(' ') : '';


    let url = query.search ? `${JobSearchBaseURL}${SKills ? SKills : Experience ? Experience : Location ? Location : ''}&jobType=${JobTyp}` : RecruiterPostJobBaseURL
    try{
      let res = await axios.get(url);
      if(res.status===200){
        setJobsData(res?.data.data.records ? res?.data.data.records : res?.data.data)
      }
    }catch(error){
      console.log(error.message)
    }
  }



  let jobtype =''
  let DatePosted = '';
  let PayRange = '';
  

  const handleDatePostedChange = (val) =>{
    DatePosted = val;
    if(val!==''){
      SearchJobsOnLisitingPage('');
    }else{
      fetchData()
    }
  }

  const handleJobTypeChange = (val) =>{
    jobtype = val;
    if(val!==''){
      SearchJobsOnLisitingPage('');
    }else{
      fetchData()
    }
  }


  const handlePayRangeChange = (val) =>{
    PayRange = val;
    if(val!==''){
      SearchJobsOnLisitingPage('');
    }else{
      fetchData()
    }
  }



  let search = '';
  const SearchJobsOnLisitingPage = async(val) =>{
    search=val
        try{
          // let response = await axios.get(`${JobSearchBaseURL}${search}&jobType=${jobtype}&datePosted=${DatePosted}&payRange=${PayRange}`);
          let response = await axios.get(`${JobSearchBaseURL}${search}&jobType=${jobtype}&datePosted=${DatePosted}`);
          if(response.status===200){
            if(response.data.data.records){
              setJobsData([...response?.data.data.records]);
            }else{
              setJobsData([])
            }
          }
        }catch(error){
          console.log(error.message)
          console.log(error);
          setJobsData([])
        }
      
  }


  return (
    <>
      <Head>
        <title>Student Corner - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>

      </Head>
      {/* <Jobheader showData3={false} /> */}
      <JobListingComponent jobData={jobsData} SearchJobsOnPage={SearchJobsOnLisitingPage} searchByDatePosted={handleDatePostedChange} searchByJobType={handleJobTypeChange} SearchByPayrange={handlePayRangeChange} />
      <Jobfooter />
    </>
  );
};

export default JobListing;
