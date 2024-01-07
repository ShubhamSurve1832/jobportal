import React, { useState } from 'react'
import Image from 'next/image'
import _ from 'lodash'
import { S3_buckets } from '../constants/urlConstants';
const WebinarCard = ({ webinarData }) => {
    const [isShow, setShow] = useState(false);
    const [buttonText, setButtonText] = useState(false);
    const showContent = () => {
        setShow(!isShow);
        setButtonText(!buttonText);
    };
    // const [isShow1, setShow1] = useState(false);
    // const [buttonText1, setButtonText1] = useState(false);
    // const showContent1 = () => {
    //     setShow1(!isShow1);
    //     setButtonText1(!buttonText1);
    // };
    // let list = _.get(webinarData,"webinars",[])
    // console.log(webinarData)
    return (
        <>
        {
            webinarData.map((data, index) => {
                // console.log(data)    
                let{bannerAlt,desktopBanner,mobileBanner,path} = data;
                let desktopBanners = `${S3_buckets}/${desktopBanner}`
                let mobileBanners = `${S3_buckets}/${mobileBanner}`
                return (
                    <section className='webinar-card' key={index}>
                        <a href={path} target='_blank'>
                            <Image loading='lazy' src={desktopBanners} alt={bannerAlt} fill={true} sizes='100vw' className='resp-img desktop' />
                            <Image loading='lazy' src={mobileBanners} alt={bannerAlt} fill={true} sizes='100vw' className='resp-img mobile' />
                        </a>
                        {/* <div className={'container' + " " + (isShow ? "active" : "")}>
                            <div className="content text-center">
                                <h3 className="heading03">Certified Public Accountant (CPA)</h3>
                                <p>Certified Public Accountant (CPA) is a designation given by AICPA to individuals who have completed the Uniform CPA exam, met the required and relevant criteria. The CPA designation enforces high professional standards in the field of accounting.</p>
                            </div>
                            <div className="grid-section text-center">
                                <h3 className="heading03">Benefits of Enrolling in US CPA Course</h3>
                                <div className="grid">
                                    <div className="gird-box">
                                        <Image fill={true} loading='lazy' src="/img/earth.png" className='resp-img' alt="Global Recognition" />
                                        <p>Global Recognition</p>
                                    </div>
                                    <div className="gird-box">
                                        <Image fill={true} loading='lazy' src="/img/visa.png" alt="Migration with Ease" className='resp-img' />
                                        <p>Migration with Ease</p>
                                    </div>
                                    <div className="gird-box">
                                        <Image fill={true} loading='lazy' src="/img/stats.png" alt="Hikes in Salary" className='resp-img' />
                                        <p>Hikes in Salary</p>
                                    </div>
                                    <div className="gird-box">
                                        <Image fill={true} loading='lazy' src="/img/success.png" alt="Huge Career Opportunities" className='resp-img' />
                                        <p>Huge Career Opportunities</p>
                                    </div>
                                    <div className="gird-box">
                                        <Image fill={true} loading='lazy' src="/img/badge.png" alt="Highly-acclaimed Certification" className='resp-img' />
                                        <p>Highly-acclaimed Certification</p>
                                    </div>
                                </div>
                            </div>

                        </div> */}
                        {/* <div className="text-center">
                            <p className="btn maroon-btn maroon-btn-arrow"
                                onClick={showContent}  >
                                {buttonText ? "View Less " : "View More"}
                            </p>
                        </div> */}
                    </section>
                )
            })
        }


        </>
    )
}

export default WebinarCard