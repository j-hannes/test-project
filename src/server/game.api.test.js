const { isOutOfBounds, getNextBoard, calculateGame } = require("./game.api");
const { MESSAGES } = require("./messages");
const { world } = require("./world");

describe("isOutOfBounds", () => {
  it("fails for x < 0", () => {
    expect(isOutOfBounds([["-"]], { x: -1, y: 0 })).toBe(true);
  });
  it("fails for x >= board.length", () => {
    expect(isOutOfBounds([["-"]], { x: 1, y: 0 })).toBe(true);
  });
  it("fails for y < 0", () => {
    expect(isOutOfBounds([["-"]], { x: 0, y: -1 })).toBe(true);
  });
  it("fails for y >= board.length", () => {
    expect(isOutOfBounds([["-"]], { x: 0, y: 1 })).toBe(true);
  });
  it("passed for x on board", () => {
    expect(isOutOfBounds([["-"]], { x: 0, y: 0 })).toBe(false);
  });
});

describe("getNextBoard", () => {
  it("replaces Frodo's position on board", () => {
    expect(
      getNextBoard(
        [
          ["-", "-"],
          ["F", "-"],
        ],
        { x: 0, y: 1 },
        { x: 1, y: 1 }
      )
    ).toEqual([
      ["-", "-"],
      ["-", "F"],
    ]);
  });
});

describe("calculateGame", () => {
  test("valid move I", () => {
    expect(calculateGame(world, "n".split(",")).status).toBe(MESSAGES.CARRY_ON);
  });

  test("valid move II", () => {
    expect(calculateGame(world, "n,e,e,e,e,s".split(",")).status).toBe(
      MESSAGES.CARRY_ON
    );
  });

  test("fall of the board I", () => {
    expect(calculateGame(world, "w".split(",")).status).toBe(
      MESSAGES.OUT_OF_BOUNDS
    );
  });

  test("fall of the board II", () => {
    expect(calculateGame(world, "s,s,s,s,s".split(",")).status).toBe(
      MESSAGES.OUT_OF_BOUNDS
    );
  });

  test("run into an orc", () => {
    expect(calculateGame(world, "n,e,n".split(",")).status).toBe(MESSAGES.DEAD);
  });

  test("win the game", () => {
    expect(
      calculateGame(world, "e,e,n,e,e,s,e,e,e,e,n,n,n,n,w".split(",")).status
    ).toBe(MESSAGES.YAY);
  });
});
