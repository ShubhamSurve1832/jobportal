import React from 'react'
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import Jobportalaside from '../../components/Jobportalaside'
import { BsBell } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import MessageTab from '../../components/MessageTab'



const Messages = () => {
    return (
        <>
            <Head>
                <title>Student Corner - Simandhar Education</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            {/* <Jobheader showData3={false} /> */}
            <div className='jp-admin-wrapper RecruiterDashboardJobs Messages'>
                <Jobportalaside />
                <section className='jobportal-right-section message-right-section'>
                    <div className="setbellicon">
                        <h3></h3>
                        <div className="icon"><BsBell /></div>
                    </div>
                    <MessageTab />
                    <div className="messageContent">
                        <h3>Aishwarya Dey </h3>
                        <div className="chats custom-scrollbar mt-4">
                            <div className='text-center'>
                                <p><span className='datefeaf text-center'>31 March 2022</span></p>
                            </div>

                            <div className="sender">
                                <div className="mess">
                                    <div className='profileicon'><CgProfile /></div>
                                    <div className='newMessage'>
                                        <p>Hr - Sayli jadhav . <span>12:00 PM</span></p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="reciver">
                                <div className="mess">
                                    <div className='profileicon'><CgProfile /></div>
                                    <div className='newMessage'>
                                        <p>Hr - Sayli jadhav . <span>12:00 PM</span></p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                                    </div>
                                </div>
                                <div className="clear"></div>
                            </div>
                            <div className="sender">
                                <div className="mess">
                                    <div className='profileicon'><CgProfile /></div>
                                    <div className='newMessage'>
                                        <p>Hr - Sayli jadhav . <span>12:00 PM</span></p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="reciver">
                                <div className="mess">
                                    <div className='profileicon'><CgProfile /></div>
                                    <div className='newMessage'>
                                        <p>Hr - Sayli jadhav . <span>12:00 PM</span></p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                                    </div>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                        <div className="typetext mt-4">
                            <input type="text" placeholder='Type your message here...' />
                            <a href="javascript:;" className='text-center btn maroon-btn maroon-btn-arrow'>Send</a>
                        </div>

                    </div>
                </section>
            </div>
            <Jobfooter />
        </>
    )
}
export default Messages