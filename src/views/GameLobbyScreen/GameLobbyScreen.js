import React, { Component, PropTypes } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { withSocket } from 'hoc';
import { GameLobby } from 'components';
import { toggleReady } from 'redux/modules/ready';
import { updateHasOpponent } from 'redux/modules/currentGame';

export class GameLobbyScreen extends Component {
  static propTypes = {
    player: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    opponent: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    gameId: PropTypes.string.isRequired,
    hasOpponent: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      toggleReady: PropTypes.func.isRequired,
      updateHasOpponent: PropTypes.func.isRequired,
    }),
    socket: PropTypes.shape({
      emit: PropTypes.func.isRequired,
      on: PropTypes.func.isRequired,
    }).isRequired,
  };

  toggleReadyForPlayer = () => this.props.actions.toggleReady({ target: 'PLAYER' });

  render() {
    return <GameLobby {...this.props} toggleReady={this.toggleReadyForPlayer} />;
  }
}

const mapStateToProps = ({ player, opponent, currentGame: { gameId, hasOpponent } }) => ({
  player,
  opponent,
  gameId,
  hasOpponent,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ toggleReady, updateHasOpponent }, dispatch),
});

export default compose(
  withSocket,
  connect(mapStateToProps, mapDispatchToProps)
)(GameLobbyScreen);
