const startGameButton = document.getElementById("startGameButton");
const startScreen = document.querySelector(".start_screen");
const playScreen = document.querySelector(".play_screen");
const tarotScreen = document.querySelector(".tarot_screen");
const winScreen = document.querySelector(".win_screen");
const loseScreen = document.querySelector(".lose_screen");
const nextRoundButton = document.getElementById("nextRoundButton");
const shuffleButton = document.querySelector(".shuffle");
const resetButton = document.querySelectorAll("#resetButton");
const mainMenuButton = document.querySelectorAll(".main_menu");
const helpScreen = document.querySelector(".help_screen");

console.log(deck);
// Global variables
let selectedTarots = []; // Stores selected tarot cards
let playerScore = 0;
let handsRemaining = 5;
let shufflesRemaining = 3

// Tarot array
const tarot = [
    { name: "fool", image: "images/Tarot-cards/fool.png" },
    { name: "magician", image: "images/Tarot-cards/magician.png" },
    { name: "priestess", image: "images/Tarot-cards/priestess.png" },
    { name: "empress", image: "images/Tarot-cards/empress.png" },
    { name: "emperor", image: "images/Tarot-cards/emperor.png" },
    { name: "hierophant", image: "images/Tarot-cards/hierophant.png" },
    { name: "chariot", image: "images/Tarot-cards/chariot.png" },
    { name: "strength", image: "images/Tarot-cards/strength.png" },
    { name: "hermit", image: "images/Tarot-cards/hermit.png" },
    { name: "justice", image: "images/Tarot-cards/justice.png" },
    { name: "temperance", image: "images/Tarot-cards/temperance.png" },
    { name: "judgement", image: "images/Tarot-cards/judgement.png" }
];

// Start the game
startGameButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    tarotScreen.style.display = "block";
    drawTarots(); // Draw tarot cards for the selection screen
});

// Draw and display 6 tarot cards for selection
function drawTarots() {
    const shuffled = tarot.sort(() => Math.random() - 0.5);
    const tarotOptions = shuffled.slice(0, 6); // Draw 6 random tarot cards
    displayTarots(tarotOptions); // Display the tarot options
}

// Display tarot cards for selection
function displayTarots(cards) {
    const tarotSelectionContainer = document.querySelector(".tarot_selection");
    tarotSelectionContainer.innerHTML = ''; // Clear previous cards

    // Get tooltip definitions from HTML
    const tooltipData = {};
    document.querySelectorAll(".tarot-card").forEach(element => {
        const cardName = element.getAttribute("data-name"); // Grabs tarot from array
        const tooltipText = element.querySelector(".tooltip").textContent; // Grabs tarot information
        tooltipData[cardName] = tooltipText; // Puts information in tooltip
    });

    cards.forEach(card => {
        const img = document.createElement("img"); // Generating the cards
        img.src = card.image;
        img.alt = card.name;

        // Create tooltip element
        const tooltip = document.createElement("div");
        tooltip.className = "tarot-tooltip";
        tooltip.textContent = tooltipData[card.name] || `Effect for ${card.name}`;

        // Handle card selection/deselection
        img.addEventListener("click", () => {
            if (selectedTarots.includes(card)) {
                selectedTarots = selectedTarots.filter(selected => selected !== card); // Deselect. Creates array of selected cards, and removes from array if clicked again
                img.style.border = "none";
            } else {
                if (selectedTarots.length < 3) { // Allow only 3 selections
                    selectedTarots.push(card); // Select
                    img.style.border = "2px solid blue";
                }
            }
        });

        // Tooltip hover events
        img.addEventListener("mouseenter", () => {
            tooltip.style.display = "block";
        });
        
        img.addEventListener("mouseleave", () => {
            tooltip.style.display = "none";
        });

        tarotSelectionContainer.appendChild(img);
        document.body.appendChild(tooltip);
    });
}

// Handle tarot selection and move to the play screen
const selectButton = document.querySelector(".select_tarot");
selectButton.addEventListener("click", () => {
    if (selectedTarots.length === 3) { // Checks if cards are selected
        displaySelectedTarotsOnPlayScreen(); // Display selected tarots on the play screen
        drawCards();
        tarotScreen.style.display = "none";
        playScreen.style.display = "block";
    } else {
        alert("Please select exactly 3 tarot cards.");
    }
});

// Display selected tarot cards on the play screen
function displaySelectedTarotsOnPlayScreen() {
    const playTarotSlots = document.querySelector(".play_screen .tarot_slots");
    playTarotSlots.innerHTML = ''; // Clear previous cards

    const tooltipData = {}; // Generating tooltips again
    document.querySelectorAll(".tarot-card").forEach(element => {
        const cardName = element.getAttribute("data-name");
        const tooltipText = element.querySelector(".tooltip").textContent;
        tooltipData[cardName] = tooltipText;
    });


    selectedTarots.forEach(card => {

        const cardContainer = document.createElement("div");
        cardContainer.style.position = "relative";
        cardContainer.style.display = "inline-block"; 

        const img = document.createElement("img");
        img.src = card.image;
        img.alt = card.name;
        img.style.display = "block";

        // Create the tooltip element
        const tooltip = document.createElement("div");
        tooltip.className = "tarot-tooltip"; // Class for styling
        tooltip.textContent = tooltipData[card.name] || `Effect for ${card.name}`;
        tooltip.style.position = "absolute";
        tooltip.style.display = "none"; // Hide by default

        cardContainer.appendChild(img);
        cardContainer.appendChild(tooltip);

        // Tooltip hover events
        img.addEventListener("mouseenter", () => {
            tooltip.style.display = "block";
        });

        img.addEventListener("mouseleave", () => {
            tooltip.style.display = "none";
        });

        // Putting tarot cards in tarot slot holder
        playTarotSlots.appendChild(cardContainer);


    });
}

function drawCards() {
    const shuffled = deck.sort(() => Math.random() - 0.5); // Shuffle math
    const hand = shuffled.slice(0, 8); // Draw 8 random cards
    displayCards(hand);
};

// Function to display selected cards in the active hand
function displayCards(hand) {
    const handContainer = document.querySelector(".hand");
    const activeHandContainer = document.querySelector(".active_hand");
    handContainer.innerHTML = '';
    activeHandContainer.innerHTML = '';

    let selectedCards = []; // Array to track cards

    hand.forEach(card => { // Similar logic to generating Tarot cards, with handing selection and deselection
        const img = document.createElement("img");
        img.src = card.image;
        img.alt = `${card.value} of ${card.suit}`;
        img.setAttribute("data-chips", card.chips); // Store chip value in a data attribute

        // Handle card selection
        img.addEventListener("click", () => {
            if (selectedCards.includes(card)) {
                selectedCards = selectedCards.filter(selected => selected !== card);
                img.style.border = "none";
                
            } 
            else {
                if (selectedCards.length < 5) { // Allow only 5 selections
                    selectedCards.push(card); // Select the card
                    img.style.border = "4px solid #7b1414";
                } else {
                    alert("You can only select up to 5 cards.");
                }
            }

            // Update the active hand display
            updateActiveHand(selectedCards, activeHandContainer);
        });

        handContainer.appendChild(img);
    });
}

function calculateHandDetails(selectedCards) {
    // Calculating the valid hand and the cards that are part of it
    const { hand, validCards } = calculatePokerHand(selectedCards);

    // Calculate the total chips from the valid cards only
    let totalChips = validCards.reduce((sum, card) => sum + card.chips, 0);

    // Setting the hand multiplier based on the hand type
    let handMultiplier = 1;
    switch (hand) {
        case "High Card":
            handMultiplier = 1;
            break;
        case "Pair":
            handMultiplier = 2;
            break;
        case "Two Pair":
            handMultiplier = 3;
            break;
        case "Three of a Kind":
            handMultiplier = 3;
            break;
        case "Flush":
            handMultiplier = 5;
            break;
        case "Straight":
            handMultiplier = 6;
            break;
        case "Full House":
            handMultiplier = 7;
            break;
    }

    // Applying tarot effects to hand
    const { chipBonus, multiplierBonus } = applyTarots(selectedTarots, validCards);

    // Adjusting chips and mult based on tarot effects
    totalChips += chipBonus;
    handMultiplier += multiplierBonus;

    return { hand, totalChips, handMultiplier };
}

// Function to update the active hand display
function updateActiveHand(selectedCards, activeHandContainer) {
    
    // Check if no cards are selected. If no card is selected, values on display are set to default
    if (selectedCards.length === 0) {
        activeHandContainer.innerHTML = '';
        // Reset the displayed details
        const validHandDisplay = document.getElementById("validHandDisplay");
        const chipValueDisplay = document.getElementById("chipValueDisplay");
        const multiplierDisplay = document.getElementById("multiplierDisplay");

        validHandDisplay.textContent = "None"; 
        chipValueDisplay.textContent = "0"; 
        multiplierDisplay.textContent = "1"; 

        return; // Stops function if no cards are selected
    }
    
    activeHandContainer.innerHTML = ''; // Clear previous active hand

    selectedCards.forEach(card => { // Generating cards for the active hand, or the hand of cards the player selects
        const img = document.createElement("img");
        img.src = card.image;
        img.alt = `${card.value} of ${card.suit}`;
        img.setAttribute("data-chips", card.chips); // Store chip value in a data attribute
        activeHandContainer.appendChild(img);
    });

    // Updates the active hand display according to what the player has selected
    const { hand, totalChips, handMultiplier } = calculateHandDetails(selectedCards);

    const validHandDisplay = document.getElementById("validHandDisplay");
    const chipValueDisplay = document.getElementById("chipValueDisplay");
    const multiplierDisplay = document.getElementById("multiplierDisplay");

    validHandDisplay.textContent = hand;
    chipValueDisplay.textContent = totalChips;
    multiplierDisplay.textContent = handMultiplier;
}

// PlayHand function, also works with updateGameCounter to check for lose conditions (no hands left, score not beat)
function playHand() {
    
    if (handsRemaining != 0) {
        const selectedCards = Array.from(document.querySelectorAll(".active_hand img")).map(img => { // Selects all cards in the active hand, and converts it into an array
            const cardValue = img.alt.split(" of ")[0]; // Extract card value from alt text
            const cardSuit = img.alt.split(" of ")[1]; // Extract card suit from alt text
            return deck.find(card => card.value === cardValue && card.suit === cardSuit); // Find card in deck
        });

        // Calculate hand details
        const { totalChips, handMultiplier } = calculateHandDetails(selectedCards);

        // Update player's score
        playerScore += totalChips * handMultiplier;
        updateScoreDisplay(playerScore);

        // Reset for next hand
        resetHand();
        handsRemaining --;

        updateGameCounters();
    }
    else {
        playScreen.style.display = "none";
        loseScreen.style.display = "block";
    }

}

// Function to update hands/shuffles remaining
function updateGameCounters() {
    // Update shuffles counter
    const shuffleDisplay = document.querySelector(".shuffle_hand_counter p:last-child");
    shuffleDisplay.textContent = `Shuffles Left: ${shufflesRemaining}`;
    
    // Update hands counter
    const handsRemainingDisplay = document.querySelector(".shuffle_hand_counter p:first-child");
    handsRemainingDisplay.textContent = `Hands Left: ${handsRemaining}`;
}

// Shuffle button event listener
shuffleButton.addEventListener("click", () => {
    if (shufflesRemaining > 0) {
        drawCards();
        shufflesRemaining--;
        updateGameCounters();
    }
    else
    {
        alert("No Shuffles Left.");
    }
});


// Function to update the score display
function updateScoreDisplay(score) {
    const scoreDisplay = document.querySelector(".score_counter h3:last-child");
    scoreDisplay.innerHTML = `Your score: <span class="highlight">${score}</span>`;


    if (score >= 1250) { // Win condition check
        playScreen.style.display = "none";
        winScreen.style.display = "block";
    }
}
// Function to reset the hand
function resetHand() {
    const handContainer = document.querySelector(".hand");
    const activeHandContainer = document.querySelector(".active_hand");
    handContainer.innerHTML = ''; // Clear the hand
    activeHandContainer.innerHTML = ''; // Clear the active hand

    drawCards(); // Draw a new hand of 8 cards
}
// Play hand button event listener
const playHandButton = document.querySelector(".play_hand");
playHandButton.addEventListener("click", () => {
    const selectedCards = document.querySelectorAll(".active_hand img");
    if (selectedCards.length > 0) { // Allow playing with 1 to 5 cards
        playHand();
    } else {
        alert("Please select at least 1 card to play your hand.");
    }
});

//Function to apply tarot effects
function applyTarots(selectedTarots, selectedCards) {
    // Variables to use in calculateHandDetails()
    let chipBonus = 0;
    let multiplierBonus = 0;

    selectedTarots.forEach(tarot => {
        // Switch statements for each tarot card
        switch (tarot.name) {
            case "fool": // Randomizes chip values of all selected cards
                selectedCards.forEach(card => {
                    chipBonus += Math.floor(Math.random() * 20) + 1 - card.chips; // Same math as shuffle, but adding a range of 20 and subtracting it from base chip value
                });
                break;
            case "magician": // Double the chip value of all selected cards
                selectedCards.forEach(card => {
                    chipBonus += card.chips; // Adds original chip value as bonus
                });
                break;
            case "priestess": // Increases hand multiplier by 3
                multiplierBonus += 3;
                break;
            case "empress": // Adds 5 chips to each selected card
                chipBonus += selectedCards.length * 5;
                break;
            case "emperor": // Doubles hand multiplier
                multiplierBonus *= 2;
                break;
            case "hierophant": // Adds 15 chips to every card with the heart suit
                selectedCards.forEach(card => {
                    if (card.suit === "hearts") {
                        chipBonus += 15;
                    }
                });
                break;
            case "chariot": // Adds 30 chips to the highest card in hand
                let highestCard = selectedCards.reduce((max, card) => (card.chips > max.chips ? card : max), selectedCards[0]); // Looked up how to do this one. reduce() iterates over selectedCards,
                chipBonus += 30;                                                                                                // and finds card with the highest chip value
                break;
            case "strength": // Adds 2 chips to each selected card and increases hand multiplier by 1
                chipBonus += selectedCards.length * 2;
                multiplierBonus += 1;
                break;
            case "hermit": // If only one card is played, triple its chip value and increase hand multiplier by 1
                if (selectedCards.length === 1) {
                    chipBonus += selectedCards[0].chips * 2; // Adds 2x the original chip value
                    multiplierBonus += 1;
                }
                break;
            case "justice": // Lowest value card in hand receives a 20 chip bonus
                let weakestCard = selectedCards.reduce((min, card) => (card.chips < min.chips ? card : min), selectedCards[0]); // Opposite as Chariot math
                chipBonus += 20;
                break;
            case "temperance": // Reduces hand multiplier by 1, but adds 10 chips to each selected card
                chipBonus += selectedCards.length * 10;
                multiplierBonus = Math.max(1, multiplierBonus - 1);
                break;
            case "judgement": // Triples chips of every card in hand, but reduces hand multiplier by 2
                chipBonus += selectedCards.reduce((sum, card) => sum + 2 * card.chips, 0); // Adds twice the base chip value of each card
                multiplierBonus = Math.max(1, multiplierBonus - 2);
                break;
        }
    });

    return { chipBonus, multiplierBonus };
}


function calculatePokerHand(selectedCards) {
    
    const values = selectedCards.map(card => card.value); // Extract card values
    const suits = selectedCards.map(card => card.suit); // Extract card suits
    
    // Checking for hand validity, and determining what cards selected are valid for scoring
    if (isFlush(suits, selectedCards).isValid) 
    {
        return { hand: "Flush", validCards: selectedCards };
    } else if (isStraight(values, selectedCards).isValid) 
    {
        return { hand: "Straight", validCards: selectedCards };
    } else if (isFullHouse(values, selectedCards).isValid) 
    {
        return { hand: "Full House", validCards: isFullHouse(values, selectedCards).validCards };
    } else if (isThreeOfAKind(values, selectedCards).isValid) 
    {
        return { hand: "Three of a Kind", validCards: isThreeOfAKind(values, selectedCards).validCards };
    } else if (isTwoPair(values, selectedCards).isValid) 
    {
        return { hand: "Two Pair", validCards: isTwoPair(values, selectedCards).validCards };
    } else if (isPair(values, selectedCards).isValid) 
    {
        return { hand: "Pair", validCards: isPair(values, selectedCards).validCards };
    } else if (isHighCard(values, selectedCards).isValid)
    {
        return { hand: "High Card", validCards: isHighCard(values, selectedCards).validCards};
    }
    
}

                                // Poker hand logic functions
function isFlush(suits, selectedCards) {
    const isValid = selectedCards.length === 5 && suits.every(suit => suit === suits[0]); // Checks the suits
    return { isValid, validCards: isValid ? selectedCards : [] }; // Returns valid, scorable cards
}
function isStraight(values, selectedCards) {
    // Looked this one up. rankMap helps convert face cards to numerical values
    // then the values.map statement converts the card ranks into values, and sorts in ascending order.
    const rankMap = { 'A': 14, 'K': 13, 'Q': 12, 'J': 11, '10': 10, '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2 };
    const ranks = values.map(value => rankMap[value]).sort((a, b) => a - b);

    let isValid = selectedCards.length === 5; // Straights must be played with 5 cards
    for (let i = 1; i < ranks.length; i++) { // For loop to check if each number is 1 more than the previous
        if (ranks[i] !== ranks[i - 1] + 1) {
            isValid = false;
            break;
        }
    }

    return { isValid, validCards: isValid ? selectedCards : [] };
}
// Logic for this function is reused for the rest below, so commenting on just this one.
function isFullHouse(values, selectedCards) { // values - the array of card ranks
    const valueCounts = {}; // Stores how many times the card ranks appear
    values.forEach(value => { // Iterates over values, and updates valueCounts
        valueCounts[value] = (valueCounts[value] || 0) + 1;
    });

    const threeOfAKindValue = Object.keys(valueCounts).find(value => valueCounts[value] >= 3); // Looks for a three of a kind in the valueCounts
    const pairValue = Object.keys(valueCounts).find(value => valueCounts[value] >= 2 && value !== threeOfAKindValue); // Looks for a pair in the valueCounts

    if (threeOfAKindValue && pairValue) { // If both instances are present
        return { isValid: true, validCards: selectedCards.filter(card => card.value === threeOfAKindValue || card.value === pairValue) };
    }
    return { isValid: false, validCards: [] };
}
function isThreeOfAKind(values, selectedCards) {
    const valueCounts = {};
    values.forEach(value => {
        valueCounts[value] = (valueCounts[value] || 0) + 1;
    });
    const threeOfAKindValue = Object.keys(valueCounts).find(value => valueCounts[value] >= 3);
    if (threeOfAKindValue) {
        return { isValid: true, validCards: selectedCards.filter(card => card.value === threeOfAKindValue) };
    }
    return { isValid: false, validCards: [] };
}
function isTwoPair(values, selectedCards) {
    const valueCounts = {};
    values.forEach(value => {
        valueCounts[value] = (valueCounts[value] || 0) + 1;
    });

    const pairValues = Object.keys(valueCounts).filter(value => valueCounts[value] >= 2);
    if (pairValues.length >= 2) { // Looks for 2 instances of pairs
        return { isValid: true, validCards: selectedCards.filter(card => pairValues.includes(card.value)) };
    }
    return { isValid: false, validCards: [] };
}
function isPair(values, selectedCards) {
    const valueCounts = {};
    values.forEach(value => {
        valueCounts[value] = (valueCounts[value] || 0) + 1;
    });

    const pairValue = Object.keys(valueCounts).find(value => valueCounts[value] >= 2);
    if (pairValue) {
        return { isValid: true, validCards: selectedCards.filter(card => card.value === pairValue) };
    }
    return { isValid: false, validCards: [] };
}
function isHighCard(values, selectedCards) {
    let highestCard = selectedCards[0]; // Initializing highestCard as the first card in selectedCards
    selectedCards.forEach(card => { // Loops through the array, comparing chip values. Updates Highest card if chip values are higher
        if (card.chips > highestCard.chips) {
            highestCard = card;
        }
    });
    return { isValid: true, validCards: [highestCard] };
}

function resetGame() {
    // Reset game variables
    playerScore = 0;
    handsRemaining = 5;
    shufflesRemaining = 3;
    selectedTarots = []; 

    // Update UI elements
    updateScoreDisplay(playerScore);
    updateGameCounters(); 

    validHandDisplay.textContent = "None"; 
    chipValueDisplay.textContent = "0"; 
    multiplierDisplay.textContent = "1"; 

    // Clear active hand area
    document.querySelector(".active_hand").innerHTML = "";

    // Reset screens
    playScreen.style.display = "none";
    tarotScreen.style.display = "none";
    startScreen.style.display = "block";
}

// Other Event Listeners
resetButton.forEach(button => {
    button.addEventListener("click", resetGame);
});

mainMenuButton.forEach(button => {
    button.addEventListener("click", () => {
        winScreen.style.display = "none";
        loseScreen.style.display = "none";
        startScreen.style.display = "block";
        resetGame();
    });
});

document.querySelectorAll(".help_button").forEach(button => {
    button.addEventListener("click", () => {
        if (helpScreen.style.display === "block") {
            helpScreen.style.display = "none"; // Hide if it's already visible
        } else {
            helpScreen.style.display = "block"; // Show if it's hidden
        }
    });
});

document.querySelector(".help_screen").addEventListener("click", () => {
    if (helpScreen.style.display === "block") {
        helpScreen.style.display = "none"; // Hide if it's already visible
    }
});
