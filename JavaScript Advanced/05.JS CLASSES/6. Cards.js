let result = (function () {
    return {
        Suits: {
            SPADES: "\u2660",
            HEARTS: "\u2665",
            DIAMONDS: "\u2666",
            CLUBS: "\u2663"
        },
        Card: class Card {
            constructor(face, suit) {
                this.face = face
                this.suit = suit
            }

            get face() {
                return this._face;
            }
            set face(value) {
                let validFaces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
                if (!validFaces.includes(value)) {
                    throw new Error("An invalid face is passed!");
                }
                return this._face = value;
            }

            get suit() {
                return this._suit;
            }
            set suit(value) {
                let validSuits = Object.values(result.Suits);
                if (!validSuits.includes(value)) {
                    throw new Error("An invalid sute is passed!");
                }
                return this._suit = value;
            }
        }
    }
})();

let Card = result.Card;
let Suits = result.Suits;
let card = new Card("Q", Suits.CLUBS);
console.log(card)
card.face = "A";
card.suit = Suits.DIAMONDS;
console.log(card)
