import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faLinkedinIn, faGithub} from "@fortawesome/free-brands-svg-icons";
import { faSuitcase, faGlobe } from "@fortawesome/free-solid-svg-icons";
import "./Views.css";

function TeamMemCard (props) {
    let name = props.name;
    let jobTitle = props.jobTitle;
    let location = props.location;
    let bio = props.bio;

    return (
        <div className="profile-card">
            <header>
                <img alt="" src="https://www.clipartkey.com/mpngs/m/29-297748_round-profile-image-placeholder.png"/>
                <h1>{name}</h1>
                <h2><FontAwesomeIcon className="member-job" icon={faSuitcase} />{jobTitle}</h2>
                <h2><FontAwesomeIcon className="member-job" icon={faGlobe} />{location}</h2>
            </header>
            <div className="profile-bio">
                <p>{bio}</p>
            </div>
            <div className="empty-container">&nbsp;&nbsp;</div>
            <div className="profile-social-links">
                <span><FontAwesomeIcon className="member-socials" icon={faLinkedinIn} /></span>
                <span><FontAwesomeIcon className="member-socials" icon={faGithub} /></span>
                <span><FontAwesomeIcon className="member-socials" icon={faFacebook} /></span>
            </div>
        </div>
    );
}

export default TeamMemCard;
