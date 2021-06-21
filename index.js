const { Deck } = require("./deck");
const Game = require("./game");

const main = () => {
  const deck = new Deck();
  deck.shuffle();
  const midPoint = Math.ceil(deck.numberOfCards / 2);
  let player1Deck = new Deck(deck.slice(0, midPoint));
  let player2Deck = new Deck(deck.slice(midPoint, deck.numberOfCards));
  let player1DiscardDeck = new Deck([]);
  let player2DiscardDeck = new Deck([]);
  let drawDeck = new Deck([]);
  let gameOver = false;

  const game = new Game(
    player1Deck,
    player2Deck,
    player1DiscardDeck,
    player2DiscardDeck,
    drawDeck,
    gameOver
  );
  while (!game.isGameOver) {
    game.flipCards();
  }
};

module.exports = { main };
