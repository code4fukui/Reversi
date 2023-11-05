import { ReversiBoard } from "./ReversiBoard.js";

// https://note.com/nyanyan_cubetech/n/n17c169271832?magazine_key=m54104c8d2f12
const valtbl = [
  [ 30, -12,  0, -1],
  [-12, -15, -3, -3],
  [  0,  -3,  0, -1],
  [ -1,  -3, -1, -1],
];
const getValue = (x, y) => {
  if (x > 3) x = 7 - x;
  if (y > 3) y = 7 - y;
  return valtbl[y][x];
};
const calcValue = (rb, n) => {
  let v = 0;
  const m = 3 - n;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const a = rb.get(x, y);
      if (a == n) {
        v += getValue(x, y);
      } else {
        v -= getValue(x, y);
      }
    }
  }
  return v;
};

export const waitHand = (rb, n) => {
  const hands = rb.getHands(n);
  let max = -1000;
  let maxhand = null;
  for (const hand of hands) {
    const rb2 = new ReversiBoard(rb);
    rb2.put(n, hand.x, hand.y);
    const v = calcValue(rb2, n);
    if (v > max) {
      max = v;
      maxhand = hand;
    }
  }
  return maxhand;
};
