const {
  colors,
  createLogger,
  lengthOfRoom,
  clientsForRoom,
} = require('./../utils');

const logGameJoin = createLogger('GAMEJOIN', colors.onGameJoin);

function onGameJoin({ gameId }) {
  const getPlayerCount = () => lengthOfRoom(this.io, gameId);

  if (getPlayerCount() === 2) return;

  this.socket.join(gameId);
  this.io.to(gameId).emit('playerJoined', { gameId, playerCount: getPlayerCount() });

  logGameJoin('Current players:', clientsForRoom(this.io, gameId));
}

module.exports = onGameJoin;
