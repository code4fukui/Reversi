import * as t from "https://deno.land/std/testing/asserts.ts";
import { ReversiBoard } from "./ReversiBoard.js";

Deno.test("simple", () => {
  const rb = new ReversiBoard();
  rb.put(1, 3, 2);
  rb.put(2, 2, 2);
  rb.put(1, 5, 4);
  rb.put(2, 3, 1);
  t.assert(rb.put(1, 3, 0));
  t.assertEquals(rb.toString(), `00010000
00010000
00210000
00011000
00011100
00000000
00000000
00000000`);
  t.assertEquals(rb.isOver(), false);
});

Deno.test("game", () => {
  const rb = new ReversiBoard();
  let n = 1;
  for (let i = 0; !rb.isOver(); i++) {
    //console.log(rb.toString());
    //console.log("step", i, n);
    const hands = rb.getHands(n);
    if (hands.length > 0) {
      const h = hands[0];
      //console.log(h);
      rb.put(n, h.x, h.y);
    }
    n = 3 - n;
  }
  t.assertEquals(rb.toString(), `22222221
22222211
22222121
22221221
22222221
22212221
22221121
11111122`);
  t.assertEquals(rb.getScore(), [19, 45]);
  t.assertEquals(rb.getWinner(), 2);
  rb.reset();
  t.assertEquals(rb.getWinner(), 0);
  t.assertEquals(rb.getScore(), [2, 2]);
  t.assertEquals(rb.isOver(), false);
});
Deno.test("get", () => {
  const rb = new ReversiBoard();
  t.assertEquals(rb.get(3, 3), 2);
  t.assertEquals(rb.get(3, 4), 1);
  t.assertEquals(rb.get(-1, 4), 0);
  t.assertEquals(rb.get(0, 0), 0);
});
Deno.test("clone", () => {
  const rb = new ReversiBoard();
  rb.put(1, 3, 2);
  const rb2 = new ReversiBoard(rb);
  t.assertEquals(rb.toString(), rb2.toString());
});
