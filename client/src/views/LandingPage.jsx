import React from "react";
import "./Views.css";
import "../App.css";
import Container from "react-bootstrap/cjs/Container";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import cluelessBg from "../images/clueless_bg.jpg";
import colMustard from "../images/c_mustard.jpg";

AOS.init();

function LandingPage() {
  return (
    <section id="landing" className="landing">
      <Container>
        <div className="d-flex flex-row row">
          <div className="col-lg-12 text-center">
            <h1 className="text-emphasis">BREAKING NEWS:</h1>
          </div>
        </div>
        <div className="d-flex flex-row row">
          <div className="text-center section-title">
            <h1>Colonel Mustards investigating murder case</h1>
          </div>
        </div>
        <div className="d-flex flex-row row">
          <div className="flex-column col-lg-8 col-md-12 col-sm-12">
            <div
              className="landing-img"
              data-aos="zoom-in"
              data-aos-delay="200"
              data-aos-duration="700"
            >
              <img src={cluelessBg} alt="" width="100%" />
            </div>
            <div className="image-txt" data-aos="fade-up" data-aos-delay="300">
              <p>Clue - Hasbro games</p>
            </div>
          </div>
          <div className="flex-column col-lg-4 col-md-12 col-sm-12">
            <div
              className="landing-img2"
              data-aos="zoom-in"
              data-aos-delay="200"
              data-aos-duration="700"
            >
              <img src={colMustard} alt="" width="100%" />
            </div>
            <div className="image-txt2" data-aos="fade-up" data-aos-delay="300">
              <p>Colonel Mustard</p>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row row">
          <div className="flex-column col-lg-12 col-md-12 col-sm-12">
            <div
              className="landing-content"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <p>
                Mr. Boddy, a 50 year old businessman from Baltimore, Maryland,
                has been officially declared dead 1 day ago on August 27th,
                2020. The cause of his death is as-yet-unknown, but forensic
                evidence from labs strongly indicate that a murder has taken
                place. On the day of his death, Mr Boddy hosted a gathering at
                his mansion for this 50th birthday and had invited a total of 6
                guests: Mrs. White, Ms. Scarlet, Mrs. Peacock, Mr. Green,
                Professor Plum, and Colonel Mustard. Although no direct evidence
                was found on the scene when the crime occurred, both the police
                and the guests agreed to return to the mansion the following day
                for further investigation.
                <br />
                <br />
                In order to solve this mystery in a timely manner, we would like
                to ask for your help in finding clues. Click the button "Solve
                Mystery" below to help your local community as soon as possible!
                <br />
                Most importantly,{" "}
                <span className="text-emphasis2">
                  don't give up until you find out!
                </span>
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row row">
          <Link to="/0/lobby">
            <div
              className="play-button"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              SOLVE MYSTERY
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default LandingPage;
