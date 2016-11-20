const {
  colors,
  createLogger,
  lengthOfRoom,
  clientIdsForRoom,
  findClient,
} = require('./../utils');

const log = createLogger('GAMEJOIN', colors.onGameJoin);

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
  log(`${name} has joined the room: ${gameId}`);
  log('Current players:', clientIdsForRoom(this.io, gameId).map(id => findClient(this.io, id).username).join(', '));
}

module.exports = onGameJoin;
