// Komplette, korrigierte script.js

document.addEventListener("DOMContentLoaded", function () {
  // --- Hamburger Menü ---
  const hamburger = document.querySelector(".hamburger");
  const overlay = document.querySelector(".overlay-menu");
  const closeBtn = overlay.querySelector(".close-overlay");
  const submenuToggle = overlay.querySelector(".submenu-toggle");
  const submenuBack = overlay.querySelector(".submenu-back");

  if (hamburger && overlay && closeBtn) { // Sicherstellen, dass alle Menü-Elemente da sind
    // Öffnen
    hamburger.addEventListener("click", () => {
      overlay.classList.add("active");
    });

    // Einheitlich Schließen
    function closeOverlay() {
      overlay.classList.remove("active");
      setTimeout(() => {
        overlay.classList.remove("submenu-open");
      }, 400);
    }

    closeBtn.addEventListener("click", closeOverlay);

    // Submenu öffnen
    if (submenuToggle) {
      submenuToggle.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.classList.add("submenu-open");
      });
    }

    // Submenu zurück
    if (submenuBack) {
      submenuBack.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.classList.remove("submenu-open");
      });
    }
    
    // Klicks auf Links schließen das Overlay
    overlay.querySelectorAll(".mainmenu a:not(.submenu-toggle)").forEach(link => {
      link.addEventListener("click", closeOverlay);
    });
    overlay.querySelectorAll(".submenu-page a:not(.submenu-back)").forEach(link => {
      link.addEventListener("click", closeOverlay);
    });
  }

  // --- Öffnungszeiten-Status ---
  const statusText = document.getElementById("statusText");
  if (statusText) {
    const now = new Date();
    const day = now.getDay(); // 0=Sonntag, 1=Montag, ..., 6=Samstag
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour + minute / 60; // z.B. 17:30 wird zu 17.5

    // Montag (1) bis Freitag (5) zwischen 8:30 und 17:30
    if (day >= 1 && day <= 5 && currentTime >= 8.5 && currentTime < 17.5) {
      statusText.textContent = "GEÖFFNET: Schließt um 17:30 Uhr";
      statusText.classList.add("text-success");
    } else {
      statusText.textContent = "GESCHLOSSEN";
      statusText.classList.add("text-danger");
    }
  }

  // --- Bild-Modal in der Galerie ---
  const imageModal = document.getElementById("imageModal");
  if (imageModal) {
    const modalImage = document.getElementById("modalImage");
    const bootstrapModal = new bootstrap.Modal(imageModal);

    document.querySelectorAll(".image-grid-item img").forEach(img => {
      img.addEventListener("click", () => {
        modalImage.src = img.src;
        bootstrapModal.show();
      });
    });
  }
  
  // --- KARTEN-LOGIK (Funktioniert jetzt) ---
  const loadMapBtn = document.getElementById("loadMap");
  if (loadMapBtn) {
    loadMapBtn.addEventListener("click", () => {
      const placeholder = document.getElementById("map-placeholder");
      const container = document.getElementById("map-container");

      if (placeholder && container) {
        placeholder.classList.add("d-none");
        // WICHTIG: Ersetze den Platzhalter durch deinen echten Google Maps Einbettungs-Code
        container.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2315.0804313120843!2d9.57420187733106!3d54.53207717265693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b30cd0af2e6c55%3A0xd1ef23254c3f76f2!2sHans-J%C3%BCrgen-Klinker-Stra%C3%9Fe%203%2C%2024837%20Schleswig!5e0!3m2!1sde!2sde!4v1751969137440!5m2!1sde!2sde" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
        container.classList.remove("d-none");
      }
    });
  }
  
  // --- KONTAKTFORMULAR-LOGIK (Nur ausführen, wenn das Formular da ist) ---
  const serviceSelect = document.getElementById('service');
  if (serviceSelect) {
    const otherContainer = document.getElementById('otherServiceContainer');
    const otherInput = document.getElementById('otherService');

    serviceSelect.addEventListener('change', function() {
      if (this.value === 'other') {
        otherContainer.classList.remove('d-none');
        otherInput.setAttribute('required', 'required');
      } else {
        otherContainer.classList.add('d-none');
        otherInput.removeAttribute('required');
        otherInput.value = '';
      }
    });
  }
});

// --- "Reveal on Scroll" Animation (kann außerhalb von DOMContentLoaded bleiben) ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});