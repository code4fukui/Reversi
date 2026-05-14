# Reversi

Reversiは、8x8の盤面上でプレイヤーが交互に黒と白の石を配置する2人用ボードゲームです。ゲーム終了時に盤面上の自分の石を過半数にすることが目的です。

## デモ
- [デモ](https://code4fukui.github.io/Reversi/)
- [ランダムAIデモ](https://code4fukui.github.io/Reversi/ai-step0.html)
- [評価表AIデモ](https://code4fukui.github.io/Reversi/ai-step1.html)
- [2手読みAIデモ](https://code4fukui.github.io/Reversi/ai-step2.html)

## 機能
- ゲーム盤の表示
- ゲーム進行の処理
- 3種類のAI対戦相手の実装

## 使い方
`ReversiBoard`クラスを使用すると、プログラムからゲームを操作できます。使用例は以下の通りです：

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
- [ランダムAI](ai0.js)
- [評価表AI](ai1.js)
- [2手読みAI](ai2.js)

## テスト
以下のコマンドでテストを実行します：
```
deno test
```

## ベンチマーク
100万回のランダムゲームを実行して統計を取得します：
```
deno run ReversiBoard.check.js
```

M1 MacBook Proでの出力例：
```
[ 41592, 454162, 504246 ]
deno run ReversiBoard.check.js  110.09s user 0.22s system 98% cpu 1:51.69 total
```

## 参考
- [オセロ (ボードゲーム) - Wikipedia](https://en.wikipedia.org/wiki/Reversi)
- [オセロAI教科書 | nyanyan (山名拓弘) | note](https://note.com/nyanyan_cubetech/n/n17c169271832?magazine_key=m54104c8d2f12)

## ライセンス
MIT License — 詳細は[LICENSE](LICENSE)を参照してください。
