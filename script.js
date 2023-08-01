const reels = document.querySelectorAll('.reel');
const symbols = ['❤️', '💎', '🍀', '🍒', '🎱', '☀️']; // Adicione mais símbolos aqui
const spinButton = document.querySelector('.spin-button');
const balanceElement = document.getElementById('balance');
let balance = 1000;

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinReel(reel) {
  const interval = setInterval(() => {
    const symbolElements = reel.querySelectorAll('.symbol');
    symbolElements.forEach((symbolElement, index) => {
      symbolElement.textContent = getRandomSymbol();
    });
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    checkWin(reel);
  }, 2000);
}

function checkWin(reel) {
  const symbolElements = reel.querySelectorAll('.symbol');
  const symbols = Array.from(symbolElements).map(element => element.textContent);
  const uniqueSymbols = new Set(symbols);

  if (uniqueSymbols.size === 1) { // Se todos os símbolos são iguais
    const bet = parseInt(document.getElementById('bet').value);
    balance += bet * 2;
  } else if (uniqueSymbols.size === 2) { // Se dois símbolos são iguais (um é diferente)
    const bet = parseInt(document.getElementById('bet').value);
    balance += bet * 0.5;
  } else { // Se todos os símbolos são diferentes
    const bet = parseInt(document.getElementById('bet').value);
    balance -= bet;
  }

  updateBalance();
}

function updateBalance() {
  balanceElement.textContent = balance;
}

function spin() {
  const bet = parseInt(document.getElementById('bet').value);

  if (bet <= 0 || bet > balance) {
    alert('Aposta inválida! Certifique-se de que a aposta é maior que 0 e menor ou igual ao saldo disponível.');
    return;
  }

  reels.forEach(spinReel);
}
