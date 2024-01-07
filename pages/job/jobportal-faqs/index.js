import React from "react";
import dynamic from "next/dynamic";
import Head from 'next/head';
import Faqs from'../../../components/JobFAQs'
import JobFooter from "../JobFooter";
const JobFaqs = () =>{

    return(
        <>
         <Head>
        <title>Frequently Asked Questions (FAQs) for Job Portal.</title>
        <meta content='Simandhar Education is Established 2017 by Sripal Jain (CA, CPA (USA)) quality education to prepare aspirants for success in the CPA, CMA, EA, IFRS professional exam.' name='description'></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <meta content='cpa course in Hyderabad, cma institute in Hyderabad, cma course fees in india, cma india, us cpa coaching in india, certified management accountant in usa, best cpa coaching centres in india' name='keywords'></meta>
        <link rel="canonical" href="https://simandhareducation.com/about-simandhar" />
      </Head>
      {/* <Jobheader showData3={true} /> */}
      <Faqs />
      <JobFooter />
        </>
    )
}

export default JobFaqs