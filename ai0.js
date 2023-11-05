export const waitHand = (rb, n) => {
  const hands = rb.getHands(n);
  return hands[Math.floor(Math.random() * hands.length)];
};
