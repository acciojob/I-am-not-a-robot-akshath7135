//your code here
document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("imageContainer");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const message = document.getElementById("para");

  const images = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300/",
    "https://picsum.photos/200/300.jpg",
  ];

  let selectedImages = [];
  let duplicateIndex = Math.floor(Math.random() * 5);
  let shuffledImages = [...images];
  shuffledImages.push(images[duplicateIndex]); // Add duplicate
  shuffledImages.sort(() => Math.random() - 0.5); // Shuffle array

  function renderImages() {
    imageContainer.innerHTML = "";
    shuffledImages.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.dataset.index = index;
      img.addEventListener("click", () => selectImage(img, src));
      imageContainer.appendChild(img);
    });
  }

  function selectImage(img, src) {
    if (selectedImages.length < 2 && !img.classList.contains("selected")) {
      img.classList.add("selected");
      selectedImages.push({ img, src });

      if (selectedImages.length === 2) {
        verifyButton.style.display = "block";
      }
      resetButton.style.display = "block";
    }
  }

  function verifySelection() {
    if (selectedImages.length === 2) {
      const [first, second] = selectedImages;
      if (first.src === second.src) {
        message.textContent = "You are a human. Congratulations!";
      } else {
        message.textContent =
          "We can't verify you as a human. You selected the non-identical tiles.";
      }
      verifyButton.style.display = "none";
    }
  }

  function resetSelection() {
    selectedImages.forEach(({ img }) => img.classList.remove("selected"));
    selectedImages = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    message.textContent = "";
  }

  renderImages();

  resetButton.addEventListener("click", resetSelection);
  verifyButton.addEventListener("click", verifySelection);
});
