import React, { use, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import Link from "next/link";
import Jobportalaside from "../../components/Jobportalaside";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../../components/comman/Spinner";
import AuthorizeSim from "./AuthorizeSimandharAdmin/AuthorizeSim";
import { RecruiterPostJobBaseURL } from "../../constants/urlConstants";
import secureLocalStorage from "react-secure-storage";
import { CSVLink } from "react-csv";

const EducationJobs = () => {
  let Role = secureLocalStorage.getItem("ROLE");
  let Token = secureLocalStorage.getItem("SIMTK");
  // console.log(Token)

  // Spinner
  const [show, setShow] = useState(false);

  const [jobObject, setJobObject] = useState({});
  const [jobs, setjobs] = useState([]);
  const [count, setCount] = useState([]);
  const [searchVal, setsearchVal] = useState("");
  const [recruiterVal, setrecruiterVal] = useState("");
  const [companyVal, setcompanyVal] = useState("");
  const [statusVal, setstatusVal] = useState("");
  const [sortingval, setsortingval] = useState("");
  let [TotalActiveJobs, setTotalActiveJobs] = useState(0);
  let [TotalInActiveJobs, setTotalInActiveJobs] = useState(0);
  let [totalDeletedJob, setTotalDeletedJobs] = useState(0);
  //pagination
  const [n, setn] = useState(1);
  let [paginationCount, setPaginationCount] = useState(1);

  //  let couts = jobs.length /10;
  // console.log("paginationCount",paginationCount)
  // console.log("n",n)

  useEffect(() => {
    fetchJobs(
      `${RecruiterPostJobBaseURL}admin-datatable?title=${searchVal}&recruiter=${recruiterVal}&company=${companyVal}&status=All&isexpired=${
        statusVal ? statusVal : "All"
      }`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    if (paginationCount === 1 || paginationCount < n) {
      setn(1);
    }
    scrollToTop();
  }, [
    searchVal,
    recruiterVal,
    companyVal,
    statusVal,
    n,
    sortingval,
    paginationCount,
  ]);

  const fetchJobs = async (url, val) => {
    // console.log("VALAUE",val)
    try {
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      // console.log("response",response)
      if (response.status === 200) {
        setShow(true);
        setjobs(response?.data?.data?.records);
        setJobObject(response.data.data);
        setTotalActiveJobs(response?.data?.data?.activeStatus);
        setTotalInActiveJobs(response?.data?.data?.inactiveStatus);
        setTotalDeletedJobs(response?.data?.data?.totalDeletedJob);
        let len = response?.data?.data?.records.length;
        setPaginationCount(Math.ceil(len / 10));
        // setCount(Math.ceil(response?.data?.data?.filterCount / 10))
        // setpaginationNumberCount(Math.ceil(response?.data?.data?.totalCount / 10));
        //       if (val === "active") {
        //         let todayTime = new Date(new Date().toLocaleDateString()).getTime();
        //         console.log("ACTIVE")
        //         setjobs(() => {
        //           return response?.data?.data?.records.filter((job, ind) => {
        //             return new Date(job.deadlineDate).getTime() > todayTime;
        //           });
        //         });
        //       } else if(val == "inactive"){
        //         console.log("INACTIVE")
        //         let todayTime = new Date(new Date().toLocaleDateString()).getTime();
        //         setjobs(() => {
        //           return response?.data?.data?.records.filter((job, ind) => {
        //             return new Date(job.deadlineDate).getTime() < todayTime;
        //           });
        //         });
        //       } else {
        //         console.log("else condition")
        //         setjobs(response?.data?.data?.records);
        //       }

        //       setpaginationNumberCount(Math.ceil(response?.data?.data?.totalCount / 10));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    setsearchVal(e.target.value);
    setn(1);
  };
  const handleRecruiter = (e) => {
    setrecruiterVal(e.target.value);
    setn(1);
  };
  const handleCompany = (e) => {
    setcompanyVal(e.target.value);
    setn(1);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const Prev = () => {
    if (n > 1) {
      setShow(false);
      setn(n - 1);
    }
    if (paginationCount === 1) {
      setn(1);
    }
  };

  const Next = () => {
    if (n < paginationCount || setCount) {
      setShow(false);
      setn(n + 1);
    }
    if (paginationCount === 1) {
      setn(1);
    }
  };

  const sortingFilters = (val) => {
    setstatusVal(val);
    setn(1);
    // console.log(val)
    // if (val === "active") {
    //   let todayTime = new Date(new Date().toLocaleDateString()).getTime();

    //   setjobs(() => {
    //     return jobs.filter((job, ind) => {
    //       return new Date(job.deadlineDate).getTime() > todayTime;
    //     });
    //   });
    // } else {
    //   let todayTime = new Date(new Date().toLocaleDateString()).getTime();

    //   setjobs(() => {
    //     return jobs.filter((job, ind) => {
    //       return new Date(job.deadlineDate).getTime() < todayTime;
    //     });
    //   });
    // }
    // fetchJobs(
    //   `https://devjobapi.simandhareducation.com/api/v1/job/admin-datatable?page=${n}&limit=10&search=${searchVal}${sortingval}&sort=${
    //      ""
    //   }`,val
    // );

    // if (val === "") {
    //   fetchJobs(
    //     `https://devjobapi.simandhareducation.com/api/v1/job/admin-datatable?page=${n}&limit=10&search=${searchVal}${sortingval}&sort=${
    //        "createdAt"
    //     }`,' '
    //   );
    // }
  };

  //caluculateActiveInactiveJobs

  // useEffect(() => {
  //   caluculateActiveInactiveJobs();
  // }, [jobs]);

  // const caluculateActiveInactiveJobs = async () => {
  //   try {
  //     let response = await axios.get(RecruiterPostJobBaseURL);
  //     if (response.status === 200) {
  //       let activeJobs = 0;
  //       let inactive = 0;
  //       response?.data?.data?.records.map((job, ind) => {
  //         let CheckJobExpired =
  //           new Date(job?.deadlineDate).getTime() <
  //           new Date(new Date().toLocaleDateString()).getTime();
  //         if (CheckJobExpired) {
  //           inactive += 1;
  //         } else {
  //           activeJobs += 1;
  //         }

  //         setTotalActiveJobs(activeJobs);
  //         setTotalInActiveJobs(inactive);
  //       });
  //     }
  //   } catch (error) {
  //     toast.error("Failed To Calculate Jobs.!");
  //     console.log(error);
  //   }
  // };
  const SwitchPage = (e) => {
    setn(parseInt(e.target.value));
  };

  // useEffect(()=>{
  //   if(sortingval || searchVal){

  //     fetchAllData()
  //   }
  // },[])
  // const fetchAllData = async ()=>{
  //   try{
  //     console.log(sortingval)
  //     let res = await axios.get(`https://devjobapi.simandhareducation.com/api/v1/job/admin-datatable?page=${n}&limit=${totalCount}&search=${searchVal}${sortingval}&sort=${"createdAt"}`)
  //     console.log(searchVal)
  //     setAllData(res?.data?.data?.records)
  //     console.log(res?.data?.data?.records)

  //   } catch{

  //   }
  // }

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
  ];
  return (
    <>
      <Head>
        <title>Job Management - Simandhar Education</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>
      {/* <Jobheader showData3={false} /> */}
      <div className="jp-admin-wrapper educationjobpage">
        <Jobportalaside />
        <section className="jobportal-right-section">
          <h3>Jobs</h3>
          <div className="job-status">
            <dl className="status-box">
              <dt>{TotalActiveJobs ? TotalActiveJobs : 0}</dt>
              <dd>Active Jobs</dd>
            </dl>
            <dl className="status-box">
              <dt>{TotalInActiveJobs ? TotalInActiveJobs : 0}</dt>
              <dd>Inactive Jobs</dd>
            </dl>
            <dl className="status-box">
              <dt>{totalDeletedJob ? totalDeletedJob : 0}</dt>
              <dd>Deleted Jobs</dd>
            </dl>
            <dl className="status-box">
              <dt>{jobObject?.totalCount ? jobObject?.totalCount : 0}</dt>
              <dd>Total Jobs</dd>
            </dl>
            <dl className="status-box">
              <dt>
                {jobObject?.totalApplicants ? jobObject?.totalApplicants : 0}
              </dt>
              <dd>Total Applications</dd>
            </dl>
          </div>
          <div className="search-filter-box mb-4">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search Job Title"
                name="title"
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
              <select
                className="pointer"
                onChange={(e) => sortingFilters(e.target.value)}
              >
                <option className="pointer" value="All">
                  Select Status
                </option>
                <option className="pointer" value="All">
                  All
                </option>
                <option className="pointer" value="false">
                  Active
                </option>
                <option className="pointer" value="true">
                  InActive
                </option>
                <option className="pointer" value="na">
                  Not Applicable
                </option>
              </select>
            </div>
          </div>

          {jobs && jobs?.length > 0 ? (
            <div>
              {Role && Role === "admin" ? (
                <CSVLink
                  className="downloadbtn  cms-btn edit-box add-btn"
                  filename="Jobs.csv"
                  data={jobs}
                  headers={headers}
                >
                  {" "}
                  Export to CSV{" "}
                </CSVLink>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          <div className="education-list custom-scrollbar ">
            <table cellPadding="0" cellSpacing="0" className="cms-table education-cms-table">
              <thead>
                <tr>
                  <th>
                    <p>Job Title</p>
                  </th>
                  <th>
                    <p>Recruiter Name</p>
                  </th>
                  <th>
                    <p>Company Name</p>
                  </th>
                  <th>
                    <p>Applications</p>
                  </th>
                  <th>
                    <p>Created on</p>
                  </th>
                  <th>
                    <p>Expired on</p>
                  </th>
                </tr>
              </thead>
              <tbody className="relative">
                {show ? (
                  <>
                    {jobs?.length >= 1 ? (
                      jobs?.slice(n * 10 - 10, n * 10).map((job, index) => {
                        const {
                          title,
                          createdAt,
                          deadlineDate,
                          recruiterName,
                          totalApplied,
                          noOfHiring,
                          status,
                          companyName,
                          isExpired,
                          approveAdmin,
                          deletedAt
                        } = job;
                        let date = createdAt.split("T")[0];
                        let expireDate = deadlineDate?.split("T")[0];
                        // console.log("createdAt",date)
                        // .toString()
                        // .split(" ")
                        // .slice(0, 4)
                        // .join(" ");

                        // let CheckJobExpired =
                        //   new Date(deadlineDate).getTime() <
                        //   new Date(new Date().toLocaleDateString()).getTime();

                        return (
                          <tr key={index}>
                            <td>
                              <div className="td-title">
                                <span
                                  className={`${deletedAt ? "black" : isExpired === true ?"red":"green"}`}
                                  style={{ width: "2rem" }}
                                ></span>
                                <Link
                                  onClick={() => {
                                    secureLocalStorage.setItem(
                                      "JobVisitFromfromAdmin",
                                      true
                                    );
                                  }}
                                  href={`${job._id}`}
                                  target="_blank"
                                  style={{
                                    width: "calc(100% - 3rem)",
                                    textAlign: "left",
                                  }}
                                >
                                  <div>
                                    <h5>
                                      {title}{" "}
                                      <i>
                                        <img src="/img/job_portal/cross_arrow.svg" />
                                      </i>
                                    </h5>
                                  </div>
                                </Link>
                              </div>
                            </td>
                            <td>
                              <p>
                                {recruiterName
                                  ? recruiterName
                                  : "Not Available"}
                              </p>
                            </td>
                            <td>
                              <p>
                                {companyName ? companyName : "Not Available"}
                              </p>
                            </td>
                            <td>
                              <p>{totalApplied}</p>
                            </td>
                            <td>
                              <p>{date}</p>
                            </td>
                            <td>
                              <p>
                                {expireDate ? expireDate : "Not Applicable"}
                              </p>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colspan="8">
                          <p
                            style={{
                              fontSize: "20px",
                              color: "red",
                              margin: "10px",
                              textAlign: "left",
                            }}
                          >
                            No Result Found
                          </p>
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
          {/* {paginationNumberCount > 1 && (
            <div className="pagination">
              <button className="btn maroon-border-btn prev-btn" onClick={Prev}>
                Prev
              </button>
              {paginationNumberCount > 1 &&
                new Array(paginationNumberCount).fill(0).map((data, ind) => {
                  return (
                    <Link
                      href=""
                      className={`${n === ind + 1 && "active"}`}
                      onClick={() => setn(ind + 1)}
                      key={ind}
                    >
                      {ind + 1}
                    </Link>
                  );
                })}
              <button className="btn maroon-border-btn next-btn" onClick={Next}>
                Next{" "}
              </button>
            </div>
          )} */}

          {jobs?.length > 1 && paginationCount > 1 && (
            <div
              className="input_field"
              style={{display: "flex",justifyContent: "center",alignItems: "center",gap: "10px",margin: "20px auto",}}
            >
              {n === 1 ? (
                <button className="btn disabled-btn" disabled>
                  Prev
                </button>
              ) : (
                <button
                  className="btn maroon-border-btn prev-btn"
                  onClick={Prev}
                >
                  Prev
                </button>
              )}

              <select
                name="state"
                value={n}
                onChange={SwitchPage}
                required
                style={{width: "100px",padding: "7px",textAlign: "center",fontSize: "15px",border: "1px solid #760B28", background : "url('/img/select_dwn_blk_arrow.svg') no-repeat", backgroundPosition: "right 5px top 50%", appearance : "none" , webkitAppearance: "none", height: "37px"}}
              >
                {paginationCount &&
                  paginationCount > 1 &&
                  new Array(paginationCount)?.fill(0)?.map((data, ind) => {
                    return <option value={ind + 1}>{ind + 1}</option>;
                  })}
              </select>
              {n === paginationCount ? (
                <button className="btn disabled-btn" disabled>
                  Next
                </button>
              ) : (
                <button
                  className="btn maroon-border-btn prev-btn"
                  onClick={Next}
                >
                  Next
                </button>
              )}
            </div>
          )}
        </section>
      </div>
      <Jobfooter />
    </>
  );
};
export default AuthorizeSim(EducationJobs);
