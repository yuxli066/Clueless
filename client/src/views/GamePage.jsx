import React, { useEffect, useState } from 'react';
import styles from './css/views.module.css';
import GameController from './game/GameController';

function GamePage() {
  // FIXME get rid of this eslint disable!
  // eslint-disable-next-line no-unused-vars
  const [fields, setFields] = useState([]);
  useEffect(() => {
    let divs = [],
      walls = [1, 2, 3, 4, 6, 7, 17, 31, 19, 33, 14, 28, 35, 42, 49, 48, 46, 44, 43, 8, 22, 36];
    for (let i = 1; i < 50; i++) {
      divs.push(
        walls.includes(i) ? (
          <div className={`${styles.wall} ${styles.box} ${styles[`grid${i}`]}`} />
        ) : (
          <div className={`${styles.box} ${styles[`grid${i}`]}`} />
        ),
      );
    }
    setFields(divs);
  }, []);
  return (
    <section id="team" className="team">
      <GameController />
    </section>
  );
}

export default GamePage;
