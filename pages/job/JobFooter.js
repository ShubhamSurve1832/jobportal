import React from "react";
import Image from "next/image";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsLinkedin,
  BsTwitterX
} from "react-icons/bs";
import { IoChevronForward } from "react-icons/io5";
import Link from "next/link";

export default function footer() {
  return (
    <>
      <footer className="footer jobfooter" id="footer">
        <div className="ft-top-row">
          <div className="hf-container footer_row">
            <div className="Footer_box1 flex01">
              <div className="logo_img  resp-img-box">
                <Image
                  src="/img/logo.png"
                  layout="fill"
                  className="resp-img"
                  alt="Simnadhar logo"
                ></Image>
              </div>
              <div className="social_media">
                <a
                  href="https://www.facebook.com/SimandharEducationCPACMA/"
                  target="_blank"
                >
                  <i>
                    <BsFacebook />
                  </i>
                </a>
                <a
                  href="https://twitter.com/simandharedu?lang=en"
                  target="_blank"
                >
                  <i>
                    {/* <BsTwitterX/> */}
                    {<svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"/></svg>}
                  </i>
                </a>
                <a
                  href="https://www.instagram.com/simandhar.cpa.cma/"
                  target="_blank"
                >
                  {" "}
                  <i>
                    <BsInstagram />
                  </i>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCNtcsDN1WhnsdS_m2wY-Z-g"
                  target="_blank"
                >
                  <i>
                    <BsYoutube />
                  </i>
                </a>
                <a
                  href="https://www.linkedin.com/company/simandhar-education/?originalSubdomain=in"
                  target="_blank"
                >
                  {" "}
                  <i>
                    <BsLinkedin />
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="ft-bottom-row jobportal-bottomrow">
          <div className="hf-container">
            <div className="footer_grid jpfooter_grid">
              <div className="footer_box a">
                <p className="footer_para">
                  An award-winning institute that believes in transforming
                  lives. Simandhar Education aims to upskill you and create a
                  new-age approach for success.
                </p>
               <p className="footer_para mail-text"> <a href="mailto:talentacquistion@simandhareducation.com">talentacquistion@simandhareducation.com</a></p>
              </div>
              <div className="footer_box b">
                <div>
                  <h4 className="footer_title">
                    Homepage{" "}
                    <span>
                      <i>
                        <IoChevronForward />
                      </i>
                    </span>{" "}
                  </h4>
                  <ul>
                    <li>
                      <Link href="/job/search" className="title01">
                        {" "}
                        Job Search
                      </Link>
                    </li>
                    <li>
                      <Link href="/job/resources" className="title01">
                        Corporate Tie-ups
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="/ea" className="title01">
                        LMS
                      </Link>
                    </li> */}
                    <li>
                      <Link href="/" className="title01">
                        Simandhar Education
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer_box c">
                <div>
                  <h4 className="footer_title">
                    User Registration/Sign-up{" "}
                    <span>
                      <i>
                        <IoChevronForward />
                      </i>
                    </span>{" "}
                  </h4>
                  <ul>
                    <li>
                      <Link href="/job/CandidateLogin" className="title01">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link href="/job/CandidateSignUp" className="title01">
                        {" "}
                        Signup{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                <Link href="/job/about-simandhar" className="title01">                        
                  <h4 className="footer_title">
                    About Us{" "}
                    <span>
                      <i>
                        <IoChevronForward />
                      </i>
                    </span>{" "}
                  </h4>
                      </Link>
                <Link href="/privacy-policy" className="title01">                        
                  <h4 className="footer_title">
                    Privacy policy{" "}
                    <span>
                      <i>
                        <IoChevronForward />
                      </i>
                    </span>{" "}
                  </h4>
                  </Link>
                </div>
              </div>
              <div className="footer_box d">
                <div>
                  {" "}
                  <Link href="/job/resources" className="title01">
                      
                  <h4 className="footer_title">
                    Resources{" "}
                    <span>
                      <i>
                        <IoChevronForward />
                      </i>
                    </span>{" "}
                  </h4>
                      </Link>
                      <Link href="https://www.simandhareducation.com/blogs" target="_blank" className="title01">
                        
                  <h4 className="footer_title">
                    Blogs{" "}
                    <span>
                      <i>
                        <IoChevronForward />
                      </i>
                    </span>{" "}
                  </h4>
                      </Link>
                      <Link href="/job/simandhar-news" className="title01">
                      
                  <h4 className="footer_title">
                    News{" "}
                    <span>
                      <i>
                        <IoChevronForward />
                      </i>
                    </span>{" "}
                  </h4>
                      </Link>
                      <Link  href="/job/jobportal-faqs" className="title01">
                  <h4 className="footer_title">
                    FAQ{" "}
                    <span>
                      <i>
                        <IoChevronForward />
                      </i>
                    </span>{" "}
                  </h4>
                      </Link>
                      <Link  href="/contact-simandhar" className="title01">

                  <h4 className="footer_title">
                    Contact Us{" "}
                    <span>
                      <i>
                        <IoChevronForward />
                      </i>
                    </span>{" "}
                  </h4>
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="copyright">
            Copyright © 2023 SIMANDHAR EDUCATION LLP - All rights reserved
          </h3>
        </div>
      </footer>
    </>
  );
}
