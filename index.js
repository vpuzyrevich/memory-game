const cards = document.querySelectorAll('.card-game');
const memoryGame = document.querySelector('.memory-game');
const winContainer = document.querySelector('.win');
const movesContainer = document.querySelector('.moves-container');
const lavelContainer = document.querySelector('.lavel-container');
const movesScore = document.querySelector('.moves-score');

let hasFlippedCard = false;
let lockCards = false;
let firstCard, secondCard;
let countFlip = 0;
let counterMoves = 0;
let counterLavel = 1;
let arrCountMoves = [];



function flipCard() {
    if (lockCards) {
        return;
    }
    if (this === firstCard) {
        return;
    }
    counterMoves++;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkCompareCards();
}

const unflipCards = () => {
    lockCards = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCards();
    }, 800);
};

const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCards();
};

const checkCompareCards = () => {
   if (firstCard.dataset.animal === secondCard.dataset.animal) {
    disableCards();
    countFlip++;
    finishGame();
    return;
    }
    unflipCards();
};
const resetCards = () => {
    [hasFlippedCard, lockCards] = [false, false];
    [firstCard, secondCard] = [null, null];
};

const rearrangeCards = () => {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 24);
      card.style.order = ramdomPos;
    });
};
rearrangeCards();

const saveMoves = (arrCountMoves) => {
    arrCountMoves.map((item, i) => {
        const liMoves = document.createElement('li');
        const liLavel = document.createElement('li');
        if(i < 10) {
            liMoves.classList.add('moves');
            liMoves.textContent = item;
            movesContainer.prepend(liMoves);

            liLavel.classList.add('lavel');
            liLavel.textContent = i + 1;
            lavelContainer.append(liLavel);   
        }
    });
};

const finishGame = () => {
    if(countFlip === 6){
        winContainer.style.display = 'block';
        score(counterMoves);
        console.log(arrCountMoves);
        window.addEventListener("beforeunload", setLocalStorage);
        setTimeout(() => {
            cards.forEach(card => {
                card.classList.remove('flip');
                winContainer.style.display = 'none';
                window.location.reload();
            });
        }, 4000);
    }
};
const score = () => {
    movesScore.textContent = `Moves: ${counterMoves}`;
    arrCountMoves.unshift(counterMoves);
};

function setLocalStorage() {
    localStorage.setItem("arrCountMoves", JSON.stringify(arrCountMoves));
}
function getLocalStorage() {
    if(localStorage.getItem('arrCountMoves')) {
        arrCountMoves = JSON.parse(localStorage.getItem('arrCountMoves'));
        saveMoves(arrCountMoves);
    }
}
window.addEventListener('load', getLocalStorage);


cards.forEach(card => card.addEventListener('click', flipCard));


console.log('Вёрстка +10\nЛогика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10\nИгра завершается, когда открыты все карточки +10\nПо окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10\nРезультаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10\nПо клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх +10\nОчень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n70');