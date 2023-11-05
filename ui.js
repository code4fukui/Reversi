export const players = ["　", "⚫", "⚪"];

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const btn = document.createElement("button");
    main.appendChild(btn);
  }
}

export const show = (rb) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const n = i * 8 + j;
      const btn = main.children[n];
      btn.textContent = players[rb.get(j, i)];
    }
  }
};

export const waitClick = async () => {
  return new Promise(resolve => {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const n = y * 8 + x;
        const btn = main.children[n];
        btn.onclick = () => {
          resolve({ x, y });
        };
      }
    }
  });
};
