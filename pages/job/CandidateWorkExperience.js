import React, { useEffect } from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import CandidateJobProcess from './CandidateJobProcess';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AuthorizeCandidate from '../../job/AuthorizeCandidate/AuthorizeCan';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { CandidateJobPortalApiBaseURL } from '../../constants/urlConstants';
import secureLocalStorage from 'react-secure-storage';





const CandidateWorkExperience = () => {
  let Token = secureLocalStorage.getItem('CandidateToken');
  const [error, setError] = useState("")


 useEffect(()=>{
  let scrolltoEle = () =>{
    let ele = document.getElementById('TakeToProcess_ELEMENT_WorkExpe');
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


  let modeEdit = secureLocalStorage.getItem('mode');

  let monthNames = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

let currentlyActiveMonths = new Date().getMonth()+1;
let currentYear = new Date().getFullYear();
let [FromYearList,setfromYearList] = useState([]);
useEffect(()=>{
  let Yearlist = []
  for(let i=1950;i<=currentYear;i++){
    Yearlist.push(i)
  }
  setfromYearList(Yearlist)
},[])




let [ToYearList,setToYearList] = useState([
  {
    ToYear : []
  }, {
    ToYear : []
  }, {
    ToYear : []
  }, {
    ToYear : []
  }, {
    ToYear : []
  }, {
    ToYear : []
  }, {
    ToYear : []
  }, {
    ToYear : []
  }, {
    ToYear : []
  }, {
    ToYear : []
  }, {
    ToYear : []
  }, {
    ToYear : []
  }
]);


const handleYearListChange = (e,ind)=>{
  let value = parseInt(e.target.value);
  let years = []
  for(let i=value;i<=currentYear;i++){
       years.push(i)
  }

      // setToYearList(allYears)
      ToYearList[ind]['ToYear'] = years
    }



  let CandidateID = secureLocalStorage.getItem('Candidate');

  
  let {push} = useRouter();

  
  const [isButtonDisabled, setButtonDisabled] = useState(false);
	const [btnText, setBtnText] = useState('Save and Next');

  let handleBack = () =>{
    push('/job/CandidateMoreEducation')
  }


  const [experience,setExperience] = useState([
    {
      id:secureLocalStorage.getItem('Candidate'),
      jobTitle : "",
      companyName : "",
      currentlyWorking : false,
      fromMonth : '',
      toMonth : "",
      fromYear : "",
      toYear : "",
      description : "",
      updatedBy:secureLocalStorage.getItem('Candidate')
    }
  ])





  useEffect(()=>{
    fetchPrev();
    if(typeof window==='object'){
      window.scrollTo(0,0);
    }
  },[])



  const fetchPrev = async() =>{
    try{
      let response = await axios.get(`${CandidateJobPortalApiBaseURL}/${CandidateID}`,{
				headers: {
				   'Authorization': `Bearer ${Token}`
			  }
			  });
      if(response.status===200){
        setPrevDataFN(response.data.data.experiences);
      }
    }catch(err){
      toast.error("Failed To Get Information");
    }
  }




  const setPrevDataFN = (data) =>{
    if(data.length>0){
      
      setExperience(()=>{
        return data.map((d,ind)=>{return {...d,updatedBy : secureLocalStorage.getItem("Candidate")}})
      })
    }else{
      setExperience([
        {
          id:secureLocalStorage.getItem('Candidate'),
          jobTitle : "",
          companyName : "",
          currentlyWorking : false,
          fromMonth : '',
          toMonth : "",
          fromYear : "",
          toYear : "",
          description : "",
          updatedBy:secureLocalStorage.getItem('Candidate')
        }
      ])
    }

  }


  const handleAddMore = () =>{
    setExperience([
      ...experience,
      {
        id:secureLocalStorage.getItem('Candidate'),
        jobTitle : "",
        companyName : "",
        currentlyWorking : false,
        fromMonth : '',
        toMonth : "",
        fromYear : "",
        toYear : "",
        description : "",
        updatedBy:secureLocalStorage.getItem('Candidate')
      }
    ])
    if(typeof window==='object'){
      window.scrollTo(0, document.body.scrollHeight);
    }
  }


  let validString =/^[A-Za-z]+$/;
  const handleChange = (e,i) =>{
    const {name,value} = e.target;

      if (!validString.test(value.split(' ').join('')) && name === "jobTitle") {
        setError(`Please Enter Valid Job Title`)
    }else{
      setError(``)
    }

    let newArray = [...experience];
    newArray[i][name] = value;
    setExperience(newArray)
  }


  const handleCurrentlyWorking = (e,i) =>{
    const {name,value} = e.target;

    let newArray = [...experience];
    newArray[i][name] = newArray[i][name] ? false : true;
    setExperience(newArray)
  }

  

  let handleSubmit = (e) =>{
    e.preventDefault();
    if(error === ""){
      PostWorkExperience(experience);
      setBtnText('Updating...')
    } else{
      toast.error(`Please Enter Valid Job Title`)
    }
  }


  //PostWorkExperience is here
  const PostWorkExperience = async(data) =>{
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
console.log(currentMonth)
    data.forEach(val => {
      val.id = secureLocalStorage.getItem('Candidate')
      if(val.currentlyWorking){
        val.toMonth = (currentMonth + 1).toString()
        val.toYear = currentYear
      }
      delete val["_id"]
    });


      try{
        let res = await axios.patch(`${CandidateJobPortalApiBaseURL}/experience/${CandidateID}`,data,{
          headers :{
            "Content-Type" : "application/json",
            'Authorization': `Bearer ${Token}`
          }
        });

        if(res.status===200){
            toast.success("Work Experience Updated Successfully..!");
            setButtonDisabled(true)
            setBtnText('Added Successfully')
            push(`/job/${modeEdit!==null ? 'CandidateDashboard' : 'CandidateSkill'}`)
        }
      }catch(error){
          toast.error("All Field Required..!")
          console.log(error);
          setButtonDisabled(false);
          setBtnText('Save and Next')

      }
      // console.log(experience);
    }
    
    
    // console.log(experience);


    const HandleRemoveRow = (id) =>{
      setExperience(()=>{
        return experience.filter((data,ind)=>{
          return ind!==id;
        })
      })
    }


    // console.log(experience);


        //SkipProcess
	//SkipProcess
	const SkipProcess = () =>{
		if(confirm("Want To Skip This Process ?")){
			push('/job/CandidateSkill')
		}
	}

	return (
		<>
			<Head>
				<title>Add Work Experience - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>
			{/* <Jobheader showData3={true} /> */}

      <a href="#WorkExperienveCandidate" id="TakeToProcess_ELEMENT_WorkExpe">{null}</a>

      {
        modeEdit===null && 

      <div className="process-row">
        <div className="process-box">
          <dl className="active select">
            <dt>Upload CV</dt>
            {/* <dd className='number-box'>1</dd> */}
            <dd className='tick-box'></dd>
          </dl>
          <dl className="active select">
            <dt>Basic information</dt>
            {/* <dd>2</dd> */}
            <dd className='tick-box'></dd>
          </dl>
          <dl className='active select'>
            <dt>Education</dt>
            {/* <dd>3</dd> */}
            <dd className='tick-box'></dd>
          </dl>
          <dl id='WorkExperienveCandidate' className='active'>
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
			<div className='process-container'>
        



      <div className='form-box mt-0'>
      <div className='head flex align-center space-between'>
              <h3>Work Experience</h3>
              <button className='add-more-btn' onClick={handleAddMore}>+ Add More Experience</button>
      </div>
      </div>

				<form>
           {
            experience.map((data,ind)=>{
              return(
                <>
                 <div className='form-box mt-0'>
            <div className="input_field">
              <input type="text" required name="jobTitle" onChange={(e)=>handleChange(e,ind)} value={data.jobTitle} id="" className='w-100' placeholder='Job Title'  />
            </div>
            <div className="input_field">
              <input type="text" required name="companyName" value={data.companyName} onChange={(e)=>handleChange(e,ind)} id="" className='w-100' placeholder='Company' />
            </div>
            <div className="input_field">
              <span className='fz-20 fw-m d-ib v-middle'>Time period</span>
              
              

              {/* {
                data?.currentlyWorking ? 
                <p className='d-ib v-middle cw-row custom-radio fz-20 v-middle'>I currently work here
                <input type="radio" name="currentlyWorking" checked onChange={(e)=>handleCurrentlyWorking(e,ind)}  id="" className='d-ib v-middle'/>
                <input type="checkbox"  name="currentlyWorking" onChange={(e)=>handleCurrentlyWorking(e,ind)}  id="" className='d-ib v-middle'/>

                <span className='checkmark'></span>
              </p> :  */}
              <p className='d-ib v-middle cw-row custom-radio fz-20 v-middle'> <span className='ml-1'> I currently work here</span>
              {data.currentlyWorking ? <input type="checkbox" checked name="currentlyWorking" onChange={(e)=>handleCurrentlyWorking(e,ind)}  id="" className='d-ib v-middle'/> : <input type="checkbox" name="currentlyWorking" onChange={(e)=>handleCurrentlyWorking(e,ind)}  id="" className='d-ib v-middle'/>}
              <span className='checkmark'></span>
             </p>
              {/* } */}
            </div>
            <div className='w-row'>
              <div className="input_field select-field w-50">
                <label>From</label>
                <select value={data?.fromMonth} required name='fromMonth' onChange={(e)=>handleChange(e,ind)} >
                  <option value="">Month</option>
                  {
                data?.fromYear==currentYear 
                ?
                monthNames && monthNames?.slice(0,currentlyActiveMonths).map((data,ind)=>{
                  return(
                    <option value={data}>{data}</option> 
                  )
                })
                :
                monthNames && monthNames.map((data,ind)=>{
                  return(
                    <option value={data}>{data}</option> 
                  )
                })
               }
                </select>
              </div>
              <div className="input_field select-field w-50">
                <label>From</label>
                <select value={data?.fromYear} required name='fromYear' onChange={(e)=>{handleChange(e,ind),handleYearListChange(e,ind)}} >
                  <option value="">Year</option>
                  {
                  FromYearList && FromYearList.map((data,ind)=>{
                    return(
                      <option value={data}>{data}</option> 
                    )
                  })
                 }
                </select>
              </div>
            </div>
           {
            !data.currentlyWorking &&  <div className='w-row'>
            <div className="input_field select-field w-50">
              <label>To</label>
              <select required value={data?.toMonth} name='toMonth' onChange={(e)=>handleChange(e,ind)} >
                <option value="">Month</option>
                {/* {
                monthNames && monthNames.map((data,ind)=>{
                  return(
                    <option value={data}>{data}</option> 
                  )
                })
               } */}
               {
                data?.toYear==currentYear 
                ?
                monthNames && monthNames?.slice(0,currentlyActiveMonths).map((data,ind)=>{
                  console.log(data)
                  return(
                    <option value={data}>{data}</option> 
                  )
                })
                :
                monthNames && monthNames.map((data,ind)=>{
                  return(
                    <option value={data}>{data}</option> 
                  )
                })
               }
              </select>
            </div>
            <div className="input_field select-field w-50">
              <label>To</label>
              <select required value={data?.toYear} name='toYear' onChange={(e)=>handleChange(e,ind)} >
                <option value="">Year</option>
                {
                ToYearList[ind]?.ToYear && ToYearList[ind]?.ToYear.map((data,ind)=>{
                  return(
                    <option value={data}>{data}</option> 
                  )
                })
               }
               
              </select>
            </div>
          </div>
           }
            <div className="input_field">
              <textarea required className='w-100' onChange={(e)=>handleChange(e,ind)}  value={data.description} name='description' placeholder='Description' />
            </div>
          </div>
          <div className="btn-wrap flex space-between">
            {ind>0 && <a className="btn maroon-border-btn" onClick={()=>HandleRemoveRow(ind)}>Remove</a>}
          </div>
          
                </>
              )
            })
           }
				</form>
        <div className="btn-wrap flex space-between">
        {
            modeEdit===null &&  
             <a className="btn maroon-border-btn" onClick={handleBack}>
              Back
             </a>
           }
            <input onClick={handleSubmit} type="submit" className={`btn maroon-btn maroon-btn-arrow ${isButtonDisabled ? 'disabled' : ''}`} value={btnText} />
          </div>
          {
						modeEdit===null && 
					<div className='btn-wrap text-right'>
						<input type='button' onClick={SkipProcess} className="btn maroon-btn maroon-btn-arrow" value="Skip" />
			     	</div>
					}
			</div>
			<Jobfooter />
		</>
	)
}
export default AuthorizeCandidate(CandidateWorkExperience)