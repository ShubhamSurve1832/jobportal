import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { differenceInDays, differenceInHours } from "date-fns";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-hot-toast";
import axios from "axios";
import { JobSearchBaseURL } from "../constants/urlConstants";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "next/navigation";

const JobListing = ({ jobData , SearchJobsOnPage ,SearchJobExpOnPage,SearchJobLocOnPage, searchByDatePosted , searchByJobType ,SearchByPayrange}) => {

  let [n, setn] = useState(1);
  // console.log("jobData",n)
  let { push , query , isReady } = useRouter();



  let [Skills,setSkills] = useState('');
  let [Experience,setExperience] = useState('');
  let [Location,setLocation] = useState('');
  let [jobType,setjsobType] = useState('');
  
  useEffect(()=>{
    if(isReady){
      let querySearch = query?.search ? query?.search.split(' ') : ''
      let querySearchJobType = query?.jobType ? query?.jobType?.split(' ')[0] : ''
      setSkills(query?.search ? querySearch[0] : '')
      setExperience(query?.search ? querySearch[1] : '')
      setLocation(query?.search ? querySearch[2] : '')
      setjsobType(query?.jobType ? querySearchJobType : '')
    }
  },[query.search , isReady])



  let [paginationCount, setPaginationCount] = useState(1);
  // console.log("n",n)
  

  useEffect(() => {
    let len = jobData?.length;
    setn(1)
    setPaginationCount(Math.ceil(len / 10));

    secureLocalStorage.removeItem('JobVisitFromfromAdmin')
  }, [jobData]);

  const Prev = () => {
    if (n > 1) {
      setn(n - 1);
    }
  };

  const Next = () => {
    if (n < paginationCount) {
      setn(n + 1);
    }
  };


  
  const SwitchPage = (e) =>{
		setn(parseInt(e.target.value))
	}


  // console.log(jobData);
  return (
    <>
      <section className="section joblisting-section">
        <div className="joblisting-container">
          <div className="search-form">
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
                    defaultValue={Skills}
                    onChange={(e)=>SearchJobsOnPage(e.target.value)}
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
                  <input type="text" defaultValue={Experience} onChange={(e)=>SearchJobExpOnPage(e.target.value)} placeholder="Experience " />
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
                  <input type="text" defaultValue={Location} onChange={(e)=>SearchJobLocOnPage(e.target.value)} placeholder="Location " />
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
                <select name="cars" id="cars"  onChange={(e)=>searchByDatePosted(e.target.value)}>
                  <option value="">Date posted</option>
                  <option value="today">Today</option>                  
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                  <option value="this-year">This Year</option>
                </select>
              </div>
              <div className="dropdown-box">
                <select name="cars" id="cars" onChange={(e)=>searchByJobType(e.target.value)}>
                  <option value="">Work mode</option>
                  <option value="">All jobs</option>
                  <option value="Part Time">Part-time</option>
                  <option value="Full Time">Full-time</option>
                  <option value="Internee">Intern</option>
                </select>
              </div>
              <div className="dropdown-box">
                <select name="cars" id="cars" onChange={(e)=>SearchByPayrange(e.target.value)}>
                  <option value="">Salary estimate</option>
                  <option value="1L">0-1 Lakh</option>
                  <option value="2L">1-2 Lakh</option>
                  <option value="3L">2-3 Lakh</option>
                  <option value="4L">3-4 Lakh</option>
                  <option value="5L">4-5 Lakh</option>
                  <option value="6L">5-6 Lakh</option>
                  <option value="7L">6-7 Lakh</option>
                  <option value="8L">7-8 Lakh</option>
                  <option value="9L">8-9 Lakh</option>
                  <option value="10L">9-10 Lakh</option>
                  <option value="saab">More Than 10 Lakhs</option>
                </select>
              </div>
              {/* <div className="dropdown-box">
                <select name="cars" id="cars">
                  <option value="volvo">Company Type</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div> */}
            </div>
          </div>

          {jobData.length>1 ?
            jobData?.slice(n * 10 - 10, n * 10).map((jobs, index) => {
              let {
                title,
                reportAddress,
                aboutCompany,
                yearOfExperience,
                jobType,
                createdAt,
                _id,
                payRange,
                approveAdmin,
                companyLogo,
                companyName,
                company,
                status
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
  
                      <div className="flex space-between">
                      <span className="simandhar-logo">
                        <img
                          loading="lazy"
                          src={companyLogo ? companyLogo : company?.logo ? company?.logo : "/img/simandhar_detail-icon.jpg"}
                          fill={true}
                          sizes="100vw"
                          className="resp-img mobile "
                          alt="img"
                        />
                      </span>
                      {/* <p>Status : {status}</p> */}
                      </div>
                    </Link>
                  </div>
                );
              }
            }) : <center><p  style={{fontSize:"30px"}}>No Jobs Found</p></center>
          }



          {
				paginationCount > 1
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
    </>
  );
};

export default JobListing;
