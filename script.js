"use strict";

const action = document.getElementById("action");
const buyFields = document.getElementById("buyFields");
const sellFields = document.getElementById("sellFields");
const swapFields = document.getElementById("swapFields");
const ul = document.getElementById("ul");
const toggleBtn = document.getElementById("togglebtn");
const form = document.getElementById("leadForm");
const scrollBtn = document.querySelector("#scrollBtn");
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const inputs = document.querySelectorAll("input, select");
const ulLinks = Array.from(document.querySelectorAll("nav ul a"));
const elementsToReveal = "h1, section, .card p, h2, h3, h4, form, footer, .btn";
const revealElements = Array.from(document.querySelectorAll(elementsToReveal));

/* open/close ul */
toggleBtn.addEventListener("click", () => {
  ul.classList.toggle("active");
});

/* close Ul when user click outside Ul  */
document.addEventListener("click", (e) => {
  const ulOpen = ul.classList.contains("active");
  const clickedToggle = toggleBtn.contains(e.target);
  const clickedUl = ul.contains(e.target);
  if (ulOpen && !clickedToggle && !clickedUl) {
    ul.classList.remove('active');
  }
})

/* close Ul when user click on ul link */

if (ulLinks.length) {
  ulLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      ul.classList.remove("active");
      const targetId = link.getAttribute("href");
      setTimeout(() => {
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
        };
      }, 100)
    });
  });
};

/* FORM LOGIC */
action.addEventListener("change", () => {
  buyFields.style.display = "none";
  sellFields.style.display = "none";
  swapFields.style.display = "none";

  if (action.value === "buy") buyFields.style.display = "block";
  if (action.value === "sell") sellFields.style.display = "block";
  if (action.value === "swap") swapFields.style.display = "block";
});

// Image preview
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

/* Input validation */
inputs.forEach(input => {
  input.addEventListener("input", () => {
    validateField(input);
  });
});

/* submit validation */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // VALIDATE (SKIP HIDDEN FIELDS)
  inputs.forEach(input => {
    if (input.offsetParent === null) return; // skip hidden

    if (!validateField(input)) {
      isValid = false;
    }
  });

  // STOP IF INVALID
  if (!isValid) return;

  // BUILD MESSAGE
  const formData = new FormData(form);
  let message = "Hello, I just filled your form:\n\n";

  formData.forEach((value, key) => {
    // Skip empty values
    if (!value) return;

    // Skip hidden fields
    const field = form.querySelector(`[name="${key}"]`);
    if (field && field.offsetParent === null) return;

    // Clean label
    const label = key.replace(/_/g, " ");

    message += `${label}: ${value}\n`;
  });

  // ENCODE + SEND
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/2347015824775?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
});

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

/* show scroll buttn */
window.addEventListener("scroll", () => {
  const height = window.scrollY;
  if (height > 800) {
    scrollBtn.classList.add("showScroll")
  } else {
    scrollBtn.classList.remove("showScroll")
  };
});

/* intersection observer */

revealElements.forEach((el) => { el.classList.add("reveal") });

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealVisible");
      obs.unobserve(entry.target)
    }
  }, { threshold: 0.15 });
});
revealElements.forEach((el)=> {observer.observe(el)})