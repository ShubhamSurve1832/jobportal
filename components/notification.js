import React,{useEffect,useState} from "react";
import axios from "axios";
import { BsBell } from 'react-icons/bs';
import NotificationTab from "../job/RecruiterDashboardNotificationTab";
import secureLocalStorage from 'react-secure-storage';
import {jobPortalBaseURL} from '../constants/urlConstants'
const Notification = () => {
    let RecruiterID = secureLocalStorage.getItem('RecID');
    let Token = secureLocalStorage.getItem('RecruiterToken');
    let [NotificationCount,setNotificationCount] = useState(0)
    const [notificationPopup, setNotificationPopup] = useState(false)
    let handleClosePopup = () => {
        setNotificationPopup(false)
    }
        // NOTIFICATION COUNT
  useEffect(()=>{
    const intervalId = setInterval(() => {
    fetchNotification()
  }, 8000); 
  return () => clearInterval(intervalId);
  },[])

  let fetchNotification = async () => {
    try{
let res = await axios.get(`${jobPortalBaseURL}notification/count-unread/${RecruiterID}`,{
  headers: {
     'Authorization': `Bearer ${Token}`
}
})
// console.log("res",res?.data?.data)
setNotificationCount(res?.data?.data)
    }catch(err){
console.log("massage notification erro",err)
    }
  }
  
     // NOTIFICATION SEEN 
  let seenNotification = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${Token}`
      }
    };
    try{
      let res = await axios.patch(`${jobPortalBaseURL}notification/update-unread/${RecruiterID}`,{},config)
      // console.log("massage seen",res)
      setNotificationCount(0)
    } catch(err){
console.log(err)
    }
  }

  return (
    <>      
  
      <div
        className="icon pointer"
        onClick={() =>
          setNotificationPopup(() => (notificationPopup ? false : true))
        }
      >
        <BsBell onClick={seenNotification} />
        <span class="cart-length">
          {NotificationCount ? NotificationCount : 0}
        </span>
      </div>
      
      {
                notificationPopup &&
                <NotificationTab closePopup={handleClosePopup} />

            }
 
    </>
  );
};

export default Notification;
