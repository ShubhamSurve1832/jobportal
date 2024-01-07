import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import Link from "next/link";
import Jobportalaside from "../../components/Jobportalaside";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import axios from "axios";
import Spinner from "../../components/comman/Spinner";
import AuthorizeSim from "./AuthorizeSimandharAdmin/AuthorizeSim";
import {
  RecruiterJobPortalBAseURL,
  jobPortalBaseURL,
} from "../../constants/urlConstants";
import { CSVLink } from "react-csv"
import secureLocalStorage from "react-secure-storage";

const EducationRecruiterManagement = () => {
  let Role = secureLocalStorage.getItem("ROLE")
  let Token = secureLocalStorage.getItem('SIMTK');
  // Spinner
  const [show, setShow] = useState(false);
  const [allData, setAllData] = useState([]);
  const [Recruiter, setRecruiter] = useState([]);
  const [searchVal, setsearchVal] = useState("");
  const [designationVal, setDesignationVal] = useState("");
  const [locationVal, setLocationVal] = useState("");
  const [searchCompanyVal, setsearchCompanyVal] = useState("");
 
  //pagination
  const [n, setn] = useState(1);
  let [paginationCount, setPaginationCount] = useState(1);
  let [paginationNumberCount, setpaginationNumberCount] = useState(0);
  const [totalRecruiter, settotalRecruiter] = useState(0);

  // setpaginationNumberCount(Recruiter?.length)
  // let totalCount =( paginationNumberCount + 3) * 10;
  // useEffect(()=>{
  
  //   fetchAllData()
  //   if(paginationCount === 1){
  //     setn(1)
  //   } 
  // },[Recruiter])

  // const fetchAllData = async ()=>{
  //   try{
  //     let res = await axios.get(`https://devjobapi.simandhareducation.com/api/v1/recruiter/datatable?name=${searchVal}&company=${searchCompanyVal}&designation=${designationVal}&location=${locationVal}&page=${n}&limit=${totalCount}&sort=id:desc&`)
  //     console.log(res.data.data.records)
  //     setAllData(res?.data?.data?.records)

  //   } catch{

  //   }
  // }

  useEffect(() => {
    fetchJobs(
      `${RecruiterJobPortalBAseURL}/datatable?name=${searchVal}&company=${searchCompanyVal}&designation=${designationVal}&location=${locationVal}&sort=id:desc&}`
    );   
    if(paginationCount === 1|| paginationCount < n){
      setn(1)
    } 
    scrollToTop()
  }, [searchVal,searchCompanyVal,designationVal,locationVal, n]);

  const fetchJobs = async (url) => {
    try {
      let response = await axios.get(url,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      });
      if (response.status === 200) {
        setRecruiter(response.data.data.records);
        setShow(true);
        let len = response.data.data.records?.length
        setPaginationCount(Math.ceil(len / 10));
        // console.log(paginationCount)
        // setpaginationNumberCount(Math.ceil(response?.data?.data?.filterCount / 10));
        // settotalRecruiter(response.data.data.totalCount);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeName = (e) => {
    setsearchVal(e.target.value);
    setn(1)
  };
  
  const handleChangeCompany = (e) => {
    setsearchCompanyVal(e.target.value);  
    setn(1)  // fetchJobs(
    //   `https://devjobapi.simandhareducation.com/api/v1/recruiter/datatable?page=${n}&limit=10&sort=id:desc&search=companyName:${searchCompanyVal}`
    // ); 
  };

  const handleChangeDesignation = (e) => {
    setDesignationVal(e.target.value);
    setn(1)
  };
  
  const handleChangeLocation = (e) => {
    setLocationVal(e.target.value);
    setn(1)
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const Prev = () => {
    if (n > 1) {
      setShow(false);
      setn(n - 1);
    }
  };

  const Next = () => {
    if (n < paginationCount) {
      setShow(false);
      setn(n + 1);
    }
  };

  //handleDelete
  const handleDelete = async (id) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${Token}`
      }
    };
    let url = `${RecruiterJobPortalBAseURL}/${id}`;
    if (confirm("Data Will Be Permanently Deleted.")) {
      toast.loading("Wait..");
      try {
        let response = await axios.delete(url,{ data: { deleteBy: id }, headers: config.headers }  );

        if (response.status === 200) {
          toast.dismiss();
          toast.success("Recruiter Deleted Successfully..");
          fetchJobs(
            `${RecruiterJobPortalBAseURL}/datatable?page=${n}&limit=10&sort=id:desc&search=${searchVal}`,{
              headers: {
                 'Authorization': `Bearer ${Token}`
            }
            }
          );
        }
      } catch (err) {
        console.log(err);
      
      }
    }
  };




  const SwitchPage = (e) =>{
		setn(parseInt(e.target.value))
	}
  // console.log(Recruiter)
   //  DOWNLOAD CSV FILE OF ALL USERS
	let headers = [
		{ label: "First Name", key: "firstName" },
		{ label: "Last Name", key: "LastName" },
		{ label: "Email", key: "email" },
		{ label: "Mobile Number", key: "phoneNumber" },
		{ label: "Designation", key: "yourDesignation" },
		{ label: "Experience", key: "experience" },
		{ label: "Company Name", key: "companyName" },
		{ label: "City", key: "location" },
		{ label: "Total JobPost", key: "totalJobPosted" },
		{ label: "Total Applied", key: "totalApplied" }
	  ]
  return (
    <>
      <Head>
        <title>Recruiter Management - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      {/* <Jobheader showData3={false} /> */}
      <div className="jp-admin-wrapper EducationRecruiterManagementpage">
        <Jobportalaside />
        {/* <aside className='jpbportal-menubar'>
          <button className='show-sidemenu'>Side Menu</button>
          <h2>Simandhar Dashboard</h2>
          <button className='close-sidebar'><img src="/img/job_portal/close_sidebar.svg"/></button>
          <nav>
            <Link href="/" ><i><img src="/img/job_portal/jobs_icon.svg"></img></i>Jobs</Link>
            <Link href="/"><i><img src="/img/job_portal/approval_icon.svg"></img></i>Approvals</Link>
            <Link href="/"><i><img src="/img/job_portal/cm_icon.svg"></img></i>Candidate Management</Link>
            <Link href="/" className='active'><i><img src="/img/job_portal/rm_icon.svg"></img></i>Recruiter Management</Link>
            <Link href="/"><i><img src="/img/job_portal/com_icon.svg"></img></i>Company Management</Link>
          </nav>
        </aside> */}
        <section className="jobportal-right-section">
          <h3>Recruiter Management</h3>
          <div className="search-filter-box mb-4 grid-4">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Enter Full Name"
                onChange={handleChangeName}
              />
              <i>
                <img src="/img/job_portal/search_icon.svg" />
              </i>
            </div>
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search Company Name"
                onChange={handleChangeCompany}
              />
              <i>
                <img src="/img/job_portal/search_icon.svg" />
              </i>
            </div>
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search Designation"
                onChange={handleChangeDesignation}
              />
              <i>
                <img src="/img/job_portal/search_icon.svg" />
              </i>
            </div>
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search Location"
                onChange={handleChangeLocation}
              />
              <i>
                <img src="/img/job_portal/location_icon.svg" />
              </i>
            </div>
          </div>

            { Recruiter && Recruiter.length > 0 ?
            <div>              
            {
              Role && (Role === "admin") ? 
              <CSVLink className="downloadbtn cms-btn edit-box add-btn mb-4" filename="Recruiter-Management.csv" data={Recruiter} headers={headers}>  Export to CSV </CSVLink> : ""
            }
            </div> : ""
            }
              <div className="education-list custom-scrollbar">
            <table
              cellPadding="0"
              cellSpacing="0"
              className="jp-table em-table"
            >
              <thead>
                <tr>
                  <th>
                    <p>First Name</p>
                  </th>
                  <th>
                    <p>Last Name</p>
                  </th>
                  <th>
                    <p>Email Id</p>
                  </th>
                  <th>
                    <p>Phone No.</p>
                  </th>
                  <th>
                    <p>Designation</p>
                  </th>
                  <th>
                    <p>Company</p>
                  </th>
                  <th>
                    <p>Location</p>
                  </th>
                  <th>
                    <p>Job Posted</p>
                  </th>
                  <th>
                    <p>Applicants</p>
                  </th>
                  {
                    Role && (Role === "admin") ?<th>
                    <p>Delete</p>
                  </th> : ""
                  }
                  
                </tr>
              </thead>
              <tbody className="relative">
                {show ? (
                  <>
                    {Recruiter?.length>= 1 ? (
                      Recruiter?.slice(n * 10 - 10, n * 10).map((data, ind) => {
                        const {
                          firstName,
                          LastName,
                          email,
                          phoneNumber,
                          _id,
                          yourDesignation,
                          totalJobPosted,
                          location,
                          totalApplied,
                          companyName,
                        } = data;
                        return (
                          <tr>
                            <td>
                              <div className="td-title">
                            <span>{`${(ind + 1) + (10*(n-1)) }`}.</span>
                              <p>{firstName}</p>
                              </div>
                            </td>
                            <td>
                              <p>{LastName}</p>
                            </td>
                            <td>
                              <p>{email}</p>
                            </td>
                            <td>
                              <p>{phoneNumber}</p>
                            </td>
                            <td>
                              <p>{yourDesignation}</p>
                            </td>
                            <td>
                              <p>{companyName}</p>
                            </td>
                            <td>
                              <p>{location}</p>
                            </td>
                            <td>
                              <p>{totalJobPosted}</p>
                            </td>
                            <td>
                              <p>{totalApplied}</p>
                            </td>
                            {
                    Role && (Role === "admin") ?
                            <td>
                              <p onClick={() => handleDelete(_id)}>
                                <a className="btn maroon-btn cm-btn">
                                  <RiDeleteBin6Line />
                                </a>
                              </p>
                            </td> : "" 
                      }
                          </tr>
                        );
                      })
                    ) : (
                      <tr >
                      <td colspan='8'>
                      <p style={{fontSize : "20px" , color : "red" ,margin : "10px" , textAlign : "left"}}>No Result Found</p>

                      </td>
                  </tr>
                    )}
                  </>
                ) : (
                  <div className="spinnerDiv">
                    <Spinner />
                  </div>
                )}
              </tbody>
            </table>
          </div>
          {
			Recruiter?.length >1 &&	paginationCount > 1
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
				  style={{width : "100px" , padding : "7px" , textAlign : "center" , fontSize : "15px" , border : "1px solid #760B28",  background : "url('/img/select_dwn_blk_arrow.svg') no-repeat", backgroundPosition: "right 5px top 50%", appearance : "none" , webkitAppearance: "none", height: "37px"}}
                >
                  {
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
export default AuthorizeSim(EducationRecruiterManagement);
