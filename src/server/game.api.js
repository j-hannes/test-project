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

const calculateGame = (world, path) =>
  path.reduce(
    ({ status, frodo, board }, direction) => {
      if (status !== MESSAGES.CARRY_ON) {
        return { board, status };
      }

      const nextFrodo = getNextPos(frodo, direction);

      if (isOutOfBounds(board, nextFrodo)) {
        return {
          board: getNextBoard(board, frodo, frodo, "😵"),
          status: MESSAGES.OUT_OF_BOUNDS,
        };
      }
      if (hasFoundOrc(board, nextFrodo)) {
        return {
          board: getNextBoard(board, frodo, nextFrodo, "☠️"),
          status: MESSAGES.DEAD,
        };
      }
      if (hasFoundMountDoom(board, nextFrodo)) {
        return {
          board: getNextBoard(board, frodo, nextFrodo, "🎊"),
          status: MESSAGES.YAY,
        };
      }

      const nextBoard = getNextBoard(board, frodo, nextFrodo);

      return {
        board: nextBoard,
        frodo: nextFrodo,
        status,
      };
    },
    {
      board: world,
      status: MESSAGES.CARRY_ON,
      frodo: getInitialFrodoPos(world),
    }
  );

module.exports = {
  isOutOfBounds,
  getNextBoard,
  calculateGame,
};
