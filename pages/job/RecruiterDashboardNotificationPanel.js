import React, { useEffect, useState } from "react";
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-hot-toast";
import axios from "axios";
import { jobPortalBaseURL } from "../../constants/urlConstants";
import Link from "next/link";
import { differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";
import secureLocalStorage from "react-secure-storage";



const RecruiterDashboardNotificationPanel = () => {
  const [Notification, setNotification] = useState([]);
  
  let Token = secureLocalStorage.getItem('RecruiterToken')
  let recruiterId = secureLocalStorage.getItem('RecID')
  // console.log(recruiterId);
  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    try {
      let response = await axios.get(`${jobPortalBaseURL}notification/my/${recruiterId}`,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      });
      if (response.status === 200) {
        setNotification(response?.data?.data?.reverse());
      }
    } catch (error) {
      toast.error("Failed To Get Notification.");
    }
  };

  return (
    <>
      <Head>
        <title>Notifications - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      {/* <Jobheader showData3={false} /> */}
      <section className="section notificationsection">
        <div className="container">
          <h3 className="heading03">Notifications ({Notification?.length})</h3>
          <div className="notificationwrap custom-scrollbar mb-4">
            {Notification &&
              Notification.map((not, ind) => {
                const {content,createdAt} = not;
                // let date = new Date(createdAt).toLocaleDateString();
                // let date2 = new Date().toLocaleDateString();
                // let d1 = new Date(date)
                // let d2 = new Date(date2)
                // let DT = d2.getTime() - d1.getTime();
                // let DD = DT/(1000*3600*24);
                
                let Hours = differenceInHours(Date.now(),new Date(createdAt));
                
                return (
                  <div className="firstpanelNotification">
                    <span className="noteprofileicon">
                      <CgProfile />
                    </span>
                    <div className="notificationContent">
                      <p>{content}</p>
                      {Hours >=24 ? <span>{differenceInDays(Date.now(),new Date(createdAt))} days ago</span> : <span>{Hours} Hours ago</span>}
                    </div>
                  </div>
                );
              })}
          </div>
          <Link href='/job/RecruiterDashboardJobs' className="dashbordBtn mt-4">
            <p
              className="btn maroon-btn maroon-btn-arrow"
              style={{ verticalAlign: "middle" }}
            >
              <IoIosArrowBack style={{ verticalAlign: "middle" }} /> Back to
              dashboard{" "}
            </p>
          </Link>
        </div>
      </section>
      <Jobfooter />
    </>
  );
};

export default RecruiterDashboardNotificationPanel;
