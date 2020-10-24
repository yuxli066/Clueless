import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faLinkedinIn, faGithub} from "@fortawesome/free-brands-svg-icons";
import { faSuitcase, faGlobe } from "@fortawesome/free-solid-svg-icons";

function TeamMemCard (props) {
    let name = props.name;
    let jobTitle = props.jobTitle;
    let location = props.location;
    let bio = props.bio;

    return (
        <div id="profile"
             className="">
            <div className="">
                <h1 className="">{name}</h1>
                <p className="">
                    <FontAwesomeIcon className="" icon={faSuitcase} />
                    {jobTitle}
                </p>
                <p className="">
                    <FontAwesomeIcon className="" icon={faGlobe} />
                    {location}
                </p>
                <p className="">{bio}</p>
                <div className="">
                    <FontAwesomeIcon className="" icon={faFacebook} />
                    <FontAwesomeIcon className="" icon={faLinkedinIn} />
                    <FontAwesomeIcon className="" icon={faGithub} />
                    {/*<FontAwesomeIcon className="cursor-pointer m-1" icon={faMailBulk} />*/}
                </div>
            </div>
        </div>
    );
}

export default TeamMemCard;
