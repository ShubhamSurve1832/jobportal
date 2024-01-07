import React from 'react'
import Head from "next/head";
import Image from 'next/image';
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import Link from 'next/link'
import Jobportalaside from '../../components/Jobportalaside'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { CiLocationOn } from 'react-icons/ci';

import MessageTab from '../../components/MessageTab'
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AuthorizeRec from './AuthorizeRec/AuthorizeRec';

import Spinner from '../../components/comman/Spinner'
import { RecruiterPostJobBaseURL,jobPortalBaseURL } from '../../constants/urlConstants';
import { headers } from 'next/dist/client/components/headers';
import secureLocalStorage from 'react-secure-storage';
import { CSVLink } from "react-csv"
import Notification from '../../components/notification';


const RecruiterDashboardJobs = () => {
    // Spinner
    const [show, setShow] = useState(false)
    let [paginationCount, setPaginationCount] = useState(1);


    let RecruiterID = secureLocalStorage.getItem('RecID');
    let Token = secureLocalStorage.getItem('RecruiterToken');
    // console.log("RecruiterToken",Token)



  

    const [jobs, setjobs] = useState([]);
    const [searchVal, setsearchVal] = useState('');
    const [locationVal, setlocationVal] = useState('');
    const [sortingval,setsortingval] = useState('');
     // Notification state
    
    //pagination
    const [n, setn] = useState(1);
    let [paginationNumberCount, setpaginationNumberCount] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);



    useEffect(() => {
            fetchJobs(`${RecruiterPostJobBaseURL}datatable?token=${RecruiterID}&title=${searchVal}&address=${locationVal}&sort=${sortingval ? sortingval : 'createdAt'}:desc`,{
                headers: {
                   'Authorization': `Bearer ${Token}`
              }
              });
            if(paginationNumberCount === 1 || paginationNumberCount < n){
                setn(1)
              }
              scrollToTop()
    }, [searchVal,locationVal, n,sortingval,paginationNumberCount]);


    const fetchJobs = async (url) => {
        try {
            let response = await axios.get(url ,{
                headers: {
                   'Authorization': `Bearer ${Token}`
              }
              });
            if (response.status === 200) {
                setjobs(response.data.data.records);
                setShow(true)
                let len = response.data.data.records?.length
                setpaginationNumberCount(Math.ceil(len / 10));                
                setTotalJobs(response.data.data.totalCount)
            }
        } catch (err) {
            toast.error(err.message);
        }
    }
    const handleChange = (e) => {
        setsearchVal(e.target.value)
        setn(1)
    }
    const handleChangeLocation = (e) => {
        setlocationVal(e.target.value)
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
        let url = `${RecruiterPostJobBaseURL}${id}`
        if(confirm('Data Will Be Permanently Deleted.')){
            toast.loading("Wait..")
            try{
            let response = await axios.delete(url,{data : {"deleteBy" : id,"deleteWho":"recruiter"}, headers:{
                'Content-type': 'application/json',
                'Authorization': `Bearer ${Token}`
            }})

            if(response.status===200){
                toast.dismiss()
                toast.success("Deleted.");
                fetchJobs(`${RecruiterPostJobBaseURL}datatable?token=${RecruiterID}&search=${searchVal}&sort=${sortingval ? sortingval : 'createdAt'}:desc`,{
                    headers: {
                       'Authorization': `Bearer ${Token}`
                  }
                  });
            }
                

            }catch(err){
                toast.error(err.message)
            }
        }
    }


    const SwitchPage = (e) =>{
		setn(parseInt(e.target.value))
	}

    // console.log(jobs)
   //  DOWNLOAD CSV FILE OF ALL USERS
   let headers = [
     { label: "Title", key: "title" },
		{ label: " Report Address", key: "reportAddress" },
		{ label: "Status", key: "status" },
		{ label: "Applicants", key: "totalApplied" },
		{ label: "Start Date", key: "startDate" },
		{ label: "Last Date to Apply", key: "deadlineDate" },

	  ]
    return (
        <>
            <Head>
                <title>Recruiter Job Management - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            {/* <Jobheader showData3={false} /> */}

            <div className='jp-admin-wrapper RecruiterDashboardJobs'>
                <Jobportalaside />
                <MessageTab />
                <section className='jobportal-right-section '>
                <div className="setbellicon">
      <h3>Jobs</h3>
                  <Notification/>
                  </div>
                    <div className='search-filter-box mb-4'>
                        <div className='search-filter'>
                            <input type='text' placeholder='Search Job Title' onChange={handleChange} />
                            <i><img src="/img/job_portal/search_icon.svg" /></i>
                        </div>
                        <div className='search-filter'>
                            <input type='text' placeholder='Search Location' onChange={handleChangeLocation} />
                            <p className='heading05'><i>< CiLocationOn /></i></p>
                        </div>
                        {/* <div className='select-filter'>
                            <span>Sort by :  </span>
                            <select onChange={(e)=>setsortingval(e.target.value)}>
                                <option value="createdAt">Posting Date</option>
                                <option value="title">Job Title</option>
                                <option value="recruiterName">Recruiter Name</option>
                                <option value="companyName">Company Name</option>
                            </select>
                        </div> */}
                    </div>

                        
                        {
                            jobs && jobs.length > 0 ? 
                    <CSVLink className="downloadbtn cms-btn edit-box add-btn" filename="jobs.csv" data={jobs} headers={headers}>  Export to CSV </CSVLink> : ''
                        }
                    <div className='education-list custom-scrollbar'>
                        <table cellPadding="0" cellSpacing="0" className='jp-table em-table'>
                            <thead>
                                <tr>
                                    <th><p>Id</p></th>
                                    <th><p>Job Title</p></th>
                                    <th><p>Location</p></th>
                                    <th><p>Status</p></th>
                                    <th><p>Applicants</p></th>
                                    {/* <th><p>Date of posting</p></th> */}
                                    <th><p>Reporting Date</p></th>
                                    <th><p>Last Date to Apply</p></th>
                                    <th><p>Delete</p></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    show ?
                                        <>
                                            {
                                                jobs ? jobs?.slice(n * 10 - 10, n * 10).map((job, ind) => {
                                                    const { title, createdAt, startDate, noOfHiring, _id, totalApplied, deadlineDate, status , recruiterName ,approveAdmin, companyName , reportAddress} = job;
                                                    
                                                    let startD = new Date(startDate).toString().split(' ').slice(0, 4).join(' ');
                                                    let deadlineD = new Date(deadlineDate).toDateString().split(' ').slice(0, 4).join(' ');
                                                    let deadLineDate = deadlineDate?.split("T")[0];
                                                    let compareExpired = new Date(deadlineDate).getTime() < new Date(new Date().toLocaleDateString()).getTime();                                                  

                                                        return (
                                                            <tr>
                                                                <td>
                                                                    <p>{`${(ind + 1) + (10*(n-1)) }`}</p>
                                                                </td>
                                                                <td><p><strong>{title}</strong> <br /></p></td>
                                                                <td><p style={{maxWidth:"50rem"}}>{reportAddress !=="Null"? reportAddress :"Address not added."}</p></td>
                                                                <td><p>{approveAdmin? status : ""}</p> <p style={{color : "red"}}>{approveAdmin ? '' : 'Not Approved'}</p></td>
                                                                <td><p>{totalApplied}</p></td>
                                                                <td><p>{startD==='Invalid Date' ? 'Not Applicable' : startD}</p></td>
                                                                <td><p>{deadLineDate === undefined ? 'Not Applicable' : deadLineDate}</p>  <p style={{color : "red"}}>{compareExpired ? 'Job Expired' : ''}</p></td>
                                                                <td>
                                                                    <p onClick={()=>handleDelete(_id)}><a className='btn maroon-btn cm-btn'><RiDeleteBin6Line /></a></p>
                                                                </td>
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
			jobs?.length >1 &&	paginationNumberCount > 1
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


            <Jobfooter />
        </>
    )
}
export default AuthorizeRec(RecruiterDashboardJobs)