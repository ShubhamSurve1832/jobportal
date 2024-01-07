import React from "react";
import Jobheader from "./JobHeader";
import Jobfooter from "./JobFooter";

const TermsAndConditions = () => {
  return (
    <>
      {/* <Jobheader /> */}
      <section className="section">
        <div className="container-m">
          <h1 className="heading03 text-center">
            Terms & Conditions - Job Portal Registration
          </h1>
          <p className="mt-4">
            By signing up as a candidate or employer on our job portal, you
            agree to the following Terms and conditions:
          </p>
          <div className="mt-2">
            <h3 className="title01">Acceptance of Terms:</h3>
            <p className="mt-1">
              1.1. These Terms &amp; Conditions constitute a legally binding
              agreement between you (the &quot;User&quot;) and Simandhar
              Education Job Portal (the &quot;Company&quot;).
            </p>
            <p className="mt-1">
              1.2. By registering on the job portal, you agree to comply with
              and be bound by these Terms &amp; Conditions. If you do not agree
              with these terms, please do not register or use our services.
            </p>

            <h3 className="title01 mt-2">User Eligibility:</h3>
            <p className="mt-1">
              2.1. To use the job portal, you must be at least 18 years of age.
            </p>
            <p className="mt-1">
              2.2. If you are using the portal on behalf of a company, you
              represent and warrant that you have the authority to bind the
              company to these Terms and conditions.
            </p>

            <h3 className="title01 mt-2">Account Registration: </h3>
            <p className="mt-1">
              3.1. Candidates: You are required to provide accurate and
              up-to-date information during registration, including your name,
              contact information, and qualifications.
            </p>
            <p className="mt-1">
              3.2. Employers: You are required to provide accurate and
              up-to-date information during registration, including your
              company&#39;s name, contact information, and industry.
            </p>
            <h3 className="title01 mt-2">Privacy Policy:</h3>
            <p className="mt-1">
              4.1. Using the job portal is subject to our Privacy Policy, which
              outlines how we collect, use, and protect your personal
              information. By using the portal, you agree to our Privacy Policy.
            </p>

            <h3 className="title01 mt-2">User Responsibilities:</h3>
            <p className="mt-1">
              5.1. Candidates: You agree to provide truthful information in your
              profile, including your qualifications and experience.
            </p>
            <p className="mt-1">
              5.2. Employers: You agree to use the portal for legitimate job
              posting and recruitment purposes.
            </p>

            <h3 className="title01 mt-2">Content and Usage:</h3>
            <p className="mt-1">
              6.1. All content, including job listings, resumes, and messages,
              must comply with local, national, and international laws and
              regulations.
            </p>
            <p className="mt-1">
              6.2. You may not post or transmit any content that is offensive,
              discriminatory, or violates the rights of others.
            </p>

            <h3 className="title01 mt-2">Account Security:</h3>
            <p className="mt-1">
              7.1. You are responsible for maintaining the security of your
              account login credentials.
            </p>
            <p className="mt-1">
              7.2. Notify us immediately if you suspect any unauthorized use of
              your account.
            </p>

            <h3 className="title01 mt-2">Termination:</h3>
            <p className="mt-1">
              8.1. The Company reserves the right to terminate or suspend your
              account at its sole discretion, without notice, for violating
              these Terms &amp; Conditions.
            </p>
            <p className="mt-1">
              8.2. You may terminate your account at any time by following the
              procedures outlined in your account settings.
            </p>

            <h3 className="title01 mt-2">Disclaimers:</h3>
            <p className="mt-1">
              9.1. The Company does not guarantee job placement or the accuracy
              of job listings or resumes.
            </p>
            <p className="mt-1">
              9.2. The Company is not responsible for the actions of other Users
              on the platform.
            </p>

            <h3 className="title01 mt-2">Limitation of Liability:</h3>
            <p className="mt-1">
              10.1. The Company is not liable for any direct, indirect, or
              consequential damages arising from the use of the job portal.
            </p>

            <h3 className="title01 mt-2">Changes to Terms:</h3>
            <p className="mt-1">
              11.1. The Company reserves the right to update or modify these
              Terms &amp; Conditions at any time. You will be notified of
              changes, and continued use of the portal constitutes acceptance of
              the new Terms &amp; Conditions.
            </p>

            <h3 className="title01 mt-2">Governing Law:</h3>
            <p className="mt-1">
              12.1. These Terms &amp; Conditions are governed by and construed
              in accordance with the laws of [Secunderabad jurisdiction].
            </p>
            <p className="mt-4">
              By registering on our job portal, you acknowledge that you have
              read, understood, and agree to abide by these Terms &amp;
              Conditions. If you do not agree, please do not use our services.
            </p>
          </div>
        </div>
      </section>
      <Jobfooter />
    </>
  );
};

export default TermsAndConditions;
