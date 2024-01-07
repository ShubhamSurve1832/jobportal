import React from "react";
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import CandidateLoginData from "../../job/CandidateLogin";

const CandidateLogin = () => {
    return (
        <>
            <Head>
                <title>Candidate Login - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            {/* <Jobheader showData3={true} /> */}
            <CandidateLoginData />
            <Jobfooter />
        </>
    )
}

export default CandidateLogin
