import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSuitcase, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Views.css';
import '../App.css';

function TeamMemCard(props) {
  let name = props.name;
  let jobTitle = props.jobTitle;
  let location = props.location;
  let bio = props.bio;

  return (
    <div className="profile-card">
      <header>
        <img
          alt=""
          src="https://www.clipartkey.com/mpngs/m/29-297748_round-profile-image-placeholder.png"
        />
        <p className="member-name">{name}</p>
        <p className="member-name">
          <FontAwesomeIcon icon={faSuitcase} size="lg" />
          {jobTitle}
        </p>
        <p className="member-name">
          <FontAwesomeIcon icon={faGlobe} size="lg" />
          {location}
        </p>
      </header>
      <div className="profile-bio">
        <p>{bio}</p>
      </div>
      <div className="profile-social-links">
        <span>
          <FontAwesomeIcon className="member-socials" icon={faLinkedinIn} size="2x" />
        </span>
        <span>
          <FontAwesomeIcon className="member-socials" icon={faGithub} size="2x" />
        </span>
        <span>
          <FontAwesomeIcon className="member-socials" icon={faFacebook} size="2x" />
        </span>
      </div>
    </div>
  );
}

export default TeamMemCard;
