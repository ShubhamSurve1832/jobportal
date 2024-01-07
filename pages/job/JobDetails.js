import React from "react";
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import JobDetail from "./[jobDetailId]";
const JobDetails = () => {
  return (
    <>
      <Head>
        <title>Job Detail - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      {/* <Jobheader showData3={false} /> */}
      <JobDetail  />
      <Jobfooter />
    </>
  );
};

export default JobDetails;
