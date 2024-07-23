import { useState,useEffect } from "react";
import "./Contact.css";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [websiteURL, setWebsiteURL] = useState();
  const [companyName, setCompanyName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [reason, setReason] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  },[])
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/messages", {
        websiteURL,
        companyName,
        firstName,
        lastName,
        email,
        message,
        phone,
        reason,
      });
      if (res.data) {
        toast(res.data.message);
      }
    } catch (error) { }
  };
  return (
    <>
      {/* <div className="headerimg mt-8 flex justify-center items-center text-black font-bold text-4xl">
        <h1>Free a Quote</h1>
      </div> */}
      <div class="formboldd-main-wrapper ">
        <div class="formboldd-form-wrapper">
          <div className="text-center py-3">
            <h1 className="text-3xl py-5 font-bold">
              Talk With Our Digital Strategists
            </h1>
            <p className="text-lg py-3">
              Please fill out the form below to receive a free quote for our
              search marketing services. Select what services you are interested
              in below and we’ll contact you as soon as possible.
            </p>
          </div>
          <form action="#" method="POST">
            <div class="formboldd-mb-5 flex  flex-col lg:flex-row">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Website URL"
                onChange={(e) => setWebsiteURL(e.target.value)}
                class="formbold-form-input m-2  "
              />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Company Name"
                onChange={(e) => setCompanyName(e.target.value)}
                class="formbold-form-input m-2"
              />
            </div>
            <div class="formboldd-mb-5 flex  flex-col lg:flex-row">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                class="formbold-form-input m-2  "
              />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                class="formbold-form-input m-2"
              />
            </div>
            <div class="formboldd-mb-5 flex  flex-col lg:flex-row">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                class="formbold-form-input m-2  "
              />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
                class="formbold-form-input m-2"
              />
            </div>

            <select
              name=""
              id=""
              className="outline-none border-2 ms-2 p-3 rounded-lg mb-9"
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="#"> Reason To Contact</option>
              <option value=" SEO"> SEO Optimization</option>
              <option value=" Web"> Web Development</option>
              <option value=" PPC"> PPC Advertising</option>
              <option value=" Content"> Content Marketing</option>
              <option value=" Social"> Social Marketing</option>
              <option value=" App"> App Development</option>
            </select>
            {/*  */}

            <div class="formboldd-mb-5 ms-2">
              <textarea
                type="text"
                name="phone"
                id="phone"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                class="formbold-form-input"
                cols={20}
                rows={5}
              ></textarea>
            </div>
            <div>
              <button onClick={handleClick} class="formbold-btn ms-2 vibrate-1">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
