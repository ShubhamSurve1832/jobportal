import { Html, Head, Main, NextScript } from 'next/document'




export default function Document() {


  return (
    <Html lang="en">
      <Head>
        
        <script          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PW2JTZ3');`,
          }}
        />

<script
          dangerouslySetInnerHTML={{
            __html: ` window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-826080113');`,
          }}
        />

       

        {/* <script type='application/ld+json' dangerouslySetInnerHTML={{
          __html:
            `{
            gtag('config', 'AW-826080113/7s8bCJSko7cYEPH284kD', { 'phone_conversion_number': '+91-7780273388'}); 
        }`}} />

        <script type='application/ld+json' dangerouslySetInnerHTML={{
          __html:
            `{
            gtag('config', 'AW-826080113/7s8bCJSko7cYEPH284kD', { 'phone_conversion_number': '+91-8977633523'}); 
        }`}} />

        <script type='application/ld+json' dangerouslySetInnerHTML={{
          __html:
            `{
            gtag('config', 'AW-826080113/7s8bCJSko7cYEPH284kD', { 'phone_conversion_number': '080-45588550'}); 
        }`}} /> */}

{/* {
pathname !== "/thankyou" &&   */}
  {/* <script async src="https://www.googletagmanager.com/gtag/js?id=AW-826080113"></script> */}
  {/* } */}
       

     
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html:
          `{
        "@context": "https://schema.org",
        "@type": "CollegeOrUniversity",
        "name": "Simandhar Education",
        "alternateName": "Simandhar",
        "url": "https://www.simandhareducation.com/course/cpa",
        "logo": "https://www.simandhareducation.com/_next/image?url=%2Fimg%2Flogo.png&w=1920&q=75",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "7780273388",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": "en"
        },
        "sameAs": [
          "https://www.instagram.com/simandhar.cpa.cma/",
          "https://www.youtube.com/@SimandharEducation1",
          "https://www.linkedin.com/company/simandhar-education/?originalSubdomain=in",
          "https://twitter.com/simandharedu?lang=en",
          "https://www.facebook.com/SimandharEducationCPACMA/",
          "https://www.simandhareducation.com/"
        ]
      }`
    }} />
 


      </Head>
      <body>
      <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PW2JTZ3"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* LIVE CHAT BOT */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
            window.haptikInitSettings = {
              "business-id": "6991",
              "client-id": "a633ba35c4469c0c5ee0ff8e71c1355ff898a05a",
              "base-url": "https://api.haptikapi.com/",
              "custom-button": true
              };
          `}} /> */}
           <script
          dangerouslySetInnerHTML={{
            __html: `
            window.haptikInitSettings = {
              "business-id": "6991",
              "client-id": "9600ee477b7cac396fd9c1a051910800f9dec251",
              "base-url": "https://staging.hellohaptik.com/",
              "custom-button": true
              };
          `}} />

          {/* DEV CHAT BOT */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
            window.haptikInitSettings = {
              "business-id": "6991",
              "client-id": "9600ee477b7cac396fd9c1a051910800f9dec251",
              "base-url": "https://staging.hellohaptik.com/",
              "custom-button": true
              };
          `}} /> */}


        <script
          type="text/javascript"
          charset="UTF-8"
          src="https://toolassets.haptikapi.com/platform/javascript-xdk/production/loader.js"
        />
        <Main />
        <NextScript />
        
      </body>
    </Html>
  )
}