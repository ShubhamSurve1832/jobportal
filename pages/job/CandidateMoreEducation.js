import React, { useEffect, useState } from "react";
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import CandidateJobProcess from "./CandidateJobProcess";
import { useRouter } from "next/router";
import AuthorizeCandidate from "../../job/AuthorizeCandidate/AuthorizeCan";
import axios from "axios";
import { CandidateJobPortalApiBaseURL, jobPortalBaseURL } from "../../constants/urlConstants";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-hot-toast";

const CandidateMoreEducation = () => {
  let Token = secureLocalStorage.getItem('CandidateToken');
    
 useEffect(()=>{
  let scrolltoEle = () =>{
    let ele = document.getElementById('TakeToProcess_ELEMENT_SKill');
    if(ele){
    setTimeout(() => {
      ele.click();
    }, 0);
  }
  }

  setTimeout(() => {
    scrolltoEle()
    window.scrollTo(0,0)
  }, 0);
 },[])


  let Id = secureLocalStorage.getItem('Candidate');
  let modeEdit = secureLocalStorage.getItem('mode');

  let [yearList,SetYearList] = useState([]);

  let CurrentYear = new Date().getFullYear();
  useEffect(()=>{
    for(let i=1980;i<=CurrentYear;i++){
      yearList.push(i);
    }
  },[])

  let { replace } = useRouter();

  let handleBack = () => {
    replace("/job/CandidateBasicInfo");
  };



  const [btnText,setBtnText] = useState('Save and Next');
  const [Educations, setEducation] = useState([
     {
        level: "",
        fieldStudy: "",
        instituteName: "",
        board: "",
        state: "",
        city: "",
        course : "",
        courseType : "",
        courseSpecialization : "",
        passingYear: "",
        certificate : ""
     }
  ]);






  //previous saved data
  useEffect(()=>{
    fetchPrevious();
  },[])




  //fetchPrevious
  const fetchPrevious = async() =>{
    try{
      let response = await axios.get(`${CandidateJobPortalApiBaseURL}/${Id}`,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      });
      if(response.status===200){
        if(response?.data.data.education.length){
          let newData = [...response?.data?.data?.education]
          newData.forEach((val,ind)=>{
            delete val["_id"]
          })

          setEducation([...newData])
        }
      }
    }catch(error){
      toast.error(err.message);
    }
  }




  //AddMoreEducation
  const AddMoreEducation = () =>{
   if(Educations.length<5){
    setEducation([
      ...Educations,
      {
        level: "",
        fieldStudy: "",
        instituteName: "",
        board: "",
        state: "",
        city: "",
        course : "",
        courseType : "",
        courseSpecialization : "",
        passingYear: "",
        certificate : ""
       }
    ])
    toast.success('Education Details Added Successfully.!')
    window.scrollTo(0,window.document.scrollingElement.scrollHeight);
   }else{
    toast.error("Can't Add More.!")
   }
  }









  //RemoveEducation
  const RemoveEducation = (e,ind) =>{
    // console.log("ind",ind)
    setEducation(()=>{
      return Educations.filter((data,id)=>{
        // console.log(data,id)
        return id!==ind
      })
    })
  }




  let [Error,setError] = useState("");

  //handleImageInputChange
  const handleImageInputChange = (e,ind) =>{
    const {name,value,files} = e.target;

		const allowedTypes = ["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

		let size = files[0] ? Math.round(files[0].size / 1024) : ""

		if (size > 5120) {
		  setError("File size is big, please select a file less than 5mb")
		}else{
			
			if(allowedTypes?.includes(files[0]?.type)){
				setError("")
        AddCertification({file : files[0]},ind);
			}else{
				setError("Supported Formats: doc, docx, rtf, pdf, upto 5 MB")
			}
			
		}

    if(!files[0]){
      toast.error("Nothing Selected.!")
    }
  }




  const AddCertification = async(data,ind)=>{
    toast.loading("Wait Uploading...")
    try{
      let response = await axios.post(`${jobPortalBaseURL}storage`,data,{
        headers:{
            "Content-Type" : "multipart/form-data",
            'Authorization': `Bearer ${Token}`
        }
    })
 
    if(response.status===200){
      toast.dismiss()
        toast.success("Certificate Uploaded Successfully.!")
        let newEducation = [...Educations];
        newEducation[ind]["certificate"] = response.data.data.path;
        setEducation(newEducation)
        
        
    }
    }catch(error){
      toast.error('Failed To Add Certificate.!')
    }
  }






  //onchange of form this function ill run
  let handleInputChange = (e,ind) =>{
    let {name,value} = e.target;

    let newArray = [...Educations];
    newArray[ind][name] = value;
    setEducation(newArray)
  }






  //SubmitEducationData this function will run
  const SubmitEducationData = (e) =>{
    e.preventDefault();

    let newData = Educations.map((data,ind)=>{
      return {...data,passingYear:+data.passingYear,id : secureLocalStorage.getItem('Candidate')}
    })
    
    PostData(newData);
  }








  //Post Data To Server 
  let PostData = async()=>{
    setBtnText('Posting...')
    let newData = Educations.map((data,ind)=>{
      return {...data,passingYear:+data.passingYear,id : secureLocalStorage.getItem('Candidate')}
    })

    try{
        let response = await axios.patch(`${CandidateJobPortalApiBaseURL}/education/${Id}`,newData,{
          headers:{
            "Content-Type" : "application/json",
            'Authorization': `Bearer ${Token}`
          }
        })
        if(response.status===200){
            toast.success("Education Details Updated Successfully..!")
            setBtnText('Save and Next')
            replace(`/job/${modeEdit!==null ? 'CandidateDashboard' : 'CandidateWorkExperience'}`)
        }
      }catch(error){
        toast.error(error.response.data.message ? error.response.data.message : error.message)
        setBtnText('Save and Next')
        console.log(error);

      }

    // console.log(newData);
  
  }














    //SkipProcess
	const SkipProcess = () =>{
		if(confirm("Want To Skip This Process ?")){
			replace('/job/CandidateWorkExperience')
		}
	}


  return (
    <>
      <Head>
        <title>Add Education - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      {/* <Jobheader showData3={true} /> */}
      
      <a href="#CandidateMoreEducationElement" id="TakeToProcess_ELEMENT_SKill">{null}</a>

      {
         modeEdit===null && 

      <div className="process-row">
        <div className="process-box">
          <dl className="active select">
            <dt>Upload CV</dt>
            {/* <dd className='number-box'>1</dd> */}
            <dd className="tick-box"></dd>
          </dl>
          <dl className="active select">
            <dt>Basic information</dt>
            {/* <dd>2</dd> */}
            <dd className="tick-box"></dd>
          </dl>
          <dl id="CandidateMoreEducationElement" className="active">
            <dt>Education</dt>
            <dd>3</dd>
          </dl>
          <dl>
            <dt>Work Experience</dt>
            <dd>4</dd>
          </dl>
          <dl>
            <dt>Certifications And Skills</dt>
            <dd>5</dd>
          </dl>
          <dl>
            <dt>Confirm</dt>
            <dd>6</dd>
          </dl>
        </div>
      </div>
      }
      <div className="process-container CandidateMoreEducation">
        <div className="form-box mt-0 head flex align-center space-between">
          <h3></h3>
          <button className="add-more-btn" onClick={AddMoreEducation}>
            + Add More Education
          </button>
        </div>







{/* //form is here  */}
        <form onSubmit={SubmitEducationData}>
          <div className="form-box mt-0">
                  <div className="head flex align-center space-between">
                    <h3>Education</h3>
                  </div>
          {
            Educations && Educations?.map((data,ind)=>{
              // console.log(data,ind)
              return(
                <>
                
                <div key={ind}>

                 {
                  ind<4 &&
                  <div className="input_field">
                  <input
                    type="text"
                    className="w-100"
                    maxLength="50"
                    minLength="2"
                    placeholder={ind===0 ? "E.g 10th" : ind===1 ? "E.g 12th": ind===2 ? "E.g Graduation" : ind===3 && "E.g Masters/PHD"}
                    name="levelHeading"
                    style={{fontWeight : "bold"}}
                    disabled
                  />
                </div>
                 }

                 {
                  ind<4 &&
                  <div className="input_field">
                  <input
                    type="text"
                    className="w-100"
                    maxLength="50"
                    minLength="2"
                    placeholder="Enter Education Level"
                    name="level"
                    value={data.level}
                    required
                    onInvalid={(e)=>{e.target.value==='' ? e.target.setCustomValidity("Education level is Requird.") : e.target.setCustomValidity("")}}
                    onInput={(e)=>e.target.setCustomValidity('')}
                    onChange={(e)=>handleInputChange(e,ind)}
                  />
                </div>
                 }

                 {
                  ind < 4 &&
                  <div className="input_field">
                  <input
                  style={{position:"relative"}}
                    type="text"
                    className="w-100"
                    placeholder={ind===0 || ind==1 ? "School Name" : "University/Institute"}
                    name="instituteName"
                    value={data.instituteName}
                    pattern="[A-Za-z ]{2,50}"
                    required
                    onInvalid={(e)=>{e.target.value==='' ? e.target.setCustomValidity(`${ind===0 || ind==1 ? "School Name is Required." : "University/Institute is Required."}`) : e.target.setCustomValidity("")}}
                    onInput={(e)=>e.target.setCustomValidity('')}
                    onChange={(e)=>handleInputChange(e,ind)}
                  />
                  
                  
                </div>
                 }

                 {
                  ind < 2  && 
                  <div className="input_field">
                    <input
                      type="text"
                      maxLength="50"
                      minLength="2"
                      className="w-100"
                      placeholder="Board"
                      name="board"
                      required
                      value={data.board}
                      onInvalid={(e)=>{e.target.value==='' ? e.target.setCustomValidity("Board is Required.") : e.target.setCustomValidity("")}}
                      onInput={(e)=>e.target.setCustomValidity('')}
                      onChange={(e)=>handleInputChange(e,ind)}
                    />
                    
                    <span className="title01" style={{position:"absolute",right:"0",fontSize:"1.8rem"}}>“If not applicable, type as NA”</span> 
                  
                </div>
                 }

                 {
                  ind===1 && 
                  <div className="input_field">
                  <input
                    type="text"
                    className="w-100"
                    maxLength="50"
                    minLength="2"
                    placeholder="Field Of Study"
                    name="fieldStudy"
                    required
                    value={data?.fieldStudy}
                    onInvalid={(e)=>{e.target.value==='' ? e.target.setCustomValidity("Field of Study is Required.") : e.target.setCustomValidity("")}}
                    onInput={(e)=>e.target.setCustomValidity('')}
                    onChange={(e)=>handleInputChange(e,ind)}
                  />
                </div>
                 }


                {
                  ind>1 && ind<4 &&
                  <>
                   <div className="input_field select-field">
                    <select
                      name="course"
                      value={data?.course}
                      required
                      onInvalid={(e)=>{e.target.value==='' ? e.target.setCustomValidity("Course is Required.") : e.target.setCustomValidity("")}}
                      onInput={(e)=>e.target.setCustomValidity('')}
                      onChange={(e)=>handleInputChange(e,ind)}
                    >
                     {
                      ind==2 ? 
                      <>
                       <option value="">Choose Course</option>
                      <option value="B.Sc">B.Sc</option>
                      <option value="BCom">BCom</option>
                      <option value="BAF">BAF</option>
                      <option value="BBA">BBA</option>
                      </> : 
                      <>
                       <option value="">Choose Course</option>
                      <option value="M.Sc">M.Sc</option>
                      <option value="MCom">MCom</option>
                      <option value="MBA">MBA</option>
                      <option value="MA">MA</option>
                      </>
                     }
                    </select>
                  </div>

                  <div className="input_field select-field">
                    <select
                      name="courseType"
                      required
                      value={data?.courseType}
                      onInvalid={(e)=>{e.target.value==='' ? e.target.setCustomValidity("Course Type is Required.") : e.target.setCustomValidity("")}}
                      onInput={(e)=>e.target.setCustomValidity('')}
                      onChange={(e)=>handleInputChange(e,ind)}
                    >
                      <option value="">Choose Course Type</option>
                      <option value="Regular">Regular</option>
                      <option value="Repeater">Repeater</option>
                    </select>
                  </div>

                  <div className="input_field select-field">
                    <select
                      name="courseSpecialization"
                      value={data?.courseSpecialization}
                      required
                      onInvalid={(e)=>{e.target.value==='' ? e.target.setCustomValidity("Course Specialization is Required.") : e.target.setCustomValidity("")}}
                      onInput={(e)=>e.target.setCustomValidity('')}
                      onChange={(e)=>handleInputChange(e,ind)}
                    >
                      <option value="">Choose Course Specialization</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Biology">Biology</option>
                      <option value="English">English</option>
                    </select>
                  </div>
                  </>
                }

                 {
                  ind<4 &&
                  <div className="input_field select-field">
                  <select
                    name="passingYear"
                    required
                    value={data?.passingYear}
                    onInvalid={(e)=>{e.target.value==='' ? e.target.setCustomValidity("Passing Year is Required.") : e.target.setCustomValidity("")}}
                    onInput={(e)=>e.target.setCustomValidity('')}
                    onChange={(e)=>handleInputChange(e,ind)}
                  >
                    <option value="">Passing Out Year</option>
                    {
                      yearList && yearList.map((y,ind)=>{
                        return(
                          <option value={y}>{y}</option> 
                        )
                      })
                    }
                  </select>
                </div>
                 }

                  

                  {/* //certification sections  */}
                {
                  ind===4 &&
                  <div className="form-box">
                 <div className="input_field">
                  <input
                    type="text"
                    className="w-100"
                    maxLength="50"
                    minLength="2"
                    placeholder="Certification Details"
                    name="levelHeading"
                    style={{fontWeight : "bold"}}
                    disabled
                  />
                </div>
                <div className="input_field">
                  <input
                    type="text"
                    className="w-100"
                    placeholder="University/Institute"
                    name="instituteName"
                    value={data.instituteName}
                    pattern="[A-Za-z ]{2,50}"
                    required
                    onInvalid={(e)=>{e.target.value==='' ? e.target.setCustomValidity("University/Institute is Required.") : e.target.setCustomValidity("")}}
                    onInput={(e)=>e.target.setCustomValidity('')}
                    onChange={(e)=>handleInputChange(e,ind)}
                  />
                </div>                
                  <div className="input_field select-field">
                    <select
                      name="passingYear"
                      value={data?.passingYear}
                      required
                      onInvalid={(e)=>{e.target.value==='' ? e.target.setCustomValidity("Passing Year is Required.") : e.target.setCustomValidity("")}}
                      onInput={(e)=>e.target.setCustomValidity('')}
                      onChange={(e)=>handleInputChange(e,ind)}
                    >
                      <option value="">Passing Out Year</option>
                      {
                        yearList && yearList.map((y,ind)=>{
                          return(
                            <option value={y}>{y}</option> 
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className="input_field upload-field custom-upload">
                    {
                      data.certificate ?
                      <input
                      type="file"
                      name="file"
                      className="w-100"
                      id="Certificate"
                      onChange={(e)=>handleImageInputChange(e,ind)}
                    /> :
                    <input
                      type="file"
                      name="file"
                      className="w-100"
                      id="Certificate"
                      required
                      onChange={(e)=>handleImageInputChange(e,ind)}
                    />
                    }
                    <span>Upload Certification</span>
                  </div>
                  <p>{data.certificate && data?.certificate.split('document/')[1].split('%20').join('-')}</p>
                  <span className="danger">{Error}</span>
                </div> 
                }


                 
                  <br /><br /><br /><br /><br /><br /><br /><br />
                </div>
                {/* {
                 ind>0 &&
                  <div className='btn-wrap text-right'>
                     <input type='button' onClick={(e)=>RemoveEducation(e,ind)} className="btn maroon-btn maroon-btn-arrow" value="Remove Education" />
                 </div>
                 } */}
                </>
               



              )
            })
          }
 



         <div className="btn-wrap flex space-between">
                  {
                    modeEdit===null &&  
                    <a className="btn maroon-border-btn" onClick={handleBack}>
                      Back
                    </a>
                  }
                    <input
                      type="submit"
                      className="btn maroon-btn maroon-btn-arrow"
                      value={btnText}
                    />

                  </div>
                  {
                    modeEdit===null && 
                  <div className='btn-wrap text-right'>
                      <input type='submit' onClick={SkipProcess} className="btn maroon-btn maroon-btn-arrow" value="Skip" />
                  </div>
                  }
          </div>
      </form>

     
              








               
            


        
      </div>
      <Jobfooter />
    </>
  );
};
export default AuthorizeCandidate(CandidateMoreEducation);