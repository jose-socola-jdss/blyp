document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // JS Routes Tabs Toggle
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabBtns.length > 0 && tabPanes.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(target).classList.add('active');
      });
    });
  }

  // Animated counters on scroll using IntersectionObserver
  const stats = document.querySelectorAll('.stat-val');
  if (stats.length > 0 && 'IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const countTo = parseInt(target.getAttribute('data-count'), 10);
          let count = 0;
          const duration = 2000; // 2s duration
          const step = Math.ceil(countTo / (duration / 50));
          
          const timer = setInterval(() => {
            count += step;
            if (count >= countTo) {
              target.textContent = countTo.toLocaleString();
              clearInterval(timer);
            } else {
              target.textContent = count.toLocaleString();
            }
          }, 50);
          
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.1 });

    stats.forEach(s => statObserver.observe(s));
  } else {
    // Fallback if no observer
    stats.forEach(s => s.textContent = s.getAttribute('data-count'));
  }

  // Terminal Typing Animation for Subtitle
  const subElement = document.querySelector('.typewriter-text');
  if (subElement) {
    const words = ["Programación", "Diseño UX/UI", "Marketing Digital"];
    let wordIdx = 0;
    let letterIdx = 0;
    let isDeleting = false;
    let text = '';
    
    function type() {
      const currentWord = words[wordIdx];
      
      if (isDeleting) {
        text = currentWord.substring(0, text.length - 1);
      } else {
        text = currentWord.substring(0, text.length + 1);
      }
      
      subElement.textContent = text;
      
      let typeSpeed = 150;
      if (isDeleting) { typeSpeed /= 2; }
      
      if (!isDeleting && text === currentWord) {
        typeSpeed = 1500; // Pause at end
        isDeleting = true;
      } else if (isDeleting && text === '') {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typeSpeed = 500; // Pause before typing new
      }
      
      setTimeout(type, typeSpeed);
    }
    
    // Start typing after 1s
    setTimeout(type, 1000);
  }

  // Form submission terminal feedback
  
  // Interactive Terminal Shell Console logic
  const shellInput = document.getElementById('shell-input');
  const shellBody = document.getElementById('shell-body');

  if (shellInput && shellBody) {
    const execCommand = (cmd) => {
      const trimmed = cmd.trim().toLowerCase();
      
      // Append user prompt
      const promptLine = document.createElement('p');
      promptLine.className = "shell-line";
      promptLine.innerHTML = `<span class="shell-prompt">kognivia@user:~$</span> ${cmd}`;
      shellBody.appendChild(promptLine);

      const outputLine = document.createElement('p');
      outputLine.className = "shell-output";

      if (trimmed === 'help') {
        outputLine.innerHTML = `Comandos disponibles:<br>  - <span class="cmd-trigger" data-cmd="courses">courses</span> : Muestra los cursos activos.<br>  - <span class="cmd-trigger" data-cmd="status">status</span>  : Consulta el estado del servidor.<br>  - <span class="cmd-trigger" data-cmd="clear">clear</span>   : Limpia la terminal.`;
      } else if (trimmed === 'courses') {
        outputLine.innerHTML = `Cursos Activos:<br>  * UX/UI Avanzado (12 semanas)<br>  * Desarrollo Web Fullstack (16 semanas)<br>  * Inteligencia Artificial Aplicada (8 semanas)`;
      } else if (trimmed === 'status') {
        outputLine.innerHTML = `Server Status: <span style="color:#2EC4B6;">ONLINE</span><br>Latencia: 14ms<br>Usuarios en línea: 1,492`;
      } else if (trimmed === 'clear') {
        shellBody.innerHTML = "";
        return;
      } else {
        outputLine.innerHTML = `Comando no reconocido: "${cmd}". Escribe "help" para ver los comandos.`;
      }

      shellBody.appendChild(outputLine);
      shellBody.scrollTop = shellBody.scrollHeight;
    };

    shellInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = shellInput.value;
        if (val.trim() !== '') {
          execCommand(val);
          shellInput.value = "";
        }
      }
    });

    // Handle command clicks in output
    shellBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('cmd-trigger')) {
        const cmd = e.target.getAttribute('data-cmd');
        execCommand(cmd);
      }
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('kognivia@terminal:~$ Solicitud de admisión enviada. Conexión de red segura establecida. Un orientador te contactará por email.');
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
