import React, { useEffect } from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import { TbMathGreater } from 'react-icons/tb';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import secureLocalStorage from 'react-secure-storage';
import AuthorizeRec from './AuthorizeRec/AuthorizeRec';


const IncludeDetails = () => {

    let data1 = secureLocalStorage.getItem("Pr2")
    // console.log(data1)
    
    useEffect(()=>{
        let scrolltoEle = () =>{
          let ele = document.getElementById('TakeToProcess_ELEMENT');
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



    let preData = JSON.parse(secureLocalStorage.getItem('Pr2'));
    
    const [isStartPlanned,setisStartPlanned] = useState(preData!==null ? preData.isStartPlanned : 1);
    const [btnText, setBtnText] = useState('Save and Next')
    let router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnText('Processing...')
        let data = {
            jobType : obj.jobType.join(','),
            schedule : obj.Schedule.join(','),
            isStartPlanned: obj.plannedDate,
            startDate:obj.plannedDate===0?"": obj.date
        }
        console.log("line 50",data)
        saveData(data);
    }


    const saveData = (data) =>{
        let {jobType,schedule,isStartPlanned,startDate} = data;
        if(!jobType || !schedule){           
           if(!jobType && !schedule){
            setBtnText('Save and Next')
            // console.log("condition1")
            toast.error('jobType and Schedule is Required.!');
           }else if(!jobType){
            setBtnText('Save and Next')
            // console.log("condition2")
            toast.error('jobType is Required.!');
           }else if(isStartPlanned === 0 && startDate){
            // console.log("condition3")
            toast.error('clear date');
           }          
           else{
            setBtnText('Save and Next')
            // console.log("condition4")
            toast.error('Schedule is Required.!');
           }
            
        }else{

            if(isStartPlanned==1){
                if(!startDate){
                    toast.error('Choose Date');
                    setBtnText('Save and Next')
                }else{
                    let TodayTime = new Date(new Date().toLocaleDateString()).getTime();
                    let StartTime = new Date(new Date(startDate).toLocaleDateString()).getTime();
                    console.log("Today",TodayTime) 
                console.log("Today",StartTime)
                    if(StartTime >= TodayTime){
                        setBtnText('Data Saved')
                        secureLocalStorage.setItem('Pr2',JSON.stringify(data));
                        toast.success('Details Updated Successfully..!');
                        router.push('/job/Addcompensation') 
                    }else{
                        toast.error('Choose Valid Start Date')
                        setBtnText('Save and Next')
                    }
                }
            }else{
                let TodayTime = new Date(new Date().toLocaleDateString()).getTime();
                let StartDate = new Date(new Date(startDate).toLocaleDateString()).getTime();
                console.log("Today",TodayTime)
                console.log("Startdate",startDate)
                if(new Date(StartDate).getTime() < TodayTime){
                    toast.error('Choose Valid Start Date')
                    setBtnText('Save and Next')
                }else{
                    setBtnText('Data Saved')
                secureLocalStorage.setItem('Pr2',JSON.stringify(data));
                toast.success('Details Updated Successfully..!');
                router.push('/job/Addcompensation') 
                }
            }         
        }
    }

    const handleBack = (e) => {
        e.preventDefault();
        router.push('/job/PostaJobProvideBasicinfo')
    }

    
    const handleAddJob = (e) => {
        const jobType = [...obj.jobType];
     
       if (e === 'Full Time') {
         if (jobType.includes('Part Time')) {
           alert("You can't select both Full Time and Part Time.");
           return;     }
     
         const filteredJobType = jobType.filter((data) => data !== 'Part Time');
         setObj({ ...obj, jobType: [...filteredJobType, e] });
       } else if (e === 'Part Time') {
        
     
         if (jobType.includes('Full Time')) {
           alert("You can't select both Full Time and Part Time.");
           return;      
         }         
         const filteredJobType = jobType.filter((data) => data !== 'Full Time');
         setObj({ ...obj, jobType: [...filteredJobType, e] });
       } else if (e === 'Intern') {         
         setObj({ ...obj, jobType: [...jobType, e] });
       }
     };

    const handleRem = (data) => {
        setObj(()=>{
            return{
                ...obj,
                jobType : obj.jobType.filter((da,ind)=>da!==data)
            }
        })

    }
    const handleRemSchedual = (data) => {
        setObj(()=>{
            return{
                ...obj,
                Schedule : obj.Schedule.filter((da,ind)=>da!==data)
            }
        })

    }

    const handleAddSchedule = (e) =>{
       
        const Schedule = [...obj.Schedule];
        if (e === 'Day Shift') {
            if (Schedule.includes('Night Shift')) {
              alert("You can't select both Day Shift and Night Shift.");
              return;     }
        
            const filteredSchedule = Schedule.filter((data) => data !== 'Night Shift');
            setObj({ ...obj, Schedule: [...filteredSchedule, e] });
          } else if (e === 'Night Shift') {
           
        
            if (Schedule.includes('Day Shift')) {
              alert("You can't select both Day Shift and Night Shift.");
              return;      
            }         
            const filteredSchedule = Schedule.filter((data) => data !== 'Day Shift');
            setObj({ ...obj, Schedule: [...filteredSchedule, e] });
          } else {
            setObj({...obj,Schedule:[...obj.Schedule,e]})
          }
    }

    // const [date,setData] = useState('')
    const [jobType, setJobType] = useState(["Full Time", "Part Time", "Intern"])
    const [jobSchedual, setJobSchedule] = useState(["Day Shift", "Evening Shift", "Night Shift", "Flexible Shift","Rotational Shift"])

    const[obj , setObj] = useState({
        jobType : [],
        Schedule : [],
        plannedDate: '',
        date: ''
    })

    console.log(obj)

    useEffect(()=>{
        let preData = JSON.parse(secureLocalStorage.getItem('Pr2'));
        setObj({
            jobType : preData!==null ? preData.jobType.split(',') : [],
            Schedule : preData!==null ? preData.schedule.split(',') : [],
            plannedDate: preData!==null ? preData.isStartPlanned : 1,
            date: preData!==null ? preData.startDate : ''
        })
    },[])




    return (
        <>
            <Head>
                <title>Include Detail - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            {/* <Jobheader showData3={false} /> */}
            {/* <CandidateJobProcess /> */}
            <a href="#PostJobIncludeDetails" id="TakeToProcess_ELEMENT">{null}</a>

            <div className="process-row mt-4 PostaJobProvideBasicinfo">
                <h2 className='heading03'>Post a Job <TbMathGreater /><span> Include Details </span></h2>
                <div className="process-box mt-4">
                    <dl className="active">
                        <dt>Provide Basic Information</dt>
                        {/* <dd className='number-box'>1</dd> */}
                        <dd className='tick-box'></dd>
                        {/* <dd>1</dd> */}
                    </dl>
                    <dl id='PostJobIncludeDetails' className="active select">
                        <dt>Include Details</dt>
                        {/* <dd>2</dd> */}
                        <dd>2</dd>
                    </dl>
                    <dl className='select'>
                        <dt>Add Compensation</dt>
                        {/* <dd>3</dd> */}
                        <dd>3</dd>
                    </dl>
                    <dl className='select'>
                        <dt>Describe the Job</dt>
                        {/* <dd>4</dd> */}
                        <dd>4</dd>
                    </dl>
                    <dl className='select'>
                        <dt>Set Application Preferences</dt>
                        {/* <dd>5</dd> */}
                        <dd>5</dd>
                    </dl>
                    <dl className='select'>
                        <dt>Recruitment</dt>
                        <dd>6</dd>
                    </dl>
                </div>
            </div>


            <form className="jobtitlecontent process-container IncludeDetails" onSubmit={handleSubmit}>

                <div className="div01">
                    <h3 className=''>What is job type?</h3>
                    <div className="selectoption">
                        {
                            jobType.map((job, index) => {
                                let {jobType} = obj;
                                return (
                                      <>
                                      {
                                        obj.jobType.includes(job) ? <a class="btn maroon-border-btn active" onClick={()=>handleRem(job)} >{job}</a> : <a class="btn maroon-border-btn inactive" onClick={()=>handleAddJob(job)} >{job}</a>
                                      }
                                      </>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="div01 div02 mt-4">
                    <h3 className=''>What is the schedule for this job?</h3>
                    <div className="selectoption">
                       {
                        jobSchedual.map((schedual,index)=>{
                            return(
                                <>
                                {
                                    obj.Schedule.includes(schedual) ? <a class="btn maroon-border-btn active" onClick={()=>handleRemSchedual(schedual)}>{schedual}</a> : <a class="btn maroon-border-btn inactive"  onClick={()=>handleAddSchedule(schedual)}>{schedual}</a>
                                }
                                </>
                            )
                        })
                       }
                        
                    </div>
                </div>


                <div className="div03 mt-4">
                    <h3 className=''>Is there a planned start date for this job?</h3>
                    <div className="form-box">
                        <p className='d-ib v-middle radio-field custom-radio fz-20 v-middle'>
                            {isStartPlanned===1 ? <input type='radio' defaultChecked name='profile' onChange={()=>{setObj({...obj,plannedDate:1}) , setisStartPlanned(1)}} /> : <input type='radio' name='profile' onChange={()=>{setObj({...obj,plannedDate:1}),setisStartPlanned(1)}} />}
                            <span className='checkmark'></span>
                            Yes
                        </p>
                        <p className='d-ib v-middle radio-field custom-radio fz-20 v-middle'>
                            {isStartPlanned===0 ? <input type='radio' defaultChecked name='profile' onChange={()=>{setObj({...obj,plannedDate:0}),setisStartPlanned(0)}}/> : <input type='radio' name='profile' onChange={()=>{setObj({...obj,plannedDate:0}),setisStartPlanned(0)}}/>}
                            <span className='checkmark'></span>
                            No
                        </p>
                    </div>
                    <p>
                        {isStartPlanned===1 && <input className='jobtitlecont date mt-4' value={obj?.date} name='date' placeholder='mm/dd/yyyy' onChange={(e)=>{setObj({...obj,date : e.target.value})}} type="date" />}
                    </p>
                    <div className="jobtitlebtn mt-4">
                        <a class="btn maroon-border-btn  mt-4" onClick={handleBack}>Back</a>
                        <input type='submit' class="btn maroon-btn maroon-btn-arrow mt-4" value={btnText} />
                    </div>
                </div>
            </form>
            <Jobfooter />
        </>
    )
}
export default AuthorizeRec(IncludeDetails)