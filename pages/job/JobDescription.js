import React, { useRef, useState } from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import { TbMathGreater } from 'react-icons/tb';;
import RichTextEditor from '../../job/RichTextEditor'
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
import { toast } from 'react-hot-toast';
import secureLocalStorage from 'react-secure-storage';
import { useEffect } from 'react';
import AuthorizeRec from './AuthorizeRec/AuthorizeRec';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })


const JobDescription = () => {

    
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


    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = {
        readonly: false,
        placeholder: 'Start typing'
    }


    useEffect(()=>{
        let predata = JSON.parse(secureLocalStorage.getItem('Pr4'));
        if(predata!==null){
            setContent(predata?.description)
        }
    },[])

    const router = useRouter();

    const [btnText,setBtnTex] = useState("Save and Next");
    const handleSubmit = (e) =>{
        e.preventDefault();
        setBtnTex("Processing...")
        let obj = {
            description : content
        }
        if(content.length<=100){
            toast.error('Job Description Must Be At Least 100 Characters..!')
        }else if(content===''){
            toast.error('Job Description is Required..!')
        }else{
            SaveJobDescription(obj);
        }
    }


    //SaveJobDescription
    const SaveJobDescription = (data) =>{
        if(content!==''){
            toast.success('Job Description Updated Successfully..!')
            setBtnTex("Data Saved");
            secureLocalStorage.setItem('Pr4',JSON.stringify(data))
            router.push('/job/SetapplicationPrefernces');
        }else{
            setBtnTex('Save and Next');
            toast.error('Provide Job description Before Saving Data');
        }
    }


    // console.log(content);

    const handleBack = () =>{
        router.push('/job/Addcompensation');
    }



    return (
        <>
            <Head>
                <title>Job Description - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            {/* <Jobheader showData3={false} /> */}
            {/* <CandidateJobProcess /> */}

            <a href="#PostJobDescription" id="TakeToProcess_ELEMENT">{null}</a>


            <div className="process-row mt-4 PostaJobProvideBasicinfo">
                <h2 className='heading03'>Post a Job <TbMathGreater /><span>  Describe the Job </span></h2>
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
                    <dl id='PostJobDescription' className='active select'>
                        <dt>Describe the job</dt>
                        {/* <dd>4</dd> */}
                        <dd>4</dd>
                    </dl>
                    <dl  className='select'>
                        <dt>Set application preferences</dt>
                        {/* <dd>5</dd> */}
                        <dd>5</dd>
                    </dl>
                    <dl className='select'>
                        <dt>Recruitment</dt>
                        <dd>6</dd>
                    </dl>
                </div>
            </div>


            <form className="jobtitlecontent process-container IncludeDetails JobDescription">


                <div className="div01">
                    <h3 className=''>Job Description</h3>
                    <p>Describe the responsibilities of this job, required work experience, skills, and education.</p>

                    {/* <p className='mt-4'>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            tabIndex={1} // tabIndex of textarea
                            onChange={newContent => { }}
                        />
                    </p> */}

                    <div className='mt-4'>
                        {/* <RichTextEdito /> */}
                        <JoditEditor ref={editor} config={config} className='wdt-full bordernone title01' value={content} onBlur={newContent => setContent(newContent)} />
                    </div>



                </div>


                <div className="div03 mt-4">
                    <div className="jobtitlebtn mt-4">
                        <a class="btn maroon-border-btn  mt-4" onClick={handleBack}>Back</a>
                        <input type='submit' onClick={handleSubmit} class="btn maroon-btn maroon-btn-arrow mt-4" value="Save and Next"/>
                    </div>
                </div>
            </form>
            <Jobfooter />
        </>
    )
}
export default AuthorizeRec(JobDescription)