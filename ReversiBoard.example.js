import { ReversiBoard } from "./ReversiBoard.js";

const rb = new ReversiBoard();
let n = 1;
for (let i = 0; !rb.isOver(); i++) {
  console.log("step", i, n);
  const hands = rb.getHands(n);
  if (hands.length > 0) {
    const h = hands[Math.floor(Math.random() * hands.length)];
    //console.log(h);
    rb.put(n, h.x, h.y);
  }
  console.log(rb.toString());
  n = 3 - n;
}
console.log(rb.getScore(), rb.getWinner());
