const SET_PLAYER_READY = 'SET_PLAYER_READY';
const TOGGLE_PLAYER_READY = 'TOGGLE_PLAYER_READY';

export function setReady({ to, target }) {
  return {
    to,
    target,
    type: SET_PLAYER_READY,
  };
}

export function toggleReady({ target }) {
  return {
    target,
    type: TOGGLE_PLAYER_READY,
  };
}

export function resetReady({ target }) {
  return setReady({ target, to: false });
}

export default function ready(state = false, action) {
  switch (action.type) {
    case SET_PLAYER_READY:
      return action.to;
    case TOGGLE_PLAYER_READY:
      return !state;
    default:
      return state;
  }
}
