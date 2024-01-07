import React from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import _ from 'lodash'
import { urlConstants as urlConstant,API_BASE_URL } from '../constants/urlConstants';
import indexData from '../database/index.json'
import Head from 'next/head';
import { setCookie, getCookie } from "cookies-next";
import toast from 'react-hot-toast';


let cpa = _.get(indexData, "SimandharCPA.form")
let cma = _.get(indexData, "SimandharCMA.form")
let cia = _.get(indexData, "SimandharCIA.form")
let ea = _.get(indexData, "SimandharEA.form")

const CommonForm = ({ isactive, showPopup, showTitle, showcity, showcourse,setCourse, indexData, formName, showDownloadMCQ, showCtc, position, showRadio, showRadioStatus, showPara, shownoticeperiod, showposition, showLastCompany, showResume, showIcon, Qualification,otpVerify }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // For Download MCQ on section
    const [selectedMcq, setSelectedMcq] = useState('');
    const handleSelectChange = (event) => {
        setSelectedMcq(event.target.value);
    };
    const handleDownload = () => {
        // Logic to download PDF based on selectedOption
        // For example, fetch the PDF file from a server and initiate download
        if (selectedMcq === 'CPA') {
            window.open(cpa);
        } else if (selectedMcq === 'CMA') {
            window.open(cma);

        } else if (selectedMcq === 'CIA') {
            window.open(cia);

        } else if (selectedMcq === 'EA') {
            window.open(ea);
        }
    };


    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const router = useRouter()
    const buttonRef = useRef()
    const [values, setValues] = useState({});


    useEffect(() => {
        let url;
        if (window.location.href.includes('utm_source') && window.location.href.includes('utm_medium') && window.location.href.includes('utm_campaign')) {
            url = window.location.href;
            let utmSource = url.split('&')[0].split('?')[1].split('=')[1]
            setCookie('utmSource', utmSource)

            let utmMedium = url.split('&')[1].split("=")[1]
            setCookie('utmMedium', utmMedium)

            let utmCampaign = url.split('&')[2].split('=')[1]
            setCookie('utmCampaign', utmCampaign)
        }
        let utmSource = getCookie('utmSource');
        // console.log(utmSource + " Comman Page");
        // let utmMedium = window.localStorage.getItem('utmMedium');
        let utmMedium = getCookie('utmMedium');
        // let utmCampaign = window.localStorage.getItem('utmCampaign');
        let utmCampaign = getCookie('utmCampaign');

        setValues({
            name: "",
            email: "",
            number: "",
            course: setCourse ? setCourse :"",
            city: "",
            // position: { position },
            noticeperiod: "",
            lastCompany: "",
            ctc: "",
            resume: "",
            formName: { formName },
            MainSource: utmSource ? utmSource : "Direct Traffic",
            utm_medium: utmMedium ? utmMedium : "",
            utm_campaign: utmCampaign ? utmCampaign : "",
            radioStatus: "",
            qualification: "",
            existingStudent: { selectedOption },
            otp:""
        })


    }, [])




    const { name, email, number, utm_medium, utm_campaign, city, course, noticeperiod, lastCompany, resume, ctc, radioStatus, existingStudent, MainSource, qualification ,otp} = values;
    const [success, setSuccess] = useState(false);
    const[inputOTPVarify,setInputOTPVarify] = useState(otpVerify);
    const [hideBtn, setHideBtn] = useState(false);
    const [verify, setVerify] = useState(false)
    const hideDwnBtn = () => { setHideBtn(true); router.push("/thankyou"); };


    const onFormSubmit = async (e) => {
        setButtonDisabled(true)
        try {

        let data = {
            "emailAddress": email,
            "firstName": name,
            "phone": number,
            "mxCourse": course || selectedMcq,
            "mxMainsource": formName,
            "mxLeadSubSource": MainSource,
            "SourceMedium": utm_medium,
            "SourceCampaign": utm_campaign,
            "mxCity": city,
            // "position": position,
            "noticeperiod": noticeperiod,
            "lastCompany": lastCompany,
            "ctc": ctc,
            "resume": resume,
            "mxExistingStudent": selectedOption,
            "qualification": qualification
        };

            let res = await axios.post(urlConstant.commonForm, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let d = await res.data;
            // console.log(d);
            // buttonRef.current.click()
            handleDownload()
            router.push("/thankyou")
        }
        catch (err) {
            // console.log(err)
            toast.error(err.response.data.ExceptionMessage)
            setButtonDisabled(false)
        }     

    }

    const onGenerateOTP = async ()=>{
        let data = {           
            "phone": 91+number
        };
        try{
            let res = await axios.post(`https://devapi.simandhareducation.com/crm/generate-otp`,data)
            if(res.status === 200){
                setVerify(true)
                setInputOTPVarify(false)
            }
        }catch(err){
            console.log(err)
        }
    }

    const verifyOTP = async ()=>{
        let data = {           
            "phone": 91+number,
            "otp":otp
        };
        try{
            let response = await axios.post(`https://devapi.simandhareducation.com/crm/verify-otp`,data)          
                
            if(response.data.success){                  
                try{                
                let payload ={
                    "emailAddress": email,
                    "firstName": name,
                    "phone": number,
                    "qualification": qualification,
                    "SourceMedium": utm_medium,
                    "SourceCampaign": utm_campaign,
                    "mxLeadSubSource": MainSource,

                }
                let res = await axios.post(urlConstant.commonForm, payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                // console.log("res",res)
                if(res.data.Status === "Success"){
                    router.push("/thankyou")
                }
            }catch(error){
                toast.error(error.response.data.ExceptionMessage?error.response.data.ExceptionMessage:"Something went wrong !") 
            }
            }        
           
        }catch(err){            
            toast.error("OTP Not Matched")
        }
    }

    return (
        <>
            <div className='form-box'>
                <div className="form-header">
                    {
                        showIcon ? <i className='resp-img-box'><Image loading='lazy' src="/img/enq_icon.svg" alt="enquire icon" fill={true} sizes='100vw' className='resp-img' /></i> : ""
                    }
                    {
                        showTitle ? (
                            <>
                                <h6 className='heading06'>{indexData.heading}</h6>
                                <p>{position}</p>
                            </>
                        ) : ('')
                    }
                </div>
                <form onSubmit={inputOTPVarify?handleSubmit(onGenerateOTP) :verify?handleSubmit(verifyOTP): handleSubmit(onFormSubmit)}>
                    <input type='hidden' name={formName} value={formName} />

                    <div className='input-box'>
                        <input type="text" name="name" placeholder='Enter your Name' minLength="2"
                            value={name}
                            {...register("name", {
                                required: "Name is required",
                                pattern: {
                                    value: /^[a-zA-Z ]*$/,
                                    message: "Enter letters only"
                                },
                                onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                            })}
                            className={errors.name ? 'error-border' : null}


                        />
                        {errors.name && <span className='error-message'>{errors.name?.message}</span>}
                    </div>
                    <div className='input-box'>
                        <input type="text" name="email" placeholder='Enter Your Email Address'
                            {...register("email", {
                                required: "Email Id is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: "Enter valid email id"
                                },
                                onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                            })}
                            className={errors.email ? 'error-border' : null}

                            value={email}
                        />
                        {errors.email && <span className='error-message'>{errors.email?.message}</span>}
                    </div>

                    <div className='input-box'>
                        <input id="enquiry" name="enquiry" type="tel" placeholder="Enter Your Mobile Number" minLength="10" maxLength="15"
                            {...register("number",
                                {
                                    required: "Number is required",
                                    pattern: {
                                        value: /^[6-9]\d{9,14}/,
                                        message: "Enter Valid Number"
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Enter Min 10 Number"
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: "Enter Max 15 Number"
                                    },
                                    onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                                })}
                            className={errors.number ? 'error-border' : null}
                            //onChange={handleChange}
                            value={number}
                        />
                        {errors.number && <span className='error-message'>{errors.number?.message}</span>}
                    </div>

                    {
                        Qualification ?
                            <div className='input-box'>
                                <input type="text" name="qualification" placeholder='Qualification' minLength="2"
                                    value={qualification}
                                    {...register("qualification", {
                                        required: "qualification is required",

                                        onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                                    })}
                                    className={errors.qualification ? 'error-border' : null}


                                />
                                {errors.qualification && <span className='error-message'>{errors.qualification?.message}</span>}
                            </div> : ""
                    }


                    {
                        showcity ?
                            <div className='input-box custom-select'>
                                <input type="text" name="city" placeholder='Enter City'
                                    value={city}
                                    {...register("city", {
                                        required: "City is required",
                                        pattern: {
                                            value: /^[a-zA-Z ]*$/,
                                            message: "Enter letters only"
                                        },
                                        onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                                    })}
                                    className={errors.city ? 'error-border' : null} />
                                {errors.city && <span className='error-message'>{errors.city?.message}</span>}


                            </div> : " "
                    }

                    {
                        showcourse ?
                            <div className='input-box custom-select'>
                                <select id="select-course" name="course" placeholder='Select Course'
                                    {...register("course",
                                        {
                                            required: "Select Course",
                                            onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                                        })}
                                    className={errors.course ? 'error-border' : null}

                                    value={course}
                                >
                                    <option value="" selected>Select Course</option>
                                    <option value="CPA">US CPA</option>
                                    <option value="CMA">US CMA</option>
                                    <option value="EA">EA</option>
                                    <option value="ACCA Skill Level">ACCA Skill Level</option>
                                    <option value='CIA'>CIA</option>
                                    <option value='IFRS'>IFRS</option>
                                    <option value='Data-Analytics'>Data Analytics</option>
                                    <option value='Samarth'>FNF</option>
                                </select>
                                {errors.course && <span className='error-message'>{errors.course?.message}</span>}
                            </div> : ' '
                    }

                    {
                        showposition ?
                            <div className='input-box custom-select'>
                                <select id="select-position" name={position} placeholder='Select' value={position}
                                    {...register("position",
                                        {
                                            required: "Select",
                                            onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                                        })}
                                    className={errors.position ? 'error-border' : null} >
                                    <option value="" selected>position</option>
                                    <option value="Sr. SEO Specialist">{position}</option>
                                    <option value="Academic Counselor">Academic Counselor</option>
                                    <option value="Digital Marketing">Digital Marketing </option>
                                    <option value='Student Engagement'>Student Engagement </option>
                                    <option value='Senior Frontend Developer'>Senior Frontend Developer  </option>
                                    <option value='Senior Backend Developer'>Senior Backend Developer  </option>
                                    <option value='Content Writer '>Content Writer </option>
                                    <option value="Human Resource">Human Resource</option>
                                    <option value="Quality Auditor ">Quality Auditor </option>
                                    <option value="Finance Associate">Finance Associate</option>
                                </select>
                                {errors.position && <span className='error-message'>{errors.position?.message}</span>}
                            </div> : ' '
                    }

                    {
                        showDownloadMCQ ?
                            <div className='input-box custom-select select-field'>
                                <select value={selectedMcq} onChange={handleSelectChange}>
                                    <option value="">Select Course</option>
                                    <option value="CPA">US CPA</option>
                                    <option value="CMA">US CMA</option>
                                    <option value="CIA">CIA</option>
                                    <option value="EA">EA</option>
                                </select>
                            </div> : ""
                    }

                    {
                        shownoticeperiod ?
                            <div className='input-box'>
                                <input type="text" name="noticeperiod" placeholder='Enter Notice Period'
                                    value={noticeperiod}
                                    {...register("noticeperiod", {
                                        required: "notice period required",
                                        onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                                    })}
                                    className={errors.noticeperiod ? 'error-border' : null}
                                />
                                {errors.noticeperiod && <span className='error-message'>{errors.noticeperiod?.message}</span>}
                            </div> : ""
                    }
                    {
                        showLastCompany ?
                            <div className='input-box'>
                                <input type="text" name="lastCompany" placeholder='Enter Last Company'
                                    value={lastCompany}
                                    {...register("lastCompany", {

                                        onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                                    })}
                                    className={errors.lastCompany ? 'error-border' : null}
                                />
                                {errors.lastCompany && <span className='error-message'>{errors.lastCompany?.message}</span>}
                            </div> : ""
                    }
                    {
                        showCtc ?
                            <div className='input-box'>
                                <input type="text" name="ctc" placeholder='Enter Current CTC'
                                    value={ctc}
                                    {...register("ctc", {

                                        onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                                    })}
                                    className={errors.ctc ? 'error-border' : null}
                                />
                                {errors.ctc && <span className='error-message'>{errors.ctc?.message}</span>}
                            </div> : ""
                    }
                    {
                        showResume ?
                            <div className='input-box'>
                                <input type="file" name="resume" placeholder='Upload resume'
                                    value={resume}
                                    {...register("resume", {

                                        onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                                    })}
                                    className={errors.lastCompany ? 'error-border' : null}
                                />
                                {errors.resume && <span className='error-message'>{errors.resume?.message}</span>}
                            </div> : ""
                    }

                    {
                        showRadio ?
                            <div className="input-box radio" style={{ borderBottom: 'none' }}>
                                <p>Simandhar or Non-Simandhar Student</p>
                                <label class="radio-btn">Simandhar
                                    <input type="radio" checked={selectedOption === 'Simandhar'} name="radio" value="Simandhar" onChange={handleOptionChange} />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="radio-btn">Non-Simandhar
                                    <input type="radio" checked={selectedOption === 'Non-Simandhar'} name="radio" value="Non-Simandhar" onChange={handleOptionChange} />
                                    <span class="checkmark"></span>
                                </label>
                            </div> : ''
                    }
                    {
                        showRadioStatus ?
                            <div className="input-box radio" style={{ borderBottom: 'none' }}>
                                <p>Status</p>
                                <label class="radio-btn">Student
                                    <input type="radio" value="Student" checked={selectedOption === 'Student'} name="radio" onChange={handleOptionChange} />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="radio-btn">Working Professional
                                    <input type="radio" checked={selectedOption === 'Working Professional'} value="Working Professional" name="radio" onChange={handleOptionChange} />
                                    <span class="checkmark"></span>
                                </label>
                            </div> : ''
                    }
                    {
                        showPara ?
                            <p className='formPara'>
                                Disclaimer - Keeping in view of the various aspects, students enrolled by our corporate client will not be provided with any placement assistance.
                            </p> : ''

                    }

                    {
                        verify ? 
                        <div className='input-box'>
                        <input type="text" name="otp" placeholder='Enter OTP' minLength="2"
                            value={otp}
                            {...register("otp", {
                                required: "otp is required",

                                onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                            })}
                            className={errors.otp ? 'error-border' : null}


                        />
                        {errors.otp && <span className='error-message'>{errors.otp?.message}</span>}
                    </div> : ""
                    }

                    <div className='input-box mb-2'>
                        <button type="submit" className={`btn maroon-border-btn maroon-border-btn-arrow ${isButtonDisabled ? 'disabled' : ''}`}> {otpVerify?"Verify OTP":"Register"}</button>
                        {success && (hideBtn ? " " : <a href='/img/sample.pdf' download={true} className='btn maroon-btn maroon-btn-arrow dwn-btn' onClick={hideDwnBtn}>Download PDF</a>)}



                        {/* 
                    <button type="submit" className='btn black-border black-border-btn-arrow'>Submit</button>
                    {success && (hideBtn ? " " : <a href='/img/sample.pdf' download={true} className='btn maroon-btn maroon-btn-arrow dwn-btn' onClick={hideDwnBtn}>Download PDF</a>)} */}
                    </div>
                </form>
            </div>
        </>
    )
}

export default CommonForm