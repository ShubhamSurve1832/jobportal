import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import Link from "next/link";
import Jobportalaside from "../../components/Jobportalaside";
import Spinner from "../../components/comman/Spinner";
import {
  RecruiterPostJobBaseURL,
  jobPortalBaseURL,
} from "../../constants/urlConstants";
import AuthorizeSim from "./AuthorizeSimandharAdmin/AuthorizeSim";
import { toast } from "react-hot-toast";
import JobApprovalRow from "./JobApprovalRow";
import { CSVLink } from "react-csv"
import secureLocalStorage from "react-secure-storage";

const EducationApprovals = () => {

  let Role = secureLocalStorage.getItem("ROLE")
  let Token = secureLocalStorage.getItem('SIMTK');
  const [show, setShow] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [jobObject, setJobObject] = useState({});
  const [jobs, setjobs] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchVal, setsearchVal] = useState("");
  const [recruiterVal, setrecruiterVal] = useState("");
  const [companyVal, setcompanyVal] = useState("");
  const [statusVal, setstatusVal] = useState("");
  const [sortingval, setsortingval] = useState("");
  const [n, setn] = useState(1);
  let [paginationCount, setPaginationCount] = useState(1);
  let [paginationNumberCount, setpaginationNumberCount] = useState(0);

  let [status, setStatus] = useState(false);
// let totalCount =( paginationNumberCount + 3) * 10;
// console.log("Jobs",jobs)
// console.log("paginationCount",paginationCount)
// console.log("n",n)
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
// REFRESH PAGE FOR NEW DATA
const router = useRouter()
let handleRefresh = () =>{
    router.reload()
}

  useEffect(() => {
    fetchdata(`${RecruiterPostJobBaseURL}admin-datatable?title=${searchVal}&recruiter=${recruiterVal}&company=${companyVal}&approved=${statusVal ? statusVal : "All"}`,{
      headers: {
         'Authorization': `Bearer ${Token}`
    }
    });
    if(paginationCount === 1 || paginationCount < n){
      setn(1)
    }    
    scrollToTop()
  }, [ searchVal,recruiterVal,companyVal,statusVal, sortingval,n,paginationCount,showLoader]);

  let fetchdata = async (url,val) => {
   
    try {
      let res = await axios.get(url,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      });
      if (res.status === 200) {
        setShow(true);
        setjobs(res?.data?.data?.records);
        let len = res?.data?.data?.records?.length
        // console.log("length",jobs?.length)
        setPaginationCount(Math.ceil(len / 10));
      
      }
    } catch (err) {
      // toast.error(err.message);
      console.log(err)
    }
  };

  const Prev = () => {
    console.log("Prev Button", n)
    if (n > 1) {
      setShow(false);
      setn(n - 1);
    }

  };

  const Next = () => {
    console.log("Next Button", n)
    if (n < paginationCount) {
      setShow(false);
      setn(n + 1);
    }
  };

  const handleChange = (e) => {
    setsearchVal(e.target.value);
  };
  const handleRecruiter = (e) => {
    setrecruiterVal(e.target.value);
  };
  const handleCompany = (e) => {
    setcompanyVal(e.target.value);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  const FilterJobs = (val) => {
    setstatusVal(val);
    setn(1)
//     if (val !== "") {
//       try{
//         fetchdata(
//           `https://devjobapi.simandhareducation.com/api/v1/job/admin-datatable?title=${searchVal}&recruiter=${recruiterVal}&company=${companyVal}`)         
//       } catch (err){
// console.log(err)
//       }        
//     } else {
//       fetchdata(
//         `https://devjobapi.simandhareducation.com/api/v1/job/admin-datatable?title=${searchVal}&recruiter=${recruiterVal}&company=${companyVal}`);
//     }
  };


// HANDLING APPROVE 
  const handleApprove = async (id, CheckNotApprovedButton) => {
    setShowLoader(true)
    if (confirm("Approve Job ?")) {
      try {
        let response = await axios.patch(
          `${RecruiterPostJobBaseURL}approval/${id}`,
          { approveAdmin: true },
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${Token}`
            },
          }
        );
        if (response.status === 200) {
          setShowLoader(false)
          toast.success("Job Approved");
          setStatus(status ? false : true);
          handleRefresh()
          // document.getElementById(CheckNotApprovedButton).checked = false;
        }
      } catch (err) {
        console.log(err.message);

      }
    }
  };

// HANDLING DISAPPROVE 
  const handleDisApprove = async (id, CheckApprovedButton) => {
    setShowLoader(true)
    if (confirm("DisApprove Job ?")) {
      try {
        let response = await axios.patch(
          `${RecruiterPostJobBaseURL}approval/${id}`,
          { approveAdmin: false },
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${Token}`
            },
          }
        );

        if (response.status === 200) {
          toast.success("Job DisApproved");
          setStatus(status ? false : true);
          setShowLoader(false)
          handleRefresh()
          // document.getElementById(CheckApprovedButton).checked = false;
        }
      } catch (err) {
        console.log(err.message);
      }
    } else{
      handleRefresh()
    }
  };

  const SwitchPage = (e) =>{
    setn(parseInt(e.target.value))
	}

  // console.log(jobs)
   //  DOWNLOAD CSV FILE OF ALL USERS
   let headers = [
    { label: "Job Title", key: "title" },
   { label: " Recruiter Name", key: "recruiterName" },
   { label: "Company Name", key: "companyName" },
   { label: "Applications", key: "totalApplied" },
   { label: "Pay Range", key: "payRange" },
   { label: "Report Address", key: "reportAddress" },
   { label: "Job Type", key: "jobType" },
   { label: "Benefits Offer", key: "benefitsOffer" },
   { label: "Created on", key: "createdAt" },
   { label: "Expired on", key: "deadlineDate" },
   { label: "Approve Admin", key: "approveAdmin" },
   { label: "Status", key: "status" }
   ]

  return (
    <>
      <Head>
        <title>Job Approval - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      {/* <Jobheader showData3={false} /> */}
      <div className="jp-admin-wrapper educationapprovalspage">
        <Jobportalaside />
        {/* <aside className='jpbportal-menubar'>
          <button className='show-sidemenu'>Side Menu</button>
          <h2>Simandhar Dashboard</h2>
          <button className='close-sidebar'><img src="/img/job_portal/close_sidebar.svg"/></button>
          <nav>
            <Link href="/"><i><img src="/img/job_portal/jobs_icon.svg"></img></i>Jobs</Link>
            <Link href="/"  className='active'><i><img src="/img/job_portal/approval_icon.svg"></img></i>Approvals</Link>
            <Link href="/"><i><img src="/img/job_portal/cm_icon.svg"></img></i>Candidate Management</Link>
            <Link href="/"><i><img src="/img/job_portal/rm_icon.svg"></img></i>Recruiter Management</Link>
            <Link href="/"><i><img src="/img/job_portal/com_icon.svg"></img></i>Company Management</Link>
          </nav>
        </aside> */}
        <section className="jobportal-right-section ">
          <h3>Approvals</h3>
          <div className="search-filter-box mb-4">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search Job Title"
                onChange={handleChange}
              />
              <i>
                <img src="/img/job_portal/search_icon.svg" />
              </i>
            </div>
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search Recruiter Name"
                onChange={handleRecruiter}
              />
              <i>
                <img src="/img/job_portal/search_icon.svg" />
              </i>
            </div>
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search Company Name"
                onChange={handleCompany}
              />
              <i>
                <img src="/img/job_portal/search_icon.svg" />
              </i>
            </div>
            <div className="select-filter">
              {
                show ? 
                <select className="select-tag pointer" onChange={(e) => FilterJobs(e.target.value)}>
                <option value="All" >Select Status </option>
                <option value="All">All</option>
                <option value="true">Approved</option>
                <option value="false">Not Approved</option>
                {/* <option value='companyName'>Company Name</option> */}
              </select> : ''
              }
            </div>
          </div>

            {
              jobs && jobs.length > 0 ?
            
            <div>              
            {
              Role && (Role === 'admin') ? 
              <CSVLink className="downloadbtn cms-btn edit-box add-btn" filename="Approvals.csv" data={jobs} headers={headers}>  Export to CSV </CSVLink> : ""
            }
            </div> : ''
            }
              <div className="education-list custom-scrollbar">
            <table
              cellPadding="0"
              cellSpacing="0"
              className="jp-table edu-approv-table"
            >
              <thead>
                <tr>
                  <th>
                    <p>Jobs Posted</p>
                  </th>
                  <th>
                    <p>Recruiter Name</p>
                  </th>
                  <th>
                    <p>Company Name</p>
                  </th>
                  <th>
                    <p>Approval</p>
                  </th>
                  <th>
                    <p>Status</p>
                  </th>
                </tr>
              </thead>
              <tbody>
              {
                showLoader ? 
                <div>
                  <Spinner /> 
                </div> 
                :
              
             
                <>
                {jobs?.length>=1 ? (
                      jobs?.slice(n * 10 - 10, n * 10).map((data, index) => {
                    let {
                      title,
                      createdAt,
                      deadlineDate,
                      recruiterName,
                      totalApplied,
                      reportAddress,
                      noOfHiring,
                      status,
                      companyName,
                      approveAdmin,
                      _id,
                    } = data;
                    return (
                      <>                                       
                      
                        <tr key={data._id}>
                          <td>
                            <div className="td-title">
                              <span> {`${(index + 1) + (10*(n-1)) }`}. </span>
                              <h5>
                                {title} 
                              </h5>
                              {/* <i><img src="/img/job_portal/cross_arrow.svg" /></i> */}
                            </div>
                            {/* <p>Candidates with experience and also freshers can apply having share...</p> */}
                          </td>
                          <td>
                            <p>
                              {recruiterName ? recruiterName : "Not Available"}
                            </p>
                          </td>
                          <td>
                            <p>{companyName}</p>
                          </td>
                          <td>                        
                            
                            <>
                            
                            <p
                              className="d-ib radio-field custom-radio fz-20"
                              onClick={() =>
                                handleApprove(_id, `NotApprovedBtn${_id}`)
                              }
                            >
                              {" "}
                              Yes
                              {!approveAdmin ? (
                                <input type="checkbox" id={`ApprovedBtn${_id}`} name="profile" />
                              ) : (
                                <input
                                  id={`ApprovedBtn${_id}`}
                                  type="checkbox"
                                  defaultChecked
                                  name="profile"
                                  
                                />
                              )}
                              <span className="checkmark"></span>
                            </p>
                           
                            <p className="d-ib radio-field custom-radio fz-20" onClick={(e)=>handleDisApprove(_id,`ApprovedBtn${_id}`)}>
                              {" "}
                              No
                              {!approveAdmin ? (
                                <input
                                  type="checkbox"
                                  defaultChecked
                                  id={`NotApprovedBtn${_id}`}
                                  name="profile"
                                  />
                                  ) : (
                                    <input
                                    type="checkbox"
                                    id={`NotApprovedBtn${_id}`}
                                    name="profile"
                                    />
                                    )}
                              <span className="checkmark"></span>
                            </p>
                           
                                    </>
                                    

                          </td>
                            { show ? 
                          <td>

                              {approveAdmin ? (
                                <p>Approved</p>
                                ) : (
                                  <p style={{ color: "red" }}>Not Approved</p>
                                  )}
                          </td> : ''
                                }
                        </tr>
                    
                    </>
                    );
                  })
                ) : (
                  <>
                  
                  {
                    isNaN(paginationCount)  ? 
                    <tr >
                    <td colspan='8'>
                    <p style={{fontSize : "20px" , color : "red" ,margin : "10px" , textAlign : "left"}}>No Result Found</p>

                    </td>
                </tr> : <Spinner />
                  }
                  </>
                )}
                </>
            }
            </tbody>
            </table>
          </div>
         
{
			jobs?.length >= 1 &&	paginationCount > 1
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
				  style={{width : "100px" , padding : "7px" , textAlign : "center" , fontSize : "15px" , border : "1px solid #760B28", background : "url('/img/select_dwn_blk_arrow.svg') no-repeat", backgroundPosition: "right 5px top 50%", appearance : "none" , webkitAppearance: "none", height: "37px"}}
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
export default AuthorizeSim(EducationApprovals);
