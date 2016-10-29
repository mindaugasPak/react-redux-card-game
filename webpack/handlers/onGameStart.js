const {
  colors,
  createLogger,
  lengthOfRoom,
  clientsForRoom,
  newGame,
} = require('./../utils');

const log = createLogger('GAMESTART', colors.onGameStart);

function onGameStart({ gameId }) {
  const getPlayerCount = () => lengthOfRoom(this.io, gameId);

  log('LETS START THE GAME', gameId);
  log('player count:', getPlayerCount());

  if (getPlayerCount() === 2) {
    log('[START] Time to start the game', gameId);
    const playerOneStarts = Math.random() >= 0.5;
    const [playerOne, playerTwo] = clientsForRoom(this.io, gameId);

    const playerOneNewGame = newGame(gameId, 'GuardianBanana', playerOneStarts);
    this.io.to(playerOne).emit('newGame', playerOneNewGame);
    log('[ACTION] Sent action to playerOne', playerOneNewGame);

    const playerTwoNewGame = newGame(gameId, 'Boyd', !playerOneStarts);
    this.io.to(playerTwo).emit('newGame', playerTwoNewGame);
    log('[ACTION] Sent action to playerTwo', playerTwoNewGame);
  }
}

module.exports = onGameStart;
