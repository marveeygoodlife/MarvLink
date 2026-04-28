"use strict";

const action = document.getElementById("action");
const buyFields = document.getElementById("buyFields");
const sellFields = document.getElementById("sellFields");
const swapFields = document.getElementById("swapFields");
const ul = document.getElementById("ul");
const toggleBtn = document.getElementById("togglebtn");
const form = document.getElementById("leadForm");

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

document.addEventListener("click", (e) => {
  const ulOpen = ul.classList.contains("active");
  const clickedToggle = toggleBtn.contains(e.target);
  const clickedUl = ul.contains(e.target);
  if (ulOpen && !clickedToggle && !clickedUl) {
    ul.classList.remove('active');
  }
})

/* INPUT VALIDATION */
const inputs = document.querySelectorAll("input, select");

inputs.forEach(input => {
  input.addEventListener("input", () => {
    validateField(input);
  });
});

/* submit validation */
form.addEventListener("submit", (e) => {
  let isValid = true;
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  if (!isValid) {
    e.preventDefault();
  }
})

/* validation function */
function validateField(input) {
  const group = input.parentElement;
  const errorMsg = group.querySelector(".errorMsg");
  //skip hidden file
  if (input.type === "file" && input.files.length === 0) {
    errorMsg.textContent = "";
    return true;
  }
  if (input.offsetParent === null) {
    errorMsg.textContent = "";
    return true;
  }
  if (input.hasAttribute("required") && input.value.trim() === "") {
    input.classList.add("error");
    input.classList.remove("success");
    if (errorMsg) {
      errorMsg.textContent = "This field is required";
      errorMsg.style.display = "block";
    }
    return false;
  } else {
    input.classList.remove("error");
    input.classList.add("success");
    if (errorMsg) {
      errorMsg.textContent = "";
      errorMsg.style.display = "none";
    }
    return true;
  } 
  
}