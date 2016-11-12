import React, { PropTypes } from 'react';
import Modal from 'react-modal';

const InvitePlayerModal = ({ gameId, isOpen }) => (
  <Modal isOpen={isOpen}>
    <h1>Invite a player</h1>
    <input type="text" value={gameId} readOnly />
    <button>Copy</button>
  </Modal>
);

InvitePlayerModal.propTypes = {
  gameId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default InvitePlayerModal;
