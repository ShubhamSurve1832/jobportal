import Link from 'next/link'
import React from 'react'

const asideBox = () => {
  return (
    <>
      <aside className='blog-aside'>
        <div>
          {/* <form>
            <input type="search" id='search' name='search' placeholder='Search' />
          </form> */}
          <div className='Categories'>
            <p className='title'>Categories</p>
            <div className='categori-box'>
              {/* <Link href="/"><p>Accounting</p></Link> */}
              <Link className=' nav-title'href="/blogs/category/accounting"><p>Accounting</p></Link>
              <Link className=' nav-title'href="/blogs/category/cia"><p>CIA</p></Link>
              <Link className=' nav-title'href="/blogs/category/acca"><p>ACCA</p></Link>
              <Link className=' nav-title'href="/blogs/category/student-corner/cma-tips"><p>CMA TIPS</p></Link>
              <Link className=' nav-title'href="/blogs/category/cma"><p>CMA USA</p></Link>
              <Link className=' nav-title'href="/blogs/category/student-corner/cpa-tips"><p>CPA TIPS</p></Link>
              <Link className=' nav-title'href="/blogs/category/cpa"><p>CPA USA</p></Link>
              <Link className=' nav-title'href="/blogs/category/ea"><p>EA (Enrolled Agent)</p></Link>
              <Link className=' nav-title'href="/blogs/category/ifrs"><p>IFRS</p></Link>
              <Link className=' nav-title'href="/blogs/category/student-corner"><p>Student Corner</p></Link>
            </div>
          </div>
          {/* <div className='Categories'>
            <p className='title'>Archives</p>
            <div className='categori-box'>
              <Link href="/"><p>2023 </p></Link>
              <Link href="/"><p>2022 </p></Link>
              <Link href="/"><p>2021 </p></Link>
            </div>
          </div> */}

        </div>
      </aside>
    </>
  )
}

export default asideBox