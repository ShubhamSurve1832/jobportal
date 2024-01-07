import React, { useState, useEffect } from 'react'
import Head from "next/head";
import axios from 'axios';
import Image from 'next/image';
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import Link from 'next/link'
import Jobportalaside from '../../components/Jobportalaside'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { CiLocationOn } from 'react-icons/ci';
import { BsBell } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import MessageTab from '../../components/MessageTab'
import NotificationTab from '../../job/RecruiterDashboardNotificationTab';
import { CandidateJobPortalApiBaseURL, InterviewJobPortalBaseURL } from '../../constants/urlConstants'
import { toast } from 'react-hot-toast';
import Spinner from '../../components/comman/Spinner'
import AuthorizeRec from './AuthorizeRec/AuthorizeRec';
import secureLocalStorage from 'react-secure-storage';
import { CSVLink } from "react-csv"
import Notification from '../../components/notification';


const RecruiterDashboardInterviews = () => {


    let RecruiterId = secureLocalStorage.getItem('RecID');
    let Token = secureLocalStorage.getItem('RecruiterToken');

    // Spinner
    const [show, setShow] = useState(false)

    const [n, setn] = useState(1);
    const [searchVal, setsearchVal] = useState('');
    const [dateVal, setDateVal] = useState('');
    const [Candidate, setCandidate] = useState([]);
    let [paginationNumberCount, setpaginationNumberCount] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);

    //NOTIFICATION POPUP
    const [notificationPopup, setNotificationPopup] = useState(false)
    let handleClosePopup = () => {
        setNotificationPopup(false)
    }

    useEffect(() => {
        fetchdata()
        if(paginationNumberCount === 1 || paginationNumberCount < n){
            setn(1)
          }
          scrollToTop()
    }, [searchVal,n,dateVal,paginationNumberCount])


    let fetchdata = async () => {
        try {
            let res = await axios.get(`${InterviewJobPortalBaseURL}datatable?token=${RecruiterId}&name=${searchVal}&date=${dateVal}&sort=id:asc`,{
                headers: {
                   'Authorization': `Bearer ${Token}`
              }
              })
            if (res.status === 200) {
                setCandidate(res.data.data.records);
                setShow(true)
                let len = res.data.data.records?.length
                setpaginationNumberCount(Math.ceil(len / 10));               
            }
        } catch (err) {
            console.log(err.message);
        }

    }

    //SEARCH OPRATIONS
    const handleChange = (e) => {
        setsearchVal(e.target.value)
        setn(1)
    }
    const handleDateChange = (e) => {
        setDateVal(e.target.value)
        setn(1)
    }
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

    // PAGINATION
    const Prev = () => {

        if (n > 1) {
            setShow(false)
            setn(n - 1);
        }
    }

    const Next = () => {

        if (n < paginationNumberCount) {
            setShow(false)
            setn(n + 1)
        }
    }



    //handleDelete
    const handleDelete = async(id) =>{

        let url = `${InterviewJobPortalBaseURL}${id}`
        if(confirm('Data Will Be Permanently Deleted.')){
            toast.loading("Wait..")
            try{
                // console.log("Yoken 116",Token)
            let response = await axios.delete(url,{
                headers:{                    
                    'Authorization': `Bearer ${Token}`
                }
            },{data : {"deletedBy" : id}})

            if(response.status===200){
                toast.dismiss()
                toast.success("Deleted.");
                fetchdata();
            }
                

            }catch(err){
                toast.error(err.message);
            }
        }
    }


    const SwitchPage = (e) =>{
		setn(parseInt(e.target.value))
	}

    // console.log(Candidate)
    //  DOWNLOAD CSV FILE OF ALL USERS
    let headers = [
        { label: " Name", key: "candidateName" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phoneNo" },
        { label: "Job Title", key: "title" },
         { label: "Date", key: "interviewDate" },
         { label: "Time", key: "interviewTime" },
         { label: "Interview Mode", key: "interviewMode" },
         { label: "Interview Link", key: "interviewLink" },
         { label: "Interview Address", key: "interviewAddress" },
       ]
    return (
        <>
            <Head>
                <title>Candidate Interview Management - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            {/* <Jobheader showData3={false} /> */}
            <div className='jp-admin-wrapper RecruiterDashboardJobs RecruiterDashboardInterviews'>
                <Jobportalaside />
                <MessageTab />

                <section className='jobportal-right-section '>
                    <div className="setbellicon">
                        <h3>Interviews</h3>
                        <Notification/>
                    </div>
                    <div className='search-filter-box mb-4'>
                        <div className='search-filter'>
                            <input type='text' placeholder='Search Candidate Name' onChange={handleChange}/>
                            <i><img src="/img/job_portal/search_icon.svg" /></i>
                        </div>
                        <div className='search-filter'>
                            <input type='text' onFocus={(e) => (e.target.type = "date")}  onBlur={(e) => (e.target.type = "text")} id='DateFilter' placeholder='mm/dd/yyyy' onChange={handleDateChange}/>
                            <i><img src="/img/job_portal/search_icon.svg" /></i>
                            {/* <p className='heading05'><i>< CiLocationOn /></i></p> */}
                        </div>
                        {/* <div className='select-filter'>
                            <span>Sort by :  </span>
                            <select>
                                <option>Posting Date</option>
                                <option>Job Title</option>
                                <option>Recruiter Name</option>
                                <option>Company Name</option>
                            </select>
                        </div> */}
                    </div>

                        {
                            Candidate && Candidate.length ? 
                            <CSVLink className="downloadbtn cms-btn edit-box add-btn" filename="Interviews.csv" data={Candidate && Candidate} headers={headers}>  Export to CSV </CSVLink> : ""
                        }
                    <div className='education-list custom-scrollbar'>
                        <table cellPadding="0" cellSpacing="0" className='jp-table em-table'>
                            <thead>
                                <tr>
                                    <th><p>Name</p></th>
                                    <th><p>Email</p></th>
                                    <th><p>Phone</p></th>
                                    <th><p>Job Title</p></th>
                                    <th><p>Date</p></th>
                                    <th><p>Time</p></th>
                                    <th><p>Interview Mode</p></th>
                                    <th><p>Interview Link / Interview Address</p></th>
                                    {/* <th><p>Details</p></th> */}
                                    {/* <th><p>Details</p></th> */}
                                    <th><p>Delete</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    show ?
                                        <>
                                            {
                                                Candidate ? Candidate.map((data, index) => {
                                                    let { candidateName, description,interviewAddress, interviewDate,interviewMode, interviewLink,email,phoneNo
                                                        , interviewTime, _id,title} = data;

                                                    let date = new Date(interviewDate).toString().split(' ').slice(0, 4).join(' ')
                                            
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className='profileIcon'>
                                                                    <p><CgProfile /></p>
                                                                    <p>{candidateName}</p>
                                                                </div>
                                                            </td>
                                                            
                                                            <td><p>{email}</p></td>
                                                            <td><p>{phoneNo ? phoneNo : 'Not Available'}</p></td>
                                                            <td><p>{title}</p></td>
                                                            <td><p style={{whiteSpace: "nowrap"}}>{date}</p></td>
                                                            <td><p>{interviewTime}</p></td>
                                                            <td><p>{interviewMode}</p></td>
                                                            <td><a className='no-link' target={interviewLink?'_blank':""} href={interviewLink.slice(0,5) ==="https" ?interviewLink: "https://"+interviewLink ? "" :"" }>{interviewLink?interviewLink:interviewAddress} <br /><div></div></a></td>
                                                            {/* <td><p>{description}</p></td> */}
                                                            <td>
                                                                <p onClick={()=>handleDelete(_id)}><a className='btn maroon-btn cm-btn'><RiDeleteBin6Line /></a></p>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) : <tr >
                                                <td colspan='9'>
                                                <p style={{fontSize : "20px" , color : "red" ,margin : "10px" , textAlign : "left"}}>No Result Found</p>
                                                </td>
                                            </tr>
                                            }
                                        </>
                                        :
                                        <div className='spinnerDiv'>

                                            <Spinner />
                                        </div>
                                }


                            </tbody>
                        </table>
                    </div>
                    {
			Candidate?.length >1 &&	paginationNumberCount > 1
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
                  {paginationNumberCount &&
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
            {
                notificationPopup &&
                // <div className="notificationPopup">
                <NotificationTab closePopup={handleClosePopup} />
                // </div>
            }
            <Jobfooter />
        </>
    )
}
export default AuthorizeRec(RecruiterDashboardInterviews)