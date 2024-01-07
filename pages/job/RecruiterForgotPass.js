import React from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import RecruiterForgotPass from '../../job/RecruiterForgotPass';

const RecruiterForgot = () => {
  return (
  <>
              <Head>
                <title>Forgot Password - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            {/* <Jobheader showData3={true} /> */}
            <RecruiterForgotPass/>
            <Jobfooter />
  </>
  )
}

export default RecruiterForgot
