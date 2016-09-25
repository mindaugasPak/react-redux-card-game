import React, { PropTypes } from 'react';

import styles from './GameLobby.scss';

const WaitingForOpponent = ({ gameId }) => (
  <figure className={styles.LobbyPlayer}>
    <div className={styles.LobbyAvatar} />
    <figcaption className={styles.LobbyPlayerName}>Waiting...</figcaption>
    <div>{ gameId }</div>
  </figure>
);

WaitingForOpponent.propTypes = {
  gameId: PropTypes.string.isRequired,
};

const GameLobby = ({ player, opponent, gameId, hasOpponent, toggleReady }) => (
  <div className={styles.Lobby}>
    <div style={{ width: '100%' }}>
      <section className={styles.LobbyVersus}>
        <figure className={styles.LobbyPlayer}>
          <div className={styles.LobbyAvatar} />
          <figcaption className={styles.LobbyPlayerName}>{ player.name || 'Unnamed' }</figcaption>
          <div className={styles.LobbyPlayerReady}>{ player.ready ? 'Ready' : 'Not ready' }</div>
        </figure>
        <div className={styles.LobbyVersusText}>VS</div>
        { hasOpponent ? (
          <figure className={styles.LobbyPlayer}>
            <div className={styles.LobbyAvatar} />
            <figcaption className={styles.LobbyPlayerName}>{ opponent.name }</figcaption>
            <div className={styles.LobbyPlayerReady}>{ opponent.ready }</div>
          </figure>
        ) : (
          <WaitingForOpponent gameId={gameId} />
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
  hasOpponent: PropTypes.bool.isRequired,
  toggleReady: PropTypes.func.isRequired,
};

export default GameLobby;
