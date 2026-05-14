# Reversi

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

Reversi is a two-player board game where players take turns placing black and white discs on an 8x8 board. The objective is to have the majority of discs on the board at the end of the game.

## Demo
- [Demo](https://code4fukui.github.io/Reversi/)
- [Random AI Demo](https://code4fukui.github.io/Reversi/ai-step0.html)
- [Evaluation Table AI Demo](https://code4fukui.github.io/Reversi/ai-step1.html)
- [2-Ply AI Demo](https://code4fukui.github.io/Reversi/ai-step2.html)

## Features
- Displays the game board
- Handles game progression
- Implements 3 different AI opponents

## Usage
The `ReversiBoard` class can be used to programmatically interact with the game. Here is an example usage:

```javascript
import { ReversiBoard } from "https://code4fukui.github.io/Reversi/ReversiBoard.js";

const rb = new ReversiBoard();
let n = 1;
for (let i = 0; !rb.isOver(); i++) {
  console.log("step", i, n);
  const hands = rb.getHands(n);
  if (hands.length > 0) {
    const h = hands[Math.floor(Math.random() * hands.length)];
    rb.put(n, h.x, h.y);
  }
  console.log(rb.toString());
  n = 3 - n;
}
console.log(rb.getScore(), rb.getWinner());
```

## AI
- [Random AI](ai0.js)
- [Evaluation Table AI](ai1.js)
- [2-Ply AI](ai2.js)

## Test
Run the tests with the following command:
```
deno test
```

## Benchmark
Run 1 million random games and gather statistics:
```
deno run ReversiBoard.check.js
```

The output on an M1 MacBook Pro is:
```
[ 41592, 454162, 504246 ]
deno run ReversiBoard.check.js  110.09s user 0.22s system 98% cpu 1:51.69 total
```

## Reference
- [Othello (board game) - Wikipedia](https://en.wikipedia.org/wiki/Reversi)
- [Othello AI Textbook | nyanyan (Takuhiro Yamana) | note](https://note.com/nyanyan_cubetech/n/n17c169271832?magazine_key=m54104c8d2f12)

## License
MIT License — see [LICENSE](LICENSE).