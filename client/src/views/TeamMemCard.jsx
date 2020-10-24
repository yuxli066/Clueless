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
        <span className="profile-card">
            <header>
                <a href="http://ali.shahab.pk">
                    <img alt="" src="https://www.clipartkey.com/mpngs/m/29-297748_round-profile-image-placeholder.png"/>
                </a>
                <h1>{name}</h1>
                <h2>{jobTitle}-{location}</h2>
            </header>
            <div className="profile-bio">
                <p>{bio}</p>
            </div>
            <ul className="profile-social-links">
                <li><FontAwesomeIcon className="" icon={faLinkedinIn} /></li>
                <li><FontAwesomeIcon className="" icon={faGithub} /></li>
                <li><FontAwesomeIcon className="" icon={faFacebook} /></li>
            </ul>
        </span>
    );
}

export default TeamMemCard;
