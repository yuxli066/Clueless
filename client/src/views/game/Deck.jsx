import React from 'react';
import { useContentContext } from '../../ContentProvider';

function getContentNamee(card) {
  switch (card) {
    case 'Colonel Mustard':
      return 'Player_ColonelMustard';
    case 'Rev. Green':
      return 'RevGreen';
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
    case 'Dining Room':
      return 'Room_DiningRoom';
    case 'Hall':
      return 'Room_Hall';
    case 'Kitchen':
      return 'Room_Kitchen';
    case 'Library':
      return 'Room_Library';
    case 'Lounge':
      return 'Room_Lounge';
    case 'Study':
      return 'Room_Study';
    case 'Candlestick':
      return 'Weapon_Candlestick';
    case 'Knife':
      return 'Weapon_Knife';
    case 'Lead Pipe':
      return 'Weapon_LeadPipe';
    case 'Revolver':
      return 'Weapon_Revolver';
    case 'Rope':
      return 'Weapon_Rope';
    case 'Wrench':
      return 'Weapon_Wrench';
    default:
      return 'logo';
  }
}

export default function Deck({ card }) {
  const content = useContentContext();
  console.log('content in deck', content);
  console.log('first card in deck', card);
  const cardPicture = getContentNamee(card);
  console.log('Card in deck function', cardPicture);
  return content.images[cardPicture] ? (
    <div>
      {/* TODO come up with a bettwer way to downsize the image! */}
      {/* TODO improve padding of image! */}
      <img
        alt={card}
        src={content.images[cardPicture].default}
        style={{ width: '50%', height: '50%' }}
      />
      <div></div>
      <p>{card}</p>
    </div>
  ) : (
    <div>Loading Deck...</div>
  );
}
