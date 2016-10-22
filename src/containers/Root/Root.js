import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { App, DevTools, SocketProvider } from 'containers';
import { withSocket } from 'hoc';
import { GameLobbyScreen, GameNewScreen, GameScreen, StartScreen } from 'views';
import sharedStyles from 'components/shared/styles.scss';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.shape({
      getState: PropTypes.func.isRequired,
    }).isRequired,
    socket: PropTypes.shape({
      on: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.withSocket = this.withSocket.bind(this);
    this.requireName = this.requireName.bind(this);
  }

  requireName(nextState, replace) {
    const { name } = this.props.store.getState().player;

    if (!name) {
      replace('/');
    }
  }

  withSocket(component) {
    return props => React.createElement(component, { socket: this.props.socket, ...props });
  }

  render() {
    const { store, socket } = this.props;

    return (
      <div className={sharedStyles.fullSize}>
        <Provider store={store}>
          <SocketProvider socket={socket}>
            <Router history={hashHistory}>
              <Route path="/" component={App}>
                <IndexRoute component={StartScreen} />
                <Route path="game" onEnter={this.requireName}>
                  <Route path="new" component={withSocket(GameNewScreen)} />
                  <Route path=":id">
                    <IndexRoute component={GameScreen} />
                    <Route path="lobby" component={GameLobbyScreen} />
                  </Route>
                </Route>
              </Route>
            </Router>
          </SocketProvider>
        </Provider>
        <DevTools store={store} />
      </div>
    );
  }
}
