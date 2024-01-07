import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import { differenceInDays, differenceInHours } from "date-fns";
import Link from "next/link";

const FeaturesJob = ({ jobCards }) => {
  var partnerSlider = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <section className="job_featured_section pt-8">
        <div className="container">
          <h2 className="heading02"> Featured Jobs</h2>
          <div className="featured_row partnerSlider">
            {/* <Slider {...partnerSlider}> */}

            {
              jobCards && jobCards?.slice(0,4)?.map((jobs, index) => {
                // console.log("jobs",jobs)
                let { companyName,title, reportAddress, yearOfExperience, jobType, createdAt , _id , approveAdmin , company,companyLogo } = jobs;
             
                let Hours = differenceInHours(Date.now(),new Date(createdAt));

                  return (
                    <Link href={`/job/${_id}`} key={_id}>
                      <div className="featured_box" >
                        <div className="feat_two_row">
                          <div className="feat_left_box">
                            <h4>{title}</h4>
                            <h5>{companyName ? companyName : ''}</h5>
                          </div>
                          <div className="s_logo">
                            <img loading='lazy'
                              src={companyLogo ? companyLogo : company?.logo ?company?.logo:"/img/s_logo.png"}
                              className="resp-img mobile"
                              alt="img"
                            />
                          </div>
                        </div>
                        <div className="jdetails-row">
                          <div className="jdetaile-box">
                            <div className="jloc-img">
                              <Image loading='lazy'
                                src="/img/location.png"
                                fill={true} sizes='100vw'
                                className="resp-img mobile"
                                alt="img"
                              />
                            </div>
                            <h2>{reportAddress && reportAddress.slice(0,25)}..</h2>
                          </div>
                          <div className="jdetaile-box">
                            <div className="jloc-img">
                              <Image loading='lazy'
                                src="/img/years.png"
                                fill={true} sizes='100vw'
                                className="resp-img mobile"
                                alt="img"
                              />
                            </div>
                            <h2>0 to {yearOfExperience} Years</h2>
                          </div>
                          <div className="jdetaile-box">
                            <div className="jloc-img">
                              <Image loading='lazy'
                                src="/img/full_time.png"
                                fill={true} sizes='100vw'
                                className="resp-img mobile"
                                alt="img"
                              />
                            </div>
                            <h2>{jobType?.split(',').join(", ")}</h2>
                          </div>
                        </div>
                        {Hours >=24 ? <p className="jdate">{differenceInDays(Date.now(),new Date(createdAt))} days ago</p> : <p>{Hours} Hours ago</p>}
                      </div>
                    </Link>
                  )
                
              })
            }



            {/* </Slider> */}
          </div>
          <div className="text-center mt-4">
            <Link href="/job/search" className=" btn maroon-btn maroon-btn-arrow">
              View All Jobs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesJob;
