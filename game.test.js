const { test, expect } = require("@jest/globals");
const { Deck, Card } = require("./deck");
const Game = require("./game");

let player1Deck,
  player2Deck,
  player1DiscardDeck,
  player2DiscardDeck,
  drawDeck,
  gameOver,
  game;

beforeAll(() => {
  const deck = new Deck();
  deck.shuffle();
  const midPoint = Math.ceil(deck.numberOfCards / 2);
  player1Deck = new Deck(deck.slice(0, midPoint));
  player2Deck = new Deck(deck.slice(midPoint, deck.numberOfCards));
  player1DiscardDeck = new Deck([]);
  player2DiscardDeck = new Deck([]);
  drawDeck = new Deck([]);
  gameOver = false;
  game = new Game(
    player1Deck,
    player2Deck,
    player1DiscardDeck,
    player2DiscardDeck,
    drawDeck,
    gameOver
  );
});

test("A deck should contain 40 cards", () => {
  let deck = new Deck();
  expect(deck.numberOfCards).toBe(40);
});

test("The discard pile should be shuffled into the draw pile if the draw pile is empty", () => {
  game.player1Deck = new Deck([]);
  game.player1DiscardDeck = new Deck([
    new Card(3),
    new Card(2),
    new Card(5),
    new Card(9),
    new Card(7),
    new Card(1),
  ]);
  game.player2Deck = new Deck([new Card(2), new Card(3)]);
  game.player2DiscardDeck = new Deck([new Card(6), new Card(3), new Card(5)]);
  game.mergeDiscardedCards();
  expect(game.player1Deck.numberOfCards).toEqual(6);
  expect(game.player2Deck.numberOfCards).toEqual(2);
});

test("The card with higher value should win", () => {
  let firstCard = new Card(10);
  let secondCard = new Card(5);
  expect(game.compareCards(firstCard, secondCard)).toEqual(true);
});

test("In case of draw, the winner of the next round should win 4 cards", () => {
  game.player1Deck = new Deck([new Card(2), new Card(5), new Card(6)]);
  game.player2Deck = new Deck([new Card(2), new Card(3), new Card(7)]);
  game.flipCards();
  game.flipCards();
  console.log(game.player1Deck);
  expect(game.player1DiscardDeck.numberOfCards).toEqual(4);
});
