const board = document.getElementById("board");
const colorPicker = document.getElementById("color-picker");
const clearBtn = document.getElementById("clear-btn");

let drawing = false;

// Buat grid 16x16
for (let i = 0; i < 16 * 16; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");

  pixel.addEventListener("mousedown", () => {
    drawing = true;
    pixel.style.background = colorPicker.value;
  });

  pixel.addEventListener("mouseover", () => {
    if (drawing) {
      pixel.style.background = colorPicker.value;
    }
  });

  board.appendChild(pixel);
}

document.body.addEventListener("mouseup", () => {
  drawing = false;
});

// Tombol clear
clearBtn.addEventListener("click", () => {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((p) => (p.style.background = "#fff"));
});
