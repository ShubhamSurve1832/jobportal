import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Head from "next/head";
import { useRouter } from 'next/router';
import Image from 'next/image';
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import Link from 'next/link'
import Jobportalaside from '../../components/Jobportalaside'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineForwardToInbox } from 'react-icons/md';
import { BsBell } from 'react-icons/bs';
import MessageTab from '../../components/MessageTab'
import { toast } from 'react-hot-toast';
import SimandharInterviewForm from '../job/SimandharInterviewForm'
import NotificationTab from '../../job/RecruiterDashboardNotificationTab';
import AuthorizeRec from './AuthorizeRec/AuthorizeRec';
import Spinner from '../../components/comman/Spinner'
import secureLocalStorage from 'react-secure-storage';
import { InterviewJobPortalBaseURL, jobPortalBaseURL } from '../../constants/urlConstants';
import { resolve } from 'path';
import { CSVLink } from "react-csv"
import Notification from '../../components/notification';



const RecruiterDashboardCandidates = () => {


    let RecruiterId = secureLocalStorage.getItem('RecID');
    let Token = secureLocalStorage.getItem('RecruiterToken');

    // Spinner
    const [show, setShow] = useState(false)

    const [interviewCandidateName, setInterviewCandidateName] = useState('')
    const [InterviewCandidateId, setInterviewCandidateId] = useState('');
    const [InterviewJobId, setInterviewJobID] = useState('');
    const [Candidate, setCandidate] = useState([]);
    const [searchVal, setsearchVal] = useState('');
    const [emailVal, setEmailVal] = useState('');
    const [titleVal, setTitleVal] = useState('');
    const [sortingVal,setsortingVal] = useState('');
    //pagination
    const [n, setn] = useState(1);
    let [paginationNumberCount, setpaginationNumberCount] = useState(0);
    const [totalCandidate, settotalCandidate] = useState(0);

    // REFRESH PAGE FOR NEW DATA
    const router = useRouter()
    let handleRefresh = () =>{
        router.reload()
    }
    //NOTIFICATION POPUP
    const [notificationPopup, setNotificationPopup] = useState(false)
    let handleClosePopup = () => {
        setNotificationPopup(false)
    }

    useEffect(() => {
        fetchCandidate();
        if(paginationNumberCount === 1 || paginationNumberCount < n){
            setn(1)
          }
          scrollToTop()
    }, [n,searchVal,sortingVal,emailVal,titleVal,paginationNumberCount]);


    const fetchCandidate = async () => {
        try {
            let response = await axios.get(`${jobPortalBaseURL}user/datatable?token=${RecruiterId}&name=${searchVal}&email=${emailVal}&title=${titleVal}&status=${sortingVal}&sort=createdAt:desc`,{
                headers: {
                   'Authorization': `Bearer ${Token}`
              }
              });
            if (response.status === 200) {
                setCandidate(response?.data?.data?.records);
                setShow(true)
                let len = response.data.data.records?.length
                setpaginationNumberCount(Math.ceil(len / 10));  
                settotalCandidate(response.data.data.totalCount)
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    const [showPoup, setShowPopup] = useState()
    let [CheckNoButtonWhenSchduled,setCheckNoButtonWhenSchduled]=useState('');
    const popUpHandler = (e, name,id,CandidateId,CheckNoButtonWhenSchduled) => {
        setShowPopup(true)
        setInterviewCandidateName(name)
        setInterviewCandidateId(CandidateId);
        setInterviewJobID(id)
        setCheckNoButtonWhenSchduled(CheckNoButtonWhenSchduled)
    }

    const closePopUpHandler = (e) => {
        setShowPopup(false)
        handleRefresh()
    }

    const handleChange = (e) => {
        setsearchVal(e.target.value)
        setn(1)
    }
    const handleEmailChange = (e) => {
        setEmailVal(e.target.value)
        setn(1)
    }
    const handleTitleChange = (e) => {
        setTitleVal(e.target.value)
        setn(1)
    }
    const handleStatusChange = (e) => {
        setsortingVal(e.target.value)
        setn(1)
    }
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    // console.log(interviewCandidateName)

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



    let {replace} = useRouter();

    //MessageToUser
    const MessageToUser = (candidateData) =>{
        let {candidateId, fullName} = candidateData;
        let obj = {
            id : candidateId,
            name : fullName
        }
       secureLocalStorage.setItem('MessageDataFromRecruiterDashboard',obj);
       replace(`/job/RecruiterMessagesection?UID=${candidateId}`);
    }






    const CancelInterview = async(interviewId,BtnId) =>{
        setShow(false)
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          };
        try{
            let res = await axios.patch(`${jobPortalBaseURL}interview/interview-status/${interviewId}`,{status : false},{headers:header})

              if(res.status===200){
                setShow(false)
                try{
                    let response = await axios.delete(`${InterviewJobPortalBaseURL}${interviewId}`,{data : {"deletedBy" : interviewId},headers:{
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${Token}`
                    }}                       
                )        
                    if(response.status===200){
                        fetchCandidate();
                        document.getElementById(BtnId).checked = false;
                        toast.success('Interview Cancelled..!')
                        // handleRefresh()
                    }
                    

                }catch(error){
                    // console.log("line 153",error);
                    handleRefresh()
                }

               
              }
    
        }catch(error){
            console.log("160 error",error);
            // toast.error(error.message)
        }
    }





    const ChangeApplyStatusAcceptedRejected = async(e,ApplyId) =>{
        let val = e.target.value
        let data = {
            status : "Not Applicable"
        }

        let data2 = {
            status : e.target.value
        }
        try{
            let res = await axios.patch(`${jobPortalBaseURL}apply/candidateStatus/${ApplyId}`,val=='Change Status' ? data : data2,{
                headers :{
                    "Content-Type" : "application/json",
                    'Authorization': `Bearer ${Token}`
                }
            })

            if(res.status===200){
                if(val=='Change Status'){
                    toast.success("Application Pending");
                }else{
                    toast.success(`Application ${data2.status}`);
										setInterval(handleRefresh, 3000);
                    // handleRefresh()
                }
                // console.log(res);
            }
        }catch(error){
            toast.error(error.message)
            console.log(error);
        }
    
    }


    const SwitchPage = (e) =>{
		setn(parseInt(e.target.value))
	}


    // console.log(Candidate)
    //  DOWNLOAD CSV FILE OF ALL USERS
    let headers = [
      { label: "Name", key: "fullName" },
         { label: "Email", key: "email" },
         { label: "Mobile Number", key: "phoneNo" },
         { label: "Job Applied For", key: "title" },
         { label: "Applied Date", key: "appliedDate" },
         { label: "Interview Scheduled", key: "interviewsStatus" }
       ]
    return (
        <>
            <Head>
                <title>Recruiter Candidate Management - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            {/* <Jobheader showData3={false} /> */}
            <div className='jp-admin-wrapper RecruiterDashboardCandidates'>
                <Jobportalaside />
                <MessageTab />
                <section className='jobportal-right-section '>
                    <div className="setbellicon">
                        <h3>Candidates</h3>
                        <Notification/>
                    </div>
                    <div className='search-filter-box mb-4'>
                        <div className='search-filter'>
                            <input type='text' placeholder='Search by Name' onChange={handleChange} />
                            <i><img src="/img/job_portal/search_icon.svg" /></i>
                        </div>
                        <div className='search-filter'>
                            <input type='text' placeholder='Search by Email' onChange={handleEmailChange} />
                            <i><img src="/img/job_portal/search_icon.svg" /></i>
                        </div>
                        <div className='search-filter'>
                            <input type='text' placeholder='Search by Job Title' onChange={handleTitleChange} />
                            <i><img src="/img/job_portal/search_icon.svg" /></i>
                        </div>
                        {/* <div className='search-filter'>
                            <input type='text' placeholder='Search Recruiter Name' />
                            <p className='heading05'><i>< CiLocationOn /></i></p>
                        </div> */}
                        <div className='select-filter '>
                            <select className='pointer' onChange={handleStatusChange}>
                                <option value="All">All</option>
                                <option value="New Application"> New Application </option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                                {/* <option value="email">Email id</option>
                                <option value="phoneNo">Phone number</option> */}
                            </select>
                        </div>
                    </div>

                        {
                            Candidate && Candidate.length > 0 ? 
                            <CSVLink className="downloadbtn cms-btn edit-box add-btn" filename="Recruiter_candidate.csv" data={Candidate} headers={headers}>  Export to CSV </CSVLink> : ""
                        }
                    <div className='education-list custom-scrollbar'>
                        <table cellPadding="0" cellSpacing="0" className='jp-table em-table cand-emp-lin-table'>
                            <thead>
                                <tr>
                                    <th><p>Name</p></th>
                                    <th><p>Email Id</p></th>
                                    <th><p>Mobile No.</p></th>
                                    <th><p>Job Applied For</p></th>
                                    <th><p>Applied Date</p></th>
                                    <th><p>Application Status</p></th>
                                    <th><p>Interview Scheduled</p></th>
                                    <th><p>Message</p></th>
                                    {/* <th><p>Delete</p></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    show ?
                                        <>
                                            {
                                                Candidate?.length ? Candidate?.slice(n * 10 - 10, n * 10).map((data, index) => {
                                                    let { fullName, email, title, interviewsStatus,appliedDate,applyId,appliedStatus,interviewId, _id , candidateId , phoneNo} = data;
                                                    const selectValue = appliedStatus === "Accepted" ? "Accepted" : appliedStatus=== "Rejected" ? "Rejected" :"New Application"
                                                    let interviewSchule = interviewsStatus === "true" ? true : false;                                                   
                                                    let ElementID = Math.floor(Math.ceil(index*Math.random()*10000)*Math.random()*7656785445678)+100*2343

                                                    return (
                                                        <tr key={index} >
                                                            <td>
                                                                <p><strong>{fullName}</strong></p>
                                                            </td>
                                                            <td><p>{email}</p></td>
                                                            <td><p>{phoneNo ? phoneNo : "Not Available"}</p></td>
                                                           <td>
                                                            <p>{title}</p>      
                                                           </td>
                                                           <td>
                                                            <p>{new Date(appliedDate).toLocaleString()}</p>   
                                                           </td>
                                                           <td>
                                                                <p className='custom-dropdown'>
                                                                    <select className='pointer' name="" id="" onChange={(e)=>ChangeApplyStatusAcceptedRejected(e,applyId)} value={selectValue}>
                                                                        <option value='New Application'>New Application</option>
                                                                        <option value='Accepted'>Accepted</option>
                                                                        <option value='Rejected'>Rejected</option>
                                                                    </select>
                                                                </p>
                                                            </td>
                                                           {
                                                            selectValue ==="Accepted" ?                                                          
                                                            <td>
                                                                                                                              
                                                                <>
                                                                    <p className='d-ib radio-field custom-radio fz-20'  onClick={(e) => popUpHandler(e, fullName , _id , candidateId, `JobWillNotBeenScheduled${ElementID}`)}> 
                                                                     Yes
                                                                   {
                                                                   interviewSchule ?  <input type='checkbox' disabled defaultChecked  id={`JobHasBeenScheduled${ElementID}`} name='profile' />
                                                                    :  
                                                                    <input type='checkbox' id={`JobHasBeenScheduled${ElementID}`} name='profile' />
                                                                    }
                                                                    <span className='checkmark'></span>
                                                                </p><br />
                                                                {
                                                                    showPoup ? <SimandharInterviewForm closePoup={closePopUpHandler} jobId={InterviewJobId} CandidateID={InterviewCandidateId} candidateName={interviewCandidateName} CheckNoButtonOnInterviewSchduled={CheckNoButtonWhenSchduled} fetchallCandidate={fetchCandidate}  /> : ""
                                                                }
                                                                <p className='d-ib radio-field custom-radio fz-20' onClick={()=>CancelInterview(interviewId,`JobHasBeenScheduled${ElementID}`)}>
                                                                     No
                                                                   {
                                                                   !interviewSchule ?  
                                                                   <input type='checkbox' disabled defaultChecked id={`JobWillNotBeenScheduled${ElementID}`} name='profile' /> 
                                                                   : 
                                                                    <input type='checkbox' id={`JobWillNotBeenScheduled${ElementID}`} name='profile' />
                                                                    }
                                                                    <span className='checkmark'></span>
                                                                </p>
                                                                    </>
                                                                
                                                                
                                                                <br />

                                                                {/* <p className='d-ib radio-field custom-radio fz-20' id='NotSchedule'> Not Schedule
                                                                {
                                                                    !interviewsStatus 
                                                                    ?
                                                                    <>
                                                                    <input type='checkbox' id='JobNotScheduled' defaultChecked name='profile' />
                                                                    <span className='checkmark'></span>
                                                                    </>
                                                                    :
                                                                    <>
                                                                    <input type='checkbox' id='JobNotScheduled' name='profile' />
                                                                    <span className='checkmark'></span>
                                                                    </>
                                                                }
                                                                </p> */}
                                                            </td> :
																<td>
                                                            <p className='title01' style={{padding:"1rem 1.5rem",textAlign:"center"}}>                                                                Application Not Accepted
                                                            </p>
																</td>
                                                             }
                                                            
                                                            <td>
                                                                <p onClick={()=>MessageToUser(data)}><a className='btn maroon-btn cm-btn  remove-arrow'><MdOutlineForwardToInbox /></a></p>
                                                            </td>
                                                            {/* <td>
                                                                <p><a className='btn maroon-btn cm-btn remove-arrow'><RiDeleteBin6Line /></a></p>
                                                            </td> */}
                                                        </tr>
                                                    )
                                                }) :
                                                <tr >
                                                <td colspan='8'>
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
				  style={{width : "100px" , padding : "7px" , textAlign : "center" , fontSize : "15px" , border : "1px solid #760B28" , background : "url('/img/select_dwn_blk_arrow.svg') no-repeat", backgroundPosition: "right 5px top 50%", appearance : "none" , webkitAppearance: "none", height: "37px"}}
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
                //  <div className="notificationPopup">
                <NotificationTab closePopup={handleClosePopup} />
                // </div>
            }
            <Jobfooter />
        </>
    )
}
export default AuthorizeRec(RecruiterDashboardCandidates)