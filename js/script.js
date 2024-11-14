const gameBoard = document.getElementById('game-board');
const attemptsDisplay = document.getElementById('attempts');
const symbols = ['🍎', '🍌', '🍇', '🍒', '🍍', '🍓', '🥝', '🍉'];
let cardSymbols = [...symbols, ...symbols]; 
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


function createBoard() {
    gameBoard.innerHTML = '';
    cardSymbols = shuffle(cardSymbols);

    cardSymbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('col', 'card', 'text-center');
        card.dataset.symbol = symbol;
        card.innerText = "?";
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}


function flipCard(event) {
    const card = event.target;

    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    card.innerText = card.dataset.symbol;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        attempts++;
        attemptsDisplay.innerText = attempts; 
        checkForMatch();
    }
}


function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === symbols.length) {
            setTimeout(() => alert(`Parabéns! Você encontrou todos os pares em ${attempts} tentativas!`), 300);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerText = "?";
            card2.innerText = "?";
        }, 1000);
    }

    flippedCards = [];
}

createBoard();
