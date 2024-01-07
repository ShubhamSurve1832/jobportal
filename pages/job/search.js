import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import JobListingComponent from "../../job/JobListing";
import { JobSearchBaseURL, RecruiterPostJobBaseURL, jobPortalBaseURL } from "../../constants/urlConstants";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { FaAngleLeft } from "react-icons/fa";
import Link from "next/link";
import { differenceInDays, differenceInHours } from "date-fns";
import secureLocalStorage from "react-secure-storage";
const JobListing = () => {
  let Role = secureLocalStorage.getItem("ROLE")
  let IsHiringManager = secureLocalStorage.getItem("IsHiringManager")
  let RecruiterID = secureLocalStorage.getItem("RecID")
  let RecCompanyID = secureLocalStorage.getItem("RecCompanyID")
  // console.log("RecCompanyID",RecCompanyID)
  const [show, setShow] = useState(false);
  const [jobs, setjobs] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchVal, setsearchVal] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [payRange, setPayRange] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [n, setn] = useState(1);
  let [paginationCount, setPaginationCount] = useState(1);
  let [paginationNumberCount, setpaginationNumberCount] = useState(0);
  let [status, setStatus] = useState(true);
  const [jobsData, setJobsData] = useState([])
  let {replace , push , query , isReady } = useRouter();
  
  let fetchSearchData = async () => {
    var querySearch = query?.search ? query?.search.split(' ') : ''
    let Skills = query?.search ? querySearch[0] : ''
    let Experience = query?.search ? parseInt(querySearch[1]) : ''
    let Location = query?.search ? querySearch[2] : ''
    let JobTyp = query?.jobType ? query?.jobType?.split(' ')[0]?.split('-').join(' ') : '';

    let skill = `others=${Skills}`
    let experiance = `&experience=${Experience}`
    let location = `&location=${Location}`
    let jobtype = `&jobType=${JobTyp}`

   

    // let url = query.search ? `${JobSearchBaseURL}${Skills ? Skills : Experience ? Experience : Location ? Location : ''}&jobType=${JobTyp}` : RecruiterPostJobBaseURL
    let url =`${JobSearchBaseURL}${Skills? skill : ""}${Experience? experiance : ""}${Location?location:""}${JobTyp?jobtype:""}` 

    try{
      let res = await axios.get(url);
      if(res.status===200){
        setjobs(res?.data.data.records ? res?.data.data.records : res?.data.data)
        let len = res?.data?.data?.records.length
        setPaginationCount(Math.ceil(len / 10));
      }
    }catch(error){
      console.log(error.message)
    }
  }
// console.log("jobs",jobs)
  
// let totalCount =( paginationNumberCount + 3) * 10;
// console.log("Role",Role)
// console.log(totalCount)
// useEffect(()=>{
//   fetchAllData()
// },[])

// const fetchAllData = async ()=>{
//   try{
//     let res = await axios.get(`https://devjobapi.simandhareducation.com/api/v1/job/admin-datatable?title=${searchVal}&recruiter=${recruiterVal}&company=${companyVal}`)
//     // console.log(res.data.data.records)
//     setAllData(res?.data?.data?.records)

//   } catch{

//   }
// }
// console.log("payRange",payRange)

let paymentRange = `&payRange=${payRange}`
let RecCompanyId = `token=${RecCompanyID}&`
// console.log("RecruiterID",RecCompanyId)
  useEffect(() => {
      if(status && !RecruiterID){
        fetchSearchData()
        // console.log("test data 1")
      }else{
        // console.log("test data 2")
        fetchdata(`${JobSearchBaseURL}${RecCompanyID?RecCompanyId:""}others=${searchVal}&experience=${experience}&location=${location}&datePosted=${datePosted}${payRange?"&"+paymentRange:""}&jobType=${jobtype}`);
      }      
      scrollToTop()
    if(paginationCount === 1 || paginationCount < n){
      setn(1)
    } 

  }, [n, searchVal,experience,status,location,datePosted, payRange,jobtype,paginationCount,isReady,query]);
  // useEffect(() => {
  //   if(isReady){
  //     fetchData()
  //   }
  // },[isReady,query])
  let fetchdata = async (url,val) => {
   
    try {
      let res = await axios.get(url);
      if (res.status === 200) {
        setShow(true);
        setjobs(res?.data?.data?.records);
        let len = res?.data?.data?.records.length
        setPaginationCount(Math.ceil(len / 10));
        
      
        
      //   if (val == "true") {
      //     setjobs(() => {
      //       console.log("VALAUE true")
      //       return res?.data?.data?.records.filter((job, ind) => {
      //         return job.approveAdmin === true;
      //       });
      //     });
      //   } else if(val == "false") {
      //     setjobs(() => {
      //       console.log("VALAUE False")
      //       return res?.data?.data?.records.filter((job, ind) => {
      //         return job.approveAdmin === false;
      //       });
      //     });
      //   }
      //   setpaginationNumberCount(Math.ceil(res?.data?.data?.totalCount / 10));
      }
    } catch (err) {
      // toast.error("Job Not Found");
    }
  };

  const Prev = () => {
    // console.log("Prev Button", n)
    if (n > 1) {
      setShow(false);
      setn(n - 1);
    }

  };

  const Next = () => {
    // console.log("Next Button", n)
    if (n < paginationCount) {
      setShow(false);
      setn(n + 1);
    }
  };

  const handleChange = (e) => {
    setsearchVal(e.target.value);
    setStatus(false)
    setn(1)
  };
  const handleExperience = (e) => {
    setExperience(e.target.value);
    setStatus(false)
    setn(1)
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
    setStatus(false)
    setn(1)
  };
  const handleDate = (e) => {
    setDatePosted(e.target.value);// 
    setStatus(false)
    setn(1)
  };
  const handleMode = (e) => {
    setJobtype(e.target.value);// 
    setStatus(false)
    setn(1)
  };
  const handlePayRange = (e) => {
    setPayRange(e.target.value);// 
    setStatus(false)
    setn(1)
  };


  const SwitchPage = (e) =>{
    setn(parseInt(e.target.value))
	}

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  return (
    <>
      <Head>
        <title>Job Search - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>

      </Head>
      {/* <Jobheader showData3={false} /> */}
      <div className="container-m mt-4">
        {
Role==="admin" || IsHiringManager ===1  ?
        
        <Link
            href={`${Role==="admin"? "/job/EducationJobs" : "/job/RecruiterDashboardJobs"}`}
            className="btn maroon-btn maroon-btn-arrow d-iflex" style={{ backgroundImage: "none", paddingRight:"4rem" }}
          >
            <FaAngleLeft />
            Back To Dashboard
          </Link>
:
          <Link
            href={`${Role==="jobPortalAdmin"? "/job/EducationJobs" : "/job/CandidateDashboard"}`}
            className="btn maroon-btn maroon-btn-arrow d-iflex" style={{ backgroundImage: "none", paddingRight:"4rem" }}
          >
            <FaAngleLeft />
            Back To Dashboard
          </Link> }
        </div>

        <section className="section joblisting-section">
        <div className="joblisting-container">
          <div className="search-form search-form-box">
            <form className="form-row" action="">
              <div className="form-filed">
                <div className="serch-img">
                  <Image
                    loading="lazy"
                    src="/img/search.png"
                    fill={true}
                    sizes="100vw"
                    className="resp-img mobile "
                    alt="img"
                  />
                </div>
                <div className="input-filed">
                  <input
                    type="text"
                    // defaultValue={Skills}
                    onChange={handleChange}
                    placeholder="Skills / Designation / Companies "
                  />
                </div>
              </div>
              <div className="form-filed exprience-drop">
                <div className="serch-img">
                  <Image
                    loading="lazy"
                    src="/img/years.png"
                    fill={true}
                    sizes="100vw"
                    className="resp-img mobile "
                    alt="img"
                  />
                </div>
                <div className="input-filed">
                  <input type="text" 
                  // defaultValue={Experience}
                   onChange={handleExperience} 
                   placeholder="Experience " />
                </div>
              </div>
              <div className="form-filed location-filed">
                <div className="serch-img">
                  <Image
                    loading="lazy"
                    src="/img/location.png"
                    fill={true}
                    sizes="100vw"
                    className="resp-img mobile "
                    alt="img"
                  />
                </div>
                <div className="input-filed">
                  <input type="text" 
                  // defaultValue={Location}
                   onChange={handleLocation} placeholder="Location " />
                </div>
              </div>
              <div className="text-center ">
                <a href="#" className=" btn maroon-btn maroon-btn-arrow">
                  Search
                </a>
              </div>
            </form>
            <div className="dropdowm-row mt-35">
              <div className="dropdown-box">
                <select name="cars" id="cars"  onChange={handleDate}>
                  <option value="">Date posted</option>
                  <option value="today">Today</option>                  
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                  <option value="this-year">This Year</option>
                </select>
              </div>
              <div className="dropdown-box">
                <select name="cars" id="cars" onChange={handleMode}>
                  <option value="">Work mode</option>
                  <option value="">All jobs</option>
                  <option value="Part Time">Part-time</option>
                  <option value="Full Time">Full-time</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>
              <div className="dropdown-box">
                <select name="cars" id="cars" onChange={handlePayRange}>
                  <option value="">Salary estimate</option>
                  <option value="Upto 1L">Upto 1L</option>
                  <option value="1L To 2L">1-2 Lakh</option>
                  <option value="2L To 5L">2-5 Lakh</option>
                  <option value="5L To 10L">5-10 Lakh</option>
                  <option value="10L To 15L">10-15 Lakh</option>
                  <option value="15L To 30L">15-30 Lakh</option>
                  <option value="More Than 30L">More Than 30 Lakhs</option>
                </select>
              </div>             
            </div>
          </div>

          {jobs?.length> 0 ?
            jobs?.slice(n * 10 - 10, n * 10).map((jobs, index) => {
              let {
                title,
                reportAddress,
                aboutCompany,
                yearOfExperience,
                jobType,
                createdAt,
                _id,
                payRange,
                max,
                min,
                approveAdmin,
                companyLogo,
                companyName,
                company,
                hiringSlot,
                status,perMonth
              } = jobs;
              let Hours = differenceInHours(Date.now(), new Date(createdAt));

              if(approveAdmin){
                return (
                  <div key={index}>
                    <Link
                      href={`/job/${_id}`}
                      style={{ cursor: "pointer" }}
                      className="jl-detail-row"
                    >
                      <div className="jl-box">
                        <h3>{title}</h3>
                        <h4>{companyName ? companyName : company?.name ? company?.name : '' }</h4>
                        {differenceInDays(Date.now(), new Date(createdAt))<2 && <p style={{color :'#fff',fontWeight : "500" , background :'#760B28' , width : "50px" , textAlign : 'center', borderRadius : "2px" , marginBlock : "10px"}} className='active'>New</p>}
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
                            <p>{reportAddress !=="Null"? reportAddress :"Not report to specific address"}</p>
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
                            <p>{hiringSlot}</p>
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
                            <p>{payRange? payRange : `${min} To ${max}`}</p>
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
  
                      <div className="flex space-between">
                      <span className="simandhar-logo">
                        <img
                          loading="lazy"
                          src={companyLogo ? companyLogo : company?.logo ? company?.logo : "/img/company_icon.png"}
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
              }
            }) : <center><p  style={{fontSize:"30px"}}>No Jobs Found</p></center>
          }



          {
				jobs?.length> 0 && paginationCount > 1
				&&
				<div className="input_field w-50" style={{display : 'flex',justifyContent : "center",alignItems : "center",gap : "10px" , margin : "20px auto"}}>
				   {
            n === 1 ?	<button className="btn disabled-btn" disabled >
            Prev
          </button> : 	<button className="btn maroon-border-btn prev-btn" onClick={Prev}>
                Prev
              </button>
          }
                <select
                  name="state"
                  value={n}
                  onChange={SwitchPage}
                  required
				  style={{width : "100px" , padding : "7px" , textAlign : "center" , fontSize : "15px" , border : "1px solid #760B28"}}
                >
                  {
                    paginationCount>1 && new Array(paginationCount)?.fill(0)?.map((data,ind)=>{
                      return(
                        <option value={ind+1}>{ind+1}</option>
                      )
                    })
                  }
                </select>

                { n === paginationCount?	<button className="btn disabled-btn" disabled >
            Next
          </button> : 	<button className="btn maroon-border-btn prev-btn" onClick={Next}>
          Next
              </button>
          }

            </div>
			}
        </div>
      </section>
      <Jobfooter />
    </>
  );
};

export default JobListing;
