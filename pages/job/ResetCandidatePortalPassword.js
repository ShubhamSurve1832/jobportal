import React from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
// import CandidateResetPassData from '../../job/CandidateResetPass';
import ResetPassword from '../../job/ResetPassword';
const ResetCandidatePortalPassword = () => {
  return (
    <>
      <Head>
        <title>Student Corner - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      {/* <Jobheader showData3={true} /> */}
      <ResetPassword />
      <Jobfooter />
    </>
  )
}

export default ResetCandidatePortalPassword
