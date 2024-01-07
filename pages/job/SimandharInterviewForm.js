import React, { useEffect, useState } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-hot-toast";
import { jobPortalBaseURL,InterviewJobPortalBaseURL } from "../../constants/urlConstants";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from 'next/router';

const SimandharInterviewForm = (props) => {
  let Token = secureLocalStorage.getItem('RecruiterToken');
  const [show , setShow] = useState(false)
  const [values, setValues] = useState({
    candidateId: props.CandidateID,
    jobId : props.jobId,
    candidateName: props.candidateName,
    interviewDate: "",
    interviewTime: "",
    interviewLink: "",
    interviewAddress:"",
    description: "",
    interviewMode:"",
    createdBy: secureLocalStorage.getItem("RecID"),
  });

  
  console.log(values)
  console.log(values.interviewDate)
// REFRESH PAGE FOR NEW DATA
const router = useRouter()
let handleRefresh = () =>{
    router.reload()
}

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  
  const today = new Date('Fri Jan 05 2024 18:23:49 GMT+0530 (India Standard Time)');
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 as months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`

  console.log("values.interviewDate",values.interviewDate)
  console.log("formattedDate",formattedDate)

  const onSubmit = async (e) => {
    setShow(true)
    e.preventDefault();
    const linkPattern =/^(http|https):\/\/.*\.*$/;
    let TodayTime = new Date(new Date())
    let todateDate = new Date(formattedDate).getTime();
    let compareDate1 = new Date(values.interviewDate).getTime() 
    let compareDate = new Date(values.interviewDate).getTime() < todateDate;
    console.log("todateDate",todateDate)
    console.log("compareDate1",compareDate1)

    
 console.log("TodayTimedate",values.interviewDate)
 console.log("compareDate",compareDate)
   if(compareDate) {
    setShow(false)
    toast.error("Please select valid date and time...")
   } else{
    //CHECKING MEET URL VALIDATION
    if(values.interviewLink && !values.interviewLink.match(linkPattern)){
      setShow(false)
      toast.error("Please add valid meeting link.")
      return;
    }
    // calclate time AM and Pm
    let time;
    console.log("time",time)
    let cr = values.interviewTime;
    // console.log("CR",cr)
    if (cr.toString().split(":")[0] > 12) {
      time = parseInt(cr) - 12 + ":" + cr.split(":")[1] + ":PM";
      // console.log("greater than 12",time)
    } else if(cr.toString().split(":")[0] == 12){
      time = parseInt(cr) + ":" + cr.split(":")[1] + ":PM";
      // console.log("equal to 12")
    } else{
      time = parseInt(cr) + ":" + cr.split(":")[1]+":AM";
      // console.log("less then 12")
    }

    let newData = { ...values, interviewTime: time };
    try {

      let response = await axios.post(
        jobPortalBaseURL + "interview/",
        newData,
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${Token}`
          },
        }
      );

      // console.log("response",response)
      // console.log("response data",response.data.message)


      if (response.data.statusCode === 201) {
        // console.log("First API Hitted")
         let id = await response?.data?.data?._id
        //  console.log(id)
        // console.log("First API Hitted 1")

         setShow(true)
         let data = {
          status : true
         }
            try{
              let res = await axios.patch(`${InterviewJobPortalBaseURL}interview-status/${id}`,data,{
                headers : {
                  "Content-Type" : "application/json",
                  'Authorization': `Bearer ${Token}`
                }
              })   
              if(res.status===200){
                setShow(true)
                toast.success("Interview Schedule");
                setValues({
                  candidateName: props.candidateName,
                  interviewDate: "",
                  interviewTime: "",
                  interviewLink: "",
                  description: "",
                  createdBy: secureLocalStorage.getItem("RecID"),
                });
                props.closePoup();                
                props.fetchallCandidate();
                // document.getElementById(props.CheckNoButtonOnInterviewSchduled).checked = false
                handleRefresh()

              } else {
                // console.log("line number 111")
              }
            }catch(error){
              setShow(false)
              toast.error("Please select valid date and time.");
              
              handleRefresh()
              console.log("error",error);             
            }      
      } else{
        // console.log("response")
        toast.error(response.data.message)
        setShow(false)
      }
    } catch (err) {
      setShow(false)
      toast.error("Interview Already Schedual..");
      // console.log("err at 100 line",err);
    }
  }
  };

  return (
    <>
      <div className="overlay jobportal-overlay"></div>
      <section className="notificationPopup SimandharInterviewForm">
        <div className="wrapper">
          <div className="popheading text-center">
            <p>Simandhar Interview Form</p>
            <p className="closeicon pointer" onClick={() => props.closePoup()}>
              <RxCross1 />
            </p>
          </div>

          <form onSubmit={onSubmit} className="form">
            <div className="form-feilds">
              <p>
                <input
                  type="text"
                  value={props.candidateName}
                  placeholder="Enter Candidate Name"
                  name="candidateName"
                />
              </p>
            </div>
            <div className="form-feilds">
              <p>
                <input
                  required
                  type="date"
                  placeholder="Enter Date (dd/mm/yyyy)"
                  value={values.interviewDate}
                  onChange={handleChange}
                  name="interviewDate"
                />
              </p>
            </div>
            <div className="form-feilds">
              <p>
                <input
                  required
                  type="time"
                  placeholder="Enter Date (dd/mm/yyyy)"
                  value={values.interviewTime}
                  onChange={handleChange}
                  name="interviewTime"
                />
              </p>
            </div>
            <div className="form-feilds">
            <select name="interviewMode" id="" onChange={handleChange}>
            <option selected >Select Mode</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            </select>
            </div>
            {
              values.interviewMode ==="online" ?  
              <>
              
              <div className="form-feilds">
              <p>
                <input
                  required
                  type="text"
                  placeholder="Interview Link"
                  value={values.interviewLink}
                  onChange={handleChange}
                  name="interviewLink"
                />
              </p>
            </div>
            <div className="form-feilds">
            <p>
              <input
                required
                type="text"
                placeholder="Enter Online Platform"
                value={values.description}
                onChange={handleChange}
                name="description"
              />
            </p>
          </div>
          </>
            :
            <>
            {

values.interviewMode ==="offline" ?
            <div className="form-feilds">
            <p>
              <input
                required
                type="text"
                placeholder="Interview Address"
                value={values.interviewAddress}
                onChange={handleChange}
                name="interviewAddress"
                />
            </p>
          </div> :""
          }
            </>
            }
           
            
            <button
              type="submit"
              className="btn maroon-btn maroon-btn-arrow mt-4"
              
            >
              {show ?  "Submitting..." : "Submit" }
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SimandharInterviewForm;
