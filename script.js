const action = document.getElementById("action");
const buyFields = document.getElementById("buyfields");
const sellFields = document.getElementById("sellfields");
const swapFields = document.getElementById("swapfields");
const ul = document.getElementById("ul")
const toggleBtn = document.getElementById("togglebtn")

action.addEventListener("change", () => {
  buyFields.style.display = "none";
  sellFields.style.display = "none";
  swapFields.style.display = "none";

  if (action.value === "buy") buyFields.style.display = "block";
  if (action.value === "sell") sellFields.style.display = "block";
  if (action.value === "swap") swapFields.style.display = "block";
});

document.getElementById("leadForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  let message = "Hello, I just filled your form:%0A";

  formData.forEach((value, key) => {
    if (value) {
      message += key + ": " + value + "%0A";
    }
  });

  const whatsappURL = "https://wa.me/2347015824775?text=" + message;
  window.open(whatsappURL, "_blank");
});

toggleBtn.addEventListener("click", () => {
  ul.classList.toggle("active");
});

// Image preview
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

imageInput.addEventListener("change", function() {
  preview.innerHTML = ""; // Clear previous previews

  const files = this.files;
  if (files) {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("preview-image");
        preview.appendChild(img);
      }
      reader.readAsDataURL(file);
    });
  }
});