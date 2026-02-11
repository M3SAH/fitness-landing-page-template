document.addEventListener("DOMContentLoaded", () => {
  
  /* =========================================
     1. MOBILE MENU TOGGLE
  ========================================= */
  const menuToggle = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu automatically when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  /* =========================================
     2. SCROLL EFFECTS (Shadow & Animations)
  ========================================= */
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.5)";
    } else {
      navbar.style.boxShadow = "none";
    }
  });

  // Intersection Observer for Fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".hidden-element").forEach((el) => {
    observer.observe(el);
  });

  /* =========================================
     3. FAQ ACCORDION
  ========================================= */
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      // Close currently open FAQ (if you want only one open at a time)
      const currentActive = document.querySelector(".faq-question.active");
      if (currentActive && currentActive !== question) {
        currentActive.classList.remove("active");
        currentActive.nextElementSibling.style.maxHeight = null;
      }

      // Toggle clicked FAQ
      question.classList.toggle("active");
      const answer = question.nextElementSibling;
      if (question.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });

  /* =========================================
     4. LIGHTBOX GALLERY
  ========================================= */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const galleryItems = document.querySelectorAll(".gallery-item img");
  const closeLightbox = document.querySelector(".close-lightbox");

  galleryItems.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
    });
  });

  const closeGallery = () => {
    lightbox.classList.remove("active");
  };

  if (closeLightbox) {
    closeLightbox.addEventListener("click", closeGallery);
  }

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeGallery();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeGallery();
    }
  });

  /* =========================================
     5. BACK TO TOP BUTTON
  ========================================= */
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  /* =========================================
     6. CONTACT FORM (DEMO MODE)
  ========================================= */
  const form = document.getElementById("bookingForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Stop page reload

      const name = document.getElementById("name").value;
      const goal = document.getElementById("goal").value;

      // Basic Validation
      if (!name || !goal) {
        alert("Please fill in your name and select a goal.");
        return;
      }

      // ⚠️ IMPORTANT: This is a demo. No data is actually sent.
      // To make this work, replace this block with code for a service like Formspree.
      const btn = form.querySelector("button");
      const originalText = btn.innerText;
      btn.innerText = "Sending...";
      btn.disabled = true;

      setTimeout(() => {
        alert(
          `Thanks ${name}! Your request for '${goal}' has been received. (Demo: No email sent)`
        );
        form.reset();
        btn.innerText = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }

  /* =========================================
     7. DYNAMIC FOOTER YEAR
  ========================================= */
  document.getElementById("year").textContent = new Date().getFullYear();
});