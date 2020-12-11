import React from 'react';
import { useContentContext } from '../ContentProvider';

function getContentName(name) {
  switch (name) {
    case 'Colonel Mustard':
      return 'Player_ColonelMustard';
    case 'Rev. Green':
      return 'Player_MrGreen';
    case 'Professor Plum':
      return 'Player_ProfPlum';
    case 'Miss Scarlet':
      return 'Player_MissScarlett';
    case 'Mrs. Peacock':
      return 'Player_MrsPeacock';
    case 'Mrs. White':
      return 'Player_MrsWhite';
    case 'Ballroom':
      return 'Room_Ballroom';
    case 'Billard Room':
      return 'Room_BillardRoom';
    case 'Conservatory':
      return 'Room_Cons';
    default:
      // should never happen!
      return '';
  }
}

export default function LobbyPlayer({ name }) {
  const content = useContentContext();
  console.log(content);
  const cardPicture = getContentName(name);

  return (
    <>
      {/* TODO come up with a bettwer way to downsize the image! */}
      {/* TODO improve padding of image! */}
      <img
        alt={name}
        src={content.images[cardPicture].default}
        style={{ width: '10%', height: '10%' }}
      />
      {/* TODO i want this and the image on one line! */}
      {<p>{name}</p>}
    </>
  );
}
