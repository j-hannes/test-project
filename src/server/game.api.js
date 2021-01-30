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

const getNextBoard = (board, prevPos, pos, replace = "F") =>
  board.map((row, i) =>
    row.map((cell, j) => {
      if (i === pos.y && j === pos.x) {
        return replace;
      }
      if (i === prevPos.y && j === prevPos.x) {
        return "-";
      }
      return cell;
    })
  );

const getInitialFrodoPos = (world) =>
  world.reduce((acc, row, y) => {
    const x = row.findIndex((cell) => cell === "F");
    return x >= 0 ? { x, y } : acc;
  }, undefined);

const getSymbol = (status) =>
  (status === MESSAGES.OUT_OF_BOUNDS && "😵") ||
  (status === MESSAGES.DEAD && "☠️") ||
  (status === MESSAGES.YAY && "🎊") ||
  "F";

const calculateGame = (world, path) => {
  const result = path.reduce(
    ({ status, frodo }, direction) => {
      if (status !== MESSAGES.CARRY_ON) {
        return { status, frodo };
      }

      const nextFrodo = getNextPos(frodo, direction);

      if (isOutOfBounds(world, nextFrodo)) {
        return {
          status: MESSAGES.OUT_OF_BOUNDS,
          frodo,
        };
      }
      if (hasFoundOrc(world, nextFrodo)) {
        return {
          status: MESSAGES.DEAD,
          frodo: nextFrodo,
        };
      }
      if (hasFoundMountDoom(world, nextFrodo)) {
        return {
          status: MESSAGES.YAY,
          frodo: nextFrodo,
        };
      }

      return {
        frodo: nextFrodo,
        status,
      };
    },
    {
      status: MESSAGES.CARRY_ON,
      frodo: getInitialFrodoPos(world),
    }
  );

  return {
    ...result,
    board: getNextBoard(
      world,
      getInitialFrodoPos(world),
      result.frodo,
      getSymbol(result.status)
    ),
  };
};

module.exports = {
  isOutOfBounds,
  getNextBoard,
  calculateGame,
};
