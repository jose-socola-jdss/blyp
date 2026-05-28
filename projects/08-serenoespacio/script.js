document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Fullscreen Menu Overlay
  const hamburger = document.querySelector('.hamburger-btn');
  const closeBtn = document.querySelector('.close-btn');
  const fsNav = document.querySelector('.fullscreen-nav');
  const fsLinks = document.querySelectorAll('.fullscreen-links a');

  if (hamburger && fsNav) {
    hamburger.addEventListener('click', () => {
      fsNav.classList.add('active');
    });
  }

  if (closeBtn && fsNav) {
    closeBtn.addEventListener('click', () => {
      fsNav.classList.remove('active');
    });
  }

  // Close menu on link click
  fsLinks.forEach(link => {
    link.addEventListener('click', () => {
      fsNav.classList.remove('active');
    });
  });

  
  // Breathing rate adjuster logic
  const breathButtons = document.querySelectorAll('.btn-breath');
  const breathCircle = document.querySelector('.breathing-circle');

  if (breathButtons.length > 0 && breathCircle) {
    breathButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        breathButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const pace = btn.getAttribute('data-pace');
        breathCircle.style.animationDuration = `${pace}s`;
      });
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Tu solicitud ha sido enviada en paz. Un guía de SerenoEspacio te responderá a la brevedad.');
      form.reset();
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
