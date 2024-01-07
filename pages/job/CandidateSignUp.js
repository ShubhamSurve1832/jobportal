import React from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import CandidateSignUpData from '../../job/CandidateSignUp';

const CandidateSignUp = () => {
    return (
        <>
            <Head>
                <title>Candidate SignUp - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>

            </Head>
            {/* <Jobheader showData3={true} /> */}
            <CandidateSignUpData />
            <Jobfooter />
        </>
    )
}
export default CandidateSignUp