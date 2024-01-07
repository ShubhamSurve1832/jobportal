import React, { useEffect, useState } from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import { TbMathGreater } from 'react-icons/tb';
import { useRouter } from 'next/router'
import { BiData } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import secureLocalStorage from 'react-secure-storage';
import AuthorizeRec from './AuthorizeRec/AuthorizeRec';
import axios from 'axios';
import { CompanyBaseURL, jobPortalBaseURL } from '../../constants/urlConstants';

const Recruitment = () => {
    let Token = secureLocalStorage.getItem('RecruiterToken');
    let RecruiterID = secureLocalStorage.getItem("RecID");
    let [company,setcompany] = useState([]);
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


        fetchRecruiterCompany();
      },[])





      let [recruiterSpecificCompany,setrecruiterSpecificCompany] = useState({companyId : "",comapnyName : ""});
      const fetchRecruiterCompany = async() =>{
        try{
            let response = await axios.get(`${jobPortalBaseURL}recruiter/${RecruiterID}`,{
                headers : {
                   'Authorization': `Bearer ${Token}`
                }
              });
            if(response.status===200){
                fetchCompany(response?.data?.data?.companyName);
            }
        }catch(error){
            console.log(error)
        }
      }


    let router = useRouter();

    const [btnText , setBtnTex] = useState('Save and Show Preview');
    const handleSubmit = (e) => {
        e.preventDefault();
        // router.push('/');
        e.preventDefault();
        setBtnTex('Processing...')

        let calcexp = 0;
        let releExp = 0;
        // console.log("obj.experiance",obj.experiance)
        // console.log("obj.TotalmonthOFExp",obj.TotalmonthOFExp)
        // console.log("obj.relaventExperiance",obj.relaventExperiance)
        // console.log("obj.ReleTotalmonthOFExp",obj.ReleTotalmonthOFExp)
        if(obj.experiance==0 && obj.TotalmonthOFExp==0 || obj.relaventExperiance==0 && obj.ReleTotalmonthOFExp==0){
            calcexp= Number(`${obj?.experiance}.${obj.TotalmonthOFExp}`)
            releExp = Number(`${obj?.relaventExperiance ? obj?.relaventExperiance: 0}.${obj.ReleTotalmonthOFExp}`)
            // console.log("step one")
        }
        else if(obj.experiance>0 && obj.TotalmonthOFExp==0 || obj.relaventExperiance>0 && obj.ReleTotalmonthOFExp==0){
            calcexp = Number(`${obj.experiance}.${obj.TotalmonthOFExp}`)
            releExp = Number(`${obj.relaventExperiance}.${obj.ReleTotalmonthOFExp}`)
            // console.log("step two")
        }
        else if(obj.experiance==0 && obj.TotalmonthOFExp==0 || obj.relaventExperiance>0 && obj.ReleTotalmonthOFExp==0){
            calcexp = Number(`${obj.experiance}.${obj.TotalmonthOFExp}`)
            releExp = Number(`${obj.relaventExperiance}.${obj.ReleTotalmonthOFExp}`)
            // console.log("step three")
        }else if(obj.experiance>0 && obj.TotalmonthOFExp>11){
            calcexp = +obj.experiance+1
            releExp = Number(`${obj.relaventExperiance}.${obj.ReleTotalmonthOFExp}`)
            // console.log("step four 1")
        }else if( obj.relaventExperiance>0 && obj.ReleTotalmonthOFExp>11){
            calcexp = Number(`${obj.experiance}.${obj.TotalmonthOFExp}`)
            releExp = +obj.relaventExperiance+1
            // console.log("step four")
        }else if(obj.experiance ==10 ){
            calcexp = 10+"."+ Number(`${obj.TotalmonthOFExp ?"0"+obj.TotalmonthOFExp:obj.TotalmonthOFExp }`)
            releExp = +obj.relaventExperiance < 10 ? ("0"+ obj.relaventExperiance)+"."+(+obj.ReleTotalmonthOFExp <10 ?("0"+obj.ReleTotalmonthOFExp):obj.ReleTotalmonthOFExp) : obj.relaventExperiance+"."+(obj.ReleTotalmonthOFExp < 10? "0"+obj.ReleTotalmonthOFExp:obj.ReleTotalmonthOFExp)
            // console.log("miidle step",calcexp,releExp) 
        }else{
            calcexp = (`${obj?.experiance < 10 ? "0"+obj?.experiance:obj?.experiance}.${obj?.TotalmonthOFExp < 10 ? '0'+obj?.TotalmonthOFExp : obj?.TotalmonthOFExp? obj?.TotalmonthOFExp:0}`)
            releExp = parseFloat(`${obj?.relaventExperiance ?obj?.relaventExperiance :0}.${obj?.ReleTotalmonthOFExp < 10 ? "0"+obj.ReleTotalmonthOFExp : obj.ReleTotalmonthOFExp ? obj.ReleTotalmonthOFExp :0}`);
            // console.log("step five")           
            // console.log("calcexp",calcexp,"releExp",releExp)
        }
        let newObj = {
            noOfHiring : obj.openings,
            hiringSlot : obj.hireDate,
            aboutCompany : obj.review,
            educationLevel : obj.education,
            yearOfExperience : calcexp,
            releYearOFExperience : releExp,
            companyId : obj.companyId,
            status : 1,
        }
        // console.log("newObj",newObj)

        SaveData(newObj);
    }


    //save data
    const SaveData = (data) =>{
        let {noOfHiring,hiringSlot,aboutCompany,educationLevel,yearOfExperience,companyId,releYearOFExperience} = data;
        if(noOfHiring==="" || hiringSlot==='' || aboutCompany==="" || educationLevel==='' || companyId===''){
            toast.error('Fill Required Fields');
            setBtnTex('Save and Next')
        } else if(yearOfExperience < releYearOFExperience){
            toast.error("Relevant experience should always be less than Total Experience.");
            setBtnTex('Save and Next')
        }else{
            toast.success('Recruitment Data Updated Successfully..!');
            setBtnTex('Data Saved');
            router.push('/job/Preview')
            secureLocalStorage.setItem('Pr6',JSON.stringify(data));
        }
    }



    const handleBack = (e) => {
        e.preventDefault();
        router.push('/job/SetapplicationPrefernces')
    }

    const [openings, setOpenings] = useState(["1", "2", "3", "4"])
    const [experiance, setExperiance] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
    const [relaventExperiance, seRelaventExperiance] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
    const [hireDate, setHireDate] = useState(["Immediate","15 days","30 days","45 days","60 days","90 days"])
    const [education, setEducation] = useState([" Secondary (10th Pass)", " Higher Secondary (12th Pass)", " Diploma", " Bachelor's", " Master's"])
    const [obj, setObj] = useState({
        hireDate: "",
        openings: "",
        review: "",
        education: "",
        experiance: 0,
        relaventExperiance: 0,
        companyId : "",
        TotalmonthOFExp : 0,
        ReleTotalmonthOFExp : 0
    })



    let [opening,setOpening] = useState([]);
    useEffect(()=>{
        calculateOpening()
    },[])


    const fetchCompany = async(companynameofrecruiter) =>{
        try{
            let response = await axios.get(CompanyBaseURL,{
                headers : {
                   'Authorization': `Bearer ${Token}`
                }
              });
            if(response.status===200){
                setcompany(response.data.data);
                let specificComapnyOFRecruiter = response?.data?.data?.find((data,ind)=>{
                    if(data.name===companynameofrecruiter){
                        return data;
                    }
                })
                setrecruiterSpecificCompany({companyId : specificComapnyOFRecruiter?._id , comapnyName : specificComapnyOFRecruiter?.name})
            }
        }catch(error){
            toast.error("Something Went Wrong");
        }
    }

    //openings
    let calculateOpening = () =>{
        for(let i=1;i<=100;i++){
            opening.push(i);
        }
    }


    
    useEffect(()=>{
        let preData = JSON.parse(secureLocalStorage.getItem('Pr6'));
        if(preData!==null){
            setObj({
                hireDate: preData!==null ? preData?.hiringSlot : "",
                openings: preData!==null ? preData?.noOfHiring : "",
                review: preData!==null ? preData?.aboutCompany : "",
                education: preData!==null ? preData?.educationLevel : "",
                experiance: preData!==null && preData?.yearOfExperience?.toString()?.includes('.') ? Number(preData?.yearOfExperience?.toString()?.split('.')[0]) : preData?.yearOfExperience,
                TotalmonthOFExp : preData!==null && preData?.yearOfExperience?.toString()?.includes(".") ? Number(preData?.yearOfExperience?.toString()?.split('.')[1]) : 0,
                relaventExperiance: preData!==null && preData?.ReleYearOFExperience?.toString()?.includes('.') ? Number(preData?.ReleYearOFExperience?.toString()?.split('.')[0]) : preData?.ReleYearOFExperience,
                companyId : preData!==null ? preData?.companyId : "",
                ReleTotalmonthOFExp : preData!==null && preData?.ReleYearOFExperience?.toString()?.includes(".") ? Number(preData?.ReleYearOFExperience?.toString()?.split('.')[1]) : 0
            })

        }

    },[])





    // console.log(obj);

    
    return (
        <>
            <Head>
                <title>Recruitment - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            {/* <Jobheader showData3={false} /> */}
            {/* <CandidateJobProcess /> */}

            <a href="#PostJobRecruitement" id="TakeToProcess_ELEMENT">{null}</a>

            <div className="process-row mt-4 PostaJobProvideBasicinfo">
                <h2 className='heading03'>Post a Job <TbMathGreater /><span> Recruitment
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
                        <dd className='tick-box'></dd>
                        {/* <dd>2</dd> */}
                        {/* <dd>2</dd> */}
                    </dl>
                    <dl className='active select'>
                        <dt>Add Compensation</dt>
                        <dd className='tick-box'></dd>
                        {/* <dd>3</dd> */}
                        {/* <dd>3</dd> */}
                    </dl>
                    <dl className='active select'>
                        <dt>Describe the Job</dt>
                        <dd className='tick-box'></dd>
                        {/* <dd>4</dd> */}
                        {/* <dd>4</dd> */}
                    </dl>
                    <dl className='active select'>
                        <dt>Set Application Preferences</dt>
                        {/* <dd>5</dd> */}
                        <dd className='tick-box'></dd>
                        {/* <dd>5</dd> */}
                    </dl>
                    <dl id='PostJobRecruitement' className='active select'>
                        <dt>Recruitment</dt>
                        {/* <dd className='tick-box'></dd> */}
                        <dd>6</dd>
                    </dl>
                </div>
            </div>


            <form onSubmit={handleSubmit} className="jobtitlecontent process-container IncludeDetails Recruitment recr-dropdown">

                <div className="div06 mt-4">
                    <h3 className=''>How many people do you want to hire for this opening?</h3>
                    <div className='custom-dropdown'>
                        <select name="openings" id="" value={obj?.openings} onChange={(e) => { setObj({ ...obj, openings: e.target.value }) }}>
                            <option value="">No. of openings</option>
                           
                            {
                                opening && opening.map((data,ind)=>{
                                    return(
                                        <option value={data} onSelect={()=>setObj({ ...obj, openings: e.target.value})}>{data}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                </div>


                <div className="div05 mt-4">
                    <h3 className=''>How quickly do you need to hire?</h3>
                    <div className='custom-dropdown' >
                        <select name="hireDate" id="" value={obj?.hireDate} onChange={(e) => { setObj({ ...obj, hireDate: e.target.value }) }}>
                            <option value="">Select Days</option>
                            {
                                hireDate.map((data, index) => {
                                    return (
                                        <option value={data}>{data}</option>

                                    )
                                })
                            }

                        </select>
                    </div>
                </div>



                <div className="div05 mt-4">
                    <h3 className=''>Choose Your Company ?</h3>
                    <div className='custom-dropdown' >
                        <select name="hireDate" value={obj?.companyId} onChange={(e) => { setObj({ ...obj, companyId: e.target.value }) }}>
                            <option value="">Choose Company</option>
                                        <option value={recruiterSpecificCompany?.companyId}>{recruiterSpecificCompany?.comapnyName}</option>
                        </select>
                    </div>
                </div>

                <div className="div04 mt-4">
                    <h3 className=''>About Company :</h3>
                    <p>
                        <textarea id="w3review" value={obj?.review} name="review" rows="4" cols="50" placeholder='Enter Company Description...' onChange={(e) => { setObj({ ...obj, review: e.target.value }) }}>

                        </textarea>
                    </p>
                </div>

             
                <div className="div01 mt-4">
                    <h3 className=''>What is the highest level of education you have completed?</h3>
                    <div className="form-box">
                        {
                            education.map((data, index) => {
                                return (
                                    <>
                                        {
                                            data==obj?.education ? 
                                        <p className='d-ib v-middle radio-field custom-radio fz-20 v-middle'>
                                            <input type='radio' checked name='education' onChange={(e) => { setObj({ ...obj, education: data }) }} />
                                            <span className='checkmark'></span>
                                            {data}
                                        </p> : 
                                        <p className='d-ib v-middle radio-field custom-radio fz-20 v-middle'>
                                            <input type='radio' name='education' onChange={(e) => { setObj({ ...obj, education: data }) }} />
                                            <span className='checkmark'></span>
                                            {data}
                                        </p>
                                        }
                                    </>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="div02 mt-4">
                    <h3 className='heading05'>Optional</h3>
                    <p>If needed we can have question that we can ask to employer while submitting the job.</p>
                </div>
                <div className="div06 mt-4">
                    <h3 className=''>How many years of experience do you have?</h3>
                    <div className="filed">
                        <p>Experience (total)</p>
                        <div className='custom-dropdown'>
                            <select name="experiance" value={obj?.experiance} id="" onChange={(e) => { setObj({ ...obj, experiance: +e.target.value }) }}>
                                <option option value="0">Years</option>
                                {
                                    experiance.map((data, index) => {
                                        return (
                                            <>
                                                <option value={data}>{data}</option>
                                            </>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        {/* <p>of</p> */}
                        <div className='custom-dropdown'>
                        <select name="experiance" value={obj?.TotalmonthOFExp} onChange={(e) => { setObj({ ...obj, TotalmonthOFExp: +e.target.value }) }}>
                                <option option value="0">Months</option>
                                                <option  value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                                <option value={9}>9</option>
                                                <option value={10}>10</option>
                                                <option value={11}>11</option>
                                                <option value={12}>12</option>
                            </select>
                        </div>
                    </div>
                    <div className="filed">
                        <p>Experience (relevant)</p>
                        <div className='custom-dropdown'>
                            <select name="experiance" value={obj?.relaventExperiance} id="" onChange={(e) => { setObj({ ...obj, relaventExperiance: +e.target.value }) }}>
                                <option option value="0">Years</option>
                                {
                                    relaventExperiance.map((data, index) => {
                                        return (
                                            <>
                                                <option option value={data}>{data}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {/* <p>of</p> */}
                        <div className='custom-dropdown'>
                        <select name="experiance" value={obj?.ReleTotalmonthOFExp} onChange={(e) => { setObj({ ...obj, ReleTotalmonthOFExp: +e.target.value }) }}>
                                <option option value="0">Months</option>
                                               <option  value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                                <option value={9}>9</option>
                                                <option value={10}>10</option>
                                                <option value={11}>11</option>
                                                <option value={12}>12</option>
                            </select>
                        </div>
                    </div>

                </div>


                <div className="div03 mt-4">
                    <div className="jobtitlebtn mt-4">
                        <a class="btn maroon-border-btn  mt-4" onClick={handleBack}>Back</a>
                        <input type='submit' class="btn maroon-btn maroon-btn-arrow mt-4" value={btnText} />
                    </div>
                </div>
            </form >
            <Jobfooter />
        </>
    )
}
export default AuthorizeRec(Recruitment)