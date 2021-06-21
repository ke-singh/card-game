const VALUES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5,
  6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];

class Deck {
  constructor(cards = newDeck()) {
    this.cards = cards;
  }

  get numberOfCards() {
    return this.cards.length;
  }

  slice(start, end) {
    return this.cards.slice(start, end);
  }

  pop() {
    return this.cards.shift();
  }

  peek() {
    return this.cards[this.cards.length - 1];
  }

  push(card) {
    this.cards.push(card);
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }
}

class Card {
  constructor(value) {
    this.value = value;
  }
}

const newDeck = () => {
  return VALUES.map((v) => {
    return new Card(v);
  });
};

module.exports = { Deck, Card };
