import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import Jobfooter from "./job/JobFooter";
import Jobheader from "./job/JobHeader";
import ContactUs from "../job/ContactUs";
// import AchieversSection from "../CPA/AchieversSection";
// import Placement from "../home/placementSection";
// import CorporateRecord from "../CPAInner/corporateRecord";
// import CorporateLogos from "../CPA/CorporateLogos";
import FeaturesJob from "../job/FeaturesJob";
import CarrierLadderBanner from "../job/CarrierLadderBanner";
import { urlConstants, RecruiterPostJobBaseURL, jobPortalBaseURL } from "../constants/urlConstants";

// data


const jobProfile = () => {
  let RecId = secureLocalStorage.getItem('RecID');
  let endPoint = [urlConstants.corporateLogos, urlConstants.achiverSection, urlConstants.corporateData]
  const [logos, setLogos] = useState([])
  const [achiver, setAchiver] = useState([])
  const [placement, setPlacement] = useState([])
  const [corporatedata, setCorporatedata] = useState([])
  const [jobCards, setJobCards] = useState([])
  useEffect(() => {
    fetchData()
    fetchJobs()
  }, [])

  let fetchData = () => {
    endPoint.map(async (url, ind) => {
      try{
        let res = await axios.get(url)
        if (ind === 0) {
          setLogos({ ...res.data.JobCorporateLogos })
        } else if (ind === 1) {
          setAchiver({ ...res.data.jobPortal })
          setPlacement({ ...res.data.jobPlacementAlumni })
        } else {
          setCorporatedata({ ...res.data.JobcorporateWebinardata })
        }
      }catch(error){
        console.log(error);
      }
    })
  }

  let fetchJobs = async () =>{
    let token = `search-job?token=${RecId}`
    try{
      let response = await axios.get(`${RecruiterPostJobBaseURL}${RecId ?token:""}`)
      setJobCards(response.data.data.records?.reverse())
    }catch(err){
console.log(err)
    }
  }
  // console.log(jobCards)
  // console.log(indexData);

//OFFER ROW PAGE DATA
const [offerData, setOfferData] = useState({
  offerRow: {},
});
useEffect(() => {
  axios({
    method: "get",
    url: urlConstants.indexData,
    responseType: "json",
  })
    .then((res) =>
      setOfferData((prevState) => ({ offerRow: res.data.offerRow }))
    )
    .catch((err) => console.log("error is ", err.message));
}, []);

  return (
    <>
      <Head>
        <title>Job Home Page - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      {/* <Jobheader showData3={true} /> */}
      {/* <OfferSection indexData={offerData.offerRow} /> */}
      <CarrierLadderBanner />
      <FeaturesJob jobCards={jobCards} />
      <div className="jobcorporate-section">
        {/* <CorporateLogos
          corporateLogosData={logos}
          showDescription1={false}
          showDescription2={false}
          showHeading={true}
          showButton={true}
        /> */}
      </div>
      <div className="job_corporateRecord_section">
        {/* <CorporateRecord
          corporateEventData={corporatedata}
          showData={false}
        /> */}
      </div>

      <div className="jobplacement_section">
        {/* <Placement indexData={placement} /> */}
      </div>
      <div className="testimonial-achiver job_testimonialsection">
        {/* <AchieversSection
          achieverData={achiver}
          showData={true}
          showlogo={true}
          // showbtn={true}
          showAchiverbtn={true}
        /> */}
      </div>
      <ContactUs />
      <Jobfooter />
    </>
  );
};

export default jobProfile;
