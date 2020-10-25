import React from 'react';
import "./Views.css";
import "../App.css"
import Container from "react-bootstrap/cjs/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

function LandingPage() {
    return (
        <section id="landing" className="landing">
            <Container fluid>
                <div className="section-title">
                    <h1>LandingPage</h1>
                </div>
                <Row>
                        <Col>
                            <div className="landing-img" data-aos="zoom-in" data-aos-delay="100">
                                <img src={require("../images/clueless_bg.jpg")} alt="" className="img-fluid" width="100%"/>
                            </div>
                        </Col>
                        <Col>
                            <div className="landing-content">
                                <p>Molestiae omnis numquam corrupti omnis itaque. Voluptatum quidem impedit. Odio
                                    dolorum exercitationem est error omnis repudiandae ad dolorum sit.</p>
                                <p>
                                    Explicabo repellendus quia labore. Non optio quo ea ut ratione et quaerat. Porro
                                    facilis deleniti porro consequatur
                                    et temporibus. Labore est odio.

                                    Odio omnis saepe qui. Veniam eaque ipsum. Ea quia voluptatum quis explicabo sed
                                    nihil repellat..
                                </p>

                                <div className="features clearfix" data-aos="fade-up" data-aos-delay="100">
                                    <h4>Corporis dolorem</h4>
                                    <p>Commodi quia voluptatum. Est cupiditate voluptas quaerat officiis ex alias
                                        dignissimos et ipsum. Soluta at enim modi ut incidunt dolor et.</p>
                                </div>
                                <div className="features clearfix" data-aos="fade-up" data-aos-delay="200">
                                    <h4>Eum ut aspernatur</h4>
                                    <p>Molestias eius rerum iusto voluptas et ab cupiditate aut enim. Assumenda animi
                                        occaecati. Quo dolore fuga quasi autem aliquid ipsum odit. Perferendis
                                        doloremque iure nulla aut.</p>
                                </div>
                                <div className="features clearfix" data-aos="fade-up" data-aos-delay="300">
                                    <h4>Voluptates dolores</h4>
                                    <p>Voluptates nihil et quis omnis et eaque omnis sint aut. Ducimus dolorum
                                        aspernatur. Totam dolores ut enim ullam voluptas distinctio aut.</p>
                                </div>
                            </div>
                        </Col>
                </Row>
            </Container>
        </section>
    );
}

export default LandingPage;
