import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import Link from "next/link";
import Jobportalaside from "../../components/Jobportalaside";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../../components/comman/Spinner";
import AuthorizeSim from "./AuthorizeSimandharAdmin/AuthorizeSim";
import { CandidateJobPortalApiBaseURL } from "../../constants/urlConstants";
import { CSVLink } from "react-csv"
import secureLocalStorage from "react-secure-storage";


const EducationManagement = () => {
  let Token = secureLocalStorage.getItem('SIMTK');
  let Role = secureLocalStorage.getItem("ROLE")
  // console.log('Role is HEre',Role)
  // Spinner
  const [show, setShow] = useState(false);
  const [allData, setAllData] = useState([]);
  const [Candidate, setCandidate] = useState([]);
  const [searchVal, setsearchVal] = useState("");
  const [cityVal, setCityVal] = useState("");
  const [sortingval, setsortingval] = useState("");
  let [paginationCount, setPaginationCount] = useState(1);
  //pagination
  const [n, setn] = useState(1);
  // console.log(paginationCount)

  useEffect(() => {  
   
    fetchCandidate();
    if(paginationCount === 1|| paginationCount < n){
      setn(1)
    }   
    scrollToTop()
  }, [cityVal,searchVal,paginationCount,n]);
  
  
  // useEffect(()=>{
  //   let len = Candidate?.length
  //   setPaginationCount(Math.ceil(len / 10));
  //     fetchAllData()
  //   },[Candidate,searchVal,cityVal])
  
  //   const fetchAllData = async ()=>{
  //     try{
  //       let res = await axios.get(`https://devjobapi.simandhareducation.com/api/v1/user/admin-datatable?designation=${searchVal}&city=${cityVal}`)
  //       // console.log(res.data.data.records)
  //       setAllData(res?.data?.data?.records)
  
  //     } catch{
  
  //     }
  //   }
let searchDesignation =`designation=${searchVal}`
let searchCity = `&city=${cityVal}`
  const fetchCandidate = async () => {
    try {
      let response = await axios.get(
        `${CandidateJobPortalApiBaseURL}/admin-datatable?${searchVal?searchDesignation:""}${cityVal?searchCity:""}`,{
          headers: {
             'Authorization': `Bearer ${Token}`
        }
        }
      );
      if (response.status === 200) {
        setCandidate(response.data.data.records);
        setShow(true);
        let len = response.data.data.records.length
        console.log("length",len)
        setPaginationCount(Math.ceil(len / 10));
        // setpaginationNumberCount(Math.ceil(response?.data?.data?.totalCount / 10));
        // console.log(response.data.data.totalCount);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    setsearchVal(e.target.value);
  };
  const handleCity = (e) => {
    setCityVal(e.target.value);
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
    let url = `${CandidateJobPortalApiBaseURL}/${id}`;
    if (confirm("Data Will Be Permanently Deleted.")) {
      toast.loading("Wait..");
      try {
        let response = await axios.delete(url,{
          headers: {
             'Authorization': `Bearer ${Token}`
        }
        });

        if (response.status === 200) {
          toast.dismiss();
          toast.success("Candidate Deleted Successfully.");
          fetchCandidate();
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  // console.log(paginationNumberCount);

  const [pdfFileSrc, setpdfFileSrc] = useState("");



  const SwitchPage = (e) =>{
		setn(parseInt(e.target.value))
	}

  //  DOWNLOAD CSV FILE OF ALL USERS
	let headers = [
		{ label: "Full Name", key: "fullName" },
		{ label: "Email", key: "email" },
		{ label: "Mobile Number", key: "phoneNo" },
		{ label: "Designation", key: "designation" },
		{ label: "Experience", key: "experience" },
		{ label: "City", key: "city" }
	  ]

  return (
    <>
      <Head>
        <title>Candidate Management - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      {/* <Jobheader showData3={false} /> */}
      <div className="jp-admin-wrapper EducationManagementpage">
        <Jobportalaside />
        <section className="jobportal-right-section">
          <h3>Candidate Management</h3>
          <div className="search-filter-box mb-4 grid-2">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search Designation"
                onChange={handleChange}
              />
              <i>
                <img src="/img/job_portal/search_icon.svg" />
              </i>
            </div>
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search Location"
                onChange={handleCity}
              />
              <i>
                <img src="/img/job_portal/search_icon.svg" />
              </i>
            </div>
          </div>

            {
              Candidate && Candidate?.length > 0 ?
              <div>              
            {
              Role && ( Role === "admin") ?  
              <CSVLink className="downloadbtn cms-btn edit-box add-btn mb-4" filename="Candidate-Management.csv" data={Candidate} headers={headers}>  Export to CSV </CSVLink> :""
            } 
            </div> : ''
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
                    <p>Experience</p>
                  </th>
                  <th>
                    <p>Designation</p>
                  </th>
                  <th>
                    <p>Location</p>
                  </th>
                  <th>
                    <p>Resumes</p>
                  </th>
                  {
                    Role && (Role === "admin") ? <th>
                    <p>Delete</p>
                  </th> : ""
                  }
                  
                </tr>
              </thead>
              <tbody className="relative">
                {show ? (
                  <>
                    {Candidate?.length>=1 ? (
                      Candidate?.slice(n * 10 - 10, n * 10).map((data, ind) => {
                        const {
                          firstName,
                          lastName,
                          experience,
                          designation,
                          phoneNo,
                          email,
                          curriculumVitae,
                          city,
                          _id,
                        } = data;
                        return (
                          <tr>
                            <td>
                              <div className="td-title">

                              <span>{`${(ind + 1) + (10*(n-1)) }`}.</span>
                              <p> {firstName}</p>
                              </div>
                            </td>
                            <td>
                              <p>{lastName}</p>
                            </td>
                            <td>
                              <p>
                                {experience === 0 || experience === null
                                  ? "Fresher"
                                  : experience}
                              </p>
                            </td>
                            <td>
                              <p>
                                {designation ? designation : "Not Available"}
                              </p>
                            </td>
                            <td>
                              <p>
                                <div>{city ? city : "Not Available"}</div>
                              </p>
                            </td>

                            <td>
                              {curriculumVitae ? (
                                <>
                                  <a
                                    target="_blank"
                                    href={curriculumVitae}
                                    className="btn maroon-btn cm-btn"
                                    style={{ marginBottom: "10px" }}
                                  >
                                    View
                                  </a>
                                  <a
                                    href={curriculumVitae}
                                    download={curriculumVitae}
                                    className="btn maroon-border-btn cm-btn"
                                  >
                                    Download
                                  </a>
                                </>
                              ) : (
                                "No Resume"
                              )}
                            </td>
                            {
                              Role && (Role === "admin") ?  <td>
                              <p onClick={() => handleDelete(_id)}>
                                <a className="btn maroon-btn cm-btn">
                                  <RiDeleteBin6Line />
                                </a>
                              </p>
                            </td> :""
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
			Candidate?.length > 1 &&	paginationCount > 1
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
export default AuthorizeSim(EducationManagement);
