import React from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import CandidateJobProcess from './CandidateJobProcess';
import { useRouter } from 'next/router';


const CandidateEducation = () => {

  let {push} = useRouter();

  let handleSubmit = (e) =>{
    e.preventDefault();
    alert()
    push('/job/CandidateEducation')
  }

  let handleBack = () =>{
    location.assign('/job/CandidateBasicInfo')
  }
	return (
		<>
			<Head>
				<title>Student Corner - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			</Head>
			{/* <Jobheader showData3={true} /> */}
			{/* <CandidateJobProcess /> */}
      <div className="process-row">
        <div className="process-box">
          <dl className="active select">
            <dt>Upload CV</dt>
            {/* <dd className='number-box'>1</dd> */}
            <dd className='tick-box'></dd>
          </dl>
          <dl className="active select">
            <dt>Basic information</dt>
            {/* <dd>2</dd> */}
            <dd className='tick-box'></dd>
          </dl>
          <dl className='active'>
            <dt>Education</dt>
            <dd className='tick-box'></dd>
            {/* <dd>3</dd> */}
          </dl>
          <dl>
            <dt>Work Experience</dt>
            <dd>4</dd>
          </dl>
          <dl>
            <dt>Certifications And Skills</dt>
            <dd>5</dd>
          </dl>
          <dl>
            <dt>Confirm</dt>
            <dd>6</dd>
          </dl>
        </div>
      </div>
			<div className='process-container'>
        
				<form action="" onSubmit={handleSubmit}>
          <div className='form-box mt-0'>
            <div className='head flex align-center space-between'>
              <h3>Education</h3>
              <button className='add-more-btn'>+ Add More Education</button>
            </div>
            <div className="input_field">
              <input type="text" name="" id="" className='w-100' placeholder='Level of education' />
            </div>
            <div className="input_field">
              <input type="text" name="" id="" className='w-100' placeholder='Field of study' />
            </div>
            <div className="input_field">
              <input type="text" name="" id="" className='w-100' placeholder='School name' />
            </div>
            <div className='w-row'>
              <div className="input_field select-field w-50">
                <select>
                  <option>State</option>
                  <option>Maharashtra</option>
                  <option>Gujrat</option>
                  <option>Punjab</option>
                </select>
              </div>
              <div className="input_field select-field w-50">
                <select>
                  <option>City</option>
                  <option>Mumbai</option>
                  <option>Pune</option>
                  <option>Nashik</option>
                </select>
              </div>
            </div>
          </div>
          <div className='btn-wrap flex space-between'>
            <button type='button' className='btn maroon-border-btn' onClick={handleBack}>Back</button>
						<input type='submit' className='btn maroon-btn maroon-btn-arrow' value='Save and Next' />
					</div>
				</form>
			</div>
			<Jobfooter />
		</>
	)
}
export default CandidateEducation