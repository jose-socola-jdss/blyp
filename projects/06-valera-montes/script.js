document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide
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

  
  // Legal Consultation Fee Calculator logic
  const practiceSelect = document.getElementById('practice-select');
  const hoursInput = document.getElementById('hours-input');
  const feeTotal = document.getElementById('fee-total');

  if (practiceSelect && hoursInput && feeTotal) {
    const updateFee = () => {
      const rate = parseFloat(practiceSelect.value) || 0;
      const hours = parseInt(hoursInput.value) || 0;
      const total = rate * hours;
      feeTotal.innerText = `${total.toLocaleString('es-ES')}`;
    };

    practiceSelect.addEventListener('change', updateFee);
    hoursInput.addEventListener('input', updateFee);
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Se ha enviado su consulta confidencial. Un abogado de Valera & Montes se pondrá en contacto con usted dentro de las próximas 24 horas hábiles.');
      form.reset();
    });
  }

  // Stats Counter Animation
  const stats = document.querySelectorAll('.stat-val');
  function animateStats() {
    stats.forEach(stat => {
      const targetText = stat.textContent;
      const target = parseInt(targetText.replace(/\D/g, ''));
      const suffix = targetText.replace(/[0-9]/g, '');
      let current = 0;
      const duration = 1500; // 1.5 seconds
      const stepTime = Math.max(Math.floor(duration / target), 10);
      
      const timer = setInterval(() => {
        current += Math.ceil(target / 100) || 1;
        if (current >= target) {
          stat.textContent = targetText;
          clearInterval(timer);
        } else {
          stat.textContent = current + suffix;
        }
      }, stepTime);
    });
  }

  const statsSection = document.querySelector('.stats-bg');
  if (statsSection && stats.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(statsSection);
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
