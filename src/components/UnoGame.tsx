import React, { useState } from "react";
import exampleImage from "../assets/images/Blue_4.png";
import {
  Card,
  Deck,
  CardValue,
  CardColor,
  Player,
  Status,
} from "../card_types";
import generateUNOCards from "../utils";
import shuffle from "shuffle-array";
import Player1Cards from "./Player1Cards";
import Alert from "./Alert";

const UnoGame: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleAddImage = () => {
    setImages([...images, exampleImage]);
  };

  var deck = generateUNOCards();
  deck = shuffle(deck);

  const firstCard: Card = {
    id: 1,
    color: CardColor.BLANK,
    value: CardValue.BLANK,
  };

  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [player1Cards, setPlayer1Cards] = useState<Deck>([]);
  const [player2Cards, setPlayer2Cards] = useState<Deck>([]);
  const [turn, setTurn] = useState("");
  const [playCardsPile, setPlayCardsPile] = useState([]);
  const [drawCardPile, setDrawCardPile] = useState<Deck>(deck);
  const [currentCard, setcurrentCard] = useState<Card>(firstCard);
  const [canEndTurn, setCanEndTurn] = useState<Status>(Status.NO);
  const [numCardsDelt, setNumCardsDelt] = useState<Number>(7);

  const [listData, setListData] = useState([1, 2, 3, 4, 5, 6]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    console.log("Clicked index:", index);
  };

  const handleStartGame = () => {
    var deck: Deck = drawCardPile;
    var player1 = deck.slice(0, numCardsDelt);
    var player2 = deck.slice(numCardsDelt, numCardsDelt * 2);
    var firstCard = deck[numCardsDelt * 2];

    console.log("Deck, len: ", deck.length, " value: ", deck);
    console.log("P1, len: ", player1.length, " value: ", player1);
    console.log("P2, len: ", player2.length, " value: ", player2);
    console.log("first card: ", firstCard);

    deck = deck.slice(15);
    console.log("Reduced Deck, len: ", deck.length, " value: ", deck);

    setTurn(Player.ONE);
    setPlayer1Cards(player1);
    setPlayer2Cards(player2);
    setDrawCardPile(deck);
    setcurrentCard(firstCard);
    setCanEndTurn(Status.NO);
  };

  const handleDrawCard = () => {
    var deck: Deck = drawCardPile;
    var newCard: Card = deck[0];
    deck.shift();
    console.log("draw card, ", newCard);
    setDrawCardPile(deck);

    if (turn == Player.ONE) {
      console.log("Drawing card for Player 1!");
      setPlayer1Cards([...player1Cards, newCard]);
    } else {
      console.log("Drawing card for Player 2!");
      setPlayer2Cards([...player2Cards, newCard]);
    }

    setCanEndTurn(Status.YES);
  };

  const handlePlayCard = () => {
    var card;
    if (turn == Player.ONE) {
      card = player1Cards[selectedIndex];
      console.log("card: ", card);
      console.log("current card: ", card);

      if (card.color == currentCard.color || card.value == currentCard.value) {
        var player1Deck = player1Cards;
        console.log("num cards: ", player1Cards.length);
        player1Deck.splice(selectedIndex, 1);
        console.log("num cards: ", player1Cards.length);

        if (player1Cards.length == 0) {
          var input = prompt(
            "What Engineering Department is on the 12th Floor of Benedum? (ans = ece)"
          );
          if (input == "ece") {
            setWinner(Player.ONE);
            alert("Player 1 has won!, Refresh the tab to play again");
          }
          else {
            alert("Wrong answer! +5 cards and end your turn")
            var deck = drawCardPile
            var addCards = deck.slice(0, 5);
            deck = deck.slice(15);
            console.log("addcards len: ",addCards.length)
            for(var i = 0; i < addCards.length; i++) {
              player1Deck.push(addCards[i])
            }
            setDrawCardPile(deck)
          }
        }

        setPlayer1Cards(player1Deck);
        setTurn(Player.TWO);
        setSelectedIndex(0);
        setCanEndTurn(Status.NO);
        setcurrentCard(card);
      }
    } else if (turn == Player.TWO) {
      card = player2Cards[selectedIndex];
      console.log("card: ", card);
      console.log("current card: ", card);

      if (card.color == currentCard.color || card.value == currentCard.value) {
        var player2Deck = player2Cards;
        console.log("num cards: ", player2Cards.length);
        player2Deck.splice(selectedIndex, 1);
        console.log("num cards: ", player2Cards.length);

        if (player2Cards.length == 0) {
          var input = prompt(
            "What color is the sky? (ans = blue)"
          );
          if (input == "blue") {
            setWinner(Player.ONE);
            alert("Player 2 has won!, Refresh the tab to play again");
          }
          else {
            alert("Wrong answer! +5 cards and end your turn")
            var deck = drawCardPile
            var addCards = deck.slice(0, 5);
            deck = deck.slice(15);
            console.log("addcards len: ",addCards.length)
            for(var i = 0; i < addCards.length; i++) {
              player2Deck.push(addCards[i])
            }
            setDrawCardPile(deck)
          }
        }

        setPlayer2Cards(player2Deck);
        setTurn(Player.ONE);
        setSelectedIndex(0);
        setCanEndTurn(Status.NO);
        setcurrentCard(card);
      }
    }
  };

  const handleSeeValues = () => {
    console.log("Current Turn: ", turn);
    console.log("player 1 num cards: ", player1Cards.length);
    console.log("player 1 cards: ", player1Cards);
    console.log(drawCardPile);
  };

  const handleEndOfTurn = () => {
    // switching turn when theres two players
    // todo: add more players later
    if (canEndTurn == Status.YES) {
      if (turn == Player.TWO || turn == "") {
        setTurn(Player.ONE);
      } else {
        setTurn(Player.TWO);
      }
      setCanEndTurn(Status.NO);
    } else {
      console.log("Make sure to draw/play a card!");
    }
  };

  const handleNumCards = () => {
    var num = prompt("How many cards should each user get? (number 0-10)")
    console.log(num)
    setNumCardsDelt(Number(num));
  }

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      {/* Title */}
      <div>
        <h1>UNO Trivia!</h1>
      </div>

      {/* Game Buttons */}
      <div>
        <button onClick={handleStartGame}>Start Game</button>
        <button onClick={handleDrawCard}>Draw Card</button>
        <button onClick={handlePlayCard}>Play Card</button>
        <button onClick={handleEndOfTurn}>End Turn</button>
        <button onClick={handleNumCards}>Set Number of Cards Delt</button>
        <button onClick={handleSeeValues}>Debug </button>
      </div>

      {/* Current Status */}
      <div>
        <h1>
          {" "}
          Current Turn: {turn} | Current Card: {currentCard.color}{" "}
          {currentCard.value} | Drew Card: {canEndTurn} | Winner: {winner}
        </h1>
      </div>

      {/* Player Cards */}
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, backgroundColor: "#ade7ff", padding: "20px" }}>
          {/*Player 1's Cards sections  */}
          <div>
            <h1>Player 1's Cards</h1>
            {player1Cards.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                style={{
                  padding: "10px",
                  border:
                    index === selectedIndex && turn == Player.ONE
                      ? "2px solid blue"
                      : "1px solid black",
                  backgroundColor:
                    index === selectedIndex && turn == Player.ONE
                      ? "lightblue"
                      : "transparent",
                  cursor: "pointer",
                }}
              >
                <div>
                  {item.color} {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, backgroundColor: "#ffc28c", padding: "20px" }}>
          {/*Player 2's Cards sections  */}
          <div>
            <h1>Player 2's Cards</h1>
            {player2Cards.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                style={{
                  padding: "10px",
                  border:
                    index === selectedIndex && turn == Player.TWO
                      ? "2px solid blue"
                      : "1px solid black",
                  backgroundColor:
                    index === selectedIndex && turn == Player.TWO
                      ? "lightblue"
                      : "transparent",
                  cursor: "pointer",
                }}
              >
                <div>
                  {item.color} {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {images.map((imageUrl, index) => (
          <div key={index} style={{ flex: 1, margin: "5px" }}>
            <img
              src={imageUrl}
              alt={`Image ${index}`}
              style={{ width: "100%", height: "250px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnoGame;
