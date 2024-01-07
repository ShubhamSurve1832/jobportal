import React from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { urlConstants as urlConstant } from '../constants/urlConstants';
import toast from 'react-hot-toast';

const CommonForm = ({ isactive, showPopup, showTitle, showcity, showcourse, indexData, formName, showCtc, showRadio, showPara, shownoticeperiod, showposition, showLastCompany, showResume }) => {
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const router = useRouter()
    const buttonRef = useRef()
    const [values, setValues] = useState({
        name: "",
        email: "",
        number: "",
        position: "",
        noticeperiod: "",
        lastCompany: "",
        ctc: "",
        resume: "",
        formName: { formName }
    })

    // console.log(values)
    const { name, email, number, city, noticeperiod, lastCompany, resume, ctc, position } = values;
    const [success, setSuccess] = useState(false);

    const [hideBtn, setHideBtn] = useState(false);
    const hideDwnBtn = () => { setHideBtn(true); router.push("/thankyou") };

    const onFormSubmit = async (e) => {
        setButtonDisabled(true)
        try {

            let data = {
                "email": email,
                "name": name,
                "number": number,
                "designation": position,
                "noticePeriod": noticeperiod,
                "lastCompany": lastCompany,
                "currentCtc": ctc,
                "resume": resume
            };
            // console.log("data to our Database", data);      
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: urlConstant.careerForm,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            await axios.request(config)
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    // console.log(error);
                });
          
            router.push("/thankyou")
        }
        catch (err) {
            // console.log(err)
            toast.error(err.response.data.ExceptionMessage)
            setButtonDisabled(false)
        }

    }

    return (
        <div className='form-box'>
            <h6 className='heading06'>{indexData.heading}</h6>
            <p>{position}</p>
            <form  onSubmit={onFormSubmit}   >
                <input type='hidden' name={formName} value={formName} />

                <div className='input-box'>
                    <input type="text" name="name" placeholder='Enter your Name'
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
                    
                    <input type="text" name="number" minLength="10" maxLength="10" placeholder='Enter your Mobile Number'
                        {...register("number",
                            {
                                required: "Number is required",
                                pattern: {
                                    value: /^((?!(0))[0-9]{10})$/,
                                    message: "Enter Numbers only"
                                },
                                minLength: {
                                    value: 10,
                                    message: "Enter Min 10 Number"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "Enter Max 10 Number"
                                },
                                onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                            })}
                        className={errors.number ? 'error-border' : null}
                        //onChange={handleChange}
                        value={number}
                    />
                    {errors.number && <span className='error-message'>{errors.number?.message}</span>}
                </div>
                <div className='input-box custom-select'>
                    <select id="select-position" name={position} placeholder='Select' value={position}
                        {...register("position",
                            {
                                required: "Select",
                                onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                            })}
                        className={errors.position ? 'error-border' : null}

                    >
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
                </div>

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
                </div>

                <div className='input-box'>
                    <input type="text" name="lastCompany" placeholder='Enter Last Company'
                        value={lastCompany}
                        {...register("lastCompany", {

                            onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                        })}
                        className={errors.lastCompany ? 'error-border' : null}
                    />
                    {errors.lastCompany && <span className='error-message'>{errors.lastCompany?.message}</span>}
                </div>

                <div className='input-box'>
                    <input type="text" name="ctc" placeholder='Enter Current CTC'
                        value={ctc}
                        {...register("ctc", {

                            onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                        })}
                        className={errors.ctc ? 'error-border' : null}
                    />
                    {errors.ctc && <span className='error-message'>{errors.ctc?.message}</span>}
                </div>

                <div className='input-box'>
                    <input type="file" name="resume" placeholder='Upload resume'
                        value={resume}
                        {...register("resume", {

                            onChange: (e) => { setValues({ ...values, [e.target.name]: e.target.value }) },
                        })}
                        className={errors.lastCompany ? 'error-border' : null}
                    />
                    {errors.resume && <span className='error-message'>{errors.resume?.message}</span>}
                </div>

                <div className='input-box'>
                    <button type='submit' className={`btn maroon-border-btn maroon-border-btn-arrow ${isButtonDisabled ? 'disabled' : ''}`}>Register</button>
                    {success && (hideBtn ? " " : <a href='/img/sample.pdf' download={true} className='btn maroon-btn maroon-btn-arrow dwn-btn' onClick={hideDwnBtn}>Download PDF</a>)}



                    {/* 
                    <button type="submit" className='btn black-border black-border-btn-arrow'>Submit</button>
                    {success && (hideBtn ? " " : <a href='/img/sample.pdf' download={true} className='btn maroon-btn maroon-btn-arrow dwn-btn' onClick={hideDwnBtn}>Download PDF</a>)} */}
                </div>
            </form>
        </div>
    )
}

export default CommonForm