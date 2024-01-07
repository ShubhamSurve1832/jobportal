import * as Yup from 'yup'

export const PostJobProvideBasicinfo = Yup.object({
    title : Yup.string().min(2).required("Please Enter Job Title"),
    Address : Yup.string().min(3).max(100).optional('Please Enter Your Specific Address'),
})

export const Addcompensation = Yup.object({
    title : Yup.string().min(2).required("Enter Job Title"),
    Address : Yup.string().min(3).required('Enter Your Address'),
})

export const ApplicationPrefernces = Yup.object({
    title : Yup.string().min(2).required("Enter Job Title"),
    Address : Yup.string().min(3).required('Enter Your Address'),
})