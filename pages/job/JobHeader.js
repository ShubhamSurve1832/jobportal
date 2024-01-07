import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
// import { useRouter } from 'next/router'
import { usePathname } from "next/navigation";
// import Slider from 'react-slick'
import { CgProfile } from "react-icons/cg";
// import { BsCart2 } from "react-icons/bs";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { IoCaretForward } from "react-icons/io5";
// import Slider from "react-slick";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { jobPortalBaseURL } from "../../constants/urlConstants";
import { toast } from "react-hot-toast";
import { Router, useRouter } from "next/router";
import { BiLogOutCircle } from "react-icons/bi";
import Spinner from "../../components/comman/Spinner";

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);
  
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);
  
  return scrollDirection;
}
// function MyComponent (props) {
  
  //   const [isActive, setActive] = useState(false);

  //   const toggleClass = () => {
//     setActive(!isActive);
//   };

//   return (
  //     <div
//       className={isActive ? 'active': ''}
//       onClick={toggleClass}
//     >
//       <p>{props.text}</p>
//     </div>
//    );
// }

export default function Header({ showData, showData1, showData3 }) {

  const router = useRouter()
  let handleRefresh = () =>{
      router.reload()
  }

  const scrollDirection = useScrollDirection();
  let Token = secureLocalStorage.getItem('RecruiterToken');
  let CandidateToken = secureLocalStorage.getItem('CandidateToken');
  let Role = secureLocalStorage.getItem("ROLE")

  // console.log("Role",Role)
  
  
  const [isActive, setActive] = useState(false);
  const [loader, setLoader] = useState(false)
  const showMenu = () => {
    setActive(!isActive);
  };

  const pathname = usePathname();

  // Nav Dropdown
  const [isShow, setIsShow] = useState(false);
  const showDwnPopup = () => {
    if (isShow1) {
      setIsShow1(!isShow1);
    }
    setIsShow(!isShow);
  };

  const [isShow1, setIsShow1] = useState(false);
  const showDwnPopup1 = () => {
    if (isShow) {
      setIsShow(!isShow);
    }
    setIsShow1(!isShow1);
  };

  const [isShow2, setIsShow2] = useState(false);
  const showDwnPopup2 = () => {
    setIsShow2(!isShow2);
  };

  // const [isActive, setActive] = useState(false);
  // const toggleClass = () => {
  //   setActive(!isActive);
  // };

  let [LoggedInData, setLoggedInData] = useState({});


  useEffect(() => {
    let user = secureLocalStorage.getItem("Candidate");
    let Recruiter = secureLocalStorage.getItem("RecID");
    let Simandhar = secureLocalStorage.getItem('SIMLoginData');
    fetchLoginData(user, Recruiter,Simandhar);
  }, []);

  const fetchLoginData = async (user, Recruiter) => {
    setLoader(true)
    // console.log("Candidate Token", CandidateToken)
    try {
      if (user) {
        let response = await axios.get(`${jobPortalBaseURL}user/${user}`,{
          headers: {
             'Authorization': `Bearer ${CandidateToken}`
        }
        });
        if (response.status === 200) {
          setLoggedInData(response.data.data);
          setLoader(false)
          // console.log("hitted res")
        }
      } else if(Recruiter) {
        let response = await axios.get(
          `${jobPortalBaseURL}recruiter/${Recruiter}`,{
            headers: {
               'Authorization': `Bearer ${Token}`
          }
          }
        );
        if (response.status === 200) {
          setLoggedInData(response.data.data);
          setLoader(false)
        }
      }else{
        let data = secureLocalStorage.getItem('SIMLoginData');
        setLoggedInData(data);
        setLoader(false)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  let { replace, reload , route} = useRouter();

 
  const logout1 = () => {
    let LogoutMode = secureLocalStorage.getItem('LogoutMode');
    if(confirm("Want To Logout ?")){
      toast.loading("Wait Logging You Out.");
      secureLocalStorage.removeItem("Candidate");
      secureLocalStorage.removeItem("RecID");
      secureLocalStorage.removeItem("mode");
      secureLocalStorage.removeItem("SIMTK");
      secureLocalStorage.removeItem("SIMLoginData");
      secureLocalStorage.removeItem("RecruiterToken")
      setTimeout(() => {
        replace(LogoutMode==='Candidate' ? "/job/CandidateLogin" : LogoutMode==='Rec' ? '/job/RecruiterLogin' : LogoutMode==='Admin' ? '/job/SimandharLogin' : "/job/CandidateLogin");
        toast.dismiss();
        toast.success("Logged Out.");
        secureLocalStorage.removeItem("LogoutMode");
      }, 2000);
      handleRefresh()
    }
  };



  // let [CheckViewWidth,setCheckViewWidth] = useState(0);

  // useEffect(()=>{
  //   setCheckViewWidth(window.innerWidth)
  // })

  // console.log(CheckViewWidth);
 
  setTimeout(() => {
    setIsShow(true)
  }, 1000);

  return (
    <>
      <header
        className={`header jobheader ${
          scrollDirection === "down" ? "active" : " "
        }`}
        id="header"
      >
        <nav className="navbar hf-container">
          <div className="logo_img  resp-img-box">
            <Link href={`${LoggedInData?.type=='jobPortalAdmin' ?"":"/"}`}>
              {" "}
              <Image
                src="/img/logo.png"
                layout="fill"
                className="resp-img"
                alt="Simandhar logo"
              />
              {/* <Image
                src="/img/haticon.png"
                layout="fill"
                className="resp-img mobile-logo"
                alt="Simandhar logo"
              /> */}
            </Link>
          </div>
          <div className="left_nav">
            <button className="menu-btn" onClick={showMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className={"nav" + " " + (isActive ? "active" : "")}>
              <button className="close-menu" onClick={showMenu}>
                <span></span>
                <span></span>
              </button>
              <ul className="navbar_list">
              <li
                  className={pathname == "/job/search" ? "active" : ""}
                  onClick={showMenu}
                >
                  {" "}
                  <Link href={`${Role === "admin" ?"/job/EducationJobs":"/job/search"}`}> Home </Link>{" "}
                </li>

                <li
                  className={pathname == "/job/about-simandhar" ? "active" : ""}
                  onClick={showMenu}
                >
                  {" "}
                  <Link href="/job/about-simandhar"> About </Link>{" "}
                </li>             
              
                <li
                  className={pathname == "/job/resources" ? "active" : ""}
                  onClick={showMenu}
                >
                  {" "}
                  <Link href="/job/resources">Resources</Link>
                </li>
                <li
                  className={pathname == "/job/simandhar-news" ? "active" : ""}
                  onClick={showMenu}
                >
                  {" "}
                  <Link href="/job/simandhar-news">News</Link>
                </li>
                <li
                  className={pathname == "/job/jobportal-faqs" ? "active" : ""}
                  onClick={showMenu}
                >
                  {" "}
                  <Link href="/job/jobportal-faqs">FAQs</Link>
                </li>
              </ul>
            </div>

{
  isShow ? 

  <>
  {(!LoggedInData?.firstName && !LoggedInData?.email) && (              
              <>
              <div className="flex space-between" >
                <div className="btn01">
                  <Link href="/job/CandidateLogin">
                    <button className="btn desktop">Candidate Login</button>
                      <div  className="candidate-login-icon "><img src="/img/haticon.png" alt="simandhar candidate login" layout="fill"
                            className="resp-img mobile"/>

                      <div className="profile-dropdown">
                              <Link className="logins" href="/job/CandidateLogin">Login as Candidate</Link>
                              <Link href="/job/RecruiterLogin" className="logins">Login as Employer</Link>
                      </div>
                
                    </div>
                  </Link>
                </div>
                <div className="btn01 employee-dropdown">
                  <Link href="/job/RecruiterLogin">
                    <button className="btn " >Employers</button>                    
                  </Link>
                </div>
                </div>
                {/* <div className="btn01">
                  <Link href="/job/SimandharLogin">
                    <button className="btn">Simandhar</button>
                  </Link>
                </div> */}
              </>
            )}
  </> :
  
  <div className="jobheader-spin">
  <Spinner />
  </div>
  
}
            




{
  isShow ? <>
            {(LoggedInData?.firstName || LoggedInData?.email) && (
              <>
                <div className="login-box">
                  <span className="cart-bx">
                    <Link href="javascript:;" style={{ color: "#760B28" }}>
                      <i>
                        <CgProfile />
                      </i>
                      {LoggedInData?.type=='jobPortalAdmin' ? <h6 className="profile btn"> {LoggedInData.email}</h6> : 
                      <h6 className="profile btn">
                        {LoggedInData &&
                          `${LoggedInData.firstName} ${
                            LoggedInData.lastName
                              ? LoggedInData.lastName
                              : LoggedInData.LastName
                          }`}
                      </h6>}
                    </Link>
                    {LoggedInData && (
                      <div className="profile-dropdown">
                        {LoggedInData?.type=='jobPortalAdmin'  ?"": <Link
                          href={`${LoggedInData.LastName ? "/job/RecruiterProfile" : LoggedInData.lastName ? "/job/CandidateDashboard" : '/job/EducationJobs'}`}
                        >
                          <i>
                            <CgProfile />
                          </i>
                          Profile
                        </Link>

                        }
                       
                        <a onClick={logout1}>
                          <i>
                            <BiLogOutCircle />
                          </i>
                          Logout
                        </a>
                      </div>
                    )}
                  </span>
                </div>
              </>
            )}
          </> :""
        }
            {/* <div className="employee-dropdown">
              <li className="more_dropdown" onClick={showDwnPopup}>
                For Employers
                <span
                  className={"tab-head-box " + " " + (isShow ? "active" : "")}
                >
                  <i>
                    <RiArrowDropDownLine />
                  </i>
                </span>
                <ul
                  className="navDropdown"
                  style={{ display: !isShow ? "none" : "block" }}
                >
                  <li>
                    <Link href="/job/search">Job Listing</Link>
                  </li>
                  <li>
                    <Link href="/job/JobDetails">Job Details</Link>
                  </li>
                </ul>
              </li>
            </div> */}

            {/* <div className="profile-icon">
              <span>
                <i className="cart">
                  {" "}
                  <BsCart2 />
                </i>
              </span>              
            </div> */}
          </div>
          <div className="clear"></div>
        </nav>

        {/* 
        <div className='backgroud'>
          <div className='program_bar'>
            {
              porgrams.map(program => (
                <div className='nav-title'> {program.name}{program.icon}</div>
              ))
            }
          </div>
        </div> */}

        {/* Second NavBar */}
       {/* {
        route.includes('jobProfile') 
        && 
        <>
         {showData3 ? (
          <section className="job_advertisment">
            <div className="jobbag_row">
              <div className="job_backgroud">
                <div className="job_offleft_box">
                  <div className="job_offbox1">
                    <h3>
                      FLAT <br /> 50% OFF
                    </h3>
                  </div>
                  <div className="offer_box2">
                    <h3>Promo Code : SALE 50</h3>
                  </div>
                </div>
                <div className="job_offright_box">
                  <div className="jobinner_right_box">
                    <div className="track_img">
                      <Image
                        src="/img/fast_track.png"
                        layout="fill"
                        className="resp-img"
                        alt="Simandhar logo"
                      />
                    </div>
                    <div className="jobfast-track">
                      <h3>
                        Fast Track Your Career in Finance by obtaining
                        International Certifications
                      </h3>
                    </div>
                    <div className="offer_box5 avail-btn">
                      <h3>Explore Courses</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
        </>
       } */}

        {showData ? <CpaProgram programData={programData.cpaPage} /> : " "}
        {showData1 ? <CpaProgram programData={programData.cmaPage} /> : " "}
      </header>

      {/* Form */}
    </>
  );
}
