import React from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import CandidateForgotPassData from '../../job/CandidateForgotPass';

const CandidateForgotPass = () => {
  return (
  <>
              <Head>
                <title>Forgot Password - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>

            </Head>
            {/* <Jobheader showData3={true} /> */}
            <CandidateForgotPassData/>
            <Jobfooter />
  </>
  )
}

export default CandidateForgotPass
