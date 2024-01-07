import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Field, Form, Formik, useFormik } from "formik";
import { HomePageJobPortalShema } from "./validation/Schema";
import { useRouter } from "next/router";
import {jobPortalBaseURL} from '../constants/urlConstants'
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-hot-toast";
import Link from "next/link";
import axios from 'axios'



const CarrierLadderBanner = () => {
  let candidateId = secureLocalStorage.getItem("Candidate")
  let CandidateEmail = secureLocalStorage.getItem("CandidateEmail")


  const {push} = useRouter();

  let [jobType,setjobType] = useState([]);

  const initialValue = {
    Skills: "",
    Experience: "",
    Location: "",
  };

  let {values,errors,touched,setErrors,handleBlur,handleChange,handleSubmit} = useFormik({

    initialValues: initialValue,
    validationSchema : HomePageJobPortalShema,

  


    onSubmit : (values) => {
      let {Skills,Experience,Location} = values;
      let searchData = {
        "userId" :candidateId,
        "email":CandidateEmail,
        "keywords":`${Skills}, ${Experience},${Location}`,
        "status":1
      }
      let filters = jobType.map((data,ind)=>{
        return data.split(' ').join('-')
      })

    //   const storeData = async () =>{
    //   try{
    //     let res = await axios.post(`${jobPortalBaseURL}search`,searchData,{
    //       headers:{
    //         "Content-Type" : "application/json"
    //     }
    //     })
    //     console.log(res)
    //   } catch(err){
    //     console.log(err)
    //   }
    // }
    
    if(Skills!=="" || Experience!=="" || Location!==""){
        push(`/job/search?search=${Skills}+${Experience}+${Location}&jobType=${filters && filters.join('+')}`);
        // storeData()
      }else{
        toast.error('Search With At Least One Option.!')
      }

    }

  });





  const addJoobType = (jobt) =>{
    console.log(jobt)
    if(!jobType.includes(jobt)){
      setjobType([...jobType,jobt])
    }else{
      toast.error('Already Filter Applied..!')
    }
  }



  const RemoveJobType = (jobt) =>{
    console.log(jobt)
    setjobType(()=>{
      return jobType.filter((type,ind)=>{
        return type!==jobt
      })
    })
  }




  const [listOFjobType,setListofJobType] = useState(['Full Time','Part Time','Intern'])


  return (
    <>
      <section className="job_carrierladder">
        <div className="jbanner_container">
          <h2 className="heading02 text-center">
            Climb the Next Step on Your Career Ladder
          </h2>
          <p className="heading05 text-center">
            Start exploring 100+ exciting career opportunities
          </p>
          <div className="search-form">






            <form className="form-row" action="" onSubmit={handleSubmit}>
              <div className="form-filed">
                <div className="serch-img">
                  <Image loading='lazy' 
                    src="/img/search.png"
                   fill={true} sizes='100vw' 
                    className="resp-img mobile "
                    alt="img"
                  />
                </div>
                <div className="input-filed">
                  <input
                    type="text"
                    placeholder="Skills / Designation / Companies"
                    name="Skills"
                    value={values.Skills} 
                    onBlur={handleBlur} onChange={handleChange}
                  />
                  {errors.Skills && touched.Skills ? <span className='danger' style={{marginTop:"8px"}}>{errors.Skills}</span> : null}<br />
                </div>
              </div>
              <div className="form-filed exprience-drop">
                <div className="serch-img">
                  <Image loading='lazy' 
                    src="/img/years.png"
                   fill={true} sizes='100vw' 
                    className="resp-img mobile "
                    alt="img"
                  />
                </div>
                <div className="input-filed">
                  <input type="text" placeholder="Experience " name="Experience" value={values.Experience} onBlur={handleBlur} onChange={handleChange} />
                  {errors.Experience && touched.Experience ? <span className='danger' style={{marginTop:"8px"}}>{errors.Experience}</span> : null}<br />
                </div>
              </div>
              <div className="form-filed location-filed">
                <div className="serch-img">
                  <Image loading='lazy' 
                    src="/img/location.png"
                   fill={true} sizes='100vw' 
                    className="resp-img mobile "
                    alt="img"
                  />
                </div>
                <div className="input-filed">
                  <input type="text" placeholder="Location" name="Location" value={values.Location} onBlur={handleBlur} onChange={handleChange} />
                  {errors.Location && touched.Location ? <span className='danger' style={{marginTop:"8px"}}>{errors.Location}</span> : null}<br />
                </div>
              </div>
              <div className="text-center ">
                <input type="submit" href="#" className=" btn maroon-btn maroon-btn-arrow" value="Search" />
              </div>
            </form>









          </div>
          <div className="jbanner-btn">
            <Link href="/job/search" className="btn-box pointer">
              <div className="frasher-icon">
                <Image loading='lazy' 
                  src="/img/frasher.png"
                 fill={true} sizes='100vw' 
                  className="resp-img mobile"
                  alt="img"
                />
              </div>
              <p>All jobs</p>
            </Link>


             {
              listOFjobType.map((type,ind)=>{
                // console.log("Type",type)
                return(
                  <>
                    <div className='btn-box pointer' style={{opacity : `${jobType.includes(type) ? '0.5' : '1'}`}} onClick={()=>jobType.includes(type) ? RemoveJobType(type) : addJoobType(type)}>
              <div className="frasher-icon">
                <Image loading='lazy' 
                  src={`${type==0 ? "/img/full-time.png" : type==1 ? '/img/exprinced.png' : '/img/startup.png'}`}
                 fill={true} sizes='100vw' 
                  className="resp-img mobile"
                  alt="img"
                />
              </div>
              <p>{type?.split(' ').join('-')}</p>
            </div>
                  </>
                )
              })
             }


          </div>
        </div>
      </section>
      <div className="job_steps-row">
        <div className="jobstep_container">
          <div className="job_step_box">
            <div className="job-step-inner-box">
              <div className="jrgitster-img">
                <Image loading='lazy' 
                  src="/img/register.png"
                 fill={true} sizes='100vw' 
                  className="resp-img mobile"
                  alt="img"
                />
              </div>
              <div className="j-steps">
                <h3>Step 1:</h3>
                <h2>Register</h2>
              </div>
            </div>
          </div>
          <div className="job_step_box">
            <div className="job-step-inner-box">
              <div className="jrgitster-img">
                <Image loading='lazy' 
                  src="/img/prepare.png"
                 fill={true} sizes='100vw' 
                  className="resp-img mobile"
                  alt="img"
                />
              </div>
              <div className="j-steps">
                <h3>Step 2:</h3>
                <h2>Prepare</h2>
              </div>
            </div>
          </div>
          <div className="job_step_box">
            <div className="job-step-inner-box">
              <div className="jrgitster-img">
                <Image loading='lazy' 
                  src="/img/apply.png"
                 fill={true} sizes='100vw' 
                  className="resp-img mobile"
                  alt="img"
                />
              </div>
              <div className="j-steps">
                <h3>Step 3:</h3>
                <h2>Apply</h2>
              </div>
            </div>
          </div>
          <div className="job_step_box">
            <div className="job-step-inner-box">
              <div className="jrgitster-img">
                <Image loading='lazy' 
                  src="/img/grow.png"
                 fill={true} sizes='100vw' 
                  className="resp-img mobile"
                  alt="img"
                />
              </div>
              <div className="j-steps">
                <h3>Step 4:</h3>
                <h2>Grow</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarrierLadderBanner;
