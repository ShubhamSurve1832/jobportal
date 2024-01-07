let link = false;
if (typeof window === "object") {
    //This code is executed in the browser
    link = window.location.href.includes('dev.simandhareducation');
}
console.log("🚀 ~ file: urlConstants.js:5 ~ link:", link)

export const FRONTEND_BASE_URL = process.env.NEXT_PUBLIC_ENV === 'local' ? 'http://localhost:3000/' : process.env.NEXT_PUBLIC_ENV === 'production' ? "https://simandhareducation.com/" : "https://dev.simandhareducation.com/"
export const FORM_URL = link ? "https://devapi.simandhareducation.com/" : "https://simapi.simandhareducation.com/"
export const API_BASE_URL = link ? "https://devapi.simandhareducation.com/" : "https://simapi.simandhareducation.com/"
export const DATABASE_URL = link ? "https://devapi.simandhareducation.com/posts/" : "https://simapi.simandhareducation.com/posts/"
// export const API_BASE_URL =  "https://devapi.simandhareducation.com/"
// export const DATABASE_URL = "https://devapi.simandhareducation.com/posts/"
export const CandidateJobPortalApiBaseURL = 'https://devjobapi.simandhareducation.com/api/v1/user';
export const JobSearchBaseURL = 'https://devjobapi.simandhareducation.com/api/v1/job/search-job?'
export const CandidateLoginApi = "https://devjobapi.simandhareducation.com/api/v1/user/login"
export const RecruiterPostJobBaseURL = 'https://devjobapi.simandhareducation.com/api/v1/job/';
export const CompanyBaseURL = 'https://devjobapi.simandhareducation.com/api/v1/company/';
export const jobPortalBaseURL = 'https://devjobapi.simandhareducation.com/api/v1/';
export const InterviewJobPortalBaseURL = 'https://devjobapi.simandhareducation.com/api/v1/interview/'
export const RecruiterJobPortalBAseURL = 'https://devjobapi.simandhareducation.com/api/v1/recruiter'
export const RecruiterLoginAPI = "https://devjobapi.simandhareducation.com/api/v1/recruiter/login"
export const ReferralFormAPI ="https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture?accessKey=u$rd48ef352ea46899a8fbd0d692799d020&secretKey=0795d8a796876625ecbc814b6c6e0f4e40471484"
export const ReferrarLeadCreate = "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Create?accessKey=u$rd48ef352ea46899a8fbd0d692799d020&secretKey=0795d8a796876625ecbc814b6c6e0f4e40471484"
export const PostActivityLeadAPI = "https://api-in21.leadsquared.com/v2/ProspectActivity.svc/Create?accessKey=u$rd48ef352ea46899a8fbd0d692799d020&secretKey=0795d8a796876625ecbc814b6c6e0f4e40471484"
export const UpdateActivityLeadAPI = "https://api-in21.leadsquared.com/v2/ProspectActivity.svc/CustomActivity/Update?accessKey=u$rd48ef352ea46899a8fbd0d692799d020&secretKey=0795d8a796876625ecbc814b6c6e0f4e40471484"
// export const LeadCaptureApi = "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture?accessKey=u$rd48ef352ea46899a8fbd0d692799d020&secretKey=0795d8a796876625ecbc814b6c6e0f4e40471484"
export const urlConstants = {
    signUp: API_BASE_URL + "userAuth/auth/studentRegister",
    signIn: API_BASE_URL + "userAuth/auth/studentSignIn",
    forgotPassword: API_BASE_URL + "userAuth/auth/forgotPassword",
    resetPassword: API_BASE_URL + "userAuth/auth/resetPassword",
    studentProfile: API_BASE_URL + "userAuth/studentProfile",
    changePassword: API_BASE_URL + "userAuth/auth/updatePassword",
    updateProfile: API_BASE_URL + "userAuth/updateStudentProfile",
    updateProfilePhoto: API_BASE_URL + "userAuth/updateProfilePhoto",
    createAlphaUser: API_BASE_URL + 'userAuth/auth/createAplhaUser',

    getCourseList: API_BASE_URL + "alphalearn/getCourseList",
    getOrderHistory: API_BASE_URL + "cart/getOrderHistory",
    downloadInvoice: API_BASE_URL + "cart/downloadInvoice",

    getCart: API_BASE_URL + "cart/getCart",
    addToCart: API_BASE_URL + "cart/addToCart",
    removeFromCart: API_BASE_URL + "cart/removeFromCart",
    generateInvoice: API_BASE_URL + "cart/generateInvoice",
    getCourseDetails: API_BASE_URL + "lms/getCourseDetails",

    verifyPayment: API_BASE_URL + "cart/verifyPayment",
    checkout: API_BASE_URL + "cart/checkout",

    getSimilarCourses: API_BASE_URL + "lms/getAllCourses",
    getAllCourses: API_BASE_URL + "lms/getAllCourses",

    getOrderDetails: API_BASE_URL + "cart/getOrder",
    saveBillingAddress: API_BASE_URL + "cart/saveBillingAddress",
    careerForm: FORM_URL + "lms/careerForm",
    commonForm: FORM_URL + "crm/getInTouch",

    indexData: DATABASE_URL + "getIndex",
    aboutUsData: DATABASE_URL + "getAboutUs",
    achiverSection: DATABASE_URL + "getAchieversSection",
    contentSection: DATABASE_URL + "getContentSection",
    onlineCourseCPA: DATABASE_URL + "getOnlineCourse",
    heroBanner: DATABASE_URL + "getBanner",
    juorneySection: DATABASE_URL + "getJourneySection",
    curriculumSection: DATABASE_URL + "getCurriculumData",
    curriculumSectionOne: DATABASE_URL + "getCurriculumsectionOne",
    helpSection: DATABASE_URL + "getHelpSection",
    videoSection: DATABASE_URL + "getVideoSection",
    examSection: DATABASE_URL + "getExam",
    gallerySection: DATABASE_URL + "getGallerySection",
    corporateLogos: DATABASE_URL + "getCorporateLogos",
    corporateData: DATABASE_URL + "getCorporateData",
    testimonialVideoTab: DATABASE_URL + "getTestimonialVideoTab",
    getCareerData: DATABASE_URL + "getCareerPage",
    getSripalData: DATABASE_URL + "getSripalJain",
    getAlumniPage: DATABASE_URL + "getAlumniPage",
    getJobsData: DATABASE_URL + "getJobsData",
    getFees: DATABASE_URL + "getFees",
    getFacultyData: DATABASE_URL + "getFacultyData",
    getWebinarData:DATABASE_URL +"getCMSWebinar",
    getEventsData:DATABASE_URL +"getEvents",
    getBlogs:API_BASE_URL+"cmspart1/getBlogs",
    getBlog:DATABASE_URL + "getBlogs",

    getAlphaLearnToken: API_BASE_URL + "alphalearn/getAlphaToken",

    facebook: "https://simandhareducation.com/course/cpa/bridge-course?utm_source=Facebook-Ads&utm_medium=Cpa-Punjab&utm_campaign=What-Is-Cpa-New",
    google: "https://simandhareducation.com/course/what-is-cpa/?utm_source=Google-Ads&utm_medium=Sripal-Event&utm_campaign=Miles-June-1",
    linkdin: "https://simandhareducation.com/bangalore-tour-2023?utm_source=Linkedin-Ads&utm_medium=Sripal-Event&utm_campaign=Bangalore-Event-July-8Th-Saturday",

    GetEventsApi : API_BASE_URL+"posts/getEvents",
    S3_buckets: "https://simandhareducation-files.s3.ap-south-1.amazonaws.com",

}

export const S3_buckets =  "https://simandhareducation-files.s3.ap-south-1.amazonaws.com";
export const coupons = ['simandhar', 'simandhar20', 'simandhar30'];

// If USER is Logged in then, he should not be able to go to these pages.
export const ifLoggedInRestrictedPaths = ['/login', '/signup', '/newpassword'];

// If USER is NOT Logged in then, he should not be able to go to these pages.
export const ifNotLoggedInRestrictedPaths = ['/orderSuccessScreen', '/paymentFailure', '/security', '/profile', '/myCourse', '/orderHistory', '/logout'];

//CMS API CONSTANTS
export const cmsConstats ={
    //ABOUT PAGE
    postOfficialPartners : API_BASE_URL + "cms/addOfficialPartners",
    editOfficialPartners : API_BASE_URL + "cms/editOfficialPartners",
    deleteOfficialPartners : API_BASE_URL + "cms/deleteOfficialPartners",

    //HOME PAGE
    ediPromoRibbion : API_BASE_URL + "cms/editPromoRibbon",
    addMainHeaderSlider : API_BASE_URL + "cms/addMainHeaderSlider",
    editMainHeaderSlider : API_BASE_URL + "cms/editMainHeaderSlider",
    deleteMainHeaderSlider : API_BASE_URL + "cms/deleteMainHeaderSlider",
    editWhySimander: API_BASE_URL + "cms/editWhySimander",
    editPlacements : API_BASE_URL +"cms/editPlacements&Alumni",
    addCorporateTieups: API_BASE_URL+"cms/addCorporateTieups",
    editCorporateTieups: API_BASE_URL+"cms/editCorporateTieups",
    deleteCorporateTieups: API_BASE_URL+"cms/deleteCorporateTieups",
    getAchieversSection: API_BASE_URL + "cms/getAchieversSection",
    editHomeAchiverSection:API_BASE_URL+"cms/editHomePageAchieverTestimonials",
    addStudentsWhoMadeBig:API_BASE_URL + "cms/addStudentsWhoMadeBig",
    editStudentsWhoMadeBig:API_BASE_URL + "cms/editStudentsWhoMadeBig",
    deleteStudentsWhoMadeBig:API_BASE_URL+"cms/deleteStudentsWhoMadeBig",
    tieUpsDelete: API_BASE_URL+"cms/deleteLogos",
    tieUpsEdit:API_BASE_URL+"cms/editLogos",
    tieUpsAdd : API_BASE_URL+"cms/addLogos",
    addCpaJourney:API_BASE_URL+"cmspart1/addCPAJourney",
    editCpaJourney:API_BASE_URL+"cmspart1/editCPAJourney",
    deleteCpaJourney:API_BASE_URL+"cmspart1/deleteCPAJourney",
    editDetailsCorporateJourney:API_BASE_URL +"cmspart1/editDetailsCorporateJourney",
    addDetailsCorporateJourney:API_BASE_URL +"cmspart1/addDetailsCorporateJourney",
    deleteDetailsCorporateJourney:API_BASE_URL +"cmspart1/deleteDetailsCorporateJourney",
    addUSCPACorporateLogos:API_BASE_URL+"cmspart1/addUSCPACorporateLogos",
    editBasicsOfAccounting:API_BASE_URL+"cmspart1/editBasicsOfAccounting",
    addMakeUsUnique:API_BASE_URL+"cmspart1/addMakeUsUnique",
    editMakeUsUnique:API_BASE_URL+"cmspart1/editMakeUsUnique",
    deleteMakeUsUnique:API_BASE_URL+"cmspart1/deleteMakeUsUnique",
    addCPAAlumniOurAchievers:API_BASE_URL+"cmspart1/addCPAAlumniOurAchievers",
    editCPAAlumniOurAchievers:API_BASE_URL+"cmspart1/editCPAAlumniOurAchievers",
    deleteCPAAlumniOurAchievers:API_BASE_URL+"cmspart1/deleteCPAAlumniOurAchievers",
    editCpaAlumniCard:API_BASE_URL+"cmspart1/editCpaAlumniCard",
    addCpaAlumniCard:API_BASE_URL+"cmspart1/addCpaAlumniCard",
    deleteCpaAlumniCard:API_BASE_URL+"cmspart1/deleteCpaAlumniCard",
    editCPAAlumni: API_BASE_URL + "cmspart1/editCPAAlumni",
    editUSCPACanadaDetails:API_BASE_URL+"cmspart1/editUSCPACanadaDetails",
    addCMAJobs:API_BASE_URL+"cmspart1/addCMAJobs",
    editCMAJobs:API_BASE_URL+"cmspart1/editCMAJobs",
    deleteCMAJobs:API_BASE_URL+"cmspart1/deleteCMAJobs",
    addMorePosts:API_BASE_URL+"cms/addMorePosts",
    editMorePosts:API_BASE_URL+"cms/editMorePosts",
    deleteMorePosts:API_BASE_URL+"cms/deleteMorePosts",
    addWebinars:API_BASE_URL+"cms/addWebinars",
    editWebinars:API_BASE_URL+"cms/editWebinars",
    addRecentWebinars:API_BASE_URL+"cmspart1/addWebinar",
    editRecentWebinars:API_BASE_URL+"cmspart1/editWebinar",
    deleteRecentWebinars:API_BASE_URL+"cmspart1/deleteWebinar",
    deleteWebinars:API_BASE_URL+"cms/deleteWebinars",
    addUSCPAJobs:API_BASE_URL+"cmspart1/addUSCPAJobs",
    editUSCPAJobs:API_BASE_URL+"cmspart1/editUSCPAJobs",
    deleteUSCPAJobs:API_BASE_URL+"cmspart1/deleteUSCPAJobs",
    addUSCPAFaculty:API_BASE_URL+"cmspart1/addUSCPAFaculty",
    editUSCPAFaculty:API_BASE_URL+"cmspart1/editUSCPAFaculty",
    deleteUSCPAFaculty:API_BASE_URL+"cmspart1/deleteUSCPAFaculty",
    editCPAFees:API_BASE_URL+"cmspart1/editCPAFees",
    addAchieverTestimonials:API_BASE_URL+"cms/addAchieverTestimonials",
    editAchieverTestimonials:API_BASE_URL+"cms/editAchieverTestimonials",
    deleteAchieverTestimonials:API_BASE_URL+"cms/deleteAchieverTestimonials",
    addUSCPALicensee:API_BASE_URL+"cms/addUSCPALicensee",
    editUSCPALicensee:API_BASE_URL+"cms/editUSCPALicensee",
    deleteUSCPALicensee:API_BASE_URL+"cms/deleteUSCPALicensee",
    addCPACMAPlacement:API_BASE_URL+"cms/addCPACMAPlacement",
    editCPACMAPlacement:API_BASE_URL+"cms/editCPACMAPlacement",
    deleteCPACMAPlacement:API_BASE_URL+"cms/deleteCPACMAPlacement",
    addTopVideo:API_BASE_URL+"cms/addTopVideo",
    editTopVideo:API_BASE_URL+"cms/editTopVideo",
    addTestimonialVideo:API_BASE_URL+"cms/addTestimonialVideo",
    editTestimonialVideo:API_BASE_URL+"cms/editTestimonialVideo",
    deleteTestimonialVideo:API_BASE_URL+"cms/deleteTestimonialVideo",
    addTestimonialVideoPage :API_BASE_URL+"cms/addTestimonialVideoPage",
    editTestimonialVideoPage:API_BASE_URL+"cms/editTestimonialVideoPage",
    deleteTestimonialVideoPage:API_BASE_URL+"cms/deleteTestimonialVideoPage",
    editElijahWattSells:API_BASE_URL+"cmspart1/editElijahWattSells",
    addTopperJourney:API_BASE_URL+"cmspart1/addTopperJourney",
    editTopperJourney:API_BASE_URL+"cmspart1/editTopperJourney",
    deleteTopperJourney:API_BASE_URL+"cmspart1/deleteTopperJourney",
    addsellsAward:API_BASE_URL+"cmspart1/addsellsAward",
    editsellsAward:API_BASE_URL+"cmspart1/editsellsAward",
    deletesellsAward:API_BASE_URL+"cmspart1/deletesellsAward",
    addCPAOurAchievers:API_BASE_URL+"cmspart1/addCPAOurAchievers",
    editCPAOurAchievers:API_BASE_URL+"cmspart1/editCPAOurAchievers",
    deleteCPAOurAchievers:API_BASE_URL+"cmspart1/deleteCPAOurAchievers",
    addCPAContentPartners:API_BASE_URL+"cmspart1/addCPAContentPartners",
    editCPAContentPartners:API_BASE_URL+"cmspart1/editCPAContentPartners",
    deleteCPAContentPartners:API_BASE_URL+"cmspart1/deleteCPAContentPartners",
    addCPACurriculum:API_BASE_URL+"cmspart1/addCPACurriculum",
    editCPACurriculum:API_BASE_URL+"cmspart1/editCPACurriculum",
    deleteCPACurriculum:API_BASE_URL+"cmspart1/deleteCPACurriculum",
    addCPAPrometric:API_BASE_URL+"cmspart1/addCPAPrometric",
    editCPAPrometric:API_BASE_URL+"cmspart1/editCPAPrometric",
    deleteCPAPrometric:API_BASE_URL+"cmspart1/deleteCPAPrometric",
    editUSCPACorporateLogos:API_BASE_URL+"cmspart1/editUSCPACorporateLogos",
    deleteUSCPACorporateLogos:API_BASE_URL+"cmspart1/deleteUSCPACorporateLogos",
    addKeyTakeaways:API_BASE_URL+"cmspart1/addKeyTakeaways",
    editKeyTakeaways:API_BASE_URL+"cmspart1/editKeyTakeaways",
    deleteKeyTakeaways:API_BASE_URL+"cmspart1/deleteKeyTakeaways",
    addKeyTakeawaysStudents:API_BASE_URL+"cmspart1/addKeyTakeawaysStudents",
    editKeyTakeawaysStudents:API_BASE_URL+"cmspart1/editKeyTakeawaysStudents",
    deleteKeyTakeawaysStudents:API_BASE_URL+"cmspart1/deleteKeyTakeawaysStudents",
    editEADetails:API_BASE_URL+"cmspart1/editEADetails",
    editDetailsSamarth:API_BASE_URL+"cmspart1/editDetailsSamarth",
    addBlog:API_BASE_URL+"cmspart1/addBlog",
    editBlog:API_BASE_URL+"cmspart1/editBlog",
    deleteBlog:API_BASE_URL+"cmspart1/deleteBlog",
    getBlogs:API_BASE_URL+"cmspart1/getBlogs",
    editBridgeCurse : API_BASE_URL + "cmspart1/editBridgeCourse",

    addCardElements : API_BASE_URL + "cms/addCardElements",
    editCardElements : API_BASE_URL +"cms/editCardElements",
    deleteCardElements : API_BASE_URL +"cms/deleteCardElements",

    addCMSWebinars:API_BASE_URL+"cms/addCMSWebinar",
    editCMSWebinars:API_BASE_URL+"cms/editCMSWebinar",
    deleteCMSWebinars:API_BASE_URL+"cms/deleteCMSWebinar",

    addEvents: API_BASE_URL + "cms/addEvents",
    editEvents: API_BASE_URL + "cms/editEvents",
    deleteEvents: API_BASE_URL + "cms/deleteEvents",

    // GET ALL COURSES
    getAllCMSCourses:API_BASE_URL+"admin/getAllCourses",
    editCMSCourse:API_BASE_URL+"admin/editCourse",
    syncCourses:API_BASE_URL+"alphalearn/getCourseList",
    // GET USERS 
    getUserList : API_BASE_URL+"admin/getUserList",
    editUser : API_BASE_URL+"admin/editUser",

    // GET TRANSECTIONS
    getTransections : API_BASE_URL+"admin/getTransactions",
    
    // META TAG WEBSITE 
    getAllMetaTags : API_BASE_URL+"admin/getAllMetaTags",
    addMetaTags : API_BASE_URL+"admin/addMetaTags",
    editMetaTags : API_BASE_URL+"admin/editMetaTags",
    
    // DASHBOARD ECCOM
    getDashboard : API_BASE_URL + "admin/getDashboardData",
    
    //PDFs
    addPdfs : API_BASE_URL + "cmspart1/addHomeIndexPdf",
    editPdfs : API_BASE_URL + "cmspart1/editHomeIndexPdf",


    

}