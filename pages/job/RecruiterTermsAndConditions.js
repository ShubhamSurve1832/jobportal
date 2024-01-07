import React from "react";
import Jobheader from "./JobHeader";
import Jobfooter from "./JobFooter";
import Head from "next/head";

const TermsAndConditions = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions for Recruiters</title>
      </Head>
      {/* <Jobheader /> */}
      <section className="section">
        <div className="container-m">
          <h1 className="heading03 text-center">
            Terms and Conditions for Recruiters
          </h1>
          <p className="mt-4">
            Welcome to the Simandhar Recruiter Portal. This document outlines
            the terms and conditions that govern your use of the Portal as a
            recruiter. By signing up on the Portal, you agree to comply with
            these Terms. Please read them carefully before proceeding.
          </p>
          <div className="mt-2">
            <h3 className="title01">1. Acceptance of Terms:</h3>
            <p className="mt-1">
              By accessing or using the Portal, you confirm that you have read,
              understood, and agree to be bound by these Terms. If you do not
              agree with any of these terms, you should not proceed further and
              refrain from using the Portal.
            </p>

            <h3 className="title01 mt-2">2. Registration:</h3>
            <p className="mt-1">
              2.1. To sign up as a recruiter on the Portal, you must provide
              accurate, current, and complete information as requested during
              the registration process.
            </p>
            <p className="mt-1">
              2.2. You are responsible for maintaining the confidentiality of
              your login credentials, including your username and password. You
              are also responsible for all activities that occur under your
              account.
            </p>
            <p className="mt-1">
              2.3. If you believe that your account has been compromised or used
              without your authorization, please contact Simandhar Job Admin
              Portal immediately for assistance.
            </p>

            <h3 className="title01 mt-2">3. Recruiter Responsibilities:</h3>
            <p className="mt-1">
              3.1. As a recruiter, you are responsible for ensuring that your
              use of the Portal complies with all applicable laws, regulations,
              and these Terms.
            </p>
            <p className="mt-1">3.2. You agree not to engage in any activity that may:</p>
            <div>
<p>a. Violate the rights of any candidate or third party.  </p>
<p>b. Transmit any harmful code, viruses, or malware.  </p>
<p>c. Share or disclose any confidential information obtained through the Portal without proper authorization.</p>
            </div>
            <p className="mt-1">3.3. You shall not use the Portal for any unlawful or unauthorized purpose, and you agree to comply with all
relevant laws and regulations.</p>

            
            <h3 className="title01 mt-2">4. Candidate Information:</h3>
            <p className="mt-1">
            4.1. You understand that all information about candidates provided on the Portal is confidential and should only
be used for the purpose of recruitment and employment.
            </p>
            <p className="mt-1">
            4.2. You agree to handle candidate information with care, maintaining its confidentiality, and not sharing it with
any unauthorized parties or using it for any purpose other than recruitment.
            </p>

            <h3 className="title01 mt-2">5. Privacy:</h3>
            <p className="mt-1">
            5.1. Your use of the Portal is also governed by our Privacy Policy, which can be found on the Portal.
            </p>
            <p className="mt-1">
            5.2. By using the Portal, you consent to the collection, storage, and use of your personal information in
accordance with our Privacy Policy.
            </p>

            <h3 className="title01 mt-2">6. Termination:</h3>
            <p className="mt-1">
            6.1. Simandhar Job Admin Portal may, at its sole discretion, terminate or suspend your access to the Portal at
any time without prior notice if you violate these Terms.
            </p>
            <p className="mt-1">
            6.2. You may also terminate your account at any time by notifying Simandhar Job Admin Portal.
            </p>

            <h3 className="title01 mt-2">7. Limitation of Liability:</h3>
            <p className="mt-1">
            7.1. Simandhar Job Admin Portal is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. We do not guarantee that
the Portal will be error-free, uninterrupted, or secure.
            </p>
            <p className="mt-1">
            7.2. Simandhar Job Admin Portal is not liable for any direct or indirect damages, including, but not limited to,
loss of profits, data, or other intangible losses resulting from your use of the Portal.
            </p>

            <h3 className="title01 mt-2">8. Changes to Terms:</h3>
            <p className="mt-1">
            8.1. Simandhar Job Admin Portal reserves the right to update and change these Terms at any time. We will
notify you of any significant changes, and it is your responsibility to review these Terms periodically.
            </p>

            <h3 className="title01 mt-2">9. Governing Law:</h3>
            <p className="mt-1">
            These Terms are governed by and construed in accordance with the laws of [Your Secunderabad jurisdiction].
            </p>

            <h3 className="title01 mt-2">10. Contact Information:</h3>
            <p className="mt-1">
            If you have any questions or concerns about these Terms and Conditions, please contact us at 
            <a href="mailto:talentacquisition@simandhareducation.com"> talentacquisition@simandhareducation.com
               </a>
            </p>
              <p className="mt-4">
            By signing up as a recruiter on Simandhar Job Admin Portal, you acknowledge that you have read,
understood, and agreed to these Terms and Conditions.
            </p>
          </div>
        </div>
      </section>
      <Jobfooter />
    </>
  );
};

export default TermsAndConditions;
