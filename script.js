//your code here
const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

let selectedImages = [];
let duplicateImage = images[Math.floor(Math.random() * images.length)];
let allImages = [...images, duplicateImage].sort(() => Math.random() - 0.5);

const imageContainer = document.getElementById("image-container");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const messagePara = document.getElementById("para");

function displayImages() {
  allImages.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("img");
    img.addEventListener("click", () => selectImage(img));
    imageContainer.appendChild(img);
  });
}

function selectImage(img) {
  if (selectedImages.length < 2 && !selectedImages.includes(img.src)) {
    img.classList.add("selected");
    selectedImages.push(img.src);
    resetButton.style.display = "block";

    if (selectedImages.length === 2) {
      verifyButton.style.display = "block";
    }
  }
}

resetButton.addEventListener("click", resetSelection);
verifyButton.addEventListener("click", verifySelection);

function resetSelection() {
  selectedImages = [];
  resetButton.style.display = "none";
  verifyButton.style.display = "none";
  messagePara.textContent = "";
  document.querySelectorAll(".selected").forEach((img) => img.classList.remove("selected"));
}

function verifySelection() {
  if (selectedImages[0] === selectedImages[1]) {
    messagePara.textContent = "You are a human. Congratulations!";
  } else {
    messagePara.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  verifyButton.style.display = "none";
}

window.onload = displayImages;