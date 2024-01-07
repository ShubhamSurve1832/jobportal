import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import Jobfooter from "../JobFooter";
import Jobheader from "../JobHeader";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { FcFactory } from "react-icons/fc";
import { HiLocationMarker } from "react-icons/hi";
import { GiFactory } from "react-icons/gi";
import { CompanyBaseURL ,jobPortalBaseURL} from "../../../constants/urlConstants";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-hot-toast";

const CompanyProfileListingpage = () => {
  let Token = secureLocalStorage.getItem('CandidateToken');
  // useEffect(()=>{
  //   secureLocalStorage.removeItem('fromAdmin')
  // },[])

  
 
   // Spinner
   const [show, setShow] = useState(false)

   const [Company, setCompany] = useState([]);
   const [searchVal, setsearchVal] = useState('');
   const [sortingval,setsortingval] = useState('')
   const [industryVal, setIndustryVal] = useState('');
   //pagination
   const [n, setn] = useState(1);
   let [paginationNumberCount, setpaginationNumberCount] = useState(0);
   const [totalCompany, settotalCompany] = useState(0);
   let [paginationCount, setPaginationCount] = useState(1);

  useEffect(() => {
    fetchJobs(`${CompanyBaseURL}datatable?name=${searchVal}&industry=${industryVal}&sort=${sortingval ? sortingval : 'createdAt'}:desc`);
}, [searchVal, n ,industryVal, sortingval]);


const fetchJobs = async (url) => {
  try {
    let response = await axios.get(url,{
      headers: {
          'Authorization': `Bearer ${Token}`
     }
  });
    if (response.status === 200) {
      // console.log("response",response)
      setCompany(response.data.data.records);
      setShow(true)
      setpaginationNumberCount((Math.ceil(response.data.data.totalCount / 10)))
      settotalCompany(response.data.data.totalCount)
      let len = response?.data?.data?.records.length
        setPaginationCount(Math.ceil(len / 10));
    }
  } catch (err) {
    toast.error(err.message);
    console.log(err);
  }
}




const handleChange = (e) => {
  setsearchVal(e.target.value)
  setn(1)
}
const handleIndustry = (e) => {
  setIndustryVal(e.target.value)
  setn(1)
}

const SwitchPage = (e) =>{
  setn(parseInt(e.target.value))
}
const Prev = () => {
  if (n > 1) {
    setShow(false);
    setn(n - 1);
  }
  if(paginationCount === 1){
    setn(1)
  }
};

const Next = () => {
  if (n < paginationCount || setCount) {
    setShow(false);
    setn(n + 1);
  }
  if(paginationCount === 1){
    setn(1)
  }
};


  return (
    <>
      <Head>
        <title>Student Corner - Simandhar Education</title>
      </Head>
      {/* <Jobheader showData3={false} /> */}
      <div className="container">
        <section className="jobportal-right-section CompanyProfileListingpage">
          <h3>Company Profile</h3>
          <div className="search-filter-box grid-2">
            <div className="search-filter">
              <input type="text" placeholder="Search Company Name" onChange={handleChange} />
              <i>
                <img src="/img/job_portal/search_icon.svg" />
              </i>
            </div>
            <div className="search-filter">
              <input type="text" placeholder="Search Industry" onChange={handleIndustry} />
              <i>
                <img src="/img/job_portal/search_icon.svg" />
              </i>
            </div>
          </div>
          <div className="result-section">
            {/* <p className='result-title'>Showing <span>562</span> companies</p> */}
            <div className="result-container">
              {Company ?
                Company?.slice(n * 10 - 10, n * 10).map((data, index) => {
                  console.log("data company",data)
                  let { logo, name, size, industry, location, _id } = data;
                  return (
                    <Link
                      href={`/job/company/${_id}`}
                      className="result-box"
                    >
                      <div className="co-logo">
                        <img src={logo} />
                      </div>
                      <div className="co-info">
                        <h2>{name}</h2>
                        <div className="data-box">
                          {/* <p>
                            <i>
                              <AiFillStar />
                            </i>{" "}
                            <span>4.7 / 5</span>
                          </p> */}
                          <p>
                            <i>
                              <GiFactory />
                            </i>{" "}
                            <span>{industry}</span>
                          </p>
                          <p>
                            <i>
                              <IoIosPeople />
                            </i>{" "}
                            <span>{size}</span>
                          </p>
                          <p style={{gridColumn:"1/3"}}>
                            <i>
                              <HiLocationMarker />
                            </i>{" "}
                            <span>{location}</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                }) : <center><p  style={{fontSize:"30px"}}>No Company Found</p></center>
                }
            </div>
          </div>
          {
		Company?.length > 1 &&		paginationCount > 1
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
                  {paginationCount &&
                    paginationCount>1 && new Array(paginationCount)?.fill(0)?.map((data,ind)=>{
                      return(
                        <option value={ind+1}>{ind+1}</option>
                      )
                    })
                  }
                </select>
                {
            n === paginationCount?	<button className="btn disabled-btn" disabled >
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
};
export default CompanyProfileListingpage;
