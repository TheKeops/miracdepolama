const yearEl = document.getElementById("year");
const mainNav = document.getElementById("mainNav");
const menuToggle = document.getElementById("menuToggle");
const form = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");
const validationFeedback = document.getElementById("validationFeedback");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const galleryItems = document.querySelectorAll(".gallery-item");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

if (form && feedback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (validationFeedback) {
      validationFeedback.textContent = "";
    }

    if (!form.checkValidity()) {
      feedback.textContent = "Lütfen tüm alanları doğru şekilde doldurun.";
      feedback.className = "feedback error";
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const fullName = String(formData.get("fullName") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const recaptchaResponse = typeof grecaptcha !== "undefined" ? grecaptcha.getResponse() : "";

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      if (validationFeedback) {
        validationFeedback.textContent = "Telefon numarası en az 10 haneli olmalı.";
      }
      feedback.textContent = "";
      return;
    }

    if (message.length < 10) {
      if (validationFeedback) {
        validationFeedback.textContent = "Mesaj alanı en az 10 karakter olmalı.";
      }
      feedback.textContent = "";
      return;
    }

    if (!recaptchaResponse) {
      if (validationFeedback) {
        validationFeedback.textContent = "Lütfen CAPTCHA doğrulamasını tamamlayın.";
      }
      feedback.textContent = "";
      return;
    }

    feedback.textContent = `${fullName || "Talebiniz"} başarıyla alındı. En kısa sürede size dönüş yapacağız.`;
    feedback.className = "feedback success";
    form.reset();
    if (typeof grecaptcha !== "undefined") {
      grecaptcha.reset();
    }
  });
}

if (lightbox && lightboxImage && lightboxClose && galleryItems.length > 0) {
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const source = item.getAttribute("src");
      const alt = item.getAttribute("alt") || "Depo görseli";
      if (!source) return;
      lightboxImage.setAttribute("src", source);
      lightboxImage.setAttribute("alt", alt);
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.setAttribute("src", "");
  };

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}
