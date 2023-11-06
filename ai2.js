import { ReversiBoard } from "./ReversiBoard.js";
import { calcValue, waitHand as waitHand1 } from "./ai1.js";

export const waitHand = (rb, n) => {
  const hands = rb.getHands(n);
  let max = -1000;
  let maxhand = null;
  for (const hand of hands) {
    const rb2 = new ReversiBoard(rb);
    rb2.put(n, hand.x, hand.y);
    const hands2 = rb2.getHands(3 - n);
    if (hands2.length == 0) {
      const hands3 = rb2.getHands(n);
      if (hands3.length == 0) {
          const v = calcValue(rb2, n);
          if (v > max) {
            max = v;
            maxhand = hand;
          }
      } else {
        for (const hand3 of hands3) {
          const rb3 = new ReversiBoard(rb2);
          rb3.put(n, hand3.x, hand3.y);
          const v = calcValue(rb3, n);
          if (v > max) {
            max = v;
            maxhand = hand;
          }
        }
      }
    } else {
      const hand2 = waitHand1(rb2, 3 - n);
      rb2.put(3 - n, hand2.x, hand2.y);
      const hands3 = rb2.getHands(n);
      if (hands3.length == 0) {
        const v = calcValue(rb2, n);
        if (v > max) {
          max = v;
          maxhand = hand;
        }
      } else {
        for (const hand3 of hands3) {
          const rb3 = new ReversiBoard(rb2);
          rb3.put(n, hand3.x, hand3.y);
          const v = calcValue(rb3, n);
          if (v > max) {
            max = v;
            maxhand = hand;
          }
        }
      }
    }
  }
  return maxhand;
};
