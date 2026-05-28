document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Testimonials Carousel
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  
  if (slides.length > 0 && dots.length > 0) {
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach(s => s.style.display = 'none');
      dots.forEach(d => d.classList.remove('active'));
      
      slides[index].style.display = 'block';
      dots[index].classList.add('active');
      currentSlide = index;
    }

    // Init
    showSlide(0);

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => showSlide(idx));
    });

    // Auto rotate every 5s
    setInterval(() => {
      let next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }, 5000);
  }

  // Accordion FAQ
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Contact Form Submit
  
  // Doctor Availability Scheduler logic
  const specialtySelect = document.getElementById('specialty-select');
  const doctorsList = document.getElementById('doctors-list');

  if (specialtySelect && doctorsList) {
    const doctorsData = {
      general: [
        { name: "Dr. Carlos Mendoza", time: "10:30 AM - 2:00 PM", status: "Disponible" },
        { name: "Dra. Laura Soto", time: "4:00 PM - 7:30 PM", status: "Disponible" }
      ],
      pediatria: [
        { name: "Dra. Camila Torres", time: "9:00 AM - 1:00 PM", status: "Disponible" },
        { name: "Dr. Roberto Díaz", time: "3:00 PM - 6:00 PM", status: "Ocupado" }
      ],
      psicologia: [
        { name: "Dra. Sofía Rivas", time: "11:00 AM - 4:00 PM", status: "Disponible" }
      ]
    };

    const renderDoctors = (specialty) => {
      doctorsList.innerHTML = "";
      const doctors = doctorsData[specialty] || [];
      doctors.forEach(doc => {
        const item = document.createElement('div');
        item.className = "doctor-item";
        item.innerHTML = `
          <div class="doc-info">
            <h4>${doc.name}</h4>
            <p style="font-size:0.9rem; color:#718096;">Horario: ${doc.time}</p>
          </div>
          <div class="doc-actions">
            <span class="status-pill ${doc.status === 'Disponible' ? 'status-ok' : 'status-busy'}">${doc.status}</span>
            ${doc.status === 'Disponible' ? '<button class="btn btn-primary btn-book" style="padding:0.4rem 1rem; font-size:0.85rem;">Reservar</button>' : ''}
          </div>
        `;
        doctorsList.appendChild(item);
      });

      // Add click listeners to book buttons
      doctorsList.querySelectorAll('.btn-book').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const docName = e.target.closest('.doctor-item').querySelector('h4').innerText;
          alert(`Reserva exitosa con el ${docName}. Te hemos enviado los detalles de acceso virtual por correo electrónico.`);
        });
      });
    };

    specialtySelect.addEventListener('change', (e) => {
      renderDoctors(e.target.value);
    });

    // Initial render
    renderDoctors('general');
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias por agendar con VitaCubo! Un asistente médico se comunicará contigo vía WhatsApp o llamada en breve para confirmar.');
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
