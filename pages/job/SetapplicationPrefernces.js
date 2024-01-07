import React, { useEffect, useState } from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import { TbMathGreater } from 'react-icons/tb';
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast';
import secureLocalStorage from 'react-secure-storage';
import AuthorizeRec from './AuthorizeRec/AuthorizeRec';


const SetapplicationPrefernces = () => {

    
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

    let preData = JSON.parse(secureLocalStorage.getItem('Pr5'));
    let startDate = JSON.parse(secureLocalStorage.getItem('Pr2'));
    // console.log("Start data" ,startDate.startDate)

    let [IsDeadline,setIsDeadline] = useState(preData!==null ? preData?.isDeadlineApplicable : true)
    let [isCVRequired,setisCVRequired] = useState(preData!==null ? preData?.isCVRequired : true)
    
    let router = useRouter();

    const [btnText,setBtnTex] = useState("Save and Next");
    const handleSubmit = (e) => {
        e.preventDefault();

        let newObj = {
            isCVRequired : obj.submitCV,
            isDeadlineApplicable : obj.deadLine,
            deadlineDate : obj.date +"T23:59:59Z"
        }

        SaveData(newObj);
        // console.log("New daeadline data data",newObj)
    }


    //SaveData
    const SaveData = (data) =>{
        let {isCVRequired,isDeadlineApplicable,deadlineDate} = data;
        // let jobStartDate1 = new Date(new Date(startDate?.startDate).toLocaleDateString()).getDate()
        // let todayTime =  new Date(new Date().toLocaleDateString()).getTime();
        // let deadlineDateNew = new Date(new Date(deadlineDate).toLocaleDateString()).getTime();

            if(isDeadlineApplicable===true){
                if(deadlineDate===''){
                    toast.error("Select Date..!")
                }else{
                    let todayTime =  new Date(new Date().toLocaleDateString()).getTime();
                    let deadlineDateNew = new Date(new Date(deadlineDate).toLocaleDateString()).getTime();
                    let jobStartDate = new Date(new Date(startDate?.startDate).toLocaleDateString()).getTime()
                    if(deadlineDateNew < jobStartDate){                       
                        toast.error('Select Valid Date..!')
                    }else{
                        if(deadlineDateNew <= todayTime){
                            toast.error("Select Valid Date..!")
                        } else{
                            toast.success('Application Preferences updated Successfully..!');
                            setBtnTex('Data Saved');
                            router.push('/job/Recruitment')
                            secureLocalStorage.setItem('Pr5',JSON.stringify(data));
                        }    
                            
                    }
                }
             }
             else{
                
                    toast.success('Application Preferences updated Successfully..!');
                    setBtnTex('Data Saved');
                    router.push('/job/Recruitment')
                    secureLocalStorage.setItem('Pr5',JSON.stringify(data));               
             }
    }




    const handleBack = () => {
        router.push('/job/JobDescription')
    }

    const [obj, setObj] = useState({
        submitCV:true, 
        deadLine:true,
        date:""
    })


    let [showDate,setShowDate] = useState(true);



    useEffect(()=>{
        let predata = JSON.parse(secureLocalStorage.getItem('Pr5'));
        if(predata!==null){
            setObj({
                submitCV : predata!==null ? predata?.isCVRequired : true,
                deadLine : predata!==null ? predata?.isDeadlineApplicable : true,
                date : predata!==null ? predata?.deadlineDate : '',
            })
           
        }
    },[])

    return (
        <>
            <Head>
                <title>Set Application Preferences - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            {/* <Jobheader showData3={false} /> */}
            {/* <CandidateJobProcess /> */}
            <a href="#PostJobApplicationPref" id="TakeToProcess_ELEMENT">{null}</a>

            <div className="process-row mt-4 PostaJobProvideBasicinfo">
                <h2 className='heading03'>Post a Job <TbMathGreater /><span> Set Application Preferences
                </span></h2>
                <div className="process-box mt-4">
                    <dl className="active">
                        <dt>Provide Basic Information</dt>
                        {/* <dd className='number-box'>1</dd> */}
                        <dd className='tick-box'></dd>
                        {/* <dd>1</dd> */}
                    </dl>
                    <dl className="active select">
                        <dt>Include Details</dt>
                        {/* <dd>2</dd> */}
                        <dd className='tick-box'></dd>
                        {/* <dd>2</dd> */}
                    </dl>
                    <dl className='active select'>
                        <dt>Add Compensation</dt>
                        {/* <dd>3</dd> */}
                        <dd className='tick-box'></dd>
                        {/* <dd>3</dd> */}
                    </dl>
                    <dl className='active select'>
                        <dt>Describe the Job</dt>
                        {/* <dd>4</dd> */}
                        <dd className='tick-box'></dd>
                        {/* <dd>4</dd> */}
                    </dl>
                    <dl id='PostJobApplicationPref' className='active select'>
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


            <form onSubmit={handleSubmit} className="jobtitlecontent process-container IncludeDetails SetapplicationPrefernces">


                {/* <div className="div01">
                    <h3 className=''>Would you like people to submit a CV?</h3>
                    <div className="form-box">
                        <p className='d-ib v-middle radio-field custom-radio fz-20 v-middle'>
                            {isCVRequired ? <input type='radio' defaultChecked name='CV' onChange={()=>{setObj({...obj,submitCV:true})}} /> : <input type='radio' name='CV' onChange={()=>{setObj({...obj,submitCV:true})}} />}
                            <span className='checkmark'></span>
                            Yes
                        </p>
                        <p className='d-ib v-middle radio-field custom-radio fz-20 v-middle'>
                           {!isCVRequired ?  <input type='radio' defaultChecked name='CV' onChange={()=>{setObj({...obj,submitCV:false})}} /> :  <input type='radio' name='CV' onChange={()=>{setObj({...obj,submitCV:false})}} />}
                            <span className='checkmark'></span>
                            No
                        </p>
                        <p className='d-ib v-middle radio-field custom-radio fz-20 v-middle'>
                            <input type='radio' name='CV'onChange={()=>{setObj({...obj,submitCV:"Optinal"})}} />
                            <span className='checkmark'></span>
                            Optional
                        </p>
                    </div>
                </div> */}

                <div className="div01 mt-4">
                    <h3 className=''>Is there any application deadline?</h3>
                    <div className="form-box">
                        <p className='d-ib v-middle radio-field custom-radio fz-20 v-middle'>
                            {IsDeadline ? <input type='radio' defaultChecked name='Deadline' onChange={()=>{setObj({...obj,deadLine:true}) ,  setIsDeadline(true)}}/> : <input type='radio' name='Deadline' onChange={()=>{setObj({...obj,deadLine:true}) ,  setIsDeadline(true)}}/>}
                            <span className='checkmark'></span>
                            Yes
                        </p>
                        <p className='d-ib v-middle radio-field custom-radio fz-20 v-middle'>
                            {!IsDeadline ? <input type='radio' defaultChecked name='Deadline' onChange={()=>{setObj({...obj,deadLine:false}) , setIsDeadline(false)}}/> : <input type='radio' name='Deadline' onChange={()=>{setObj({...obj,deadLine:false}) , setIsDeadline(false)}}/>}
                            <span className='checkmark'></span>
                            No
                        </p>
                        <p>{IsDeadline && <input type="date" value={obj?.date} className='jobtitlecont date mt-4' placeholder='dd/mm/yyyy' onChange={(e)=>{setObj({...obj,date:e.target.value})}} />}</p>
                    </div>
                </div>


                <div className="div03 mt-4">
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
export default AuthorizeRec(SetapplicationPrefernces)