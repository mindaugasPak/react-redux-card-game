import React, { PropTypes } from 'react';
import Modal from 'react-modal';

const InvitePlayerModal = ({ inviteLink, isOpen, onClose }) => (
  <Modal isOpen={isOpen} onRequestClose={onClose}>
    <button onClick={onClose}>close modal</button>
    <h1>Invite a player</h1>
    <input type="text" value={inviteLink} readOnly />
    <button>Copy</button>
  </Modal>
);

InvitePlayerModal.propTypes = {
  inviteLink: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InvitePlayerModal;
