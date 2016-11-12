import React, { PropTypes } from 'react';
import { InvitePlayerModal } from 'components';
import styles from './PlayerCard.scss';

const PlayerCard = ({
  playerName,
  ready,
  gameId,
  friendInviteModal,
  playerCardActions: {
    openFriendInviteModal,
    closeFriendInviteModal,
  },
}) => (
  <section className={styles.PlayerCard}>
    <div className={styles.PlayerCardAvatar} />
    <h1 className={styles.PlayerCardName}>{ playerName || 'Waiting...' }</h1>
    { playerName ? (
      <div>{ ready ? 'Ready' : 'Not ready' }</div>
    ) : (
      <div>
        <button onClick={openFriendInviteModal}>Invite friend</button>
        <InvitePlayerModal
          gameId={gameId}
          isOpen={friendInviteModal.isOpen}
          onClose={closeFriendInviteModal}
        />
      </div>
    ) }
  </section>
);

PlayerCard.propTypes = {
  playerName: PropTypes.string,
  ready: PropTypes.bool,
  gameId: PropTypes.string,
  friendInviteModal: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
  }),
  playerCardActions: PropTypes.shape({
    openFriendInviteModal: PropTypes.func.isRequired,
    closeFriendInviteModal: PropTypes.func.isRequired,
  }),
};

export default PlayerCard;
