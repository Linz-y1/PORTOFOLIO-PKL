const gameArea = document.getElementById("game-area");
const startBtn = document.getElementById("start-btn");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

let score = 0;
let timeLeft = 30;
let gameInterval;
let boxInterval;
let spawnTime = 1000; // awal 1 detik

startBtn.addEventListener("click", startGame);

function startGame() {
  score = 0;
  timeLeft = 30;
  spawnTime = 1000; // reset ke 1 detik
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  gameArea.innerHTML = "";
  startBtn.disabled = true;

  // Timer
  gameInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  // Kotak muncul pertama kali
  boxInterval = setInterval(spawnBox, spawnTime);
}

function spawnBox() {
  const box = document.createElement("div");
  box.classList.add("box");

  // Posisi random
  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 50);
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;

  // Klik kotak tambah skor
  box.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    box.remove();

    // Semakin cepat setiap kali dapat skor
    if (spawnTime > 300) { // jangan terlalu cepat, batas minimum 300ms
      spawnTime -= 50;
      clearInterval(boxInterval);
      boxInterval = setInterval(spawnBox, spawnTime);
    }
  });

  gameArea.appendChild(box);

  // Hapus kotak setelah 1 detik
  setTimeout(() => {
    if (gameArea.contains(box)) {
      box.remove();
    }
  }, 1000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(boxInterval);
  startBtn.disabled = false;
  alert(`Game Over! Skor kamu: ${score}`);
}


function spawnBox() {
  const box = document.createElement("div");
  box.classList.add("box");

  // Tambah ekor
  const tail = document.createElement("div");
  tail.classList.add("tail");
  box.appendChild(tail);

  // Posisi random
  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 50);
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;

  // Klik kotak tambah skor
  box.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    box.remove();

    if (spawnTime > 300) {
      spawnTime -= 50;
      clearInterval(boxInterval);
      boxInterval = setInterval(spawnBox, spawnTime);
    }
  });

  gameArea.appendChild(box);

  // Hapus kotak setelah 1 detik
  setTimeout(() => {
    if (gameArea.contains(box)) {
      box.remove();
    }
  }, 1000);
}
