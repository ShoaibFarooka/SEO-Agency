import {React, useEffect} from "react";
import "./About.css";
// import about from "../assets/bgimg.jpg";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
    <>
      <section class="about-us">
        <div class="about">
          {/* <img src={about} alt="" class="pic" /> */}
          <img
            src="https://plus.unsplash.com/premium_photo-1684356820128-4c28da6d29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1384&q=80"
            alt=""
            class="pic"
          />
          <div class="text">
            <h2>About Us</h2>
            <h5>
              Your
              <span> SEO </span>
              Partner for Growth
            </h5>
            <p>
              At SEO Agency, we are passionate about helping businesses
              succeed in the digital landscape. With a team of dedicated SEO
              experts, we specialize in driving organic traffic, improving
              search rankings, and maximizing online visibility. Our commitment
              to excellence and proven track record make us the trusted partner
              for businesses looking to thrive in today's competitive online
              world. Discover how we can elevate your brand's online presence
              and drive tangible results.
            </p>
            <div class="data">
              <Link to="/contact" alt="" className="hire">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
