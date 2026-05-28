document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Tips Slider Toggler (mock)
  const tipBtn = document.getElementById('next-tip');
  if (tipBtn) {
    const tips = [
      "Cepilla el pelo de tu mascota al menos tres veces por semana para evitar nudos.",
      "Mantén las vacunas al día y realiza un chequeo veterinario cada seis meses.",
      "El juego diario estimula la salud física y mental de perros y gatos."
    ];
    let idx = 0;
    tipBtn.addEventListener('click', () => {
      idx = (idx + 1) % tips.length;
      document.querySelector('.tip-content p').innerText = `"${tips[idx]}"`;
    });
  }

  
  // Pet Age conversion Calculator logic
  const petType = document.getElementById('pet-type');
  const petAge = document.getElementById('pet-age');
  const petHumanYears = document.getElementById('pet-human-years');

  if (petType && petAge && petHumanYears) {
    const updatePetAge = () => {
      const type = petType.value;
      const age = parseInt(petAge.value) || 0;
      let humanYears = 0;
      
      if (age > 0) {
        if (age === 1) {
          humanYears = 15;
        } else if (age === 2) {
          humanYears = 24;
        } else {
          humanYears = 24 + (age - 2) * (type === 'perro' ? 4 : 4);
        }
      }
      petHumanYears.innerText = `Equivale a: ${humanYears} años humanos`;
    };

    petType.addEventListener('change', updatePetAge);
    petAge.addEventListener('input', updatePetAge);
  }

  const friendlyForm = document.getElementById('friendly-contact');
  if (friendlyForm) {
    friendlyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Guau! Hemos recibido tu mensaje. Nos pondremos en contacto contigo muy pronto con una gran sonrisa.');
      friendlyForm.reset();
    });
  }
});

// ===== BLYP PREMIUM ENHANCEMENTS =====
window.addEventListener('load', function() {
  const loader = document.querySelector('.preloader');
  if (loader) {
    loader.classList.add('fade-out');
    setTimeout(() => loader.remove(), 600);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Intersection Observer for Scroll Reveal
  const revealItems = document.querySelectorAll('.reveal-item, .origin-card, .service-card, .testimonial-card, .photo-card, .product-card, .member-card, .case-card, .team-card, .timeline-step, .benefit-card, .recipe-card, .pricing-card, .class-card, .room-card, .contact-grid');
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  };
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealItems.forEach(item => {
    item.classList.add('reveal-item');
    revealObserver.observe(item);
  });

  // Contact Form Ajax Simulation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // Clone and replace form to remove any inline alert listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    newForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = newForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;
      }
      
      setTimeout(() => {
        const formWrap = newForm.closest('.contact-form-wrap') || newForm.parentElement;
        if (formWrap) {
          formWrap.innerHTML = `
            <div class="contact-form-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              <h2 style="margin-top: 1rem; color: var(--primary); font-family: inherit;">¡Solicitud Enviada con Éxito!</h2>
              <p style="margin-top: 0.5rem; color: var(--text); opacity: 0.8; font-size: 0.95rem;">Gracias por contactarnos. Te responderemos a la brevedad en las próximas 24 horas.</p>
            </div>
          `;
        }
      }, 1500);
    });
  });
});
