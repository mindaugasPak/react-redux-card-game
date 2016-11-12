import React, { Component, PropTypes } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { withSocket } from 'hoc';
import { GameLobby } from 'components';
import { setReady, toggleReady } from 'redux/modules/ready';
import { startGame, updateHasOpponent, resetCurrentGame } from 'redux/modules/currentGame';
import { setOpponentName } from 'redux/modules/name';

export class GameLobbyScreen extends Component {
  static propTypes = {
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
    started: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      setReady: PropTypes.func.isRequired,
      toggleReady: PropTypes.func.isRequired,
      startGame: PropTypes.func.isRequired,
      updateHasOpponent: PropTypes.func.isRequired,
      setOpponentName: PropTypes.func.isRequired,
      resetCurrentGame: PropTypes.func.isRequired,
    }),
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    socket: PropTypes.shape({
      emit: PropTypes.func.isRequired,
      on: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    countdownStarted: false,
    countdownTime: 5,
  };

  componentDidMount = () => {
    this.joinGame(this.props);
    this.notifyOnPlayerJoined(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.gameId !== this.props.gameId) {
      this.joinGame(nextProps);
    }

    if (nextProps.player.ready && nextProps.opponent.ready) {
      if (!this.state.countdownStarted) {
        this.startCountdown();
      }
    }
  }

  componentWillUnmount = () => {
    if (!this.props.started) {
      this.leaveGame(this.props);
    }

    this.removeOnPlayerJoinedListener(this.props);
    clearInterval(this.countdownInterval);
  }

  startCountdown = () => {
    this.setState({ countdownStarted: true });
    this.countdownInterval = setInterval(this.countDown, 1000);
  }

  countDown = () => {
    this.setState({ countdownTime: this.state.countdownTime - 1 });

    if (this.state.countdownTime <= 0) {
      this.startGame(this.props);
      this.goInGame(this.props);
      clearInterval(this.countdownInterval);
    }
  }

  notifyOnPlayerJoined = (props) => {
    props.socket.on('playerJoined', ({ name, playerCount }) => {
      if (props.player.name !== name) {
        props.actions.setOpponentName(name);
      }

      if (playerCount === 2) {
        props.actions.updateHasOpponent(true);
      }
    });
  }

  removeOnPlayerJoinedListener = (props) => {
    props.socket.removeAllListeners('playerJoined');
  }

  emitReadyChange = (props, readyState) => {
    const { socket, gameId } = props;

    socket.emit('readyChange', { gameId, readyState });
  }

  startGame = (props) => {
    const { socket, gameId, actions } = props;

    socket.emit('gameStart', { gameId });
    actions.startGame();
  }

  joinGame = (props) => {
    const { socket, gameId, player: { name } } = props;

    socket.emit('gameJoin', { gameId, name });
  }

  leaveGame = (props) => {
    const { socket, gameId, actions } = props;

    socket.emit('gameLeave', { gameId });
    actions.resetCurrentGame();
  }

  goInGame = (props) => {
    const { router, gameId } = props;

    router.push(`/game/${gameId}`);
  }

  toggleReadyForPlayer = () => {
    this.props.actions.toggleReady({ target: 'PLAYER' });
    this.emitReadyChange(this.props, !this.props.player.ready);
  }

  render() {
    return (
      <GameLobby
        {...this.props}
        countdown={this.state}
        toggleReady={this.toggleReadyForPlayer}
      />
    );
  }
}

const mapStateToProps = ({ player, opponent, currentGame: { gameId, started, hasOpponent } }) => ({
  player,
  opponent,
  gameId,
  started,
  hasOpponent,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setReady,
    toggleReady,
    startGame,
    updateHasOpponent,
    setOpponentName,
    resetCurrentGame,
  }, dispatch),
});

export default compose(
  withSocket,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(GameLobbyScreen);
