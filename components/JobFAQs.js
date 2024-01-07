import Link from "next/link";
import React from "react";
import Accordion from "react-bootstrap/Accordion";

const JobPortalFaq = () => {
  return (
    <>
      <section className="section faq-section faq-section-cia pt-8">
        <div className="container-l">
          <h3 className="heading02">
            Frequently Asked Questions(FAQ's) for Job Portal
          </h3>
          <div className="faq-container">
            <Accordion>
              <Accordion.Item eventKey="0" className="faq-row">
                <Accordion.Header className="faq-title">
                  How do I create an account on the job portal?
                </Accordion.Header>
                <Accordion.Body className="faq-box">
                  <p>
                  To create an account, click on the <Link href="/job/CandidateLogin">"Sign Up"</Link>  or <Link href="/job/CandidateSignUp">"Register"</Link>  button on the homepage. You'll need to provide your email address, a password, and some basic information about yourself
                  </p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1" className="faq-row">
                <Accordion.Header className="faq-title">
                Can I update my profile information after registration?
                </Accordion.Header>
                <Accordion.Body className="faq-box">
                  <p>
                  Yes, you can update your profile information at any time. Log in to your account, navigate to the <Link href="/job/CandidateDashboard">"Profile"</Link>  or "Edit Profile" section, and make the necessary changes.
                    
                  </p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2" className="faq-row">
                <Accordion.Header className="faq-title">
                How do I search for jobs on the portal?
                </Accordion.Header>
                <Accordion.Body className="faq-box">
                  <p>
                  To search for jobs, use the search bar on the homepage. You can enter keywords, location preferences, and other filters to narrow down your search. Alternatively, you can browse job categories to find relevant listings.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3" className="faq-row">
                <Accordion.Header className="faq-title">
                Can I apply for jobs directly through the portal? 
                </Accordion.Header>
                <Accordion.Body className="faq-box">
                  <p> Yes, most job listings will have an "Apply Now" or "Submit Application" button. Click on it to begin the application process. Some employers might redirect you to their own application portal.</p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4" className="faq-row">
                <Accordion.Header className="faq-title">
                What should I do if I forget my password?
                </Accordion.Header>
                <Accordion.Body className="faq-box">
                  <p>
                  If you forget your password, click on the "Forgot Password" link on the login page. You'll receive an email with instructions on how to reset your password securely.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5" className="faq-row">
                <Accordion.Header className="faq-title">
                Can I upload multiple versions of my resume?
                </Accordion.Header>
                <Accordion.Body className="faq-box">
                  <div className="list-unstyled ">
                  <p>   Yes, you can replace the updated versions of your resume to cater to different job applications. Some portals allow you to manage multiple resumes within your profile.</p>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6" className="faq-row">
                <Accordion.Header className="faq-title">
                How do employers contact me for interviews?
                </Accordion.Header>
                <Accordion.Body className="faq-box">
                  <p>
                  Employers typically contact you through the contact information you've provided in your profile. Make sure your email and phone number are up to date.
                  </p>
                  
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7" className="faq-row">
                <Accordion.Header className="faq-title">
                Are there any fees for using the job portal? 
                </Accordion.Header>
                <Accordion.Body className="faq-box">
                  <p>
                  No fees are applicable.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="8" className="faq-row">
                <Accordion.Header className="faq-title">
                Is there any option for the candidate can get updates about the new job postings?
                </Accordion.Header>
                <Accordion.Body className="faq-box">
                  <p>
                  Yes, you will get email notifications for the selected posts and companies for the new jobs posted.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="9" className="faq-row">
                <Accordion.Header className="faq-title">
                Please let me know whether there would be a tracking system for the candidate.
                </Accordion.Header>
                <Accordion.Body className="faq-box">
                  <p>
                  Once the user logins to the portal and goes to the applied jobs section in the profile page, there will be update on the current status of the application.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="10" className="faq-row">
                <Accordion.Header className="faq-title">
                Please let me know if the candidate can hide or has any privacy settings.
                </Accordion.Header>
                <Accordion.Body className="faq-box">
                  <p>
                  NO.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobPortalFaq;
