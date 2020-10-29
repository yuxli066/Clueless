import React from "react";
import "./components.css";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";

function Header() {
  /*TODO: Add Team Logo, Add sticky footer, Add Team pics to Team page, maybe make nav bar better looking?*/
  /*TODO: Center social media icons*/

  return (
      <Container fluid>
          <Row className="head">
                  <div className="col-lg-12 text-center text-center header">THE JHU POST</div>
          </Row>
          <Row>
              <div className="col-lg-12 text-center subhead">Baltimore, MD - Thursday August 29, 2020 - Ten Pages</div>
          </Row>
      </Container>
  );
}

export default Header;
