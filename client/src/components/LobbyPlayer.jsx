import React from 'react';
import { useContentContext } from '../ContentProvider';

function getContentName(name) {
  switch (name) {
    case 'Colonel Mustard':
      return 'ColonelMustard';
    case 'Rev. Green':
      return 'RevGreen';
    case 'Professor Plum':
      return 'ProfPlum';
    case 'Miss Scarlet':
      return 'MissScarlett';
    case 'Mrs. Peacock':
      return 'MrsPeacock';
    case 'Mrs. White':
      return 'MrsWhite';
    default:
      // should never happen!
      return 'logo';
  }
}

export default function LobbyPlayer({ name, self }) {
  const content = useContentContext();
  console.log(content);
  const profilePicture = getContentName(name);

  return (
    <>
      {/* TODO come up with a bettwer way to downsize the image! */}
      {/* TODO improve padding of image! */}
      <img
        alt={name}
        src={content.images[profilePicture].default}
        style={{ width: '10%', height: '10%' }}
      />
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
