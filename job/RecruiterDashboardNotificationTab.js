import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { RxCross1 } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import { jobPortalBaseURL } from '../constants/urlConstants'
import secureLocalStorage from 'react-secure-storage';
import Spinner from '../components/comman/Spinner';

const RecruiterDashboardNotificationTab = (props,NotifCount) => {
    let Token = secureLocalStorage.getItem('RecruiterToken');
    let RecruiterID = secureLocalStorage.getItem('RecID');
    let [show,setShow] = useState(false)    
    const [data, setData] = useState()
    useEffect(() => {
        fetchdata();
        getNotifCount()
    }, [])

    let fetchdata = async () => {
        try {
            let res = await axios.get(`${jobPortalBaseURL}notification/my/${RecruiterID}`,{
                headers: {
                   'Authorization': `Bearer ${Token}`
              }
              })
            // console.log("res.data",res.data)
            if (res.status === 200) {
                setData(res?.data?.data?.reverse())
                setShow(true)
            }

        } catch(err) {
            console.log(err.message);
        }
    }

    let getNotifCount= async ()=>{
        try {
            let res = await axios.get(`${jobPortalBaseURL}notification/count-unread/${RecruiterID}`,{
                headers: {
                   'Authorization': `Bearer ${Token}`
              }
              })
            if(res.status === 200){
                // console.log("Notification",res)
            }
        }catch(err){
            console.log(err)
        }
    }
    return (
        <>
         <div className="overlay"></div>
            <section className="notificationPopup">
                <div className="wrapper">
                    <div className="popheading text-center">
                        <p> Notifications</p>
                        <p className='closeicon pointer' onClick={() => props.closePopup()}><RxCross1 /></p>
                    </div>
                    {
                        show ?   
                    <div className="profilenotes custom-scrollbar">
                        {
                            data && data.slice(0,3).map((data, index) => {
                                // console.log(data)

                                return (
                                    <div className="firstnotification" key={index}>
                                        <span className='noteprofileicon'><CgProfile /></span>
                                        <p>{data.content} </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                        : 
                        <Spinner />
                    }
                    
                    <p  className='text-center'>
                        <Link href='/job/RecruiterDashboardNotificationPanel' className='btn maroon-border-btn next-btn'>Show More</Link>
                    </p>
                </div>
            </section>
        </>
    )
}

export default RecruiterDashboardNotificationTab