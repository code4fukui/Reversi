import { ReversiBoard } from "./ReversiBoard.js";
import { waitHand as waitHand0 } from "./ai0.js";
import { waitHand as waitHand1 } from "./ai1.js";
import { waitHand as waitHand2 } from "./ai2.js";

//const ais = [null, waitHand0, waitHand1]; // [ 370, 1889, 7741 ]
//const ais = [null, waitHand1, waitHand0]; // [ 328, 7385, 2287 ]
//const ais = [null, waitHand1, waitHand1]; // [ 10000, 0, 0 ]
//const ais = [null, waitHand0, waitHand0]; // [ 396, 4517, 5087 ]
//const ais = [null, waitHand1, waitHand2]; // [ 0, 100, 0] // !
//const ais = [null, waitHand2, waitHand1]; // [ 0, 100, 0]
//const ais = [null, waitHand0, waitHand1]; // [ 5, 29, 66 ]
const ais = [null, waitHand0, waitHand2]; // [ 7, 22, 71 ]

const cnt = 100;

const w = new Array(3);
w[0] = w[1] = w[2] = 0;
const rb = new ReversiBoard();
for (let i = 0; i < cnt; i++) {
  let n = 1;
  rb.reset();
  for (let i = 0; !rb.isOver(); i++) {
    //console.log("step", i, n);
    if (rb.canPut(n)) {
      const waitHand = ais[n];
      const h = await waitHand(rb, n);
      rb.put(n, h.x, h.y);
    }
    //console.log(rb.toString());
    n = 3 - n;
  }
  const w0 = rb.getWinner();
  w[w0]++;
  //console.log(i, rb.getScore(), w0, w);
}
console.log(w);
