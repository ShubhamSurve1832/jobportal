import React, { useState } from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { GoMail } from 'react-icons/go';
import { useRouter } from 'next/router';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'react-hot-toast';


const Jobportalaside = () => {

    const {replace} = useRouter();

    let [showOld, setShowOld] = useState(false);

    useEffect(() => {
        document.getElementById('show-sidemenu').addEventListener('click', (e) => {
            document.getElementById('sub-menu-box').classList.add('active')
            document.getElementById('show-sidemenu').style.display = 'none'
        })

        document.getElementById('close-sidebar').addEventListener('click', (e) => {
            document.getElementById('sub-menu-box').classList.remove('active')
            document.getElementById('show-sidemenu').style.display = 'block'
        })

        document.querySelectorAll('.jobportalLink').forEach((link) => {
            if (link == window.location.href) {
                link.classList.add('active')
            }
        })


        if (window.location.href.includes('/job/EducationJobs') || window.location.href.includes('/job/EducationApprovals') || window.location.href.includes('/job/EducationManagement') || window.location.href.includes('/job/EducationRecruiterManagement') || window.location.href.includes('/job/EducationCompanyManagement') || window.location.href.includes('/job/RecruiterSignin')) {
            setShowOld(true);
        } else {
            setShowOld(false);
        }

    })


    const addActiveToMessage = () =>{
        document.getElementById('MessageTab')?.classList?.add('active')
    }

    const remActive = () =>{
        document.getElementById('MessageTab')?.classList?.remove('active')
        // alert();
    }



    const handleLogoutAdmin = () =>{
        toast.loading("Wait Logging You Out.");
        secureLocalStorage.removeItem("Candidate");
        secureLocalStorage.removeItem("RecID");
        secureLocalStorage.removeItem("mode");
        secureLocalStorage.removeItem("SIMTK");
        secureLocalStorage.removeItem("SIMLoginData");
        setTimeout(() => {
          replace("/job/");
          toast.dismiss();
          toast.success("Logged Out.");
        }, 2000);
    }


    if (showOld) {
        return (
            <>
                <aside className='jpbportal-menubar' id='sub-menu-box'>
                    <button className='show-sidemenu' id='show-sidemenu'>Side Menu</button>
                    <h2 className='text-center'>Simandhar Dashboard</h2>
                    <button  onClick={()=>remActive()} className='close-sidebar' id='close-sidebar'><img src="/img/job_portal/close_sidebar.svg" /></button>
                    <nav >
                        <Link className='jobportalLink' href="/job/EducationJobs" ><i><img src="/img/job_portal/jobs_icon.svg"></img></i>Jobs</Link>
                        <Link className='jobportalLink' href="/job/EducationApprovals"><i><img src="/img/job_portal/approval_icon.svg"></img></i>Approvals</Link>
                        <Link className='jobportalLink' href="/job/EducationManagement"><i><img src="/img/job_portal/cm_icon.svg"></img></i>Candidate Management</Link>
                        <Link className='jobportalLink' href="/job/EducationRecruiterManagement"><i><img src="/img/job_portal/rm_icon.svg"></img></i>Recruiter Management</Link>
                        <Link className='jobportalLink' href="/job/EducationCompanyManagement"><i><img src="/img/job_portal/com_icon.svg"></img></i>Company Management</Link>
                        {/* <a className=' btn white-btn white-btn-arrow text-center' onClick={()=>handleLogoutAdmin()}>Logout</a> */}
                        <Link className='jobportalLink' href="/job/RecruiterSignin"><i><img src="/img/SigninLogoReq.png"></img></i>Recruiter SignUp</Link>
                    </nav>

                </aside>
            </>
        )
    } else {
        return (
            <>
                <aside className='jpbportal-menubar' id='sub-menu-box'>
                    <button className='show-sidemenu' id='show-sidemenu'>Side Menu</button>
                    <h2 className='text-center'>Recruiter Dashboard</h2>
                    <button onClick={()=>remActive()} className='close-sidebar' id='close-sidebar'><img src="/img/job_portal/close_sidebar.svg" /></button>

                    <div className="recruiterBtns text-center mt-4" onClick={()=>replace('/job/PostaJobProvideBasicinfo')}>
                        <button className='btn maroon-btn maroon-btn-arrow'>Post a Job</button>
                    </div>
                    <nav >
                        <Link className='jobportalLink' href="/job/RecruiterDashboardJobs" ><i><img src="/img/job_portal/jobs_icon.svg"></img></i>Jobs</Link>
                        <Link className='jobportalLink' href="/job/RecruiterDashboardCandidates"><i><img src="/img/job_portal/candidate_icon.svg"></img></i>Candidates</Link>
                        <Link className='jobportalLink' href="/job/RecruiterDashboardSearchResumes"><i><img src="/img/job_portal/search_resume.svg"></img></i>Search Resumes</Link>
                        <Link className='jobportalLink' href="/job/RecruiterDashboardInterviews"><i><img src="/img/job_portal/interview_icon.svg"></img></i>Interviews</Link>
                        {/* <Link className='jobportalLink' href="/job/Messages"><i><img src="/img/job_portal/com_icon.svg"></img></i>Message</Link> */}
                    </nav>


                    <Link href='/job/RecruiterMessagesection' className="messagesclick text-center">
                        <div className='messicon'><GoMail /> </div>
                       <div>Messages</div>
                    </Link>
                </aside>
            </>
        )
    }
}

export default Jobportalaside