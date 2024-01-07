"use client"
import React from 'react'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState, useEffect } from "react";
import Image from 'next/image';
import $ from 'jquery';
import {BsChevronDoubleLeft} from 'react-icons/bs';
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/router';


const SideTab = () => {
	let {push} = useRouter();

	const Role = secureLocalStorage.getItem("RoleAdmin")
	
	useEffect(() => {
		// $(".sub-menu-navbar li.expand").click(function () {
		// 	$(this).siblings().find(".sub-menu").slideUp()
		// 	$(this).find(".sub-menu").slideDown()
		// 	$(this).siblings().removeClass("active")
		// 	$(this).addClass("active")
		// 	if($(this).find(".sub-menu").is(":visible")){
		// 		$(this).find(".sub-menu").removeClass("active")
		// 	}
		// })
		
		// var expandMenu = document.querySelectorAll(".expand");
		// var expandSubMenu = document.querySelectorAll(".sub-menu");

		// expandMenu.forEach((expand) =>{
		// 	expand.addEventListener("click", function() {
		// 		var subMenu = expand.querySelector(".sub-menu");
				
		// 		var alreadyOpen = false;
		// 		if (subMenu.classList.contains("collapse")) alreadyOpen = true;
				
		// 		expandMenu.forEach(function(expand2) {
		// 			expand2.classList.remove("active"); 
		// 		});

		// 		expandSubMenu.forEach(function(expandSub) {
		// 			expandSub.classList.remove("collapse"); 
		// 		});

		// 		if (!alreadyOpen) { 
		// 			subMenu.classList.toggle("collapse");
		// 			this.classList.add("active");
		// 		}
		// 	});
		// });
		


		// Website CMS
		if(Role !== "enroll"){
			document.getElementById('website-cms').addEventListener('click',(e)=>{
				document.getElementById('sub-menu-box').classList.add('active')
				document.getElementById('course-menu-box').classList.remove('active')
	
			})
	
			document.getElementById('HideSide').addEventListener('click',(e)=>{
				document.getElementById('sub-menu-box').classList.remove('active')
			})
		
		

		// Course CMS
		document.getElementById('course-cms').addEventListener('click',(e)=>{
			document.getElementById('course-menu-box').classList.add('active')
			document.getElementById('sub-menu-box').classList.remove('active')
			
		})

		document.getElementById('HideCourse').addEventListener('click',(e)=>{
			document.getElementById('course-menu-box').classList.remove('active')
		})
	}

		// Order Transection 
		// document.getElementById('order-transection').addEventListener('click',(e)=>{
		// 	document.getElementById('order-menu-box').classList.add('active')
		// 	document.getElementById('sub-menu-box').classList.remove('active')
		// 	document.getElementById('course-menu-box').classList.remove('active')
		// })

		// document.getElementById('HideOrder').addEventListener('click',(e)=>{
		// 	document.getElementById('order-menu-box').classList.remove('active')
		// })

		document.querySelectorAll('.SideBarLinks').forEach((links,id)=>{
			let url = window.location.href;
			if(url===links.href){
				links.classList.add('active')
			}
		})


		// document.querySelectorAll('.dropdown-link').forEach((element,id)=>{
		// 	element.addEventListener('click',()=>{
		// 		element.lastChild.classList.add('collapse')
		// 		element.classList.add('active')
		// 	})
		// })

	},[])




	const ActiveDropDown = (IdofDropDown) =>{
		document.getElementById(IdofDropDown).classList.toggle('collapse');
	}

	const LogOut = () =>{
		if(confirm("Want To Logout ? ")){
			secureLocalStorage.removeItem('CMSTk')
		    push('/cms/login')
		}
	}

	return (
		<>
			<div className='admin-wrapper'>
				<aside className='aside-nav'>
					<div className='main-menu-box'>
						<div className="heading">
							<h3 className="dashboard-title">Simandhar Dashboard <button className="nav-bar"><Image loading='lazy' src='/img/close_menu.svg'fill={true} sizes='100vw' className='resp-img' alt='' /></button></h3>
						</div>
						
						<nav className='aside-menu'>
							{
								Role !=="enroll" ?

							
							
						<>							
							<Link href="/cms/dashboard" className='website-cms show-menu'>
								<i><Image loading='lazy' src='/img/web_cms.svg'fill={true} sizes='100vw' className='resp-img' alt='' /></i>
								<span>Dashboard</span>
							</Link> 
					
							<Link href="" className='website-cms show-menu' id="website-cms">
								<i><Image loading='lazy' src='/img/web_cms.svg'fill={true} sizes='100vw' className='resp-img' alt='' /></i>
								<span>Website CMS</span>
							</Link> 
								
							 <Link href="" id="course-cms" className='website-cms show-menu'>
								<i><Image loading='lazy' src='/img/course.svg'fill={true} sizes='100vw' className='resp-img' alt='' /></i>
								<span>Ecommerce</span>
							</Link>
							</> 
							:""}

{
	Role === "enroll"?
	<Link href="/cms/enrolled-users" className='website-cms'>
								<span>Enrolled Users</span>
							</Link>
							:""}
							{/* <Link href="" id="order-transection" className='website-cms show-menu'>
								<i><Image loading='lazy' src='/img/jobs.svg'fill={true} sizes='100vw' className='resp-img' alt='' /></i>
								<span>Order Transactions</span>
							</Link> */}
								{/*<Link href="">
								<i><Image loading='lazy' src='/img/approval.svg'fill={true} sizes='100vw' className='resp-img' alt='' /></i>
								<span>Approvals</span>
							</Link>
							<Link href="">
								<i><Image loading='lazy' src='/img/cm.svg'fill={true} sizes='100vw' className='resp-img' alt='' /></i>
								<span>Candidate Management</span>
							</Link>
							<Link href="">
								<i><Image loading='lazy' src='/img/rm.svg'fill={true} sizes='100vw' className='resp-img' alt='' /></i>
								<span>Recruiter Management</span>
							</Link>
							<Link href="">
								<i><Image loading='lazy' src='/img/comp_mang.svg'fill={true} sizes='100vw' className='resp-img' alt='' /></i>
								<span>Company Management</span>
							</Link> */}

							{/* <div className="one-col"> */}
							<div className="addwrap text-center mt-4">
								<a className='btn white-btn white-btn-arrow' onClick={() => LogOut()}>Log out</a>
							</div>
							{/* </div> */}
						</nav>
					</div>
					 {/* WEBSITE SITE CMS */}
					<div className='sub-menu-box' id="sub-menu-box">
						<h2 className='submenu-title'>Webpages <BsChevronDoubleLeft style={{position : "absolute",top : "50%" , right : "10px" , cursor : "pointer" , fontSize : "20px", transform: "translateY(-50%)"}} id="HideSide" /></h2>
						<nav className='sub-menu-navbar custom-scrollbar'>
							<ul>
								<li className='dropdown-link expand' onClick={()=>ActiveDropDown('One-Menu')}>
									Homepage
									<div className='sub-menu'  id='One-Menu'>
										<Link className="SideBarLinks" href="/cms/Home/offer">Promo Ribbon</Link>
										<Link className="SideBarLinks" href="/cms/Home/banner">Main Header Sliders</Link>
										<Link className="SideBarLinks" href="/cms/Home/whySimandhar">Why Simandhar</Link>
										<Link className="SideBarLinks" href="/cms/Home/placement">Placements & Alumni</Link>
										<Link className="SideBarLinks" href="/cms/Home/video">Students Who Made Big</Link>
										<Link className="SideBarLinks" href="/cms/Home/testimonial">Achiever Testimonials</Link>
										<Link className="SideBarLinks" href="/cms/Home/tieup">Corporate Tieups</Link>
										<Link className="SideBarLinks" href="/cms/Home/partner">Loan Partners</Link>
										<Link className="SideBarLinks" href="/cms/Home/media">Media Recognitions</Link>
										{/* <Link href="/cms/Home/download">Download Prospectus</Link> */}
									</div>
								</li>
								<li className='dropdown-link expand'  onClick={()=>ActiveDropDown('Two-Menu')}>
										About
									<div className='sub-menu'  id='Two-Menu'>
										{/* <Link href="/cms/About/giant">The right step to take a giant leap</Link> */}
										<Link className="SideBarLinks" href="/cms/About/partners">Our official Partners</Link>
									</div>
								</li>
								<li className="dropdown-link">
									<Link className="SideBarLinks" href="/cms/USA-visit-Page/cardelements">
										Sripal Jain USA visit Page
									</Link>
								</li>
								<li className="dropdown-link">
									<Link className="SideBarLinks" href="/cms/CPA/Corporate-Tie-Ups/logos">
										Corporate Tie-Ups
									</Link>
								</li>
								<li className='dropdown-link expand' onClick={()=>ActiveDropDown('Three-Menu')}>
										Corporate Events-Ups
									<div className='sub-menu'  id='Three-Menu'>
										<Link className="SideBarLinks" href="/cms/CPA/Corporate-Events-Ups/posts">Add more posts</Link>
										<Link className="SideBarLinks" href="/cms/CPA/Corporate-Events-Ups/webinars">Recorded Webinars</Link>
										<Link className="SideBarLinks" href="/cms/CPA/Corporate-Events-Ups/recent-webinars">Recent Webinars</Link>
									</div>
								</li>
								<li className='dropdown-link expand' onClick={()=>ActiveDropDown('Four-Menu')}>
										Testimonials
									<div className='sub-menu'  id='Four-Menu' >
										<Link className="SideBarLinks" href="/cms/CPA/Testimonials/video">Top video section</Link>
										<Link className="SideBarLinks" href="/cms/CPA/Testimonials/licensee">US CPA Licensee</Link>
										<Link className="SideBarLinks" href="/cms/CPA/Testimonials/placement">Simandhar Recent US CPA and US CMA Placements</Link>
										<Link className="SideBarLinks" href="/cms/CPA/Testimonials/achiever">Achiever Testimonials</Link>
									</div>
								</li>
								<li className='dropdown-link expand'  onClick={()=>ActiveDropDown('Five-Menu')}>
										Testimonials Videos
									<div className='sub-menu'  id='Five-Menu'>
										<Link className="SideBarLinks" href="/cms/CPA/Testimonials-Video/featured">Featured Testimonials</Link>
										<Link className="SideBarLinks" href="/cms/CPA/Testimonials-Video/cpavideos">US CPA Videos</Link>
										<Link className="SideBarLinks" href="/cms/CPA/Testimonials-Video/cmavideos">US CMA Videos</Link>
										<Link className="SideBarLinks" href="/cms/CPA/Testimonials-Video/eavideos">EA Videos</Link>
									</div>
								</li>
								<li className='dropdown-link expand' onClick={()=>ActiveDropDown('Six-Menu')}>
										US CPA
									<div className='sub-menu'  id='Six-Menu' >
										<Link className="heading05 SideBarLinks" href="/cms/CPA/journey">CPA Journey Simplified</Link>
										<Link className="heading05 SideBarLinks" href="/cms/CPA/curriculum">CPA Curriculum section</Link>
										<Link className="heading05 SideBarLinks" href="/cms/CPA/locations">CPA Prometric Locations</Link>
										<Link className="heading05 SideBarLinks" href="/cms/CPA/content">Our Content Partners </Link>
										<Link className="heading05 SideBarLinks" href="/cms/CPA/achievers">What our achievers have to say</Link>
										<Link className="heading05 SideBarLinks" href="/cms/CPA/placement">Our Placement Partners</Link>
									</div>
								</li>
								<li className="dropdown-link">
									<Link className="SideBarLinks" href="/cms/CPA/Canada/canada">
										US CPA - Canada
									</Link>
								</li>
								<li className="dropdown-link">
									<Link className="SideBarLinks" href="/cms/CPA/Fees/fees">
										US CPA - Fees
									</Link>
								</li>
								<li className='dropdown-link expand' onClick={()=>ActiveDropDown('Seven-Menu')}>
										US CPA Alumni
									<div className='sub-menu'  id='Seven-Menu'>
										<Link className="heading05 SideBarLinks" href="/cms/CPA/Alumni/alumni">Alumni Top Video</Link>
										<Link className="heading05 SideBarLinks" href="/cms/CPA/Alumni/achiever">Our Achievers Card 1</Link>
										<Link className="heading05 SideBarLinks" href="/cms/CPA/Alumni/achievers">Our Achievers Card 2</Link>
									</div>
								</li>
								{/* <li>
									<Link className="dropdown-link" href="/cms/CPA/BridgeCourse/course">
										US CPA - Bridge Course
									</Link>
								</li> */}
								<li className='dropdown-link expand' onClick={()=>ActiveDropDown('Eight-Menu')}>
										US CPA Elijah
									<div className='sub-menu'  id='Eight-Menu' >
										<Link className="heading05 SideBarLinks" href="/cms/CPA/WattSells/elijahwatt">Elijah Watt Sells </Link>
										<Link className="heading05 SideBarLinks" href="/cms/CPA/WattSells/placement">Recent CPA and CMA Placements</Link>
										<Link className="heading05 SideBarLinks" href="/cms/CPA/WattSells/journey">Hear what topper has to say about his journey</Link>
									</div>
								</li>
								<li className='dropdown-link expand' onClick={()=>ActiveDropDown('Nine-Menu')}>
										US CPA Accounting
									<div className='sub-menu'  id='Nine-Menu'>
										<Link className="heading05 SideBarLinks" href="/cms/CPA/Accounting/basicsAccounting">Basics of Accounting</Link>
										<Link className="heading05 SideBarLinks" href="/cms/CPA/Accounting/unique">What makes us unique</Link>
									</div>
								</li>
								<li className="dropdown-link">
									<Link className="SideBarLinks" href="/cms/CPA/Faculty/faculty">US CPA FACULTY</Link>
								</li>
								<li className="dropdown-link">
									<Link className="SideBarLinks" href="/cms/CPA/CPA_JOBS/jobs">US CPA JOBS</Link>
								</li>
								<li className="dropdown-link">
									<Link className="SideBarLinks" href="/cms/CPA/CMA_JOBS/jobs">US CMA JOBS</Link>
								</li>
								{/* <li>
									<Link href="/cms/EA/eytakeaways" className='dropdown-link'>EA - Key takeaways</Link>
								</li> */}
								<li className='dropdown-link expand' onClick={()=>ActiveDropDown('Ten-Menu')}>
									  EA - Key takeaways
									<div className='sub-menu'  id='Ten-Menu'>
										<Link className="heading05 SideBarLinks" href="/cms/EA/topsection">Top Sections</Link>
										<Link className="heading05 SideBarLinks" href="/cms/EA/eytakeaways">Key takeaways</Link>
										<Link className="heading05 SideBarLinks" href="/cms/EA/studentKeyTakeaways">Student Gallery</Link>
									</div>
								</li>
								{/* <li>
									<Link href="/cms/Resources/resources" className='dropdown-link'>Resources - Download Prospectus</Link>
								</li> */}
								<li className="dropdown-link">
									<Link className='SideBarLinks' href="/cms/Corporate-Journey/journey">Corporate Journey - From the students who made it big</Link>
								</li>
								<li className='dropdown-link expand' onClick={()=>ActiveDropDown('Eleven-Menu')}>
										Samarth
									<div className='sub-menu'  id='Eleven-Menu'>
										<Link className="heading05 SideBarLinks" href="/cms/samarth/topsection">Top section</Link>
										{/* <Link className="heading05" href="/cms/samarth/prospectus">Prepare with India’s trusted institute (download prospectus)</Link>
										<Link className="heading05" href="/cms/samarth/workshop_schedule">Simandhar's Samarth Workshop Schedule</Link> */}
									</div>
								</li>
								<li className="dropdown-link">
									<Link className="SideBarLinks" href="/cms/blogs">Blogs</Link>
								</li>
								<li className="dropdown-link">
									<Link className="SideBarLinks" href="/cms/meta-tags">Meta Tags</Link>
								</li>
								<li className="dropdown-link">
									<Link className="SideBarLinks" href="/cms/webinars">Webinars</Link>
								</li>
									<li className="dropdown-link">
									<Link className="SideBarLinks" href="/cms/events">Events</Link>
								</li>
							</ul>
						</nav>
					</div>

					{/* COURSE CMS */}
					<div className='sub-menu-box' id="course-menu-box">
						<h2 className='submenu-title'>Our Courses <BsChevronDoubleLeft style={{position : "absolute",top : "50%" , right : "10px" , cursor : "pointer" , fontSize : "20px", transform: "translateY(-50%)"}} id="HideCourse" /></h2>
						<nav className='sub-menu-navbar custom-scrollbar'>
							<ul>
							<li className="dropdown-link">
									<Link className="SideBarLinks" href="/cms/courses">
										Courses
									</Link>
								</li>
								<li className="dropdown-link">
									<Link className="SideBarLinks" href="/cms/users">
										Users
									</Link>
								</li>
								<li className="dropdown-link">
									<Link className="SideBarLinks" href="/cms/order-transection">
										Orders
									</Link>
								</li>	
								
							</ul>
						</nav>
					</div>

					{/* ORDER TRANSECTION */}
					{/* <div className='sub-menu-box' id="order-menu-box">
						<h2 className='submenu-title'>Orders <BsChevronDoubleLeft style={{position : "absolute",top : "50%" , right : "10px" , cursor : "pointer" , fontSize : "20px", transform: "translateY(-50%)"}} id="HideOrder" /></h2>
						<nav className='sub-menu-navbar custom-scrollbar'>
							<ul>
														
							</ul>
						</nav>
					</div> */}
				</aside>
				<section className='dashboard-section'>

				</section>
			</div>
		</>
	)
}


export default SideTab