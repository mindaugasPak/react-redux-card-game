import React, { PropTypes } from 'react';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withSocket = (WrappedComponent) => {
  const withSocketDisplayName = `withSocket(${getDisplayName(WrappedComponent)})`;

  const WithSocket = (props, { socket }) => (
    <WrappedComponent {...props} socket={socket} />
  );

  WithSocket.displayName = withSocketDisplayName;
  WithSocket.contextTypes = {
    socket: PropTypes.object.isRequired,
  };

  return WithSocket;
};

export default withSocket;
