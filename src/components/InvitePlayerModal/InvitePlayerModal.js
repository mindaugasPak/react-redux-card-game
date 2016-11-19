import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

class InvitePlayerModal extends Component {
  select = () => {
    const inviteLinkInput = this.inviteLinkInput;

    inviteLinkInput.focus();
    inviteLinkInput.setSelectionRange(0, inviteLinkInput.value.length);
  }

  copy = () => {
    document.execCommand('copy');
  }

  selectAndCopy = () => {
    this.select();
    this.copy();
  }

  render() {
    const { inviteLink, isOpen, onClose } = this.props;

    return (
      <Modal isOpen={isOpen} onAfterOpen={this.select} onRequestClose={onClose}>
        <button onClick={onClose}>close modal</button>
        <h1>Invite a player</h1>
        <input
          type="text"
          ref={(input) => { this.inviteLinkInput = input; }}
          value={inviteLink}
          readOnly
        />
        <button onClick={this.selectAndCopy}>Copy</button>
      </Modal>
    );
  }
}

InvitePlayerModal.propTypes = {
  inviteLink: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InvitePlayerModal;
