import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { GameLobby } from 'components';
import { toggleReady } from 'redux/modules/ready';

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
    }),
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
  actions: bindActionCreators({ toggleReady }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameLobbyScreen);
