import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { InvitePlayerModal } from 'components';
import styles from './PlayerCard.scss';

const PlayerCard = ({
  playerName,
  ready,
  inviteLink,
  friendInviteModal,
  canLeave,
  playerCardActions: {
    openFriendInviteModal,
    closeFriendInviteModal,
  },
}) => (
  <section className={styles.PlayerCard}>
    <div className={styles.PlayerCardAvatar} />
    <h1 className={styles.PlayerCardName}>{ playerName || 'Waiting...' }</h1>
    { inviteLink ? (
      <div>
        <button onClick={openFriendInviteModal}>Invite friend</button>
        <InvitePlayerModal
          inviteLink={inviteLink}
          isOpen={friendInviteModal.isOpen}
          onClose={closeFriendInviteModal}
        />
      </div>
    ) : (
      <div>
        <div>{ ready ? 'Ready' : 'Not ready' }</div>
        <div>
          { canLeave ? <Link to="/"><button>Leave</button></Link> : null }
        </div>
      </div>
    ) }
  </section>
);

PlayerCard.propTypes = {
  playerName: PropTypes.string,
  ready: PropTypes.bool,
  inviteLink: PropTypes.string,
  canLeave: PropTypes.bool,
  friendInviteModal: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
  }),
  playerCardActions: PropTypes.shape({
    openFriendInviteModal: PropTypes.func.isRequired,
    closeFriendInviteModal: PropTypes.func.isRequired,
  }),
};

export default PlayerCard;
