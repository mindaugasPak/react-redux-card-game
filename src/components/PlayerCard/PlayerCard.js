import React, { PropTypes } from 'react';
import styles from './PlayerCard.scss';

const PlayerCard = ({ playerName, ready }) => (
  <section className={styles.PlayerCard}>
    <div className={styles.PlayerCardAvatar} />
    <h1 className={styles.PlayerCardName}>{ playerName || 'Unnamed' }</h1>
    <div>{ ready ? 'Ready' : 'Not ready' }</div>
  </section>
);

PlayerCard.propTypes = {
  playerName: PropTypes.string,
  ready: PropTypes.bool,
};

export default PlayerCard;
