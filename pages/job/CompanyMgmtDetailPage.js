import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import { IoIosArrowBack } from 'react-icons/io';
import { AiFillStar } from 'react-icons/ai';
import { IoIosPeople } from 'react-icons/io';
import { HiLocationMarker } from 'react-icons/hi';
import { GiFactory } from 'react-icons/gi';
import { LuFileText } from 'react-icons/lu';
import { MdHomeRepairService } from 'react-icons/md';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { BiTime } from 'react-icons/bi';








const CompanyMgmtDetailPage = () => {
    return (
        <>
            <Head>
                <title>Job Profile - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            {/* <Jobheader showData3={false} /> */}
            <section className='section companymgmtdetail'>
                <div className="container">
                    <div className="dashbordBtn">
                        <a className="btn maroon-btn maroon-btn-arrow" href="/course/cpa"><IoIosArrowBack />  Back to dashboard </a>
                    </div>


                    <div className='result-box mt-4'>
                        <div className='co-logo'><img src="/img/job_portal/co_logo.jpg" /></div>
                        <div className='co-info'>
                            <h2>EY (Ernst & Young Private Limited) - Delhi</h2>
                            <div className='data-box'>
                                <p><i><AiFillStar /></i> <span>4.7 / 5</span></p>
                                <p><i><GiFactory /></i> <span>Financial services</span></p>
                                <p><i><IoIosPeople /></i> <span>50-200</span></p>
                                {/* <p><i><HiLocationMarker /></i> <span>Mumbai</span></p> */}
                            </div>
                        </div>
                    </div>

                    <div className="companymgmt mt-4">
                        <p><strong>About Ernst & Young Private Limited (EY)</strong></p>
                        <p>
                            Official EY Indeed Account. Join us as we ask #BetterQuestions and discuss topics that matter to you, the workplace, and the future of business.At EY, we’re dedicated to helping organizations solve their toughest challenges and realize their greatest ambitions - from start-ups to Fortune 500 companies – and the work we do with them is as varied as they are. Through our four service lines — Assurance, Consulting, Strategy and Transactions, and Tax — we help our clients capitalize on transformative opportunities. We also help them fulfill regulatory requirements, keep investors informed and meet the needs of all of their stakeholders. </p>
                    </div>
                    <div className="companymgmt mt-4">
                        <p><strong>3 Jobs openings at Ernst & Young Private Limited (EY)</strong></p>
                    </div>


                    <div className='result-section'>
                        <div className='result-container'>
                            <div className='result-box'>
                                <div className='co-logo'><img src="/img/job_portal/co_logo.jpg" /></div>
                                <div className='co-info'>
                                    <h2>Urgent Requirement For Quality Analyst- Mumbai-Thane <span className='active'>New</span></h2>
                                    <p>Ernst & Young Private Limited (EY)</p>
                                    <div className='data-box'>
                                        <p><i><MdHomeRepairService /></i> <span>0-7 years</span></p>
                                        <p><i><HiLocationMarker /></i> <span>Mumbai</span></p>
                                        <p><i><HiOutlineCurrencyRupee /></i> <span>6-12 lacs P.A.</span></p>
                                        <p><i><BiTime /></i> <span>Full Time</span></p>
                                        
                                    </div>
                                    <div className="data-box-newicon">
                                    <p><i><LuFileText/></i>Candidates with experience and also freshers can apply having share market knowledge.</p>
                                    </div>

                                    <div className="days mt-4">
                                        <p>2 days ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='result-section'>
                        <div className='result-container'>
                            <div className='result-box'>
                                <div className='co-logo'><img src="/img/job_portal/co_logo.jpg" /></div>
                                <div className='co-info'>
                                    <h2>Urgent Requirement For Quality Analyst- Mumbai-Thane</h2>
                                    <p>Ernst & Young Private Limited (EY)</p>
                                    <div className='data-box'>
                                        <p><i><MdHomeRepairService /></i> <span>0-7 years</span></p>
                                        <p><i><HiLocationMarker /></i> <span>Mumbai</span></p>
                                        <p><i><HiOutlineCurrencyRupee /></i> <span>6-12 lacs P.A.</span></p>
                                        <p><i><BiTime /></i> <span>Full Time</span></p>
                                        
                                    </div>
                                    <div className="data-box-newicon">
                                    <p><i><LuFileText/></i>Candidates with experience and also freshers can apply having share market knowledge.</p>
                                    </div>

                                    <div className="days mt-4">
                                        <p>2 days ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='result-section'>
                        <div className='result-container'>
                            <div className='result-box'>
                                <div className='co-logo'><img src="/img/job_portal/co_logo.jpg" /></div>
                                <div className='co-info'>
                                    <h2>Urgent Requirement For Quality Analyst- Mumbai-Thane</h2>
                                    <p>Ernst & Young Private Limited (EY)</p>
                                    <div className='data-box'>
                                        <p><i><MdHomeRepairService /></i> <span>0-7 years</span></p>
                                        <p><i><HiLocationMarker /></i> <span>Mumbai</span></p>
                                        <p><i><HiOutlineCurrencyRupee /></i> <span>6-12 lacs P.A.</span></p>
                                        <p><i><BiTime /></i> <span>Full Time</span></p>
                                        
                                    </div>
                                    <div className="data-box-newicon">
                                    <p><i><LuFileText/></i>Candidates with experience and also freshers can apply having share market knowledge.</p>
                                    </div>

                                    <div className="days mt-4">
                                        <p>2 days ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Jobfooter />
        </>
    )
}

export default CompanyMgmtDetailPage