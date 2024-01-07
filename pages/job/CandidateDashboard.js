import React from 'react'
import Head from "next/head";
import Image from 'next/image';
import Jobfooter from "./JobFooter";
import { CgProfile } from "react-icons/cg";
import { AiFillCamera } from "react-icons/ai";
import AuthorizeCandidate from '../../job/AuthorizeCandidate/AuthorizeCan';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'react-hot-toast';
import { CandidateJobPortalApiBaseURL, jobPortalBaseURL, urlConstants } from '../../constants/urlConstants';
import Link from 'next/link';
import 'react-responsive-modal/styles.css';
import  Modal  from 'react-responsive-modal';
// import OfferSection from '../../home/OfferSection'


const CandidateDashboard = () => {
  let Token = secureLocalStorage.getItem('CandidateToken');
  let CandidateID = secureLocalStorage.getItem('Candidate');
  let [CandidateData,setCandidateData] = useState({});

  // Message Notification state
  let [messageCount,setMessageCount] = useState(0)
  let [newMessageCount,setNewMessageCount] = useState(null)
  // console.log("CandidateData",CandidateData)
  // console.log("NewmessageCount",newMessageCount)

//OFFER ROW PAGE DATA
const [offerData, setOfferData] = useState({
  offerRow: {},
});
useEffect(() => {
  axios({
    method: "get",
    url: urlConstants.indexData,
    responseType: "json",
  })
    .then((res) =>
      setOfferData((prevState) => ({ offerRow: res.data.offerRow }))
    )
    .catch((err) => console.log("error is ", err.message));
}, []);

  useEffect(()=>{
    fetchAllData();
    fetchSavedandApplieDJob();
    fetchNotification()
  },[])


  //fetchAllData
  const fetchAllData = async() =>{
    try{
      let response = await axios.get(`${CandidateJobPortalApiBaseURL}/${CandidateID}`,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      });
      if(response.status===200){
        setCandidateData({
        "addresses":response.data?.data.addresses[response.data?.data.addresses.length-1],
        "education": response.data?.data.education,
        "experiences":response.data?.data.experiences,
        "certificates":response.data?.data.certificates[response.data?.data.certificates.length-1]?.file,
        "firstName": response.data?.data?.firstName,
        "lastName": response.data?.data?.lastName,
        "email": response.data?.data?.email,
        "password": response.data?.data?.password,
        "termsConditions": response.data?.data?.termsConditions,
        "curriculumVitae": response.data?.data?.curriculumVitae,
        "updatedAt" : response.data?.data?.updatedAt,
        "phoneNo": response.data?.data?.phoneNo,
        "recommendationSets": response.data?.data?.recommendationSets,
        "skillSets": response.data?.data?.skillSets,
        "avatar":response.data?.data?.avatar,
        "isPhoneVerified" : response.data?.data?.isPhoneVerified ? response.data?.data?.isPhoneVerified : false
        })
      }
    }catch(err){
      toast.error(err.message);
    }
  }






  //calculatePercentage
  let [count,setcount] = useState(0);
  const calculatePercentage = () =>{
    let percentage = 0; 
    let isPhoneVerified = 5;
    let firstName = 3;
    let lastName = 2;
    let email = 5;
    let phone = 5;
    let skill = 5;
    let avatar = 5;
    let address = 10;
    let education = 20;
    let experience = 10;
    let certificates = 10;
    let cv = 20;
    
    if(CandidateData.firstName){
      percentage+=firstName;
    }


    if(CandidateData.lastName){
      percentage+=lastName;
    }


    if(CandidateData.email){
      percentage+=email;
    }


    if(CandidateData?.isPhoneVerified){
      percentage+=isPhoneVerified;
    }


    if(CandidateData.phoneNo){
      percentage+=phone;
    }


    if(CandidateData.skillSets){
      percentage+=skill;
    }


    if(CandidateData.avatar){
      percentage+=avatar;
    }


    if(CandidateData?.addresses?.country){
      percentage+=address;
    }

    if(CandidateData?.education?.length > 0){
      percentage+=education;
    }

    if(CandidateData?.experiences?.length > 0){
      percentage+=experience;
    }

    if(CandidateData?.certificates?.length > 0){
      percentage+=certificates;
    }

    if(CandidateData.curriculumVitae){
      percentage+=cv;
    }

    setcount(percentage)
  }

  

  setTimeout(() => {
    if(CandidateData){
      calculatePercentage();
    }
  }, 0);





  //HandleProfileChange
  const HandleProfileChange = (e) =>{
    let {name,value,files} = e.target;
    const allowedTypes = ["image/jpeg", "image/png"];
    if(files[0]?.name){
      if(allowedTypes.includes(files[0].type)){
        UploadProfile({file : files[0]});
        toast.success('Uploading...');
      }else{
        toast.error("File size is big, please select a file less than 5mb")
      }
    }else{
      toast.error('Nothing selected..!')
    }
  }



  //UploadProfile
  const UploadProfile = async(profileImage) =>{
    try{
      let response = await axios.patch(`${CandidateJobPortalApiBaseURL}/avatar/${CandidateID}`,profileImage,{
        headers:{
          "Content-Type" : "multipart/form-data",
          'Authorization': `Bearer ${Token}`
        }
      });
      if(response.status===200){
        toast.success("Profile Photo Updated")
        fetchAllData();
      }
    }catch(err){
      toast.error(err.message)
    }
  }




  //handleResumeChange
  const handleResumeChange = (e) =>{
    let {name,value,files} = e.target;

    const allowedTypes = ["application/pdf"];
    // const allowedTypes = ["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

    
   if(files[0]?.name){
    let size = files[0] ? Math.round(files[0].size / 1024) : ""
		if (size > 5120) {
		  toast.error("File size is big, please select a file less than 5mb")
		}else{
      
			if(allowedTypes?.includes(files[0]?.type)){
        UploadResume({file : files[0]});
        // toast.success('Uploading...');
			}else{
				toast.error("Supported Formats: pdf, upto 5 MB")
				// toast.error("Supported Formats: doc, docx, rtf, pdf, upto 5 MB")
			}

		} 
   }else{
    toast.error("Nothing Selected.!")
   }



    

  }


  //UploadResume
  const UploadResume = async(Resume) =>{
    toast.loading('Updating...');
    try{
      let response = await axios.patch(`${CandidateJobPortalApiBaseURL}/curriculum-vitae/${CandidateID}`,Resume,{
        headers:{
          "Content-Type" : "multipart/form-data",
          'Authorization': `Bearer ${Token}`
        }
      });
      if(response.status===200){
        toast.dismiss();
        toast.success("Resume Uploaded")
        fetchAllData();
      }
    }catch(err){
      toast.dismiss();
      toast.error(err.message);
    }
  }




  //handleEdit
  const handleEdit = () =>{
    secureLocalStorage.setItem('mode','edit');
  }


  //handleDeleteResume
  const handleDeleteResume = async() =>{
     if(CandidateData?.curriculumVitae){
      if(confirm("Want To Remove Resume ?")){
        toast.loading('Removing Resume...')
        try{
          let response = await axios.delete(`${CandidateJobPortalApiBaseURL}/curriculum-vitae/${CandidateID}`,{
            headers: {
               'Authorization': `Bearer ${Token}`
          }
          });
          if(response.status===200){
            toast.dismiss();
            toast.success("Resume Removed.!")
            fetchAllData();
          }
         }catch(error){
          toast.dismiss();
          toast.error("Failed To Delete Resume.!");
         }
       }
     }else{
      toast.error("Nothing To Delete")
     }
  }






  let [savedCount,setSavedCount] = useState(0);
  let [AppliedCount,setAppliedCount] = useState(0);
  //fetch saved and applied jobs
  let fetchSavedandApplieDJob = () =>{
    let apis = [`${jobPortalBaseURL}apply/count/${CandidateID}`,`${jobPortalBaseURL}favourite/count/${CandidateID}`]
    apis.map(async(url,ind)=>{
      try{
  // console.log(Token)

        let response = await axios.get(url,{
          headers: {
             'Authorization': `Bearer ${Token}`
        }
        });
        if(response.status===200){
          if(ind===0){
            setAppliedCount(response.data.data)
          }else{
            setSavedCount(response.data.data)
          }
        }
      }catch(error){
        console.log(error.message)
      }
    })
  }





  
  //cv
  let CVName =  CandidateData?.curriculumVitae && CandidateData?.curriculumVitae?.split('document/')[1].split('%20').join(' ').split('_')[0].split('%')[0]
  let CVExtension = CandidateData?.curriculumVitae && CandidateData?.curriculumVitae?.split('.')[5]



  //certificates
  let CertificateName =  CandidateData?.certificates && CandidateData?.certificates?.split('document/')[1].split('%20').join(' ').split('_')[0].split('%')[0]
  let CertificateExtension = CandidateData?.certificates && CandidateData?.certificates?.split('.')[5]




  //open Profile Photo
  const [open, setOpen] = useState(false);

  const onOpenModal = () =>{
    setOpen(true)

  };
  const onCloseModal = () => setOpen(false);

  let tryagaincount = 1;

  let [EmailVerified,setEmailVerified]=useState(false);
  let [OTP,setOTP] = useState('');
  let [OTPERROR,setOTPERROR] = useState('');
  let [verifyId,setverifyId] = useState('');
  const SendOTP = async(email) =>{

    if(email!=='' || email!=='undefined'){
      setEmailVerified(true)

        try{
          let Credential = {
           "email" : email
        }

        
        let response = await axios.post(`${jobPortalBaseURL}user/email-otp`,Credential,{
          headers : {
            "Content-Type" : "application/json",
            'Authorization': `Bearer ${Token}`
          }
        })
        
        if(response.status===200){
          // console.log(response);
              toast.success(`OTP Sent On ${email}`);
              setverifyId(response.data.data.otp)
        }

        }catch(error){
          tryagaincount=tryagaincount-1;
          if(tryagaincount>0){
            SendOTP(CandidateData.email)
          }else{
            toast.error(`Failed To Send OTP On ${email}..!`)
            console.log(error);
          }
        }
    }
  }


  const handleVerifyOTP = async(e) =>{
    e.preventDefault();
    
    if(OTP==='' || OTP.length<4 || OTP.length>4){
      setOTPERROR(`Enter 4 Digits OTP Sent On ${CandidateData?.email}`)
    }else{
       if(+OTP===verifyId){
            try{
              let res = await axios.patch(`${jobPortalBaseURL}user/email-verify/${CandidateID}`,{"isEmailVerify" : true},{headers:{"Content-Type" : "application/json",'Authorization': `Bearer ${Token}`}});
              if(res.status===200){
                toast.success('OTP Verified')
                fetchAllData();
              }
            }catch(error){
              console.log(error);
            }
       }else{
        toast.error("Wrong OTP")
        setOTPERROR(`Enter 4 Digits OTP Sent On ${CandidateData?.email}`)
       }
    }
    
  }

  // MASSAGE NOTIFICATION

  let fetchNotification = async () => {
    try{
      let res = await axios.get(`${jobPortalBaseURL}tweet/message-count-read/${CandidateID}`,{
      headers: {
     'Authorization': `Bearer ${Token}`
      }
    })
setMessageCount(res?.data?.data[0]?.count)
    }catch(err){
console.log("massage notification erro",err)
    }
  }
  
  let msgSeenHandler =()=>{
    seenNotification()
  }
  // MESSAGE SEEN 
  let seenNotification = async () => {
    let config ={
      "Authorization": `Bearer ${Token}`
    }
    try{      
      let res = await axios.patch(`${jobPortalBaseURL}tweet/message-update-read/${CandidateID}`,{},{
        headers: config
      })
      // console.log("massage seen",res)
      setNewMessageCount(res?.data?.data[0]?.count)
    } catch(err){
console.log(err)
    }
  }
	return (
		<>
          
			<Head>
				<title>Candidate DashBoard - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>
			{/* <Jobheader showData3={true} /> */}
      {/* <OfferSection indexData={offerData.offerRow} /> */}
      <div className='cand-dashboard'>
        <section className='cand-dash-top'>
          <div className='container-l'>
            <div className='cand-head'>
              <h3 className='heading03 theme-color'>Candidate Dashboard</h3>
              <Link href="/job/CandidateMessageSection" className='msg-btn' onClick={msgSeenHandler}>
                <img src="/img/msg_icon.svg"  alt='' />
                <span class="cart-length">{newMessageCount === 0 ? newMessageCount : messageCount}</span>
                Messages</Link>
                
            </div>

            <div className='cd-top-row'>
              <div className='cd-top-left'>
                <div className='cnd-profile'>
                  <div className='edit-pro-box'>
                    <i className='profile-img'>{CandidateData.avatar==undefined ? <img src='https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=' alt="" /> : <img src={CandidateData.avatar}  alt="" />}</i>
                    <button className='edit-profile' onClick={onOpenModal}>
                      <span><AiFillCamera/></span>
                      <input type='file' id='profileImage' accept='jpeg jpg png' onChange={HandleProfileChange}/>
                    </button>
                  </div>
                </div>
          
                <div className='cnd-info'>
                  <div className='cnd-info-top'>
                    <div className='left-box'>
                      <h4 className='fz-28 fw-m'>{CandidateData.firstName || CandidateData.firstName ? CandidateData.firstName + " " + CandidateData.lastName : 'No Name'}</h4>
                      <p><i><img src='../img/location_icon.svg'/></i><span>{CandidateData.addresses ? `${CandidateData?.addresses.street}, ${CandidateData.addresses.city}, ${CandidateData.addresses.state?.split('-')[0]}, ${CandidateData.addresses.country?.split('-')[0]}, ${CandidateData.addresses.postalCode}` : 'Not Available'}</span></p>


                      {
                        CandidateData?.isPhoneVerified
                           ?
                         <p><i><img src='../img/email_icon.svg'/></i><a href={`mailto:${CandidateData?.email}`}>{CandidateData?.email ? CandidateData?.email : 'Not Avaibale'} <span>( Verified )</span></a></p>  
                          :
                          <div className='pointer'>
                            {!EmailVerified 
                                ? 
                            <p  onClick={()=>SendOTP(CandidateData?.email)}><i><img src='../img/email_icon.svg'/></i><a>{CandidateData?.email ? CandidateData?.email : 'Not Avaibale'} <span style={{fontWeight : "bold"}}>( Click To Verify )</span></a></p>
                               :
                             <form onSubmit={handleVerifyOTP}>
                               <div className="input_field mt-4">
                                  <input
                                    type="number"
                                    name="OTP"
                                    pattern="[0-9]"
                                    className="w-100"
                                    placeholder="Enter OTP"
                                    onChange={(e)=>setOTP(e.target.value)}
                                    value={OTP}
                                  />
                                  <br />
                              </div> 
                              {
                                OTPERROR && <span className="danger" style={{background : "rgba(0,0,0,.5)",padding : "6px 10px" , width : "auto%" , textAlign : "center", borderRadius:"2rem",marginTop:"1.3rem" }}>{OTPERROR}</span>
                              }
                                    
                              <div className={`input_field ${OTPERROR ?"mt-6" :"mt-2" } `}>
                                  <input
                                    type="submit"
                                    value="Verify"
                                    className='w-100 text-center btn maroon-btn maroon-btn-arrow'
                                  />
                              </div> 

                             </form>
                               }
                          </div>
                      }

                      
                      <p><i><img src='../img/phone_icon.svg'/></i><a href={`tel:${CandidateData?.phoneNo}`}>{CandidateData?.phoneNo ? CandidateData?.phoneNo : 'Not Available'}</a></p>
                    </div>
                    <div className='edit-box' onClick={handleEdit}>
                      <Link href='/job/CandidateBasicInfo' className='edit-btn'>Edit</Link>
                    </div>
                  </div>
                  <div className='cnd-info-bottom'>
                    <p className='fw-m'>
                      <span>Profile completed</span>
                      <span>{count}%</span>
                    </p>
                    <div className='progess-bar'>
                      <span className='progess-bar-status' style={{width:`${count}%`}}></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='cd-top-right'>
               {
                 CandidateData?.phoneNo==="" || CandidateData?.addresses?.street==='' || !CandidateData?.curriculumVitae || !CandidateData?.certificates || CandidateData?.avatar==='' ? 
                <div>
                <h4 className='fz-28 fw-m'>Pending Actions</h4>
                {
                  CandidateData.termsConditions === true ?
                  <ul>
                  {CandidateData?.phoneNo===undefined?<li> Verify Mobile Number</li>:""}
                  {CandidateData?.addresses ===undefined ?<li>Add Preferred Location</li>:""}
                  {CandidateData?.curriculumVitae=== undefined ?<li>Add Resume</li> :""}
                  {CandidateData?.certificates === undefined ?<li>Add Certificates</li> :""}
                  {CandidateData?.avatar===undefined ? <li>Upload Photo</li> :""}
                </ul>
                :
                ""
                }
              </div> : <div><h4 className='fz-28 fw-m'>{count === 100 ? "Profile Completed" : "Almost Done"}</h4></div>
               }
                <div className='view-box'>
                  <div className='view-count'>
                    <p className='fz-28 fw-m'>{savedCount}</p>
                    <p>Saved Jobs</p>
                    <p><Link href='/job/SavedJobs'>View All</Link></p>
                  </div>
                  <div className='view-count'>
                    <p className='fz-28 fw-m'>{AppliedCount}</p>
                    <p>Applied Jobs</p>
                    <p><Link href='/job/AppliedJob'>View All</Link></p>
                  </div>
                </div>
              </div>
            </div>

            <div className='cd-row'>
              <div className='cd-row-left'>
                <h4 className='fz-28 fw-m'>Resume</h4>
                <p>Resume is the most important document recruiters look for. Recruiters generally do not look at profiles without resumes.</p>
              {CandidateData?.curriculumVitae  ?   <p className='upload-date'><span className='fw-m'>{CandidateData.curriculumVitae && CVName.includes('.') ? CVName : CVName+"."+CVExtension} :</span> Uploded on {CandidateData?.updatedAt ? new Date(CandidateData?.updatedAt)?.toString()?.split(' ')?.slice(0,4)?.join(' ') + " " + new Date(CandidateData?.updatedAt).toLocaleTimeString() : ''}</p> : <p style={{color : "#760B28"}}>Upload Your Resume.</p>}
                <div className='upload-box'>
                  <button className="custom-upload-btn">
                    <input type="file" id='PdfInput' name="" onChange={handleResumeChange} className='w-100'/>
                    <span onClick={()=>document.getElementById('PdfInput')}>Upload Resume</span>
                  </button>
                  <p>Supported Formats: pdf, upto 5 MB</p>
                  {/* <p>Supported Formats: doc, docx, rtf, pdf, upto 5 MB</p> */}
                </div>
              </div>
              <div className='cd-row-right' style={{paddingTop: "4.5rem"}}>
                {/* <button className='delete-icon' onClick={()=>handleDeleteResume()}><img src="../img/delete_icon.svg"/></button> */}
                <a href={CandidateData.curriculumVitae} className='dwn-icon' download={CandidateData.curriculumVitae}><img src="../img/download_icon.svg"/></a>
              </div>
            </div>

            <div className='cd-row'>
            <div className='cd-row-left'>
           <h4 className='fz-28 fw-m'>Education</h4>
           {
                            CandidateData?.education?.length>0 ? CandidateData.education.map((data,ind)=>{
                                return(
                                    <div className='previewpara'>
                                        <p><strong>{ind+1 + ')'}  Level of Education : </strong>{data.level}</p>
                                        {data?.fieldStudy && <p><strong>Field of Study : </strong>{data.fieldStudy}</p>}
                                       {data.board && <p><strong>Board : </strong>{data.board}</p>}
                                        <p><strong>School Name : </strong>{data?.instituteName}</p>
                                        {data?.course && <p><strong>Course : </strong>{data?.course}</p>}
                                        {data?.courseType && <p><strong>Course Type : </strong>{data?.courseType}</p>}
                                        {data?.courseSpecialization && <p><strong>Course Specialization : </strong>{data?.courseSpecialization}</p>}
                                        {data?.certificate && <p><strong>Certificate : </strong>{data?.certificate?.split('document/')[1]?.split('%20').join('-')}</p>}

                                        <p><strong>Passing Year : </strong>{data.passingYear}</p>
                                        {/* <p>May 2020 To April 2022</p> */}<br/><br /><br /><br />
                                    </div>
                                )
                            }) : <p style={{color : '#760B28'}}><strong>Education Not Added Yet.</strong></p>
                        }
                               </div>
             
              <div className='cd-row-right' onClick={handleEdit}>
              <Link href='/job/CandidateMoreEducation' className='edit-btn'>Edit</Link>
              </div>
            </div>

            <div className='cd-row w-e'>
            <h4 className='fz-28 fw-m'>Work Experience</h4>
             {
              CandidateData?.experiences?.length>0 ? 

              CandidateData.experiences.map((data,ind)=>{
                return(
                  <>
                   <div className='cd-row-left'>
                      <p><strong>Job Title : </strong>{data.jobTitle ? data.jobTitle : 'No Job Title'}</p>
                      <p><strong>Company Name : </strong>{data.companyName ? data.companyName.toUpperCase() : 'No Name'}</p>
                      <p><strong>Time Period : </strong> {data.fromMonth && data.fromMonth} {data.fromYear && data.fromYear} to {data.currentlyWorking ? 'Present' : data.toYear && data.toYear}</p>
                    </div>
                  </>
                )
              })

              : <p style={{color : '#760B28'}}><strong>Experience Not Added Yet.</strong></p>
             }
              <div className='cd-row-right' onClick={handleEdit}>
                 <Link href='/job/CandidateWorkExperience' className='edit-btn'>Edit</Link>
              </div>
            </div>

            <div className='cd-row'>
              <div className='cd-row-left'>
                <h4 className='fz-28 fw-m'>Skills</h4>
                <div className='btn-box'>
                  {
                    CandidateData.skillSets ? 
                    CandidateData.skillSets.split(',').map((data,ind)=>{
                      return(
                        <button className='btn'>{data}</button>
                      )
                    }) : <p style={{color : '#760B28'}}><strong>Skills Not Added Yet.</strong></p>
                  }
                </div>
              </div>
              <div className='cd-row-right' onClick={handleEdit}>
                 <Link href='/job/CandidateSkill' className='edit-btn'>Edit</Link>
              </div>
            </div>

            <div className='cd-row'>
              <div className='cd-row-left'>
                <h4 className='fz-28 fw-m'>Certification</h4>
                {
                  CandidateData?.certificates 
                  ?
                  <p className='fw-m' style={{color : "#760B28"}}>{CandidateData.certificates ? CertificateName.includes('.') ? CertificateName : CertificateName+"."+CertificateExtension : 'No Certificates'}</p>
                  :
                  <p style={{color : '#760B28'}}><strong>Certificate Not Added Yet.</strong></p>
                }
                <div className='course-inst'>
                  <i>
                    {/* <img src="../img/course_icon.png" alt=''/> */}
                  </i>
                  {/* <p>
                    <span>Udemy</span>
                    <span>Valid from Nov '22. Does not expire.</span>
                    </p> */}
                </div>
              </div>
              <div className='cd-row-right' onClick={handleEdit}>
              <Link href='/job/CandidateSkill' className='edit-btn'>Edit</Link>
              </div>
            </div>

          </div>
        </section>
      </div>
     
			<Jobfooter />

          {/* //modal for profile photo  */}
          <div className='model-class'>

          <Modal open={open} onClose={onCloseModal} center>
                  <img style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px" , borderRadius : "99%" , height : "350px" , width : '350px' , objectFit : "contain"}} src={CandidateData.avatar ? CandidateData.avatar : 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='} /><br /><br />
                <center>
                  <div className='cd-row-right' onClick={()=>document.getElementById('profileImage').click()}>
                      <button className='edit-btn'>Update</button>
                  </div>
                </center>
                </Modal>
          </div>



      
		</>
	)
}
export default AuthorizeCandidate(CandidateDashboard)