import { React, useState, useEffect } from "react";
import '../Styles/Checkout.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';
import axios from "axios";

const Checkout = ({ price }) => {
  console.log('Price: ', price);
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false);

  //Send Mail through EmailJS
  function SendEmail(_body) {
    console.log('Sending Email......');

    //Authentication of EmailJS Account
    const serviceId = 'service_d3rsweg';
    const templateId = 'template_esmxnq9';

    //Public Key of EmailJS account
    const userId = 'otmL2ItDAAaqajXvy';
    console.log(email);

    const templateParams = {
      to_name: "User",
      from_name: "SEO Agency",
      message: _body,
      to_mail: email,
    };
    emailjs.send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        toast.info('Verification email sent to your account so please approve it to process payment!', {
          position: 'top-right', // Set the toast position
          autoClose: false, // Disable automatic closing
          hideProgressBar: true, // Hide the progress bar
          closeOnClick: false, // Do not close the toast when clicked
          pauseOnHover: false, // Do not pause on hover
          draggable: false, // Do not allow dragging to close
        });
        setTimeout(() => {
          // Email sent successfully
          toast.success('Thanks! Your Payment is being Confirmed.', {
            position: 'top-right',
            autoClose: 5000,
          });
        }, 10000); // Simulate a 2-second delay for email sending
      }, (error) => {
        toast.error('Something went wrong!', {
          position: 'top-right', // Set the toast position
          autoClose: 3000, // Close the toast after 3 seconds (optional)
        });
        console.error(error);
        return;
      });
  }

  //Email Validation
  function VerifyEmail(_email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(_email);
  }

  const handleChange = (e) => {
    if (isError) {
      setIsError(false);
    }
    console.log(e.target.value)
    setEmail(e.target.value);
  }

  const handleSubmit = async() => {
    if (email === '' || !VerifyEmail) {
      setIsError(true);
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/payment", {
        email,
        price,
      });
      console.log(res.data);
    } catch (error) { 
      console.log('Unable to Create Payment: ',error);
    }

    // //Send Mail Here
    // const link = 'https://www.google.com.pk/';
    // SendEmail(link);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
    <div>
      <body class="flex items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-8">
        {/* <!-- Component Start --> */}
        <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8 w-full max-w-screen-lg">
          <div class="lg:col-span-2">
            <h2 class="text-sm font-medium">Payment Method</h2>
            <div class="bg-white rounded mt-4 shadow-lg">
              <div class="flex items-center px-8 py-5">
                <input
                  class=" w-4 h-4 rounded-full border-white ring-blue-600 ring-opacity-100"
                  name="payment"
                  type="radio"
                />
                <label class="text-sm font-medium ml-2">PayPal</label>
              </div>
              <div class="border-t">
                <div class="flex items-center px-8 py-5">
                  <input
                    class="w-4 h-4 rounded-full border-white bg-blue-600"
                    name="payment"
                    type="radio"
                  />
                  <label class="text-sm font-medium ml-2">Credit Card</label>
                </div>
                <div class="grid grid-cols-2 gap-4 px-8 pb-8">
                  <div class="col-span-2">
                    <label class="text-xs font-semibold" for="cardNumber">
                      Card number
                    </label>
                    <input
                      class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                      type="text"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div class="">
                    <label class="text-xs font-semibold" for="cardNumber">
                      Expiry Date
                    </label>
                    <input
                      class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                      type="text"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div class="">
                    <label class="text-xs font-semibold" for="cardNumber">
                      CVC/CVV
                    </label>
                    <input
                      class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                      type="password"
                      placeholder="..."
                    />
                  </div>
                  <div class="">
                    <label class="text-xs font-semibold" for="Email">
                      Email
                    </label>
                    <input
                      class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="abc@xyz.com"
                    />
                    {isError ? <p style={{ color: 'brown', marginTop: '5px' }}>Please enter a valid email</p> : <></>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 class="text-sm font-medium">Purchase Summary</h2>
            <div class="bg-white rounded mt-4 shadow-lg py-6">
              <div class="px-8 mt-4 border-t pt-4">
                <div class="flex items-end justify-between">
                  <span class="font-semibold">Today you pay (AUD)</span>
                  <span class="font-semibold">{price}</span>
                </div>
              </div>
              <div class="flex items-center px-8 mt-8">
                <input id="termsConditions" type="checkbox" />
                <label class="text-xs text-gray-500 ml-2" for="termsConditions">
                  I agree to the terms and conditions.
                </label>
              </div>
              <div class="flex flex-col px-8 pt-4">
                <button onClick={handleSubmit} class="flex items-center justify-center bg-blue-600 text-sm font-medium w-full h-10 rounded text-blue-50 hover:bg-blue-700">
                  Start Subscription
                </button>
                <button class="text-xs text-blue-500 mt-3 underline">
                  Have a coupon code?
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Component End  --> */}
      </body>
    </div>
  );
};

export default Checkout;
