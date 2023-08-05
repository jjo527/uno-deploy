// src/utils.ts

import { Card, CardColor, CardValue } from "./card_types";

const generateUNOCards = (): Card[] => {
  const colors: CardColor[] = [
    CardColor.Red,
    CardColor.Green,
    CardColor.Blue,
    CardColor.Yellow,
  ];
  const values: CardValue[] = [
    CardValue.Zero,
    CardValue.One,
    CardValue.Two,
    CardValue.THREE,
    CardValue.FOUR,
    CardValue.FIVE,
    CardValue.SIX,
    CardValue.SEVEN,
    CardValue.EIGHT,
    CardValue.NINE,
  ];

  let cards: Card[] = [];
  let id = 1;

  for (var i = 0; i < 20; i++) {
    for (const color of colors) {
      for (const value of values) {
        cards.push({ id, color, value });
        id++;
      }
    }
  }

  // Add action cards and wild cards
  // cards.push(...actionCards);
  // cards.push(...wildCards);

  return cards;
};

export default generateUNOCards;
