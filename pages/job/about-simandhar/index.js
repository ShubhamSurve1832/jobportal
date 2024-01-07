import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import dynamic from "next/dynamic";
import axios from 'axios';
import JobAbout from '../../../components/JobAbout'

import Jobheader from "../JobHeader";
import JobFooter from "../JobFooter";
const aboutUS = () => {

 

  return (
    <>
      <Head>
        <title>Learn About Simandhar: Our Mission, Team, and Expertise.</title>
        <meta content='Simandhar Education is Established 2017 by Sripal Jain (CA, CPA (USA)) quality education to prepare aspirants for success in the CPA, CMA, EA, IFRS professional exam.' name='description'></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <meta content='cpa course in Hyderabad, cma institute in Hyderabad, cma course fees in india, cma india, us cpa coaching in india, certified management accountant in usa, best cpa coaching centres in india' name='keywords'></meta>
        <link rel="canonical" href="https://simandhareducation.com/about-simandhar" />
      </Head>
      {/* <Jobheader showData3={true} /> */}
      <JobAbout />
      <JobFooter />
    </>
  )
}

export default aboutUS;