import { urlConstants as urlConstant } from '../../constants/urlConstants';

require ('dotenv').config()

const sgMail = require('@sendgrid/mail');
const axios = require('axios');


const { SENDGRID_APY_KEY } = process.env;

sgMail.setApiKey(SENDGRID_APY_KEY )

export default async function handler(req, res) {
  const { name, email, number, course, formName, city, exStud } = req.body;
  let data = JSON.stringify({
    "emailAddress": email,
    "firstName": name,
    "phone": number,
    "mxCourse": course,
    "source": formName,
    "mxCity": city,
    "mxExistingStudent": exStud
  });

  // console.log(data);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: urlConstant.commonForm,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  // console.log("data to our Database", data);
  await axios.request(config)
  .then((response) => {
    // console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });

  const msg = {
    to: "nitin@theadroit.in",
    from: "nitin@theadroit.in",
    subject: "home page contact form",
    html: `
      <p><strong>Name: </strong>${name}</p>
      <p><strong>Email ID: </strong>${email}</p>
      <p><strong>Phone Number: </strong>${number}</p>
      <p><strong>Course: </strong>${course}</p>
      <p><strong>formName: </strong>${formName}</p>
    `
  };
  await sgMail.send(msg)
  res.status(200).json({ success: true })
}
