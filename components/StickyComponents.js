import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import {TfiEmail} from 'react-icons/tfi'
import {BsTelephone} from 'react-icons/bs'

const StickyComponents = ({isactive, showPopup}) => {
 
  const buttonNameRef = useRef()


  useEffect(() => {
    const timer = setTimeout(() => {
      buttonNameRef.current.click()
    }, 10000);
    return () => clearTimeout(timer);
   
  }, []);

  return (
    <>
    <div className="sticky-box">
        <a href="tel:+91 7780273388" className='resp-img-box'><BsTelephone /></a>
        <a href="mailto: info@simandhareducation.com" className='resp-img-box'><TfiEmail /></a>
        <a href="https://wa.me/917780273388?text=Hi!%20I%20would%20like%20to%20learn%20more%20about%20Simandhar%20Education's%20offerings." className='wa-icon resp-img-box' target="_blank"><Image loading='lazy' src="/img/whatsapp.png" alt="Whatsapp"fill={true} sizes='100vw'  className='resp-img' /></a>
       
        <button className={'enq-btn resp-img-box' + ' ' + (isactive ? 'active' : '')} onClick={showPopup}  ref={buttonNameRef}  >
          <Image loading='lazy' src="/img/enquire_now1.svg" alt="enqury now" fill  className='resp-img' />
        </button>
      </div>

      
    </>
  )
}

export default StickyComponents