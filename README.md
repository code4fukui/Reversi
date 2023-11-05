# Reversi
 
- [demo](https://code4fukui.github.io/Reversi/)

## usage

```js
import { ReversiBoard } from "https://code4fukui.github.io/Reversi/ReversiBoard.js";

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
```

## test

```sh
deno test
```

## benchmark

game by random 1 million times
```sh
time deno run ReversiBoard.check.js
```

```
[ 41592, 454162, 504246 ]
deno run ReversiBoard.check.js  110.09s user 0.22s system 98% cpu 1:51.69 total
```
(result on M1 MacBook Pro)
