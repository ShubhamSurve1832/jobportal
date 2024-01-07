import React, { useEffect, useState } from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import { TbMathGreater } from 'react-icons/tb';
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast';
import secureLocalStorage from 'react-secure-storage';
import AuthorizeRec from './AuthorizeRec/AuthorizeRec';


const Addcompensation = () => {
    
    
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

      
      
      let router = useRouter();

      const [btnText, setBtnText] = useState('Save and Next')

      
      const handleSubmit = (e) => {
          e.preventDefault();
          setBtnText('Processing...')
          let newObj = {
              supplementalPay: obj.supplementalPay.join(','),
              benefitsOffer: obj.benifits.join(','),
              min:obj.minRange,
              max: obj.maxRange,
              payRange: obj.payRange,
              perMonth: obj.perMonth
            }
            SaveCompensation(newObj);
        }

        
        
        //SaveCompensation
        const SaveCompensation = (data) =>{
            let {supplementalPay,benefitsOffer,min,max,payRange,perMonth} = data;
        if(!supplementalPay || !benefitsOffer){
            if(!supplementalPay){
                toast.error('Supplemental Pay Required Field.!')
                setBtnText('Save and Next');
            }else{
                toast.error('Benefits Offer is Required Field.!')
                setBtnText('Save and Next');
            }
               
        }else{
           
            if(payRange){
                delete data?.min;
                delete data?.max;
                delete data?.perMonth;
                secureLocalStorage.setItem('Pr3',JSON.stringify(data));
                toast.success('Compensation Updated Successfully..!')
                setBtnText('Data Saved');
                router.push('/job/JobDescription')
            }else if(obj?.minRange || obj?.maxRange || obj?.perMonth){

                if(obj?.maxRange > obj?.minRange){
                    if(+obj?.perMonth*12 >= +obj?.minRange && +obj?.perMonth*12 <= +obj?.maxRange){
                        delete data?.payRange
                        secureLocalStorage.setItem('Pr3',JSON.stringify(data));
                        toast.success('Compensation Updated Successfully..!')
                        setBtnText('Data Saved');
                        router.push('/job/JobDescription')            
                    }else{
                        delete data?.min;
                        delete data?.max;
                        delete data?.perMonth;
                        secureLocalStorage.removeItem('Pr3');
                        toast.error(`Per Month Must Be Between ${obj?.minRange} To ${obj?.maxRange}`)
                        setBtnText('Save and Next');
                    }
                }else{
                    delete data?.min;
                    delete data?.max;
                    delete data?.perMonth;
                    secureLocalStorage.removeItem('Pr3');
                    toast.error('Maximum range should be always greater then minimum..!')
                    setBtnText('Save and Next');
                }                

            }else{
                secureLocalStorage.removeItem('Pr3');
                toast.error('Choose Pay Range Or Enter Mininum Maximum Salary..!')
                setBtnText('Save and Next');
            }

        }
    }
    
    
    
    const handleBack = (e) => {
        e.preventDefault();
        router.push('/job/IncludeDetails')
    }
    
    const handleAddJob = (e) => {
        setObj({ ...obj, supplementalPay: [...obj.supplementalPay, e] })
    }
    
    const handleAddBenifits = (e) => {
        setObj({ ...obj, benifits: [...obj.benifits, e] })
    }

    const handleBenifitsRem = (data) => {
        setObj(() => {
            return {
                ...obj,
                benifits: obj.benifits.filter((da, ind) => da !== data)
            }
        })
    }
    const handleRem = (data) => {
        setObj(() => {
            return {
                ...obj,
                supplementalPay: obj.supplementalPay.filter((da, ind) => da !== data)
            }
        })
        
    }
    const [payRange, setPayRange] = useState([{key:"Upto 1L",value:"100000"}, {key:"1L To 2L", value:"100000 To 200000"}, {key:"2L To 5L",value:"200000 To 500000"},{key:"5L To 10L",value:"500000 To 1000000"},{key:"10L To 15L",value:"1000000 To 1500000"},{key:"15L To 30L",value:"1500000 To 3000000"},{key:"More Than 30L",value:">3000000"}])
    const [supplementalPay, setSupplementalPay] = useState(["Not Applicable","Performance bonus","Joining Bonus", "Yearly bonus", "Commission pay", "Overtime pay", "Shift allowance", "Quarterly bonus"])
    const [benifits, setBenifits] = useState(["Not Applicable","Transportation","Health insurance", "Telecom reimbursement", "Food provided", "Paid sick time", "Work from home", "Provident Fund", "Paid time off"])
    const [obj, setObj] = useState({
        supplementalPay: [],
        benifits: [],
        minRange: 0,
        maxRange: 0,
        payRange: "",
        perMonth:0
    })



    
    
    useEffect(()=>{
        let predata = JSON.parse(secureLocalStorage.getItem('Pr3'));
        setObj({
            supplementalPay: predata!==null ? predata?.supplementalPay?.split(',') : [],
            benifits: predata!==null ? predata?.benefitsOffer?.split(',') : [],
            minRange: predata? predata.min :"",
             //predata!==null ? predata?.min ? predata?.min.replaceAll(",",'').split('.')[0].slice(1) : "" : '',
            maxRange: predata? predata.max :"",
            //  predata!==null ? predata?.max ? predata?.max.replaceAll(",",'').split('.')[0].slice(1) : "" : "",
            payRange: predata!==null ? predata?.payRange ? predata.payRange : "" : '',
            perMonth:predata? predata.perMonth :"" ,
            // predata!==null ? predata?.perMonth ? predata?.perMonth.replaceAll(",",'').split('.')[0].slice(1) : "" : ''
        })

    },[])

    return (
        <>
            <Head>
                <title>Add Compensation - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            {/* <Jobheader showData3={false} /> */}
            {/* <CandidateJobProcess /> */}

            <a href="#PostJobAddCompansation" id="TakeToProcess_ELEMENT">{null}</a>
            
            <div className="process-row mt-4 PostaJobProvideBasicinfo">
                <h2 className='heading03'>Post a Job <TbMathGreater /><span> Add Compensation </span></h2>
                <div className="process-box mt-4">
                    <dl className="active">
                        <dt>Provide Basic Information</dt>
                        {/* <dd className='number-box'>1</dd> */}
                        <dd className='tick-box'></dd>
                        {/* <dd>1</dd> */}
                    </dl>
                    <dl className="active select ">
                        <dt>Include Details</dt>
                        {/* <dd>2</dd> */}
                        {/* <dd>2</dd> */}
                        <dd className='tick-box'></dd>
                    </dl>
                    <dl id='PostJobAddCompansation' className='active select'>
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


            <form className="jobtitlecontent process-container IncludeDetails Addcompensation" onSubmit={handleSubmit}>


                <div className="div1">
                    <h3 className=''>What is the pay rate or range?</h3>
                    <div className="selectoption01 mt-4">
                        <p>Show Pay by :
                            <select name='payRange' className='pay-range-select' value={obj.payRange} onChange={(e) => { setObj({ ...obj, payRange: e.target.value }) }}>
                                <option value="">Select Pay Range</option>
                                {
                                    payRange.map((data, index) => {
                                        // console.log(data.key)
                                        return (
                                            <>
                                                <option key={index} value={data.key}>{data.key}</option>
                                            </>
                                        )
                                    })
                                }
                            </select></p>
                       {
                        obj?.payRange===''
                          &&
                    <div className="range">
                          <p><input  pattern="[0-9]{10}" type="number" placeholder='Min (Rs.)' value={obj.minRange} name='minRange' onChange={(e) => { setObj({ ...obj, minRange: e.target.value }) }} /></p>
                          <p><input  pattern="[0-9]{10}" type="number" placeholder='Max (Rs.)' value={obj.maxRange} name='maxRange' onChange={(e) => { setObj({ ...obj, maxRange: e.target.value }) }} /></p>
                          <p><input  pattern="[0-9]{10}" type="number" placeholder='Per Month (Rs.)' value={obj.perMonth} name='perMonth' onChange={(e) => { setObj({ ...obj, perMonth: e.target.value }) }} /></p>
                    </div>
                       }
                    </div>
                </div>

                <div className="div01 mt-4">
                    <h3 className=''>Do you offer any of the following supplemental pay?</h3>
                    <div className="selectoption">
                        {
                            supplementalPay.map((data, index) => {
                                let { supplementalPay } = obj;
                                return (
                                    <>
                                        {
                                            obj.supplementalPay.includes(data) ? <a class="btn maroon-border-btn active" onClick={() => handleRem(data)}>{data}</a> : <a class="btn maroon-border-btn inactive" onClick={() => handleAddJob(data)}>{data}</a>
                                        }
                                    </>
                                )
                            })
                        }

                    </div>
                </div>

                <div className="div01 div02 mt-4">
                    <h3 className=''>Are any of the following benefits offered?</h3>
                    <div className="selectoption">
                        {
                            benifits.map((data, index) => {
                                let { benifits } = obj;
                                return (
                                    <>
                                        {
                                            obj.benifits.includes(data) ? <a class="btn maroon-border-btn active" onClick={() => handleBenifitsRem(data)}>{data}</a> : <a class="btn maroon-border-btn inactive" onClick={() => handleAddBenifits(data)}>{data}</a>
                                        }
                                    </>
                                )
                            })
                        }
                    </div>
                </div>


                <div className="div03 mt-4">
                    <div className="jobtitlebtn mt-4">
                        <a className="btn maroon-border-btn mt-4" onClick={handleBack}>Back</a>
                        <input type='submit' class="btn maroon-btn maroon-btn-arrow mt-4" value={btnText} />
                    </div>
                </div>
            </form>
            <Jobfooter />
        </>
    )
}
export default AuthorizeRec(Addcompensation)