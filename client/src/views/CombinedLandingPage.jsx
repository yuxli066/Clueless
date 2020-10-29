import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import "./Views.css";
import "../App.css";
import AOS from 'aos';
import TeamPage from "./TeamPage";
import LandingPage from "./LandingPage";
import AboutPage from "./AboutPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "react-bootstrap/cjs/Container";
AOS.init();

function CombinedLandingPage() {

    return (
        <div>
            <Container fluid className="innerContainer">
                <Header/>
                <LandingPage/>
                <TeamPage/>
                <AboutPage/>
                <Footer/>
            </Container>
        </div>
    );
}

export default CombinedLandingPage;
