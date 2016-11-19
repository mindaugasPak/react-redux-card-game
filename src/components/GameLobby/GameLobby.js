import React, { PropTypes } from 'react';

import { PlayerCard } from 'components';
import styles from './GameLobby.scss';

const GameLobby = ({
  player,
  opponent,
  inviteLink,
  hasOpponent,
  countdown,
  toggleReady,
  friendInviteModal,
  playerCardActions,
}) => (
  <div className={styles.Lobby}>
    <div style={{ width: '100%' }}>
      { countdown.countdownStarted ? <h1>{ countdown.countdownTime }</h1> : null }
      <section className={styles.LobbyVersus}>
        <PlayerCard
          playerName={player.name}
          ready={player.ready}
          friendInviteModal={friendInviteModal}
          playerCardActions={playerCardActions}
        />

        <div className={styles.LobbyVersusText}>VS</div>

        { hasOpponent ? (
          <PlayerCard
            playerName={opponent.name}
            ready={opponent.ready}
            friendInviteModal={friendInviteModal}
            playerCardActions={playerCardActions}
          />
        ) : (
          <PlayerCard
            inviteLink={inviteLink}
            friendInviteModal={friendInviteModal}
            playerCardActions={playerCardActions}
          />
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
  inviteLink: PropTypes.string.isRequired,
  countdown: PropTypes.shape({
    countdownStarted: PropTypes.bool.isRequired,
    countdownTime: PropTypes.number.isRequired,
  }).isRequired,
  hasOpponent: PropTypes.bool.isRequired,
  toggleReady: PropTypes.func.isRequired,
  friendInviteModal: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  playerCardActions: PropTypes.shape({
    openFriendInviteModal: PropTypes.func.isRequired,
    closeFriendInviteModal: PropTypes.func.isRequired,
  }),
};

export default GameLobby;
