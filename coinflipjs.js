let selectedSide = null;
let balance = 1000;

function selectSide(side) {
  selectedSide = side;

  const sides = document.querySelectorAll('.side');
  sides.forEach((btn) => {
    btn.classList.remove('selected');
  });

  const selectedBtn = document.querySelector(`.side.${side}`);
  selectedBtn.classList.add('selected');
}

function play() {
  if (!selectedSide) {
    alert('Escolha um lado da moeda antes de jogar.');
    return;
  }

  const betInput = document.getElementById('bet');
  const bet = parseInt(betInput.value);

  if (isNaN(bet) || bet <= 0 || bet > balance) {
    alert('Insira uma aposta válida maior que 0 e menor ou igual ao seu saldo.');
    return;
  }

  const coin = document.getElementById('coin');
  const resultDiv = document.getElementById('result');
  const sides = ['blue', 'red'];
  const randomSide = sides[Math.floor(Math.random() * sides.length)];

  coin.style.animation = '';
  void coin.offsetWidth; // Trigger reflow to reset animation

  coin.className = 'coin'; // Reset the class to remove previous color class
  coin.classList.add(randomSide); // Add the new color class based on the random side

  if (selectedSide === randomSide) {
    const winnings = bet * 2;
    balance += winnings;
    resultDiv.textContent = `Você ganhou! A moeda caiu em ${randomSide}. Ganhou ${winnings} moedas.`;
  } else {
    balance -= bet;
    resultDiv.textContent = `Você perdeu! A moeda caiu em ${randomSide}. Perdeu ${bet} moedas.`;
  }

  document.getElementById('bet').value = '';
  document.getElementById('balance').textContent = `Saldo: ${balance} moedas`;
  coin.style.animation = 'spin 2s linear';
  selectedSide = null; // Reset selectedSide after the result is shown
}
