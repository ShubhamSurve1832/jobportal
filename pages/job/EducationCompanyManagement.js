import React from 'react'
import Head from "next/head";
import Image from 'next/image';
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { IoIosPeople } from 'react-icons/io';
import { FcFactory } from 'react-icons/fc';
import { HiLocationMarker } from 'react-icons/hi';
import { GiFactory } from 'react-icons/gi';
import Jobportalaside from '../../components/Jobportalaside'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Spinner from '../../components/comman/Spinner'
import { BiMessageAltAdd } from 'react-icons/bi';
import AuthorizeSim from './AuthorizeSimandharAdmin/AuthorizeSim';
import secureLocalStorage from 'react-secure-storage';
import { CSVLink } from "react-csv"
import {CompanyBaseURL} from '../../constants/urlConstants'





const EducationCompanyManagement = () => {
  let Role = secureLocalStorage.getItem("ROLE")
  let Token = secureLocalStorage.getItem('SIMTK');
  // Spinner
  const [show, setShow] = useState(false)
  const [allData, setAllData] = useState([]);
  const [Company, setCompany] = useState([]);
  const [searchVal, setsearchVal] = useState('');
  const [locationVal, setLocationVal] = useState('');
  const [industryVal, setIndustryVal] = useState('');
  const [sortingval,setsortingval] = useState('')
  let [Count, setCount] = useState(0);
  //pagination
  const [n, setn] = useState(1);
  let [paginationNumberCount, setpaginationNumberCount] = useState(0);
  const [totalCompany, settotalCompany] = useState(0);



  console.log(Count)
  // useEffect(()=>{
  //   fetchAllData()
  // },[])

  // const fetchAllData = async ()=>{
  //   try{

  //     let res = await axios.get(`https://devjobapi.simandhareducation.com/api/v1/company/datatable?page=${n}&limit=${totalCount}&search=${searchVal}&sort=${sortingval ? sortingval : 'createdAt'}:desc`)
      
  //     setAllData(res?.data?.data?.records)
  //   } catch{

  //   }
  // }

  useEffect(() => {
    // console.log("location",locationVal)
      fetchJobs(`${CompanyBaseURL}datatable?name=${searchVal}&location=${locationVal}&industry=${industryVal}&sort=${sortingval ? sortingval : 'createdAt'}:desc`);
      if(paginationNumberCount === 1 || paginationNumberCount < n){
        setn(1)
      } 
      scrollToTop()
  }, [searchVal,locationVal,industryVal, n,paginationNumberCount , sortingval]);


  const fetchJobs = async (url) => {
    try {
      let response = await axios.get(url,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      });
      if (response.status === 200) {
        setCompany(response?.data?.data?.records);
        setCount(response?.data?.data?.records?.length)
        setShow(true)
        let len = response?.data?.data?.records?.length
        setpaginationNumberCount(Math.ceil(len / 10));

        settotalCompany(response.data.data.totalCount)
      }
    } catch (err) {
      // toast.error(err.message);
      console.log(err);
    }
  }




  const handleChange = (e) => {
    setsearchVal(e.target.value)
    setn(1)
  }

  const handleLocation = (e) => {
    setLocationVal(e.target.value)
    setn(1)
  }

  const handleIndustry = (e) => {
    setIndustryVal(e.target.value)
    setn(1)
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  const Prev = () => {
    if (n > 1) {
      setShow(false)
      setn(n - 1);
    }
  };

  const Next = () => {
    if (n < paginationNumberCount) {
      setShow(false)
      setn(n + 1);
    }
  };



  const SwitchPage = (e) =>{
		setn(parseInt(e.target.value))
	}
// console.log(Company)
   //  DOWNLOAD CSV FILE OF ALL USERS
   let headers = [
     { label: "Company Name", key: "name" },
		{ label: " Id", key: " _id" },
		{ label: "City", key: "location" },
		{ label: "Industry", key: "industry" },
		{ label: "Size", key: "size" }
	  ]
  return (
    <>
      <Head>
        <title>Company Management - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      {/* <Jobheader showData3={false} /> */}
      <div className="jp-admin-wrapper">
        <Jobportalaside />

        <section className="jobportal-right-section">
          
            <Link href='/job/AddCompanyProfile' className="BiMessageAltAdd" style={{display : "flex",justifyContent:"center" , alignItems : "center" , gap: "5px", fontSize : "18px" , background : "#760B28",color : "#fff",width:"200px" , padding : "10px",borderRadius : "2px",marginBottom :"20px" , cursor : "pointer"}}>
              <BiMessageAltAdd />{" "}
              <div>Add Company</div>
            </Link>
         
          <h3>Company Management</h3>
        
          <div className="search-filter-box grid-4 mb-2">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search Company Name"
                onChange={handleChange}
              />
              <i>
                <img src="/img/job_portal/search_icon.svg" />
              </i>
            </div>
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search Industry Name"
                onChange={handleIndustry}
              />
              <i style={{fontSize: "2.5rem", bottom:"5px"}}>
              <GiFactory />
              </i>
            </div>
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search Location"
                onChange={handleLocation}
              />
              <i>
                <img src="/img/job_portal/location_icon.svg" />
              </i>
            </div>            
            <div className="select-filter ecm-filter ">
              
              <select className='pointer' onChange={(e)=>setsortingval(e.target.value)}>
                <option>Sort by </option>
                <option value="">All</option>
                {/* <option value="size">Company Size</option> */}
                <option value="location">Location</option>
                <option value="industry">Industry</option>
              </select>
            </div>
          </div>
          {
            Company && Company?.length > 0 ?
          
          <div>
          {
            Role && (Role === "admin") ? 
            <CSVLink className="downloadbtn cms-btn edit-box add-btn mb-0" filename="Company-Management.csv" data={Company} headers={headers}>  Export to CSV </CSVLink> : ""
          }
          </div> : ""
          }
          <div className="result-section">
            <p className="result-title">
              Showing <span>{Count ? Count : "0"}</span> companies
            </p>
            <div className="result-container relative">
              {show ? (
                <>
                  {Company ?
                    Company?.slice(n * 10 - 10, n * 10).map((data, ind) => {
                      const { name, logo, size, industry, location, _id } =
                        data;
                      return (
                        <Link
                          href={`/job/company/${_id}`}
                          className="result-box"
                          onClick={()=>{
                            secureLocalStorage.setItem("fromAdmin" , true)
                          }}
                        >
                          <div className="co-logo">
                            <img src={logo ? logo :"/img/company_icon.png"} />
                          </div>
                          <div className="co-info">
                            <h2>{name}</h2>
                            <div className="data-box">
                              {/* <p><i><AiFillStar /></i> <span>4.7 / 5</span></p> */}
                             
                              <p>
                                <i>
                                  <IoIosPeople />
                                </i>{" "}
                                <span>1-{size}</span>
                              </p>
                              <p>
                                <i>
                                  <GiFactory />
                                </i>{" "}
                                <span>{industry.slice(0,25)+"..."}</span>
                              </p>
                              <p style={{ gridColumn: "1/4"}}>
                                <i>
                                  <HiLocationMarker />
                                </i>{" "}
                                <span>{location.slice(0,25)+"..."}</span>
                              </p>
                             
                            </div>
                          </div>
                        </Link>
                      );
                    }) : <p style={{fontSize : "20px" , color : "red" ,margin : "10px" , textAlign : "center"}}>No Result Found</p>
                  }
                </>
              ) : (
                <div className="spinnerDiv">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
{/* {
  paginationNumberCount > 1 &&
          <div className="pagination">
            <button className="btn maroon-border-btn prev-btn" onClick={Prev}>
              Prev
            </button>
            {paginationNumberCount>1 &&
              new Array(paginationNumberCount).fill(0).map((data, ind) => {
                return (
                  <Link
                    href=""
                    className={`${n === ind + 1 && "active"}`}
                    onClick={() => setn(ind + 1)}
                  >
                    {ind + 1}
                  </Link>
                );
              })}
            <button className="btn maroon-border-btn next-btn" onClick={Next}>
              Next{" "}
            </button>
          </div>
          } */}

{
		Company?.length >= 1 &&		paginationNumberCount > 1
				&&
				<div className="input_field" style={{display : 'flex',justifyContent : "center",alignItems : "center",gap : "10px" , margin : "20px auto"}}>
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
                    paginationNumberCount>1 && new Array(paginationNumberCount)?.fill(0)?.map((data,ind)=>{
                      return(
                        <option value={ind+1}>{ind+1}</option>
                      )
                    })
                  }
                </select>
                {
            n === paginationNumberCount?	<button className="btn disabled-btn" disabled >
            Next
          </button> : 	<button className="btn maroon-border-btn prev-btn" onClick={Next}>
          Next
              </button>
          }
            </div>
			}
        </section>
      </div>
      <Jobfooter />
    </>
  );
}
export default AuthorizeSim(EducationCompanyManagement)