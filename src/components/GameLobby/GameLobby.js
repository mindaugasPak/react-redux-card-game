import React, { PropTypes } from 'react';

import { PlayerCard } from 'components';
import styles from './GameLobby.scss';

const GameLobby = ({ player, opponent, gameId, hasOpponent, countdown, toggleReady }) => (
  <div className={styles.Lobby}>
    <div style={{ width: '100%' }}>
      { countdown.countdownStarted ? <h1>{ countdown.countdownTime }</h1> : null }
      <section className={styles.LobbyVersus}>
        <PlayerCard playerName={player.name} ready={player.ready} gameId={gameId} />
        <div className={styles.LobbyVersusText}>VS</div>
        { hasOpponent ? (
          <PlayerCard playerName={opponent.name} ready={opponent.ready} gameId={gameId} />
        ) : (
          <PlayerCard gameId={gameId} />
        ) }
      </section>
      <div className={styles.LobbyReadyWrapper}>
        <button className={styles.LobbyReadyButton} onClick={toggleReady}>
          { player.ready ? 'Unready' : 'I am ready!' }
        </button>
      </div>
    </div>
  </div>
);

GameLobby.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ready: PropTypes.bool.isRequired,
  }).isRequired,
  opponent: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ready: PropTypes.bool.isRequired,
  }).isRequired,
  gameId: PropTypes.string.isRequired,
  countdown: PropTypes.shape({
    countdownStarted: PropTypes.bool.isRequired,
    countdownTime: PropTypes.number.isRequired,
  }).isRequired,
  hasOpponent: PropTypes.bool.isRequired,
  toggleReady: PropTypes.func.isRequired,
};

export default GameLobby;
