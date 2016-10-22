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
  }

  componentDidMount = () => {
    this.joinGame(this.props);
    this.notifyOnPlayerJoined(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.gameId !== this.props.gameId) {
      this.joinGame(nextProps);
    }
  }

  componentWillUnmount = () => {
    this.leaveGame(this.props);
  }

  notifyOnPlayerJoined = (props) => {
    props.socket.on('playerJoined', ({ playerCount }) => {
      if (playerCount === 2) {
        props.actions.updateHasOpponent(true);
      }
    });
  }

  joinGame = (props) => {
    const { socket, gameId } = props;
    console.log('gameId', gameId);

    socket.emit('gameJoin', { gameId });
  }

  leaveGame = (props) => {
    const { socket, gameId } = props;

    socket.emit('gameLeave', { gameId });
  }

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
