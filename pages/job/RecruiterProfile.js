import React,{useEffect,useState} from "react";
import Head from "next/head";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import Jobportalaside from '../../components/Jobportalaside'
import { RecruiterEditSchema } from '../../job/validation/Schema'
import { jobPortalBaseURL } from "../../constants/urlConstants";
import industry from "./listOFIndustries/industries.json";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import AuthorizeRec from './AuthorizeRec/AuthorizeRec';


const RecruiterProfile = () =>{
    let RecruiterID = secureLocalStorage.getItem("RecID")
    let Token = secureLocalStorage.getItem('RecruiterToken');
    const[newData,setNewData] = useState({})
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    let [EmployeeSize, setEmployeeSize] = useState(["0-10","10-20","20-50","50-100","100-500","500+"]);


    // GETTING EXISTING DATA
    let getRecruiterInfo = async ()=>{
        const response = await axios.get(`${jobPortalBaseURL}recruiter/${RecruiterID}`,{
            headers: {
               'Authorization': `Bearer ${Token}`
          }
          })
        if(response.status === 200){
            setNewData(response.data.data)
        }
    }

    // SETTING INITIAL VALUES FOR FORMIC VALIDATIONS
    const [initialValue, setInitialValue] = useState({
        firstName: newData.firstName,
        LastName:newData.LastName,
        email: newData.email,
        phoneNumber:newData.phoneNumber,
        companyName:newData.companyName,
        location:newData.location,
        Industry: newData.selectIndustry,
        // employeeSize: newData.employeeSize,
        Designation:newData.Designation
    });

    //HANDLING CHANGES BY RECRUITER
    const handleLocalChange = (event) => {
        const { name, value } = event.target;
        setIsButtonDisabled(true)
    }

    let {values,setValues,handleChange,handleSubmit,touched,errors,handleBlur} = useFormik({
        initialValues: initialValue,
        validationSchema: RecruiterEditSchema,
        onSubmit:(values) =>{        
            let data = ({
                firstName: values.firstName,
                LastName:values.LastName,
                email: values.email,
                password:values.password,
                phoneNumber:values.phoneNumber,
                companyName:values.companyName,
                // employeeSize:values.employeeSize,
                selectIndustry:values.Industry,
                yourDesignation:values.Designation,
                isHiringManager:1,
                location:values.location,
                updatedBy:RecruiterID,
                status:"Active"
            })     
            setIsButtonDisabled(true)
            editRecruiterData(data)
        }
    })


    // UPDATING NEW DATA OF RECRUITER
    const editRecruiterData = async(data) =>{
        try{            
        const response = await axios.patch(`${jobPortalBaseURL}recruiter/${RecruiterID}`,data,{
            headers: {
               'Authorization': `Bearer ${Token}`
          }
          })
            if(response.status === 200){  
               toast.success("Profile Updated")
               setIsButtonDisabled(false)
            }
        }catch(err){
            console.log(err)
        }
   }

    // SETTING ALREADY ENROLLED DATA TO FORM
    useEffect(()=>{
     if(newData){       
        var recruiterData = {
                firstName: newData.firstName,
                LastName:newData.LastName,
                email: newData.email,
                phoneNumber:newData.phoneNumber,
                companyName:newData.companyName,
                location:newData.location,
                Industry: newData.selectIndustry,
                // employeeSize: newData.employeeSize,
                Designation:newData.yourDesignation,
                password:newData.password
            };
            setValues(     
                recruiterData         
            )
        }
    },[newData])

    useEffect (()=>{
        getRecruiterInfo()
    },[])
    
    return(
        <>        
        <Head>
        <title>Recruiter Profile - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      {/* <Jobheader showData3={false} /> */}
      <div className='jp-admin-wrapper RecruiterDashboardJobs'>
      <Jobportalaside />
      <section className="recruiter-profile pt-8">
        <div className="profile container">
            <h1 className="heading04 mb-4">Recruiter Basic Information</h1>
            <form action="" onSubmit={handleSubmit}>
            <div className="input_field">
              <input
                type="text"
                name="firstName"
                minlength="2"
                value={values && values.firstName}
                onBlur={handleBlur}
                onChange={(e) => {handleChange(e);  handleLocalChange(e);  }}
                required
                id=""
                className="w-100"
                placeholder="First Name"               
              />
              {errors.firstName && touched.firstName ? (
                <span className="danger">{errors.firstName}</span>
                ) : null}
            </div>

            <div className="input_field">
              <input
                type="text"
                name="LastName"
                minlength="2"
                value={values && values.LastName}
                onBlur={handleBlur}
                onChange={(e) => {handleChange(e);  handleLocalChange(e);  }}
                required
                id=""
                className="w-100"
                placeholder="Last Name"               
              />
                {errors.LastName && touched.LastName ? (
                <span className="danger">{errors.LastName}</span>
                ) : null}
            </div>

            <div className="input_field">
              <input
                type="text"
                name="email"
                minlength="2"
                value={values && values.email}
                onBlur={handleBlur}
                onChange={(e) => {handleChange(e);  handleLocalChange(e);  }}
                required
                readOnly 
                id=""
                className="w-100"
                placeholder="Email"               
              />
              {errors.email && touched.email ? (
                <span className="danger">{errors.email}</span>
                ) : null}
            </div>
            
            <div className="input_field">
              <input
                type="val"
                name="phoneNumber"
                minlength="2"
                value={values && values.phoneNumber}
                onBlur={handleBlur}
                onChange={(e) => {handleChange(e);  handleLocalChange(e);  }}
                required
                readOnly 
                id=""
                className="w-100"
                placeholder="Enter Phone Number"               
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <span className="danger">{errors.phoneNumber}</span>
                ) : null}
            </div>

            <div className="input_field">
              <input
                type="text"
                name="companyName"
                minlength="2"
                value={values && values.companyName}
                onBlur={handleBlur}
                onChange={(e) => {handleChange(e);  handleLocalChange(e);  }}
                required
                readOnly
                id=""
                className="w-100"
                placeholder="Enter Company Name"               
              />
              {errors.companyName && touched.companyName ? (
                <span className="danger">{errors.companyName}</span>
                ) : null}
            </div>

            {/* <div className="input_field">
            <select
                    name="employeeSize"
                    onBlur={handleBlur}
                     onChange={(e) => {handleChange(e);  handleLocalChange(e);  }}
                     value={values && values.employeeSize}
                  >
                    <option value="">Enter Total Employee Size</option>
                    {EmployeeSize &&
                      EmployeeSize.map((data, ind) => {
                        return <option value={data}>{data}</option>;
                      })}
            </select>
                 {errors.employeeSize && touched.employeeSize ? (
                <span className="danger">{errors.employeeSize}</span>
                ) : null}
            </div> */}

            <div className="input_field">
            <select 
                    className="pointer rel-inst-select"
                    name="Industry"
                    onBlur={handleBlur}
                     onChange={(e) => {handleChange(e);  handleLocalChange(e);  }}
                     value={values && values.Industry}
                  >
                    <option value="">Choose Industry</option>
                    {industry.industry &&
                      industry.industry.map((list, ind) => {
                        return <option value={list}>{list}</option>;

                      })}
            </select>
              {errors.Industry && touched.Industry ? (
                <span className="danger">{errors.Industry}</span>
                ) : null}
            </div>

            <div className="input_field">
              <input
                type="text"
                name="Designation"
                minlength="2"
                value={values && values.Designation}
                onBlur={handleBlur}
                onChange={(e) => {handleChange(e);  handleLocalChange(e);  }}
                required
                id=""
                className="w-100"
                placeholder="Your Designation"               
              />
              {errors.Designation && touched.Designation ? (
                <span className="danger">{errors.Designation}</span>
                ) : null}
            </div>

            <div className="input_field">
              <input
                type="text"
                name="location"
                minlength="2"
                value={values && values.location}
                onBlur={handleBlur}
                onChange={(e) => {handleChange(e);  handleLocalChange(e);  }}
                required
                id=""
                className="w-100"
                placeholder="location"               
              />
              {errors.location && touched.location ? (
                <span className="danger">{errors.location}</span>
                ) : null}
            </div>

            <button className={`btn maroon-btn maroon-btn-arrow mt-4 mb-4 ${isButtonDisabled ? '' : 'disabled'}`} type="submit">Save</button>
            </form>
        </div>
      </section>

      </div>


      <Jobfooter />
        </>
    )
}

export default AuthorizeRec(RecruiterProfile);
