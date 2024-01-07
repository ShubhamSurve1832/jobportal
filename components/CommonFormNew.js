import React from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { urlConstants as urlConstant } from '../constants/urlConstants';


const CommonFormNew = ({ isactive, showPopup, showTitle, showcity, showcourse, indexData, formName, showCtc, showRadio, showPara, shownoticeperiod, showposition, showLastCompany, showResume }) => {

    // RADIO OPTION SECTION 
    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const router = useRouter()
    const buttonRef = useRef()

    //Phone number validation
    const [phoneNumber, setPhoneNumber] = useState('')
    const [values, setValues] = useState({
        name: "",
        email: "",
        number: "",
        // city: "",
        position: "",
        noticeperiod: "",
        lastCompany: "",
        ctc: "",
        resume: "",
        // radioStatus: "",
        // existingStudent: {selectedOption}

    })

    const { name, email, number, city, course, position, noticeperiod, lastCompany, resume, ctc, radioStatus } = values;
    const [success, setSuccess] = useState(false);

    const [hideBtn, setHideBtn] = useState(false);
    // const hideDwnBtn = () => { setHideBtn(true); router.push("/thankyou") };

    const onFormSubmit = async () => {
        try {
            // const formData = new FormData();
            // formData.append('email', email);
            // formData.append('name', name);
            // formData.append('number', number);
            // // formData.append('city', city);
            // formData.append('designation', position);
            // formData.append('noticePeriod', noticeperiod);
            // formData.append('lastCompany', lastCompany);
            // formData.append('currentCtc', ctc);
            // formData.append('resume', resume);
            // formData.append('existingStudent', existingStudent);

            let obj = {
                email : email,
                name : name,
                number : number,
                designation : position,
                noticePeriod : noticeperiod,
                lastCompany : lastCompany,
                currentCtc : ctc,
                resume : resume
            }




            let res = await axios.post(urlConstant.careerForm,obj,{
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })

            if(res.status===200){
                // console.log(res);
                router.push("/thankyou")
            }

        
    }catch (err) {
        console.log(err)
    }
}


    return (
        <div className='form-box'>
            {
                showTitle ? (
                    <h6 className='heading06'>{indexData.heading}</h6>
                ) : ('')
            }
            <form method="post" onSubmit={handleSubmit(onFormSubmit)}>
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
                        className={errors.name ? 'error-border' : null} />
                    {errors.name && <span className='error-message'>{errors.name?.message}</span>}
                </div>
                <div className='input-box'>
                    <input type="text" name="email" placeholder='Enter Your Email Address'
                        {...register("email", {
                            required: "Email Id is required",
                            pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
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
                                    value: /^[5-9]\d{9,14}/,
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

                            {errors.course && <span className='error-message'>{errors.course?.message}</span>}
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
                            <select id="select-position" name="position" placeholder='Select'
                                {...register("position",
                                    {
                                        required: "Select",
                                        onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                                    })}
                                className={errors.position ? 'error-border' : null}

                                value={position}
                            >
                                <option value="" selected>Select Position</option>
                                <option value="Sr. SEO Specialist">Sr. SEO Specialist</option>
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
                    shownoticeperiod ?
                        <div className='input-box'>
                            <input type="text" name="noticeperiod" placeholder='Enter Notice Period'
                                value={noticeperiod}
                                {...register("noticeperiod", {
                                    required: "Notice period required",
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
                            <input type="number" name="ctc" placeholder='Enter Current CTC'
                                value={ctc}
                                {...register("ctc", {

                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: "Enter Numbers only"
                                    },

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
                            <input type="file" name="resume" title='Upload resume'
                                accept='.pdf,.doc,.docx'
                                {...register("resume", {
                                    required: "resume is required",
                                })}
                                onChange={ (e) => setValues({ ...values, resume : e.target.files[0] }) }
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
                    showPara ?
                        <p className='formPara'>
                            Disclaimer - Keeping in view of the various aspects, students enrolled by our corporate client will not be provided with any placement assistance.
                        </p> : ''

                }

                <div className='input-box'>
                    <button className='btn maroon-border-btn maroon-border-btn-arrow' ref={buttonRef}>Register</button>
                    {/* {success && (hideBtn ? " " : <a href='/img/sample.pdf' download={true} className='btn maroon-btn maroon-btn-arrow dwn-btn' onClick={hideDwnBtn}>Download PDF</a>)} */}



                    {/* 
                    <button type="submit" className='btn black-border black-border-btn-arrow'>Submit</button>
                    {success && (hideBtn ? " " : <a href='/img/sample.pdf' download={true} className='btn maroon-btn maroon-btn-arrow dwn-btn' onClick={hideDwnBtn}>Download PDF</a>)} */}
                </div>
            </form>
        </div>
    )
}

export default CommonFormNew