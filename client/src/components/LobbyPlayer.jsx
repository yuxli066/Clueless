import React from 'react';
import profilePicture from '../images/logo.png';

export default function LobbyPlayer({ name, self }) {
  return (
    <>
      {/* TODO come up with a bettwer way to downsize the image! */}
      <img alt={name} src={profilePicture} style={{ width: '10%', height: '10%' }} />
      {/* TODO i want this and the image on one line! */}
      {self ? (
        <p>
          {name}
          <strong> (you)</strong>
        </p>
      ) : (
        <p>{name}</p>
      )}
    </>
  );
}
