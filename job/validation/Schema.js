import * as Yup from 'yup'


const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
const phoneReg2 = /^\d{10}$/

const numberRegex = /^[0-9]+$/;

export const HomePageJobPortalShema = Yup.object({
    Skills : Yup.string().min(2).optional("Enter Your Skills"),
    Experience : Yup.number().optional('Enter Your Experience'),
    Location : Yup.string().min(2).optional('Enter Your Location'),
})


export const CandidateLoginSchema = Yup.object({
    email : Yup.string().email("Enter valid email address").min(4).max(50).matches(EmailRegex, 'Enter Valid Email Address').required('Enter Your Email address'),
    password : Yup.string().min(3,"Password must be at least 3 characters").max(50,"Password must be at most 50 characters").required("Enter Password"),
})

export const AdminCMSLOGIN = Yup.object({
    email : Yup.string().email("Enter valid email address").min(4).max(50).matches(EmailRegex, 'Enter Valid Email Address').required('Enter Your Email address'),
    password :Yup.string().min(3,"Password must be at least 3 characters").max(50,"Password must be at most 50 characters").required("Enter Password"),
})


export const CandidateSignUpSchema = Yup.object({
    firstName : Yup.string().matches(/^[a-zA-Z,'.\-\s]+$/,'Please Enter Valid Name').min(2,"First Name must be at least 2 Characters").max(50,"First Name must be at most 50 Characters").required("Enter Your First Name"),
    lastName : Yup.string().matches(/^[a-zA-Z,'.\-\s]+$/,'Please Enter Valid Name').min(2,"Last Name must be at least 2 Characters").max(50,"Last Name must be at most 50 Characters").required("Enter Your Last Name"),
    email : Yup.string().email("Enter valid email address").min(4).max(50).matches(EmailRegex, 'Enter Valid Email Address').required('Enter Your Email address'),
    password: Yup.string().min(3,"Password must be at least 3 characters").max(50,"Password must be at most 50 characters").required("Enter Password"),
    phoneNo :Yup.string().matches(phoneRegExp, 'Phone number is not valid').matches(phoneReg2,'Phone number is not valid').required("Please Enter Your Phone Number"),
    // PhoneCode : Yup.string().required('Choose Country Phone Code'),
})


export const CandidateForgotPassSchema = Yup.object({
    email : Yup.string().email("Enter valid email address").min(4).max(50).matches(EmailRegex, 'Enter Valid Email Address').required('Enter Your Email address'),
})

export const RecruiterForgotPassSchema = Yup.object({
    email : Yup.string().email("Enter valid email address").min(4).max(50).matches(EmailRegex, 'Enter Valid Email Address').required('Enter Your Email address'),
})


export const ResetPasswordJobPortal = Yup.object({
    Password : Yup.string().min(3,"Password must be at least 3 characters").max(50,"Password must be at most 50 characters").required("Enter Password"),
    ConfirmPassWord : Yup.string().min(3).max(50).required("Please New Your Password").oneOf([Yup.ref("Password"),null],"Both Password Must be Same")
})



export const RecruiterLoginSchema = Yup.object({
    EmailAddress : Yup.string().email("Enter valid email address").min(4).max(50).matches(EmailRegex, 'Enter Valid Email Address').required('Enter Your Email address'),
    Password:Yup.string().min(3,"Password must be at least 3 characters").max(50,"Password must be at most 50 characters").required("Enter Password"),
})



// const PincodeRegExp = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/

export const RecruiterSignUpSchema = Yup.object({
    firstName : Yup.string().matches(/^[a-zA-Z,'.\-\s]+$/,'Please Enter Valid Name').min(2,"Full Name must be at least 2 Characters").max(50,"Full Name must be at most 50 Characters").required("Please Enter Your First Name"),
    LastName : Yup.string().matches(/^[a-zA-Z,'.\-\s]+$/,'Please Enter Valid Name').min(2,"Full Name must be at least 2 Characters").max(50,"Full Name must be at most 50 Characters").required("Please Enter Your Last Name"),
    EmailAddress:  Yup.string().email("Enter valid email address").min(4).max(50).matches(EmailRegex, 'Enter Valid Email Address').required('Enter Your Email address'),
    Password: Yup.string().min(3,"Password must be at least 3 characters").max(50,"Password must be at most 50 characters").required("Enter Password"),
    ConfirmPassword : Yup.string().min(3).max(20).required("Please Confirm Your Password").oneOf([Yup.ref("Password"),null],"Both Password Must Be Same"),
    PhoneNumber :Yup.string().matches(phoneRegExp, 'Phone number is not valid').matches(phoneReg2,'Phone number is not valid').required("Please Enter Your Phone Number"),
    CompanyName : Yup.string().required("Enter Your Comapny Name"),
    // EmpoyeeSize : Yup.string().required("Enter Total Employee Size"),
    Industry : Yup.string().required("Enter Your Industry"),
    Designation : Yup.string().matches(/^[a-zA-Z,'.\-\s]+$/,'Please Enter Valid Designation').required("Please Enter Your Designation"),
    Location : Yup.string().required("Please Enter Your Location"),
    // PhoneCode : Yup.string().required('Choose Country Phone Code'),
})




export const CandidateBasicInforFormSchema = Yup.object({
    Phone : Yup.string().matches(phoneRegExp, 'Phone number is not valid').matches(phoneReg2,'Phone number is not valid').required("Enter Number"),
    Address : Yup.string().min(2).max(50).required("Enter Address"),
    Country : Yup.string().required("Select Your Country"),
    State : Yup.string().required("Select Your State"),
    City : Yup.string().required("Select Your City"),
    Pincode : Yup.number().required("Enter Pincode")
})








export const AddCompanyFormSchema = Yup.object({
    name:Yup.string().matches(/^[a-zA-Z,'.\-\s&]+$/,'Please Enter Valid Name').min(2).max(50).required('Enter Company Name'),
    size:Yup.number().required('Enter Size of Company').typeError("Please Enter Valid Size"),
    industry:Yup.string().matches(/^[a-zA-Z,'.\-\s]+$/,'Please Enter Valid Industry').min(2).max(50).required('Enter Industry Name'),
    ceo:Yup.string().matches(/^[a-zA-Z,'.\-\s]+$/,'Please Enter Valid Name').min(2).max(50).required('Enter CEO Name'),
    yearOfEstd:Yup.number().required('Enter Year of Establish Company').typeError('Please Enter Valid Year'),
    revenue:Yup.number().required('Enter Revenue of Company').typeError("Please Enter Valid Revenue"),
    website:Yup.string().matches(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,'Please Enter Valid URL').min(2).max(100).required('Enter Website Url'),
    description:Yup.string().min(10).required('Enter Description'),
    location:Yup.string().min(2).required('Enter Location Name'),
})


export const EnrollFormSchema = Yup.object({    
    fullName:Yup.string().matches(/^[a-zA-Z,'.\-\s&]+$/,'Please Enter Valid Name').min(2).max(50).required('Enter Your Name'),
    email:  Yup.string().email("Enter valid email address").min(4).max(50).matches(EmailRegex, 'Enter Valid Email Address').required('Enter Your Email address'),
    phoneNo :Yup.string().matches(phoneRegExp, 'Phone number is not valid').matches(phoneReg2,'Phone number is not valid').required("Please Enter Your Phone Number"),
    // amount :Yup.string().matches(numberRegex,"Please Enter Valid amount").required("Select Payment Amount"),
    addressL1 : Yup.string().min(2).max(50).required("Enter Address Line 1"),
    addressL2 : Yup.string().min(2).max(50).required("Enter Address Line 2"),
    city : Yup.string().required("Enter Your City"),
    state : Yup.string().required("Select Your State"),
    Pincode : Yup.number().required("Enter Pincode"),
    Counsellor : Yup.string().required("Select Your Counsellor"),
    Course : Yup.string().required("Select Your Course"),
    PaymentMethod: Yup.string().required("Select Payment Method"),
    Profession : Yup.string().required("Select Your Professions"),
    // companyName : Yup.string().required("Select Your company Name"),

})

export const RecruiterEditSchema = Yup.object({    
    firstName:Yup.string().matches(/^[a-zA-Z,'.\-\s&]+$/,'Please Enter Valid Name').min(2).max(50).required('Enter Your Name'),
    LastName:Yup.string().matches(/^[a-zA-Z,'.\-\s&]+$/,'Please Enter Valid Last Name').min(2).max(50).required('Enter Your Name'),
    email:  Yup.string().email("Enter valid email address").min(4).max(50).matches(EmailRegex, 'Enter Valid Email Address').required('Enter Your Email address'),
    phoneNumber :Yup.string().matches(phoneRegExp, 'Phone number is not valid').matches(phoneReg2,'Phone number is not valid').required("Please Enter Your Phone Number"),
    companyName : Yup.string().required("Company Name Required"),
    Industry : Yup.string().required("Enter Your Industry"),
    location : Yup.string().required("Select Your City"),
    // employeeSize : Yup.string().required("Enter Total Employee Size"),
    Designation : Yup.string().matches(/^[a-zA-Z,'.\-\s]+$/,'Enter Valid Designation').required("Please Enter Your Designation"),
})