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

  // WOD day switcher (mock)
  
  // Level switcher for WOD routines
  const lvlButtons = document.querySelectorAll('.btn-level');
  const metconBlock = document.querySelector('.wod-block:last-child p');

  if (lvlButtons.length > 0 && metconBlock) {
    const metcons = {
      rookie: "AMRAP 15 Minutos de: 10 Goblet Squats (16kg), 10 Ring Rows, 15 Single Unders.",
      rx: "AMRAP 15 Minutos de: 10 Overhead Squats (40kg), 15 Toes-to-Bar, 20 Double Unders.",
      elite: "AMRAP 15 Minutos de: 10 Overhead Squats (60kg), 10 Bar Muscle-ups, 40 Double Unders."
    };

    lvlButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        lvlButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const level = btn.getAttribute('data-level');
        metconBlock.innerText = metcons[level] || metcons.rx;
      });
    });
  }

  const queryWod = document.getElementById('switch-wod');
  if (queryWod) {
    queryWod.addEventListener('click', () => {
      const wods = [
        { title: 'FRAN MODIFICADO', amrap: '21-15-9 Reps de Thrusters (43kg) y Pull-ups' },
        { title: 'HEAVY METAL', amrap: '5 Rondas por tiempo de: 10 Deadlifts (100kg), 15 Box Jumps' },
        { title: 'CARDIO CRUSHER', amrap: 'AMRAP 20 Min: 400m Run, 20 Kettlebell Swings, 10 Burpees' }
      ];
      const randomWod = wods[Math.floor(Math.random() * wods.length)];
      document.querySelector('.wod-header h3').innerText = randomWod.title;
      document.querySelector('.wod-block:last-child p').innerText = randomWod.amrap;
    });
  }

  // Animate stats progress bars
  const fills = document.querySelectorAll('.bar-fill');
  fills.forEach(fill => {
    const val = fill.getAttribute('data-value');
    setTimeout(() => {
      fill.style.width = val + '%';
    }, 300);
  });

  const rawForm = document.getElementById('raw-register');
  if (rawForm) {
    rawForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡SOLICITUD REGISTRADA! Si tienes la fuerza necesaria, un entrenador te contactará en 24 horas.');
      rawForm.reset();
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
