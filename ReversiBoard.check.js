import { ReversiBoard } from "./ReversiBoard.js";

const w = new Array(3);
w[0] = w[1] = w[2] = 0;
const rb = new ReversiBoard();
for (let i = 0; i < 1000000; i++) {
  let n = 1;
  rb.reset();
  for (let i = 0; !rb.isOver(); i++) {
    //console.log("step", i, n);
    const hands = rb.getHands(n);
    if (hands.length > 0) {
      const h = hands[Math.floor(Math.random() * hands.length)];
      //console.log(h);
      rb.put(n, h.x, h.y);
    }
    //console.log(rb.toString());
    n = 3 - n;
  }
  const w0 = rb.getWinner();
  w[w0]++;
  //console.log(i, rb.getScore(), w0, w);
}
console.log(w); // [ 41560, 454277, 504163 ]
