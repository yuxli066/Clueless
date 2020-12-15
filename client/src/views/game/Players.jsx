//TODO: Do we even need this? Can change UI of lobby to use same image sizes and reuse LobbyPlayer
import React from 'react';
import { useContentContext } from '../../ContentProvider';

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

export default function Players({ name, self, isCurrentTurn }) {
  const content = useContentContext();
  const profilePicture = getContentName(name);

  return (
    <div>
      {/* TODO come up with a bettwer way to downsize the image! */}
      {/* TODO improve padding of image! */}
      <img
        alt={name}
        src={content.images[profilePicture].default}
        style={{ width: '50%', height: '50%' }}
      />
      <div></div>
      {/* TODO i want this and the image on one line! */}
      {self ? <p>{name} (you)</p> : <p>{name}</p>}
      {/* {isCurrentTurn ? (
        <TriangleUpIcon w={8} h={8} color="red.500" />
      ) : (
        <div>Not your turn yet</div>
      )} */}
    </div>
  );
}
