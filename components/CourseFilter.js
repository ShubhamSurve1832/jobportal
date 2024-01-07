import React,{useState} from 'react'
import Image from 'next/image'

const CourseFilter = () => {
  return (
    <>
      <aside className='filter-aside'>
        <h5>Filter By</h5>
        <div className='filter-box'>
          <h6 className='filter-title'>Name</h6>
          <div className='filter-list'>
            <p>
              <input type="checkbox" />
              <label>CPA</label>
            </p>
            <p>
              <input type="checkbox" />
              <label>CMA</label>
            </p>
            <p>
              <input type="checkbox" />
              <label>CIA</label>
            </p>
            <p>
              <input type="checkbox" />
              <label>EA</label>
            </p>
            <p>
              <input type="checkbox" />
              <label>IFRS</label>
            </p>
            <p>
              <input type="checkbox" />
              <label>DA</label>
            </p>
            <p>
              <input type="checkbox" />
              <label>SSP</label>
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default CourseFilter