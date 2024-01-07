import React from 'react'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { urlConstants as urlConstant } from '../../../constants/urlConstants'

import dynamic from "next/dynamic";
// const CorporateLogos = dynamic(() => import('../../../CPA/CorporateLogos')) 
import JobFooter from "../JobFooter";


const simandharTieUps = () => {
    // SIMANDHAR TIE-UPS PAGE
    const [corporateLogosData, setCorporateLogosData] = useState({
        CorporateLogos: {}
    })
    useEffect(() => {
        axios({
            method: "get",
            url: urlConstant.corporateLogos,
            responseType: 'json',
        })
            .then((res) =>
                setCorporateLogosData((prevState) => (
                    { CorporateLogos: res.data.CorporateLogos }
                )))
            .catch((err) =>
                console.log("error is ", err.message)
            )
    }, [])
    // console.log(corporateLogosData.CorporateLogos)
    return (
        <>
            <Head>
                <title>Corporate Tie-Ups- Simandhar Education</title>
                <meta content="Mr. Sripal Jain's expertise has helped numerous big companies, including BIG4, to achieve their business objectives by training their employees' name='description"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                <meta content='Big4, MNCs, Corporate tie up, Simandhar corporate tie up' name='keywords'></meta>
                <link rel="canonical" href="https://simandhareducation.com/tie-ups" />
            </Head>
            {/* <Jobheader showData3={true} /> */}
            {/* < CorporateLogos corporateLogosData={corporateLogosData.CorporateLogos} showDescription1={true} showDescription2={true} showHeading={true} /> */}
            <JobFooter />
        </>
    )
}

export default simandharTieUps