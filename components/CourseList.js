import React, { useState,useEffect, useRef } from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, removeFromCartAction } from '../redux/actions/cart';
import { Toaster, toast } from 'react-hot-toast';
import { PostActivityLeadAPI, urlConstants,UpdateActivityLeadAPI } from '../constants/urlConstants';
import { AUTH_KEY_NAME, statusConstants } from '../constants/statusCodes';
import axios from 'axios';
import { formatAmount } from '../utils';
import { getCookie } from 'cookies-next';
import parse from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image'
import GoToCourse from './comman/GoToCourse';
import Head from 'next/head';
import moment from 'moment';
import secureLocalStorage from 'react-secure-storage';

const CourseList = ({ courseData }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const [goToCourseInfo, setGoToCourseInfo] = useState(null);
  const goToCourseRef = useRef(null);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [newActivityId,setNewActivityId] = useState()
  const [activityId,setActivityId] = useState("")
  const [count,setCount] = useState(0)
  let EmailId = secureLocalStorage.getItem("UserEmail")
  let cartItem = useSelector(state => state.cart.cartItems)

  
  // let count = cartItems.length
  const handleCart = async (e, course, index) => {
    setCount(course.sequence)    
    e.preventDefault();
    if (!course.inCart) {
      const defaultMessage = 'You can add only one CPA Course bundle - Becker Unlimited or Becker Limited.';
      try {
        if (course.sequence === 1) {
          if (cartItems.some(item => item.sequence === 2)) {
            toast.error(defaultMessage);
            return;
          }
        } else if (course.sequence === 2) {
          if (cartItems.some(item => item.sequence === 1)) {
            toast.error(defaultMessage);
            return;
          }
        }
      } catch (error) {
        console.log("🚀 ~ file: CourseList.js:28 ~ handleCart ~ error:", error)
      }
    }
    // console.log("After Try ===>", course)

    const token = `${getCookie(AUTH_KEY_NAME) ? getCookie(AUTH_KEY_NAME) : ''}`
    if (token) {
      const headers = {
        Authorization: `JWT ${token}`,
      }
      try {
        setButtonDisabled(index);

        const object = {
          courseId: course._id
        }
        let response = await axios.post(urlConstants.addToCart, object, { headers: headers });
        if (response.status === statusConstants.ok) {
          course.inCart ? dispatch(removeFromCartAction(course)) : dispatch(addToCartAction(course))
          course.inCart ? postCartActivity('Course Added.!',course.courseCode,course.sequence) : postCartActivity('Course Removed.!',course.courseCode,course.sequence)
          toast.success(response.data.message)
        }
      } catch (error) {
        toast.error(error.response.data.message || 'An error occurred during adding to cart. Please try again later.')
      } finally {
        setButtonDisabled(false);
      }
    } else {
      console.log('IN CART ===>', course.inCart);
      course.inCart ? toast.success('Course has been removed.') : toast.success('Course has been added.')
      course.inCart ? postCartActivity('Course Added.!',course.courseCode,course.sequence) : postCartActivity('Course Removed.!',course.courseCode,course.sequence)
      course.inCart ? dispatch(removeFromCartAction(course)) : dispatch(addToCartAction(course))
      // console.log("courses in cart",course.inCart)
    }
  }

  // POST ACTIVITY 
  // ADROIT API ACTIVITY ID
// let activityIdCaptureLead = async ()=>{
//   try {
//     console.log("PoST Call")
//     let activityIdRes = await axios.get(`https://www.theadroit.in/api/set-simandhat-activity-id?email=${EmailId}&activity_id=${activityId}`,
//     {
//       headers:{"Content-Type":"application/json"}
//   })
//     console.log("activity res",activityIdRes)
//   } catch(err) {
// console.log("SImandhar API ERROR",err)
//   }
// }


  // GET ACTIVITY LEAD API
  // let activityGetIDCaptureLead = async ()=>{
  //   console.log("GET Call")
  //   try {
  //     let activityIdRes = await axios.get(`https://www.theadroit.in/api/get-simandhat-activity-id?email=${EmailId}`,
  //     {
  //       headers:{"Content-Type":"application/json"}
  //   })
  //     console.log("activity res",activityIdRes)
  //     setNewActivityId(activityIdRes.data.activity_id)
  //     console.log("activity res Activity id",activityIdRes.data.activity_id)
      
  
  //   } catch(err) {
  // console.log("SImandhar API ERROR",err)
  //   }
  // }
 


  let prospectusId = secureLocalStorage.getItem('RelatedProspectId')
  let postCartActivity = async (activityName,courseCode,sequence)=>{
    if(prospectusId !== null){
      // activityGetIDCaptureLead()
     let postactivity = {
       "RelatedProspectId": prospectusId,
       "ActivityEvent": 256,
       "ActivityNote": activityName,
       "ProcessFilesAsync": true,
      //  "ActivityDateTime": formattedDateTime,                        
       "Fields": [
           {
               "SchemaName":`mx_Custom_${sequence}`,
               "Value": courseCode
           }
       ]
       } 

     try{
      
      try {
        let activityIdRes = await axios.get(`https://www.theadroit.in/api/get-simandhat-activity-id?email=${EmailId}`,
        {
          headers:{"Content-Type":"application/json"}
      })
        console.log("activity res",activityIdRes)
        // setNewActivityId(activityIdRes.data.activity_id)
        console.log("activity res Activity id",activityIdRes.data.activity_id)
        secureLocalStorage.setItem("ActivityID", activityIdRes.data.activity_id)
        
         //UPDATE ACTIVITY PAYLOAD
       let updateactivity = {
        "ProspectActivityId": activityIdRes.data.activity_id,
        "ActivityEvent": 256,
        "ActivityNote": activityName,
        "ProcessFilesAsync": true,
       //  "ActivityDateTime": formattedDateTime,                        
        "Fields": [
            {
                "SchemaName": `mx_Custom_${sequence}`,
                "Value": activityName === 'Course Added.!' ? courseCode : ''
            }
        ]
        }
    
        if (activityIdRes.data.activity_id !== "Fail"){
          console.log("UPDATE API Hitted")
          const ActivityResponsed = await axios.post(UpdateActivityLeadAPI, updateactivity,
            {
                headers:{"Content-Type":"application/json"}
            });
        } else{
          console.log("CREATE API Hitted")     
  
            const ActivityResponse = await axios.post(PostActivityLeadAPI, postactivity,
              {
                  headers:{"Content-Type":"application/json"}
              });
              console.log('ActivityResponse',ActivityResponse)
              if( ActivityResponse.status === 200){              
                setActivityId(ActivityResponse.data.Message.Id)
                console.log("Activity id CREATE",ActivityResponse.data.Message.Id)
  
                // let activityIdCaptureLead = async ()=>{
                  try {
                    console.log("PoST Call")
                    let activityIdRes = await axios.get(`https://www.theadroit.in/api/set-simandhat-activity-id?email=${EmailId}&activity_id=${ActivityResponse.data.Message.Id}`,
                    {
                      headers:{"Content-Type":"application/json"}
                  })
                    console.log("activity res",activityIdRes)
                  } catch(err) {
                console.log("post call SImandhar API ERROR",err)
                  }
                // }
              }
        }

      } catch(err) {
    console.log("get call SImandhar API ERROR",err)
      }      
       
        //  console.log(ActivityResponse)
     } catch(err){
            console.log(err)
     }    
    }else{
      console.log("Singup Or Login First To Post Activity On Lead.!")
    }
   } 

  let courses = courseData.sort((a, b) => a.sequence - b.sequence);

  const submitChildForm = () => {
    if (goToCourseRef.current) {
      goToCourseRef.current.submitForm();
    }
  };
  const handleGoToCourse = async (e, item) => {
    e.preventDefault();
    await setGoToCourseInfo({ enrollmentId: item.enrollmentId })
    submitChildForm()
  }

  return (
    <>
      <Head>
       {/* <!-- Google tag (gtag.js) --> */}
       {/* <script async src="https://www.googletagmanager.com/gtag/js?id=AW-826080113"></script>
        <script     type='application/ld+json' dangerouslySetInnerHTML={{
          __html:
          `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
          gtag('config', 'AW-826080113');`}}
        /> */}
      </Head>
      {courseData.map((item, index) => {
        if (item.price.totalPrice > 0) {
          let { title } = item;
          return (


            <figure className='course-row' key={index}>
              <div className='course-imgbox'>
                <img loading='lazy' src={item.thumbnail} fill={true} sizes='100vw' className='resp-img' alt={`${item.courseCode} Course`} />
              </div>
              <figcaption className='course-infobox'>
                <Link href={`/courseDetail/${title?.split('(').join('').split(')').join('').split('|').join('').split('?').join('').split('  ').join(' ').split(' ').join('-').split('-').reverse().slice(1).join('-').split('-').reverse().join('-')}`}>
                  <div>
                    <h3 className='heading03'>{item.title}</h3>
                    <p className='courseData' >{parse(item.description)}</p>
                    <span className='title01'>Read More</span>
                    {/*<p className='duration-row'>
                      <dl>
                        <dt>
                          <span>{durationInDays}</span> days duration
                        </dt>
                        <dd>
                          <span>28</span> lectures
                        </dd>
                      </dl>
                    </p> */}
                  </div>
                </Link>
                <div className='price-box'>
                  <p className='discount-price'>{item.price && formatAmount(item.price.totalPrice)}</p>
                  <p className='actual-price strip'>{item.price && formatAmount(item.price.discountPrice)}</p>
                </div>

                {item.IsBoughtAlready ? (
                  <button onClick={(e) => handleGoToCourse(e, item)} className="btn maroon-btn maroon-btn-arrow">Go to course</button>
                ) : (
                  <>
                    <button className={`btn maroon-btn maroon-btn-arrow ${isButtonDisabled === index ? 'disabled' : ''}`} disabled={isButtonDisabled === index} onClick={(e) => handleCart(e, item, index)}>
                      {isButtonDisabled === index ? 'Loading...' : (item.inCart) ? 'Remove from cart' : 'Add to cart'}
                    </button>
                  </>
                )}

              </figcaption>
            </figure>
          )
        }
      })}
      <GoToCourse ref={goToCourseRef} enrollmentId={goToCourseInfo?.enrollmentId} />
    </>
  )
}

export default CourseList