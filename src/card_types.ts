// src/types.ts

export enum Player {
  ONE = "Player 1",
  TWO = "Player 2",
}

export enum Status {
  YES = "yes",
  NO = "no",
  BLANK = "",
}

export enum CardColor {
  Red = "red",
  Green = "green",
  Blue = "blue",
  Yellow = "yellow",
  BLACK = "black",
  BLANK = "",
}

export enum CardValue {
  Zero = "0",
  One = "1",
  Two = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  SKIP = "skip",
  REVERSE = "reverse",
  DRAW2 = "draw2",
  WILD = "wild",
  WILDDRAW = "wilddraw",
  BLANK = "",
  // Add other values as needed
}

export type Card = {
  id: number;
  color: CardColor;
  value: CardValue | string; // You can use `CardValue` enum here if you want predefined values only
};

export type Deck = Card[];
