import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { NewPlayerForm } from 'containers';
import { setPlayerName } from 'redux/modules/name';

export class StartScreen extends Component {
  static propTypes = {
    playerName: PropTypes.string.isRequired,
    setPlayerName: PropTypes.func.isRequired,
  };

  render() {
    const { playerName } = this.props;

    return (
      <div>
        <h1>Welcome to HearthStone{ playerName ? `, ${playerName}` : '' }</h1>
        { playerName ? (
          <div>
            <div><button><Link to="/game/asdfasdfasf/lobby">Start new game</Link></button></div>
            <div><button><Link to="/game/new">Join existing game</Link></button></div>
          </div>
        ) : (
          <NewPlayerForm playerName={playerName} onSubmit={this.props.setPlayerName} />
        ) }
      </div>
    );
  }
}

const mapStateToProps = state => ({ playerName: state.player.name });
const mapDispatchToProps = dispatch => (bindActionCreators({ setPlayerName }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);

