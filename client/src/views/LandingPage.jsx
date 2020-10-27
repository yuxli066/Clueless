import React from 'react';
import "./Views.css";
import "../App.css"
import Container from "react-bootstrap/cjs/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from "react-router-dom";
AOS.init();

function LandingPage() {
    return (
        <section id="landing" className="landing">
            <Container fluid>
                <div className="section-title">
                    <h1>The Colonel Mustards</h1>
                </div>
                <Row>
                    <Col>
                        <div className="landing-img" data-aos="zoom-in" data-aos-delay="200">
                            <img src={require("../images/clueless_bg.jpg")} alt="" className="img-fluid" width="100%"/>
                        </div>
                        <div className="features clearfix" data-aos="fade-up" data-aos-delay="300">
                            <p>Clue - Hasbro games</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="landing-content" data-aos="zoom-in" data-aos-delay="200">
                            <h2>Enjoy spending time with friends and family by solving murder mysteries!</h2>
                            <p>
                                <span className="text-emphasis">
                                    Tired of isolation? Sick of not being able to see your friends and families?
                                    Trying to pick up a new hobby you want to share with a significant other?
                                </span><br/>
                                Don't worry, The Colonel Mustards have created a solution to all those problems.
                            </p>
                            <p>
                                Introducing <span className="text-emphasis">Clue-Less</span>! Clue-Less
                                is an online multi-player board game that not only allows you to interact with other people virtually but also creates an
                                amazing experience for everyone involved! Through Clue-Less, you will be able to
                                enjoy the qualities of the game Clue and also <span className="text-emphasis">spend quality time with both family and friends
                                by working together, or against each other, to solve the murder mystery of this "Classic Detective Game". </span>
                            </p>
                            <p>
                                Remeber, <span className="text-emphasis2">don’t give up until you find out!</span>
                            </p>
                            <p>
                                What are you waiting for? Click the play button below to play now!
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Link to="/game">
                        <div className="play-button" data-aos="zoom-in" data-aos-delay="200">
                            PLAY CLUE-LESS
                        </div>
                    </Link>
                </Row>
            </Container>
        </section>
    );
}

export default LandingPage;
