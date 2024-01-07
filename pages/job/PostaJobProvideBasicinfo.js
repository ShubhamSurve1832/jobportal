import React, { useEffect } from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import { TbMathGreater } from 'react-icons/tb';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Field, Form, Formik, useFormik } from "formik";
import { PostJobProvideBasicinfo } from "../../job/validation/RecruiterSchema";
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import secureLocalStorage from 'react-secure-storage';
import AuthorizeRec from './AuthorizeRec/AuthorizeRec';
 


const PostaJobProvideBasicinfo = () => {

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

const [btnText,setBtnText] = useState('Save and Next')
const {push} = useRouter();

let preData = JSON.parse(secureLocalStorage.getItem('Pr1'));

  
  const initialValue = {
    title : preData!==null ? preData.title : '',
    Address : preData!==null && preData.reportToWork===1 ? preData.reportAddress : ''  ,
  };


  const [reportSpecificAddress,setreportSpecificAddress] = useState(preData!==null ? preData.reportToWork : 1);

  let { values, errors, setErrors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValue,
      validationSchema: PostJobProvideBasicinfo,

      onSubmit: (values) => {
        setBtnText('Processing...')
        let {title,Address} = values;
        if(reportSpecificAddress!==''){
           if(reportSpecificAddress===0){
            setBtnText('Data Saved..!')
            let obj = {
                title : title,
                reportAddress : reportSpecificAddress===1 ? Address : "Null",
                reportToWork:reportSpecificAddress
            }
            secureLocalStorage.setItem('Pr1',JSON.stringify(obj));
            toast.success('Basic Information Updated Successfully..!')
            push('/job/IncludeDetails')
           }else{
              if(values.Address!=='' && reportSpecificAddress===1){
                setBtnText('Save and Next')
                let obj = {
                    title : title,
                    reportAddress : reportSpecificAddress===1 ? Address : "Null",
                    reportToWork:reportSpecificAddress
                }
                secureLocalStorage.setItem('Pr1',JSON.stringify(obj));
                toast.success('Basic Information Updated Successfully..!')
                push('/job/IncludeDetails')
              }else{
                setErrors({Address : 'Please Enter Your Specific Address'})
              }
           }
        }else{
            toast.error('Choose At Least One Option')
            setBtnText('Save and Next')
        }
        
      },
    });




    return (
        <>
            <Head>
                <title>Job Basic Info - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>

            </Head>
            {/* <Jobheader showData3={false} /> */}
            {/* <CandidateJobProcess /> */}
            <a href="#PostJobProvideBasicInfo" id="TakeToProcess_ELEMENT">{null}</a>

            <div className="process-row mt-4 PostaJobProvideBasicinfo">
                <h2 className='heading03'>Post a Job <TbMathGreater /><span> Provide Basic Information </span></h2>
                <div className="process-box mt-4">
                    <dl className="active">
                        <dt id='PostJobProvideBasicInfo'>Provide Basic Information</dt>
                        {/* <dd className='number-box'>1</dd> */}
                        {/* <dd className='tick-box'></dd> */}
                        <dd>1</dd>
                    </dl>
                    <dl className="select">
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
            <form className="jobtitlecontent process-container" onSubmit={handleSubmit}>
                <p><input type="text" name='title' value={values.title} onBlur={handleBlur} onChange={handleChange}  className='jobtitlecont' placeholder='Job Title' /></p>
                {errors.title && touched.title ? (
                <span className="danger">{errors.title}</span>
              ) : null}
              <br />
                <h3 className='mt-4'>Where will an employee report to work?</h3>
                <div className="form-box">
                    <p className='v-middle radio-field custom-radio fz-20 v-middle'>
                        {reportSpecificAddress===1 ? <input type='radio' checked onChange={()=>setreportSpecificAddress(1)} name='profile' /> : <input type='radio' onChange={()=>setreportSpecificAddress(1)} name='profile' />}
                        <span className='checkmark'></span>
                        Employees will report to a specific address
                    </p>
                    <p className='v-middle radio-field custom-radio fz-20 v-middle'>
                    {reportSpecificAddress===0 ? <input type='radio' checked onChange={()=>setreportSpecificAddress(0)} name='profile' /> : <input type='radio' onChange={()=>setreportSpecificAddress(0)} name='profile' />}
                        <span className='checkmark'></span>
                        Employees will not report to a specific address
                    </p>

                </div>
                {
                    reportSpecificAddress===1 && 
                    <>
                    <p><input type="text" name='Address' className='jobtitlecont mt-4' value={values.Address} onBlur={handleBlur} onChange={handleChange} placeholder='Enter Specific Address' /></p>
                    {errors.Address && touched.Address ? (
                    <span className="danger">{errors.Address}</span>
                  ) : null}
                    </>
                }


                <div className="jobtitlebtn mt-4">
                    <input type='submit' class="btn maroon-btn maroon-btn-arrow mt-4" value={btnText} />
                </div>
            </form>
            <Jobfooter />
        </>
    )
}
export default AuthorizeRec(PostaJobProvideBasicinfo)