import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { FiCamera } from 'react-icons/fi'
import { usePathname } from "next/navigation";
import Head from 'next/head';
import { convertImageToBase64, isUserLoggedIn } from '../utils/index';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image'
import { urlConstants } from '../constants/urlConstants';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { AUTH_KEY_NAME, statusConstants } from '../constants/statusCodes';
import { toast } from 'react-hot-toast';
import { updateUserAction } from '../redux/actions/user';
import Spinner from './comman/Spinner';



const sidebarItems = [
	{
		name: "Profile",
		href: "/profile"
	},
	{
		name: "Account Security",
		href: "/security"
	},
	{
		name: "My Courses",
		href: "/myCourse"
	},
	{
		name: "Order History",
		href: "/orderHistory"
	},
	// {
	//     name:"LMS Login",
	//     href:"/"
	// },
	{
		name: "Logout",
		href: "/logout"
	}
]

const SideNavBar = () => {
	const userData = useSelector(state => state.user.user);
	const dispatch = useDispatch();

	const [userLoggedIn, setIsUserLoggedIn] = useState(null);
	const setUserStatus = () => {
		const userData = isUserLoggedIn();
		if (userData.isLoggedIn) {
			setIsUserLoggedIn(userData);
			// console.log("asidebar", userData)
		}
	}
	useEffect(() => {
		setUserStatus()
	}, []);

	const pathname = usePathname();
	const [isShow, setIsShow] = useState(false);
	const showDwnPopup = () => {
		setIsShow(!isShow);
	};

	const inputRef = useRef(null)
	const [image, setImage] = useState("")
	const [loading, setLoading] = useState(false);

	const handleImgClick = () => {
		inputRef.current.click();
	}

	const getUserInfo = async () => {
		setLoading(true)
		try {
			const headers = {
				Authorization: `${getCookie(AUTH_KEY_NAME) ? `JWT ${getCookie(AUTH_KEY_NAME)}` : ''}`,
			}
			const response = await axios.get(urlConstants.studentProfile, { headers: headers });
			if (response.status === statusConstants.ok) {
				dispatch(updateUserAction(response.data));
			}
		} catch (error) {
			setLoading(false)
		} finally {
			setLoading(false)
		}
	}

	const handleImgChange = async (event) => {
		const file = event.target.files[0];
		if (file) {
			const token = `${getCookie(AUTH_KEY_NAME) ? getCookie(AUTH_KEY_NAME) : ''}`
			const headers = {
				Authorization: `JWT ${token}`,
			}

			// Validate file type
			const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
			if (!allowedTypes.includes(file.type)) {
				toast.error('Only PNG and JPG files are allowed');
				return;
			}

			// Validate file size
			const maxSize = 3 * 1024 * 1024; // 5 MB
			if (file.size > maxSize) {
				toast.error('File size should be less than 3 MB');
				return;
			}

			const base64 = await convertImageToBase64(file);
			const response = await axios.post(urlConstants.updateProfilePhoto, { image: base64 }, { headers: headers })
			if (response.status === statusConstants.ok) {
				await getUserInfo();
				// Date Now added to change the image/ this has to be done to support backend.
				const latestImage = userData.profilePicture ? urlConstants.S3_buckets + "/" + userData.profilePicture + `?${Date.now()}` : '/img/user_profile.webp';
				setImage(base64 || latestImage)
				toast.success(response.data.message);
			}
		}
	}

	useEffect(() => {
		setImage(userData.profilePicture && urlConstants.S3_buckets + "/" + userData.profilePicture + `?${Date.now()}` || '/img/user_profile.webp')
	}, [userData && userData.profilePicture]);

	return (
		<>
			{/* <Head>
				<title>
					Profile
				</title>
			</Head> */}
			<>
				<button className={'show-my-account' + ' ' + (isShow ? "active" : "")} onClick={showDwnPopup}>
					My Account
					<span><i><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M190.06 414l163.12-139.78a24 24 0 000-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z"></path></svg></i></span>
				</button>
				<div className={'login-aside-bar' + ' ' + (isShow ? 'active' : '')}>
					<aside>
						<h4 className='heading04'>My Account</h4>
						<div className='flex'>
							<div className="avator">
								<div className='edit-profile-box' >
								<Image fill loading='lazy' src={image} alt="user Avotar" className='user-avator' />
									<input type="file" ref={inputRef} onChange={handleImgChange} style={{ display: "none" }} />
									<i className='pointer' onClick={handleImgClick}>
										<FiCamera />
									</i>
								</div>
							</div>
							<div className="name">
								<p>{userLoggedIn && userData?.fullName}</p>
							</div>
						</div>
						{
							sidebarItems.map(({ name, href }, index) => {
								return (
									<Link href={href} className={pathname == { href } ? "title01 active" : "title01"} key={index}>{name}</Link>
								)
							})
						}
					</aside>
				</div>
			</>
		</>

	)
}


export default SideNavBar