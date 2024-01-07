import { useState, useEffect, useRef, StrictMode } from "react";
import { Provider } from 'react-redux';
import Format from "@/layout/format";
import Image from "next/image";
import NextTopLoader from 'nextjs-toploader';
import ScrollTop from '../components/ScrollToTop'

import "../styles/style.scss";
import '../styles/spinner.css';
import StickyComponents from "../components/StickyComponents";
import FormComponents from "../components/form";
import store from '../redux/store';
import { Toaster } from 'react-hot-toast';
import { useRouter } from "next/router";
import { urlConstants } from "@/constants/urlConstants";
import axios from "axios";
import secureLocalStorage from 'react-secure-storage'
import Head from "next/head";
import Script from "next/script";
import JobHeader from '../pages/job/JobHeader'
import JobFooter from '../pages/job/JobFooter'





export default function App({ Component, pageProps }) {


  const [isActive, setActive] = useState(false);

  let router = useRouter();

  const showPopup = () => {
    setActive(!isActive);
  };

  useEffect(() => {

    (window.onbeforeunload = () => {
      return window.scrollTo(0, 0);
    })();

    (
      async function () {
        try {
          let res = await axios.post(urlConstants.signIn, {
            email: "admin@admin.com",
            password: "123",
          });

          if (res.status === 200) {
            if (res.data.role[0] === 'admin') {
              secureLocalStorage.setItem('TK', res.data.token);
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
    )();



    // if (typeof window === 'object') {
    //   if (window.location.href.includes('utm_source') && window.location.href.includes('utm_medium') && window.location.href.includes('utm_campaign')) {
    //     let utmSource = url.split('&')[0].split('?')[1].split('=')[1]
    //     // window.localStorage.setItem('utmSource', utmSource)
    //     setCookie('utmSource',utmSource)

    //     let utmMedium = url.split('&')[1].split("=")[1]
    //     // window.localStorage.setItem('utmMedium', utmMedium)
    //     setCookie('utmMedium',utmMedium)

    //     let utmCampaign = url.split('&')[2].split('=')[1]
    //     // window.localStorage.setItem('utmCampaign', utmCampaign)
    //     setCookie('utmCampaign',utmCampaign)
    //     console.log( "77 - " + getCookie('utmSource') );
    //   }
    // }

    if (window.location.href.includes('/course/ea/faqs') || window.location.href === ('https://simandhareducation.com/course')) {
      window.location.href = 'https://simandhareducation.com/course/ea'
    }

    // if (window.location.href.includes('/course/data-analytics')) {
    //   window.location.href = "https://simandhareducation.com/data-analytics"
    // }

    if (window.location.href.includes('blogs/2020/09/26/cpa-exam-syllabus')) {
      window.location.href = "https://simandhareducation.com/blogs/cpa-exam-syllabus"
    }

  
 

  }, []);

  const showChatBot = () => {
    HaptikSDK.show();   
  };
  return (
    <>
    
      <ScrollTop></ScrollTop>
      <Format>
        <Head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-826080113"></script>
        </Head>
        
        {/* <Header/> */}

              {(router.pathname.includes('/Admin') || router.pathname == '/login' || router.pathname == '/signup' || router.pathname.includes('/job') || router.pathname.includes('/kerala') || router.pathname.includes('/course/what-is-cpa') || router.pathname.includes('/ea-webinar') || router.pathname.includes('/cpa-webinar') || router.pathname.includes('/cma-webinar')              ) ? '' : <StickyComponents showPopup={showPopup} isactive={isActive} />}
        <FormComponents isactive={isActive} showPopup={showPopup} formName="Enquire form" Qualification/>
       
        {
                  !router.pathname.includes('/job') && !router.pathname.includes("/Admin") && !router.pathname.includes("/kerala") && !router.pathname.includes("/ea-webinar") &&
                  !router.pathname.includes("/cpa-webinar") && !router.pathname.includes("/cma-webinar") &&
          <a className="chat-icon pointer" onClick={showChatBot}>
          <Image loading='lazy' 
            src="/img/icon-simandhar-chat.png"
            alt="Simandhar Chatbot Icon"
           fill={true} sizes='100vw'
            className="resp-img"
          />
        </a>
        }
        
          <JobHeader />
        
        <StrictMode>
          <Provider store={store}>
          <NextTopLoader className="toploader-spinner" color="#760B28" easing="ease" shadow="0 0 10px #760B28,0 0 5px #760B28" crawlSpeed={200} speed={200}  showSpinner={false}/>
            <Component {...pageProps} showPopup={showPopup} />
          </Provider>
        </StrictMode>
        {/* <Footer /> */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: '16px',
            },
          }}
        />
      </Format>
    </>
  );
}
