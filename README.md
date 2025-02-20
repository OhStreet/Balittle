# NOTES

This game is designed to be a barebones mockup of the game Balatro.

Each card has a chip value according to their rank (Aces give 11 chips, face cards give 10, and numbered cards give chips according to their number)
The player has one round to score enough chips to win the blind. Players score by selecting and playing poker hands, and each poker hand has a 
base chip multiplier value to be added to the score. Players get 5 hands (or 5 chances) to score enough chips to beat the blind

Before the round, the player gets to pick 3 Tarot cards to enhance their deck. These cards act as passive buffs and have varying effects to chip values and multipliers

On top of 5 hands to play, the player is allowed 3 free shuffles, which redraws the cards again.

My original plan was to do 3 rounds of blinds; picking 2 tarots before each round, and having a functional discard system instead of shuffles,
but I did not give myself enough time to pull that off, so the game flow was shortened to one round. Because of that, there are surely some balancing
issues, but everything functions as intended.

# Balittle - Game Functions, Variables, and Events

# Tarot Poker Game Documentation

## Functions

### Game Flow
- `drawTarots()` - Draws 6 random tarot cards for selection
- `displayTarots(cards)` - Displays tarot cards with tooltips for selection
- `displaySelectedTarotsOnPlayScreen()` - Shows selected tarot cards on play screen
- `drawCards()` - Draws 8 random playing cards from deck
- `displayCards(hand)` - Displays cards in the hand container
- `updateActiveHand(selectedCards, activeHandContainer)` - Updates the active hand display based on selected cards
- `calculateHandDetails(selectedCards)` - Calculates hand type, chip value, and multiplier
- `playHand()` - Calculates score for current hand and updates game state
- `updateGameCounters()` - Updates display of remaining hands and shuffles
- `updateScoreDisplay(score)` - Updates score display and checks win condition
- `resetHand()` - Clears current hand and draws new cards
- `resetGame()` - Resets all game variables and displays to initial state

### Tarot Effects
- `applyTarots(selectedTarots, selectedCards)` - Applies tarot card effects to the hand

### Poker Hand Evaluation
- `calculatePokerHand(selectedCards)` - Determines the best poker hand from selected cards
- `isFlush(suits, selectedCards)` - Checks if hand is a flush
- `isStraight(values, selectedCards)` - Checks if hand is a straight
- `isFullHouse(values, selectedCards)` - Checks if hand is a full house
- `isThreeOfAKind(values, selectedCards)` - Checks if hand has three of a kind
- `isTwoPair(values, selectedCards)` - Checks if hand has two pairs
- `isPair(values, selectedCards)` - Checks if hand has a pair
- `isHighCard(values, selectedCards)` - Identifies the highest card in hand

## Variables

### Game State
- `selectedTarots` - Array storing the player's selected tarot cards
- `playerScore` - Current player score
- `handsRemaining` - Number of hands remaining to play (starts at 5)
- `shufflesRemaining` - Number of shuffles remaining (starts at 3)

### Card Collections
- `tarot` - Array of tarot card objects with name and image properties
- `deck` - Array of playing card objects with suit, value, chips, and image properties

### DOM Elements
- `startGameButton` - Button to start the game
- `startScreen` - The initial game screen
- `playScreen` - The main gameplay screen
- `tarotScreen` - Screen for tarot card selection
- `winScreen` - Screen displayed when player wins
- `loseScreen` - Screen displayed when player loses
- `nextRoundButton` - Button to proceed to next round
- `shuffleButton` - Button to shuffle cards
- `resetButton` - Button to reset the game
- `mainMenuButton` - Button to return to main menu
- `helpScreen` - Screen with game instructions

## Event Listeners

### Game Navigation
- `startGameButton.addEventListener("click", ...)` - Starts game and shows tarot selection
- `selectButton.addEventListener("click", ...)` - Confirms tarot selection and starts play
- `resetButton.forEach(button => button.addEventListener("click", resetGame))` - Resets the game
- `mainMenuButton.forEach(button => button.addEventListener("click", ...))` - Returns to main menu

### Gameplay Actions
- `shuffleButton.addEventListener("click", ...)` - Shuffles cards if shuffles remain
- `playHandButton.addEventListener("click", ...)` - Plays the current hand if cards are selected

### Help Display
- `document.querySelectorAll(".help_button").forEach(button => button.addEventListener("click", ...))` - Toggles help screen
- `document.querySelector(".help_screen").addEventListener("click", ...)` - Closes help screen when clicked

### Card Interactions
- Card click events in `displayTarots()` - Handles tarot card selection
- Card click events in `displayCards()` - Handles playing card selection

## Game Mechanics

### Scoring System
- Base score = Sum of chip values of valid cards in hand
- Final score = Base score × Hand multiplier
- Win condition: Reach 1250 points before running out of hands

### Hand Types and Multipliers
- High Card: 1×
- Pair: 2×
- Two Pair: 3×
- Three of a Kind: 3×
- Flush: 5×
- Straight: 6×
- Full House: 7×

# Tarot Effects
- **The Fool**: Randomizes chip values of all selected cards
- **The Magician**: Doubles the chip value of all selected cards
- **The Priestess**: Increases hand multiplier by 3
- **The Empress**: Adds 5 chips to each selected card
- **The Emperor**: Doubles hand multiplier
- **The Hierophant**: Adds 15 chips to every card with the heart suit
- **The Chariot**: Adds 30 chips to the highest card in hand
- **Strength**: Adds 2 chips to each selected card and increases hand multiplier by 1
- **The Hermit**: If only one card is played, triples its chip value and increases hand multiplier by 1
- **Justice**: Lowest value card in hand receives a 20 chip bonus
- **Temperance**: Reduces hand multiplier by 1, but adds 10 chips to each selected card
- **Judgement**: Triples chips of every card in hand, but reduces hand multiplier by 2

# FOLDER STRUCTURE

Balittle/
├── index.html
├── README.md
├── css/
|   ├── styles.css
├── js/
|   ├── game.js
|   ├── deck.js
└── images/
    ├── Normal-cards
    |   ├── cards...
    ├── Tarot-cards
        ├── cards...
