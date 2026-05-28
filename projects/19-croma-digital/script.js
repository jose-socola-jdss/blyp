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

  
  // Neon Brand Palette Generator logic
  const paletteBlocks = document.getElementById('palette-blocks');
  const btnGenerate = document.getElementById('btn-generate-palette');

  if (paletteBlocks && btnGenerate) {
    const neonColors = ['#F72585', '#7209B7', '#3F37C9', '#4895EF', '#4CC9F0', '#00F5FF', '#B800FF', '#FF006E', '#8338EC', '#3A86C8'];
    const generate = () => {
      paletteBlocks.innerHTML = "";
      // Choose 4 random unique colors
      const selected = [];
      while(selected.length < 4) {
        const col = neonColors[Math.floor(Math.random() * neonColors.length)];
        if (!selected.includes(col)) {
          selected.push(col);
        }
      }
      selected.forEach(col => {
        const bl = document.createElement('div');
        bl.style.width = "60px";
        bl.style.height = "60px";
        bl.style.background = col;
        bl.style.borderRadius = "4px";
        bl.style.display = "flex";
        bl.style.alignItems = "center";
        bl.style.justifyContent = "center";
        bl.style.cursor = "pointer";
        bl.setAttribute('title', col);
        bl.innerHTML = `<span style="font-size:0.7rem; font-weight:bold; color:#000; background:#FFF; padding:2px 4px; border-radius:2px;">${col}</span>`;
        paletteBlocks.appendChild(bl);
      });
    };

    btnGenerate.addEventListener('click', generate);
    generate(); // initial call
  }

  const cromaForm = document.getElementById('croma-contact');
  if (cromaForm) {
    cromaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('TRANSMISIÓN INICIADA. La agencia responderá a tu propuesta creativa en breve.');
      cromaForm.reset();
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
