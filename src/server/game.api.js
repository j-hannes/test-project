const { MESSAGES } = require("./messages");

const isOutOfBounds = (board, { x, y }) => {
  return x < 0 || y < 0 || x >= board[0].length || y >= board.length;
};

const getNextPos = ({ x, y }, direction) => {
  if (direction === "n") {
    return { x, y: y - 1 };
  }
  if (direction === "s") {
    return { x, y: y + 1 };
  }
  if (direction === "w") {
    return { x: x - 1, y };
  }
  if (direction === "e") {
    return { x: x + 1, y };
  }
  return { x, y };
};

const hasFoundOrc = (board, { x, y }) => board[y][x] === "O";

const hasFoundMountDoom = (board, { x, y }) => board[y][x] === "D";

const getInitialFrodoPos = (world) =>
  world.reduce((acc, row, y) => {
    const x = row.findIndex((cell) => cell === "F");
    return x >= 0 ? { x, y } : acc;
  }, undefined);

const calculateGame = (world, path) => {
  const { result } = path.reduce(
    ({ result, frodo }, direction) => {
      if (result) {
        return { result };
      }

      const nextFrodo = getNextPos(frodo, direction);

      if (isOutOfBounds(world, nextFrodo)) {
        return { result: MESSAGES.OUT_OF_BOUNDS };
      }
      if (hasFoundOrc(world, nextFrodo)) {
        return { result: MESSAGES.DEAD };
      }
      if (hasFoundMountDoom(world, nextFrodo)) {
        return { result: MESSAGES.YAY };
      }

      return { frodo: nextFrodo };
    },
    {
      frodo: getInitialFrodoPos(world),
    }
  );

  return {
    status: result || MESSAGES.CARRY_ON,
  };
};

module.exports = {
  isOutOfBounds,
  calculateGame,
};
