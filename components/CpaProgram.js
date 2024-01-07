import React, { useEffect } from 'react'
import { IoCaretForward } from 'react-icons/io5'
import Link from 'next/link'
import { useState } from 'react'
import _ from 'lodash'
import { usePathname } from 'next/navigation'

// import ProgramData from '../database/data/program.json'



const CpaProgram = ({ programData }) => {
    const [isShow, setIsShow] = useState(false);
    const showDwnPopup = () => {
        setIsShow(!isShow);
    };
    const pathname = usePathname();

    return (
        <>
            <section className='light-backgroud'>
                <div className='hf-container'>
                    <div className='uscpa-program'>
                        <Link href="">  <div className={'nav-title1' + ' ' + (isShow ? "active" : "")} onClick={showDwnPopup}>{programData.mainheading}<span><i><IoCaretForward /></i></span></div></Link>
                        <div className={'program-scroll' + ' ' + (isShow ? 'active' : '')}>
                            <div className='programs'>
                              

                                {
                                    programData.lists.map((title => {
                                        let path = _.get(title, "path")
                                        // console.log(path)
                                        return <Link href={path} className={pathname == path ? 'nav-title active' : 'nav-title'}>{title.title}</Link>
                                    }))
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default CpaProgram