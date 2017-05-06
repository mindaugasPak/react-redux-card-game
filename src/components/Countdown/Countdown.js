import React, { PropTypes } from 'react';

const Countdown = ({ children }) => (
  <div>{ children }</div>
);

Countdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Countdown;
