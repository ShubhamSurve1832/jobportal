import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { MdHomeRepairService } from "react-icons/md";
import { BsBell } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import parse from "html-react-parser";
import { CSVLink } from "react-csv";
import AuthorizeRec from "./AuthorizeRec/AuthorizeRec";
import Jobheader from "./JobHeader";
import Jobfooter from "./JobFooter";
import Jobportalaside from "../../components/Jobportalaside";
import MessageTab from "../../components/MessageTab";
import NotificationTab from "../../job/RecruiterDashboardNotificationTab";
import { CandidateJobPortalApiBaseURL } from "../../constants/urlConstants";
import Spinner from "../../components/comman/Spinner";
import secureLocalStorage from "react-secure-storage";
import Notification from "../../components/notification";
import ResumePopup from "../../components/showresume";

const RecruiterDashboardSearchResumes = () => {
  let RecruiterId = secureLocalStorage.getItem("RecID");
  let Token = secureLocalStorage.getItem("RecruiterToken");

  // Spinner
  const [show, setShow] = useState(false);
  const [showPoup, setShowPopup] = useState(false);
  const [n, setn] = useState(1);
  const [searchVal, setsearchVal] = useState("");
  const [Resume, setResume] = useState([]);
  let [paginationNumberCount, setpaginationNumberCount] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  let [newResume, setNewResume] = useState();
  let [name, setName] = useState();

  //NOTIFICATION POPUP
  const [notificationPopup, setNotificationPopup] = useState(false);
  let handleClosePopup = () => {
    setNotificationPopup(false);
  };

  const popUpHandler = (e, curriculumVitae, fullName) => {
    setShowPopup(true);
    setNewResume(curriculumVitae);
    setName(fullName);
  };
  const closePopUpHandler = (e) => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetchdata();
    if (paginationNumberCount === 1 || paginationNumberCount < n) {
      setn(1);
    }
    scrollToTop();
  }, [searchVal, n]);

  let fetchdata = async () => {
    try {
      let res = await axios.get(
        `${CandidateJobPortalApiBaseURL}/datatable?token=${RecruiterId}&title=${searchVal}&sort=id:asc`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      if (res.status === 200) {
        setResume(res.data.data.records);
        setShow(true);
        let len = res.data.data.records?.length;
        setpaginationNumberCount(Math.ceil(len / 10));
        setTotalJobs(len);
      }
    } catch (err) {
      // toast.error(err.message);
      console.log(err);
    }
  };

  //SEARCH OPRATIONS
  const handleChange = (e) => {
    setsearchVal(e.target.value);
    setn(1);
  };

  // PAGINATION
  const Prev = () => {
    if (n > 1) {
      setShow(false);
      setn(n - 1);
    }
  };

  const Next = () => {
    if (n < paginationNumberCount) {
      setShow(false);
      setn(n + 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const SwitchPage = (e) => {
    setn(parseInt(e.target.value));
  };
  // console.log(Resume)
  //  DOWNLOAD CSV FILE OF ALL USERS
  let headers = [
    { label: "Job Title", key: "title" },
    { label: " Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phoneNo" },
    { label: "Report Address", key: "reportAddress" },
  ];

  return (
    <>
      <Head>
        <title>Candidate Resume Management - Simandhar Education</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>
      {/* <Jobheader showData3={false} /> */}
      <div className="jp-admin-wrapper RecruiterDashboardJobs RecruiterDashboardSearchResumes">
        <Jobportalaside />
        <MessageTab />
        <section className="jobportal-right-section ">
          <div className="setbellicon">
            <h3>Search Resumes</h3>
            <Notification />
          </div>
          <div className="search-filter-box">
            <div className="search-filter">
              <input
                onChange={handleChange}
                type="text"
                placeholder="Job Title"
              />
              <i>
                <img src="/img/job_portal/search_icon.svg" />
              </i>
            </div>
            {/* <div className='twogrid'>
                            <div className='search-filter'>
                                <input type='text' placeholder='Experience' />
                                <p className='heading05'><i>< MdHomeRepairService /></i></p>
                            </div>
                            <div className='search-filter'>
                                <input type='text' placeholder='India' />
                                <p className='heading05'><i>< CiLocationOn /></i></p>
                            </div>
                        </div> */}
          </div>
          <p className="mt-4 Cvsred">Total : {totalJobs} CVs</p>
          {Resume && Resume.length > 0 ? (
            <CSVLink
              className="downloadbtn cms-btn edit-box add-btn"
              filename="search_resumes.csv"
              data={Resume}
              headers={headers}
            >
              {" "}
              Export to CSV{" "}
            </CSVLink>
          ) : (
            ""
          )}
          <div className="education-list custom-scrollbar">
            <table
              cellPadding="0"
              cellSpacing="0"
              className="jp-table em-table"
            >
              <thead>
                <th colSpan={1}>
                  <p>Job Title</p>
                </th>
                <th colSpan={1}>
                  <p>Name</p>
                </th>
                <th colSpan={1}>
                  <p>Email</p>
                </th>
                <th colSpan={1}>
                  <p>Phone</p>
                </th>
                <th colSpan={1}>
                  <p>Resumes</p>
                </th>
              </thead>
              <tbody>
                {show ? (
                  <>
                    {Resume.length > 0 ? (
                      Resume?.slice(n * 10 - 10, n * 10).map((res, id) => {
                        let {
                          _id,
                          title,
                          reportAddress,
                          candidateId,
                          fullName,
                          email,
                          phoneNo,
                          curriculumVitae,
                        } = res;
                        // console.log("reportAddress",reportAddress)
                        return (
                          <tr key={id}>
                            <td>
                              <p>
                                <strong>{title}</strong>
                                <br />
                                {reportAddress !== "Null"
                                  ? reportAddress
                                  : "No Specific Address"}
                              </p>
                            </td>
                            <td><p>{fullName}</p></td>
                            <td><p>{email}</p></td>
                            <td><p>{phoneNo}</p></td>
                            <td className="flex rcdsr-btn-wrap">
                              {/* <p><a onClick={(e) => popUpHandler(e, curriculumVitae)} target='_blank' className='btn maroon-border-btn next-btn'>View CV</a></p> */}
                              {/* {
                                                showPoup ? */}
                              <ResumePopup
                                closePoup={closePopUpHandler}
                                onClick={(e) =>
                                  popUpHandler(e, curriculumVitae, fullName)
                                }
                                ShowResume={curriculumVitae}
                                pdfTitle={fullName}
                              />
                              {/* : ""
                                            } */}

                              <p>
                                <a
                                  href={curriculumVitae}
                                  download
                                  className="btn maroon-border-btn next-btn rcdsr-btn"
                                >
                                  Download CV
                                </a>
                              </p>
                              {/* <p><button className='btn maroon-border-btn next-btn'>Move To Candidate</button></p> */}
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
            {/* <table cellPadding="0" cellSpacing="0" className='jp-table em-table'>
                            <thead>
                                <tr>
                                    <th><p>Total : 9000 CVs</p></th>
                                    <th><p>Total : 9000 CVs</p></th>
                                    <th><p>Total : 9000 CVs</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td><p><strong>Ca intern</strong><br /> Ernakulam, Kerala</p>
                                        </td>
                                        <td>
                                            <p>
                                                <li>Ca intern - CA Shamshad & co</li>
                                                <li>CA intern - Joyichan and co</li>
                                                <li>CA intern - Joyichan and co</li>
                                            </p>
                                        </td>
                                        <td className='flex'>
                                            <p><button className='btn maroon-border-btn next-btn'>View CV</button></p>
                                            <p><button className='btn maroon-border-btn next-btn'>Download CV</button></p>
                                            <p><button className='btn maroon-border-btn next-btn'>Move To Candidate</button></p>
                                        </td>
                                    </tr>
                            </tbody>
                        </table> */}
          </div>

          {Resume?.length > 1 && paginationNumberCount > 1 && (
            <div
              className="input_field"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                margin: "20px auto",
              }}
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
                style={{
                  width: "100px",
                  padding: "7px",
                  textAlign: "center",
                  fontSize: "15px",
                  border: "1px solid #760B28",
                  background : "url('/img/select_dwn_blk_arrow.svg') no-repeat", backgroundPosition: "right 5px top 50%", appearance : "none" , webkitAppearance: "none", height: "37px"
                }}
              >
                {paginationNumberCount &&
                  paginationNumberCount > 1 &&
                  new Array(paginationNumberCount)
                    ?.fill(0)
                    ?.map((data, ind) => {
                      return <option value={ind + 1}>{ind + 1}</option>;
                    })}
              </select>
              {n === paginationNumberCount ? (
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
      {
        notificationPopup && (
          // <div className="notificationPopup">

          <NotificationTab closePopup={handleClosePopup} />
        )
        // </div>
      }
      <Jobfooter />
    </>
  );
};
export default AuthorizeRec(RecruiterDashboardSearchResumes);
