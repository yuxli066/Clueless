import React from 'react';
import GameController from "./game/GameController";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/cjs/Container";
import "./Views.css";
import "../App.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

function GamePage() {

    return (
        <section id="team" className="team">
            <Container fluid>
                <GameController/>
            </Container>
        </section>
    );
}

export default GamePage;
