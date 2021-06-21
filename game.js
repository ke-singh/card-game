class Game {
  constructor(
    player1Deck,
    player2Deck,
    player1DiscardDeck,
    player2DiscardDeck,
    drawDeck,
    gameOver
  ) {
    this.player1Deck = player1Deck;
    this.player2Deck = player2Deck;
    this.player1DiscardDeck = player1DiscardDeck;
    this.player2DiscardDeck = player2DiscardDeck;
    this.drawDeck = drawDeck;
    this.gameOver = gameOver;
  }

  mergeDiscardedCards() {
    if (!this.player1Deck.peek()) {
      this.player1DiscardDeck.shuffle();
      while (this.player1DiscardDeck.peek()) {
        this.player1Deck.push(this.player1DiscardDeck.pop());
      }
    }
    if (!this.player2Deck.peek()) {
      this.player2DiscardDeck.shuffle();
      while (this.player2DiscardDeck.peek()) {
        this.player2Deck.push(this.player2DiscardDeck.pop());
      }
    }
  }

  get isGameOver() {
    return this.gameOver;
  }

  compareCards(first, second) {
    return first.value > second.value;
  }

  flipCards() {
    this.mergeDiscardedCards();
    const player1Card = this.player1Deck.pop();
    const player2Card = this.player2Deck.pop();

    console.log(
      `Player 1 (${
        this.player1Deck.numberOfCards +
        this.player1DiscardDeck.numberOfCards +
        1
      } cards): ${player1Card.value}`
    );
    console.log(
      `Player 2 (${
        this.player2Deck.numberOfCards +
        this.player2DiscardDeck.numberOfCards +
        1
      } cards): ${player2Card.value}`
    );

    if (this.compareCards(player1Card, player2Card)) {
      console.log("Player 1 wins this round");
      while (this.drawDeck.peek()) {
        this.player1DiscardDeck.push(this.drawDeck.pop());
      }
      this.player1DiscardDeck.push(player1Card);
      this.player1DiscardDeck.push(player2Card);
    } else if (this.compareCards(player2Card, player1Card)) {
      console.log("Player 2 wins this round");
      while (this.drawDeck.peek()) {
        this.player2DiscardDeck.push(this.drawDeck.pop());
      }
      this.player2DiscardDeck.push(player1Card);
      this.player2DiscardDeck.push(player2Card);
    } else {
      console.log("No winner in this round");
      this.drawDeck.push(player1Card);
      this.drawDeck.push(player2Card);
    }

    console.log("\n");

    if (!this.player1Deck.peek() && !this.player1DiscardDeck.peek()) {
      console.log("Player 2 wins the game!");
      this.gameOver = true;
    } else if (!this.player2Deck.peek() && !this.player2DiscardDeck.peek()) {
      console.log("Player 1 wins the game!");
      this.gameOver = true;
    }
  }
}

module.exports = Game;
