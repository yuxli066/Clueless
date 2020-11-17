import React from 'react';
import TeamMemCard from './TeamMemCard';
import './Views.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/cjs/Container';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

function TeamPage() {
  let savannahBio =
    'Savannah Blades works as a software and product developer at Bureau Veritas North America, Project Management Division. ' +
    'She graduated with a Bachelor of Science degree in Engineering Science with a concentration in Environmental Engineering in May of 2018. ' +
    'Savannah’s current responsibilities include using existing technologies from Microsoft (PowerApps, Power BI, Microsoft Forms) to help automate ' +
    'business processes, as well as work on a team supporting, maintaining, and further developing a web application. She is pursuing her master’s degree in ' +
    'Computer Science from John’s Hopkins University. ';
  let tonyBio =
    'Tony Lawrence is a network engineer at the Patuxent River Naval Air Station working on the MQ-4C unmanned aircraft system. Tony graduated with a ' +
    'Bachelor of Science degree in Computer Science, May 2017. He is currently responsible for leading his team of network engineers to ensure that connectivity with ' +
    'the aircraft and various other systems remains fully operational and to provide technical support for flight and ground testing. Tony is pursuing a master’s degree in ' +
    'Information Systems Engineering with a focus in Network Engineering. ';
  let leoBio =
    'Leo Li is a software QA engineer from Los Angeles, California. Leo graduated from the University of California, ' +
    'Riverside in 2016 with a B.S. in Computer Engineering and is currently working at Glidewell Dental Labs as a Software QA Automation Engineer. ' +
    'His current role involves improving software products at Glidewell by developing testing solutions, utilizing automation tools, and streamlining the ' +
    'testing process with CI/CD. The goal is to be able to keep up with the acceleration of change in applications through the push of a button. Leo is currently ' +
    'pursuing a master’s degree in Computer Science from John Hopkins University.';
  let davidPBio =
    'David Phillips is a software engineer living in Columbia, MD, currently working for defense contractor Visionist, Inc. David has been with Visionist since 2015, ' +
    'where he worked as an intern until receiving his Bachelor of Science in Computer Engineering from UMBC in 2018. His previous work at Visionist involved development of several ' +
    'software applications across many disciplines including big data analytics, test data generation, network characterization, and collaborative report generation. Currently, David’s ' +
    'team is providing software engineering support for a long-standing desktop application while simultaneously working on modernizing the feature set using modern architectures. David is ' +
    'also pursuing a master’s degree in Computer Science from John’s Hopkins University.';
  let kyleSBio =
    'Kyle Spivak is a software engineer at Lockheed Martin. Kyle graduated from the University at Buffalo in 2019 with a B.S in Computer Engineering. Kyle is now part of the Engineering ' +
    'Leadership Development Program (ELDP) at Lockheed Martin. This position entails completing different rotational assignments doing software engineering for different programs at Lockheed Martin in ' +
    'Syracuse, NY. So far he has worked on Radar and Electronic Warfare programs for the Army, Navy, and the Marines. Kyle has the most experience with C++ and C but he has also worked in Java and python. ' +
    'He is currently pursuing a master’s degree in Computer Science from John’s Hopkins University.';
  let davidTBio =
    'David Tigreros is a research scientist at Lockheed Martin. David graduated from Drexel University in 2017 with a B.S. in Electrical Engineering. At Lockheed Martin David focuses on research and ' +
    'development towards developing new technologies that utilize the electromagnetic spectrum. Research efforts have included developing small cost-effective radars using software-defined radios, using machine ' +
    "learning to develop clutter mitigation algorithms, and development of adaptive waveforms. In addition to his career at Lockheed Martin David is pursuing a master's degree in Computer Science at Johns Hopkins " +
    'University. David has experience in using Python, MATLAB, C++, and Java.';

  return (
    <section className="text-center" id="teamPage">
      <Container>
        <div className="section-title">
          <h1>The Suspects</h1>
        </div>
        <div className="d-flex flex-row row">
          <div
            className="col-lg-6 col-md-12 col-sm-12"
            data-aos="flip-up"
            data-aos-delay="500"
            data-aos-duration="750"
          >
            <TeamMemCard
              name="Savannah Blades"
              jobTitle="Lead UI/UX Designer"
              location="Maryland"
              bio={savannahBio}
            />
          </div>
          <div
            className="col-lg-6 col-md-12 col-sm-12"
            data-aos="flip-down"
            data-aos-duration="750"
          >
            <TeamMemCard
              name="Tony Lawrence"
              jobTitle="Project Manager"
              location="Maryland"
              bio={tonyBio}
            />
          </div>
        </div>

        <div className="d-flex flex-row row">
          <div
            className="col-lg-6 col-md-12 col-sm-12"
            data-aos="flip-left"
            data-aos-duration="750"
          >
            <TeamMemCard
              name="Leo Li"
              jobTitle="Lead Software Quality Assurance"
              location="California"
              bio={leoBio}
            />
          </div>
          <div
            className="col-lg-6 col-md-12 col-sm-12"
            data-aos="flip-right"
            data-aos-delay="500"
            data-aos-duration="750"
          >
            <TeamMemCard
              name="David Phillips"
              jobTitle="Lead Programmer"
              location="Maryland"
              bio={davidPBio}
            />
          </div>
        </div>

        <div className="d-flex flex-row row">
          <div
            className="col-lg-6 col-md-12 col-sm-12"
            data-aos="flip-up"
            data-aos-delay="500"
            data-aos-duration="750"
          >
            <TeamMemCard
              name="Kyle Spivak"
              jobTitle="Lead Configuration Manager"
              location="Maryland"
              bio={kyleSBio}
            />
          </div>
          <div
            className="col-lg-6 col-md-12 col-sm-12"
            data-aos="flip-down"
            data-aos-duration="750"
          >
            <TeamMemCard
              name="David Tigreros"
              jobTitle="Lead Architect"
              location="Maryland"
              bio={davidTBio}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TeamPage;
