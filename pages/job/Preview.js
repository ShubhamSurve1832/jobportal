import React, { useEffect, useState } from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
// import { TbMathGreater } from 'react-icons/tb';
// import RichTextEditor from '../../job/RichTextEditor'
import parse from 'html-react-parser';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import {CompanyBaseURL, RecruiterPostJobBaseURL as url} from '../../constants/urlConstants'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import AuthorizeRec from './AuthorizeRec/AuthorizeRec';


const Preview = () => {
    let Token = secureLocalStorage.getItem('RecruiterToken');
    let d1 = JSON.parse(secureLocalStorage.getItem(`Pr1`));
    let d2 = JSON.parse(secureLocalStorage.getItem(`Pr2`));
    let d3 = JSON.parse(secureLocalStorage.getItem(`Pr3`));
    let d4 = JSON.parse(secureLocalStorage.getItem(`Pr4`));
    let d5 = JSON.parse(secureLocalStorage.getItem(`Pr5`));
    let d6 = JSON.parse(secureLocalStorage.getItem(`Pr6`));
    let [show,setshow] = useState(false);

    let {replace} = useRouter();

    const [BtnText,setBtnText] = useState("Confirm");

    const [JobData,setJobData] = useState({});
    useEffect(()=>{
        if(d1 && d2 && d3 && d4 && d5 && d6){
            fetchAllData();
            setshow(true);
        }else{
            toast.error('Fill The Post Job Details First')
            setshow(false);
            replace('/job/RecruiterDashboardJobs')
        }
    },[])

    // console.log("Job data",JobData)


    const fetchAllData = () =>{
        let d1 = JSON.parse(secureLocalStorage.getItem(`Pr1`));
        let d2 = JSON.parse(secureLocalStorage.getItem(`Pr2`));
        let d3 = JSON.parse(secureLocalStorage.getItem(`Pr3`));
        let d4 = JSON.parse(secureLocalStorage.getItem(`Pr4`));
        let d5 = JSON.parse(secureLocalStorage.getItem(`Pr5`));
        let d6 = JSON.parse(secureLocalStorage.getItem(`Pr6`));
        // let Data = {...d1,...d2,...d3,...d4,...d5,...d6,startDate : d2.startDate ? d2.startDate : '1/1/2023',createdBy : secureLocalStorage.getItem('RecID'),userId : secureLocalStorage.getItem('RecID') , status : 'Active'};
        let Data = {...d1,...d2,...d3,...d4,...d5,...d6,createdBy : secureLocalStorage.getItem('RecID'),userId : secureLocalStorage.getItem('RecID') , status : 'Inactive'};
        // console.log(Data)

        if(!Data?.isDeadlineApplicable){
            delete Data.deadlineDate            
        }

        if(Data?.isStartPlanned===0){
            delete Data.startDate
        }
        


        setJobData(Data)
        fetchCompanyName(d6);

    }



    let [CompanyName,setCompanyName] = useState('');
    const fetchCompanyName = async(companydata) =>{
        try{
            let res = await axios.get(CompanyBaseURL+"/"+companydata?.companyId,{
                headers: {
                   'Authorization': `Bearer ${Token}`
              }
              });
            if(res.status===200){
                setCompanyName(res.data.data.name);
            }
        }catch(error){
            console.log(error)
        }
    }




    const hadlePostJob = async()=>{

        setBtnText("Posting...")

        try{
            let response =await axios.post(url,JobData,{
                headers : {
                    "Content-Type" : "application/json",
                    'Authorization': `Bearer ${Token}`
                }
            })

            if(response.status===201){
                setBtnText("Job Posted")
                toast.success("Job Posted Successfully..!");
                replace('/job/RecruiterDashboardJobs')
                for(let i =1;i<=6;i++){
                    secureLocalStorage.removeItem(`Pr${i}`);
                }
                
            }
        }catch(error){
            setBtnText("Confirm")
            toast.error("Job Not Posted Something Went Wrong")
            console.log(error);
        }
    }

    return (
        <>
            <Head>
                <title>Job Preview - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            {/* <Jobheader showData3={false} /> */}
            {/* <CandidateJobProcess /> */}
           {
            show ? 
            <>
             <div className="process-row mt-4 PostaJobProvideBasicinfo">
                <h2 className='heading03'><span> Review the Job Post </span></h2>
            </div>


            <div className="process-container IncludeDetails Preview">

                <div className="previewCon">
                    <div className="div01">
                        <h3>Basic Information</h3>
                        <div className='previewpara'>
                            <p><strong>Job Title : </strong>{JobData.title}</p>
                            <p><strong>Employee Report to Work : </strong>{JobData.reportToWork==0 ? 'No' : JobData.reportAddress}</p>
                        </div>
                    </div>
                    <div className="div01 mt-4">
                        <h3>Include Details</h3>
                        <div className='previewpara'>
                            <p><strong>Job Type : </strong> {JobData.jobType?.split(",").join(", ")} </p>
                            <p><strong>Schedule for This Job : </strong>{JobData.schedule?.split(",").join(", ")}</p>
                            <p><strong>Planned Start Date for This Job : </strong>{JobData.isStartPlanned && JobData?.isStartPlanned===1 ? `Yes ${JobData?.startDate}` : "NO"}</p>
                        </div>
                    </div>
                    <div className="div01 mt-4">
                    <h3>Add Compensation</h3>
                        <div className='previewpara'>
                            <p><strong>Pay Range : </strong> {JobData?.payRange ? JobData?.payRange : 'No Range Selected'} per Annum</p>
                            <p><strong>Pay Rate : </strong> {JobData?.perMonth ? JobData?.perMonth : 'Data Not Provided'} per month</p>
                            <p><strong>Offer any Supplemental Pay : </strong>{JobData?.supplementalPay?.split(",").join(", ")}</p>
                            <p><strong>Benefits Offered : </strong>{JobData?.benefitsOffer?.split(",").join(", ")}</p>
                        </div>
                    </div>
                    <div className="div01 mt-4">
                        <h3>Describe the Job</h3>
                        <div className='previewpara'>
                            <p><strong>Job Description :</strong></p>
                            {
                                JobData.description && parse(JobData.description)
                            }
                        </div>
                    </div>
                    <div className="div01 mt-4">
                        <h3>Application Preferences</h3>
                        <div className='previewpara'>
                            <p><strong>You Like People to Submit CV : </strong>{JobData.isCVRequired ? 'YES' : "NO"}</p>
                            <p><strong>Application Deadline : </strong>{JobData.isDeadlineApplicable ? `Yes ${JobData?.deadlineDate.split("T")[0]}` : "NO"}</p>
                        </div>
                    </div>
                    <div className="div01 mt-4">
                        <h3>Recruitment</h3>
                        <div className='previewpara'>
                            <p><strong>Hiring Count : </strong> {JobData.noOfHiring}</p>
                            <p><strong>Time to Hire : </strong>{JobData.hiringSlot}</p>
                            <p><strong>Company Name : </strong>{CompanyName}</p>
                            <p><strong>About Company : </strong>{JobData.aboutCompany}</p>
                        </div>
                    </div>
                    <div className="div01 mt-4">
                        <h3>Education</h3>
                        <div className='previewpara'>
                            <p><strong>Highest Level of Education Completed : </strong>{JobData.educationLevel}</p>
                        </div>
                    </div>
                    <div className="div01 mt-4">
                        <h3>Optional</h3>
                        <div className='previewpara'>
                            <p><strong>Years of Experience : </strong>{JobData?.yearOfExperience && JobData?.yearOfExperience?.toString()?.split('.')[0]} Years {JobData?.yearOfExperience?.toString()?.split('.')[1] ? JobData?.yearOfExperience?.toString()?.split('.')[1] : '0'} Months</p>
                        </div>
                        <div className='previewpara'>
                            <p><strong>Relevent Years of Experience : </strong>{JobData?.releYearOFExperience && JobData?.releYearOFExperience?.toString()?.split('.')[0]} Years {JobData?.releYearOFExperience?.toString()?.split('.')[1] ? JobData?.releYearOFExperience?.toString()?.split('.')[1] : '0'} Months</p>
                        </div>
                    </div>
                </div>


                <div className="div03 mt-4">
                    <div className="jobtitlebtn mt-4">
                        <a class="btn maroon-border-btn  mt-4" onClick={()=>replace('/job/Recruitment')}>Back</a>
                        <div className='newLinkbtn'>
                        {/* <a class="btn maroon-border-btn mt-4" href="">Post on LinkedIn</a> */}
                        <a class="btn maroon-btn maroon-btn-arrow mt-4" onClick={hadlePostJob}>{BtnText}</a>
                        </div>
                    </div>
                </div>
            </div>
            </> : <h1 className='text-center m-4'><img src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="Loader" /></h1>
           }
            <Jobfooter />
        </>
    )
}
export default AuthorizeRec(Preview)