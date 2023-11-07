const dirs = [
  [ 0, -1], // up
  [ 1, -1], // right up
  [ 1,  0], // right
  [ 1,  1], // right down
  [ 0,  1], // down
  [-1,  1], // left down
  [-1,  0], // left
  [-1, -1], // left up
];

export class ReversiBoard {
  constructor(rb) {
    this.fld = new Array(8);
    this.reset();
    if (rb) {
      const fld = this.fld;
      for (let i = 0; i < 8; i++) {
        const row = fld[i];
        for (let j = 0; j < 8; j++) {
          row[j] = rb.fld[i][j];
        }
      }
    }
  }
  reset() {
    const fld = this.fld;
    for (let i = 0; i < 8; i++) {
      const row = new Array(8);
      for (let j = 0; j < 8; j++) {
        row[j] = 0;
      }
      fld[i] = row;
    }
    fld[3][4] = fld[4][3] = 1;
    fld[3][3] = fld[4][4] = 2;
  }
  isOnBoard(x, y) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  }
  canPut(n, x, y) {
    const fld = this.fld;
    if (n != 1 && n != 2) return false;
    if (x === undefined) {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (this.canPut(n, i, j)) return true;
        }
      }
      return false;
    } else {
      if (!this.isOnBoard(x, y)) return false;
      if (fld[y][x] != 0) return false;
      const m = 3 - n;
      A: for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i];
        let xx = x + dir[0];
        let yy = y + dir[1];
        if (!this.isOnBoard(xx, yy)) continue;
        if (fld[yy][xx] != m) continue;
        for (let j = 0;; j++) {
          xx += dir[0];
          yy += dir[1];
          if (!this.isOnBoard(xx, yy)) continue A;
          if (fld[yy][xx] == 0) continue A;
          if (fld[yy][xx] == n) return true;
        }
      }
      return false;
    }
  }
  get(x, y) {
    if (!this.isOnBoard(x, y)) return 0;
    return this.fld[y][x];
  }
  put(n, x, y) {
    if (!this.canPut(n, x, y)) return false;
    const fld = this.fld;
    fld[y][x] = n;
    const m = 3 - n;
    A: for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let xx = x + dir[0];
      let yy = y + dir[1];
      if (!this.isOnBoard(xx, yy)) continue;
      if (fld[yy][xx] != m) continue;
      for (let j = 0;; j++) {
        xx += dir[0];
        yy += dir[1];
        if (!this.isOnBoard(xx, yy)) continue A;
        if (fld[yy][xx] == 0) continue A;
        if (fld[yy][xx] == n) {
          for (; j >= 0; j--) {
            xx -= dir[0];
            yy -= dir[1];
            fld[yy][xx] = n;
          }
          break;
        }
      }
    }
    return true;
  }
  getHands(n) {
    const res = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.canPut(n, x, y)) {
          res.push({ x, y });
        }
      }
    }
    return res;
  }
  isOver() {
    return !this.canPut(1) && !this.canPut(2);
  }
  getScore() {
    const fld = this.fld;
    let s1 = 0;
    let s2 = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const n = fld[i][j];
        if (n == 1) s1++;
        if (n == 2) s2++;
      }
    }
    return [s1, s2];
  }
  getWinner() {
    if (!this.isOver()) return 0;
    const s = this.getScore();
    if (s[0] == s[1]) return 0;
    return s[0] > s[1] ? 1 : 2;
  }
  toString() {
    const fld = this.fld;
    const ss = [];
    for (let i = 0; i < fld.length; i++) {
      ss.push(fld[i].join(""));
    }
    return ss.join("\n");
  }
  static encodeXY(x, y) {
    return String.fromCharCode(x + "A".charCodeAt(0)) + String.fromCharCode(y + "1".charCodeAt(0));
  }
  static decodeXY(s) {
    const x = s.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
    const y = s.charCodeAt(1) - "1".charCodeAt(0);
    return { x, y };
  }
}
