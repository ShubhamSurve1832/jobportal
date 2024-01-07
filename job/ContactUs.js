import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import Image from "next/image";


// import app_store_1 from 'public/app_store_1.png'
// import app_store_2 from 'public/app_store_2.png'

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();
  const buttonRef = useRef();
  const [values, setValues] = useState({
    name: "",
    email: "",
    number: "",
    course: "",
  });

  const { name, email, number, course } = values;

  const onFormSubmit = async (e) => {
    try {
      await fetch("/api/formData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      buttonRef.current.click();
      router.push("/thankyou");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="container jobportal_contactus_section">
        <div className="contact_us">
          <h2 className="heading02">Contact Us</h2>
          <div className="form_box_black grid">
            <form
              method="post"
              className="sec3-cnt1"
              onSubmit={handleSubmit(onFormSubmit)}
            >
              <div className="input-box sec3-btns sec3-btns">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Name"
                  value={name}
                  {...register("name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[a-zA-Z ]*$/,
                      message: "Enter letters only",
                    },
                    onChange: (e) => {
                      setValues({ ...values, [e.target.name]: e.target.value });
                    },
                  })}
                  className={errors.name ? "error-border" : null}
                />
                {errors.name && (
                  <span className="error-message">{errors.name?.message}</span>
                )}
              </div>

              <div className="input-box sec3-btns">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Your Email Address"
                  {...register("email", {
                    required: "Email Id is required",
                    pattern: {
                      // value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/,
                      message: "Enter valid email id",
                    },
                    onChange: (e) => {
                      setValues({ ...values, [e.target.name]: e.target.value });
                    },
                  })}
                  className={errors.email ? "error-border" : null}
                  value={email}
                />
                {errors.email && (
                  <span className="error-message">{errors.email?.message}</span>
                )}
              </div>
              <div className="input-box sec3-btns">
                
                <input
                  type="number"
                  inputMode="numeric"
                  name="number"
                  minLength="10"
                  maxLength="10"
                  placeholder="Enter your Mobile Number"
                  {...register("number", {
                    required: "Number is required",
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "Enter Numbers only",
                    },
                    minLength: {
                      value: 10,
                      message: "Enter Min 10 Number",
                    },
                    maxLength: {
                      value: 10,
                      message: "Enter Max 10 Number",
                    },
                    onChange: (e) => {
                      setValues({ ...values, [e.target.name]: e.target.value });
                    },
                  })}
                  className={errors.number ? "error-border" : null}
                  //onChange={handleChange}
                  value={number}
                />
                {errors.number && (
                  <span className="error-message">
                    {errors.number?.message}
                  </span>
                )}
              </div>
              <div className="input-box  custom-select sec3-btns">
                <select
                  id="select-course"
                  name="course"
                  placeholder="Select Course"
                  {...register("course", {
                    required: "Select Course",
                    onChange: (e) => {
                      setValues({ ...values, [e.target.name]: e.target.value });
                    },
                  })}
                  className={errors.course ? "error-border" : null}
                  value={course}
                >
                  <option value="" selected>
                    Select Course
                  </option>
                  <option value="CPA">US CPA</option>
                  <option value="CMA">US CMA</option>
                  <option value="EA">EA</option>
                  <option value="CIA">CIA</option>
                  <option value="IFRS">IFRS</option>
                  <option value="Data-Analytics">Data Analytics</option>
                  <option value="Samarth">FNF</option>
                </select>
                {errors.course && (
                  <span className="error-message">
                    {errors.course?.message}
                  </span>
                )}
              </div>
              <div className="input-box">
                <button
                  className="btn  white-border-btn white-border-btn-arrow"
                  ref={buttonRef}
                >
                  Register
                </button>
              </div>
            </form>
            <div className="contact_right_box ">
              <div className="add_row">
                <span>
                  <i>
                    <HiOutlineLocationMarker />
                  </i>
                </span>
                <div>
                  <p className="">
                    Plot Number: 39/A Dr.Subba Rao Colony, Picket, Secunderabad,
                    Telangana 500026
                  </p>
                </div>
              </div>
              <div className="add_row">
                <span>
                  <i>
                    <BiPhoneCall />
                  </i>
                </span>
                <div>
                  <p className="">
                    Sales:<a href="tel:+91-7780273388">+91-7780273388</a>
                  </p>
                  <p className="">
                    Support: <a href="tel:+91-8977633523">+91-8977633523</a>
                  </p>
                  <p className="">
                    Evaluations: <a href="tel:+91-8045588550">+91-8045588550</a>
                  </p>
                </div>
              </div>
              <div className="add_row">
                <span>
                  <i>
                    <HiOutlineMail />
                  </i>
                </span>
                <div>
                  <p className="">
                    <a href="mailto:info@simandhareducation.com">
                      info@simandhareducation.com
                    </a>{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1366681738036!2d78.4991588143541!3d17.453171605499534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a4010000075%3A0x95d6d292114c88f3!2sSimandhar%20Education%20-%20India&#39;s%20award%20winning%20Institute%20for%20US%20CPA%20%26%20IMA%20approved%20partner%20for%20US%20CMA.!5e0!3m2!1sen!2sin!4v1676294186295!5m2!1sen!2sin"
                style={{ border: 0 }}
                allowFullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <div className="red_box job_portal_redsection">
        <div className="container grid">
          <h3 className="title">
            Develop an Intuitive and Smooth Learning Experience with Simandhar
            Learn
          </h3>
          <div className="location-box add_row">
            <span></span>
            <Link href="/">
              {" "}
              <p className="location-title btn white-btn white-btn-arrow">
                LMS LOGIN
              </p>
            </Link>
          </div>
          {/* <div>
            <a
              href="https://apps.apple.com/us/app/simandhar-learn/id1628605439"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <Image
                src="/img/app_store_1.png"
                alt="apple store"
               fill={true} sizes='100vw' 
                className="resp-img"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.horizzon.simandhareducation&hl=en_IN&gl=US&pli=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <Image
                src="/img/app_store_2.png"
                alt="apple store"
               fill={true} sizes='100vw' 
                className="resp-img"
              />
            </a>
          </div> */}
        </div>
      </div>
    </>
  );
}
