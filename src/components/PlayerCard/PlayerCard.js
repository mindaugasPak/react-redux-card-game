import React, { PropTypes } from 'react';
import styles from './PlayerCard.scss';

const PlayerCard = ({ playerName, ready, gameId }) => (
  <section className={styles.PlayerCard}>
    <div className={styles.PlayerCardAvatar} />
    <h1 className={styles.PlayerCardName}>{ playerName || 'Waiting...' }</h1>
    { playerName ? (
      <div>{ ready ? 'Ready' : 'Not ready' }</div>
    ) : (
      <div>Invite player: { gameId }</div>
    ) }
  </section>
);

PlayerCard.propTypes = {
  playerName: PropTypes.string,
  ready: PropTypes.bool,
  gameId: PropTypes.string,
};

export default PlayerCard;
