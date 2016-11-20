const {
  colors,
  createLogger,
  lengthOfRoom,
  clientIdsForRoom,
  findClient,
} = require('./../utils');

const logGameJoin = createLogger('GAMEJOIN', colors.onGameJoin);

function onGameJoin({ gameId, name }) {
  const getPlayerCount = () => lengthOfRoom(this.io, gameId);

  if (getPlayerCount() === 2) return;

  this.socket.username = name;
  this.socket.join(gameId);
  this.io.to(gameId).emit('playerJoined', { gameId, name, playerCount: getPlayerCount() });

  if (getPlayerCount() === 2) {
    const enemySocketId = clientIdsForRoom(this.io, gameId).find(id => id !== this.socket.id);
    const enemyPlayerName = findClient(this.io, enemySocketId).username;

    this.io.to(this.socket.id).emit('playerJoined', { gameId, name: enemyPlayerName, playerCount: getPlayerCount() });
  }

  logGameJoin('Current players:', clientsForRoom(this.io, gameId));
}

module.exports = onGameJoin;
