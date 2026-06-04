document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const yearNodes = document.querySelectorAll("[data-current-year]");
  const revealNodes = document.querySelectorAll("[data-reveal]");
  const portfolioFilterButtons = document.querySelectorAll("[data-portfolio-filter]");
  const portfolioItems = document.querySelectorAll("[data-portfolio-item]");
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Scroll state ── */
  const syncScrolledState = () => {
    body.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  /* ── 10a. Scroll progress bar ── */
  const progressBar = document.querySelector(".scroll-progress");
  const updateScrollProgress = () => {
    if (!progressBar) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) { progressBar.style.transform = "scaleX(0)"; return; }
    const progress = Math.min(window.scrollY / docHeight, 1);
    progressBar.style.transform = `scaleX(${progress})`;
  };

  /* ── Page ready ── */
  const markReady = () => {
    requestAnimationFrame(() => {
      body.classList.add("is-ready");
    });
  };

  /* ── Mobile menu ── */
  const closeMenu = () => {
    if (!toggle || !menu) return;
    menu.setAttribute("data-open", "false");
    toggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    if (!toggle || !menu) return;
    menu.setAttribute("data-open", "true");
    toggle.setAttribute("aria-expanded", "true");
    const firstLink = menu.querySelector("a");
    if (firstLink instanceof HTMLElement) {
      firstLink.focus();
    }
  };

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.getAttribute("data-open") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.getAttribute("data-open") === "true") {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (menu.getAttribute("data-open") !== "true") return;
      if (!menu.contains(target) && !toggle.contains(target)) {
        closeMenu();
      }
    });
  }

  /* ── Reveal system (existing + enhanced) ── */
  if (revealNodes.length > 0 && !reducedMotion) {
    revealNodes.forEach((node) => {
      node.classList.add("reveal");
      const delay = node.getAttribute("data-delay");
      if (delay) {
        node.style.setProperty("--reveal-delay", `${delay}ms`);
      }
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealNodes.forEach((node) => {
      revealObserver.observe(node);
    });
  } else {
    revealNodes.forEach((node) => {
      node.classList.add("is-visible");
    });
  }

  /* ── 4a. Service card icon bounce with stagger ── */
  if (!reducedMotion) {
    const serviceCards = document.querySelectorAll(".service-card");
    if (serviceCards.length > 0) {
      const serviceObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const delay = parseInt(entry.target.getAttribute("data-delay") || "0", 10);
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, delay);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.2 }
      );
      serviceCards.forEach((card) => serviceObserver.observe(card));
    }
  }

  /* ── 5a. Step connector + 5b. Counter animation ── */
  if (!reducedMotion) {
    const stepConnector = document.querySelector(".step-connector");
    if (stepConnector) {
      const connectorObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.3 }
      );
      connectorObserver.observe(stepConnector);
    }

    /* 5b. Counter odometer animation */
    const counterNodes = document.querySelectorAll("[data-counter]");
    if (counterNodes.length > 0) {
      const counterObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const target = entry.target;
            const finalValue = parseInt(target.getAttribute("data-counter"), 10);
            const padLen = target.getAttribute("data-counter").length;
            const duration = 800;
            const start = performance.now();
            const animate = (now) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.round(eased * finalValue);
              target.textContent = String(currentVal).padStart(padLen, "0");
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            observer.unobserve(target);
          });
        },
        { threshold: 0.5 }
      );
      counterNodes.forEach((node) => counterObserver.observe(node));
    }
  }

  /* ── 6b. Benefit card progressive border ── */
  if (!reducedMotion) {
    const benefitCards = document.querySelectorAll(".benefit-card");
    if (benefitCards.length > 0) {
      const benefitObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const delay = parseInt(entry.target.getAttribute("data-delay") || "0", 10);
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, delay);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.2 }
      );
      benefitCards.forEach((card) => benefitObserver.observe(card));
    }
  }

  /* ── 10b. Footer reveal ── */
  if (!reducedMotion) {
    const footer = document.querySelector(".site-footer");
    if (footer) {
      const footerObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.1 }
      );
      footerObserver.observe(footer);
    }
  }

  /* ── 2b. Terminal typewriter effect ── */
  if (!reducedMotion) {
    const terminalBody = document.querySelector(".hero-terminal-body");
    if (terminalBody) {
      const lines = terminalBody.querySelectorAll(".hero-terminal-line");
      lines.forEach((line) => {
        line.style.animation = "none";
        line.style.opacity = "0";
        line.style.transform = "translateY(8px)";
      });

      let cumulativeDelay = 300;
      lines.forEach((line) => {
        const textEl = line.querySelector(".hero-terminal-text");
        if (!textEl) return;

        const isCommand = !line.classList.contains("hero-terminal-line-output") &&
                          !line.classList.contains("hero-terminal-line-cursor");
        const isCursor = line.classList.contains("hero-terminal-line-cursor");
        const fullText = textEl.textContent || "";
        const thisDelay = cumulativeDelay;

        if (isCommand) {
          textEl.textContent = "";
          setTimeout(() => {
            line.style.transition = "opacity 200ms ease, transform 200ms ease";
            line.style.opacity = "1";
            line.style.transform = "translateY(0)";
            let charIndex = 0;
            const type = () => {
              if (charIndex < fullText.length) {
                textEl.textContent += fullText[charIndex];
                charIndex++;
                setTimeout(type, 32 + Math.random() * 18);
              }
            };
            type();
          }, thisDelay);
          cumulativeDelay += fullText.length * 40 + 250;
        } else if (isCursor) {
          setTimeout(() => {
            line.style.transition = "opacity 200ms ease, transform 200ms ease";
            line.style.opacity = "1";
            line.style.transform = "translateY(0)";
            textEl.style.animation = "terminal-caret 1s step-end infinite";
          }, cumulativeDelay);
        } else {
          setTimeout(() => {
            line.style.transition = "opacity 400ms cubic-bezier(0.22, 1, 0.36, 1), transform 400ms cubic-bezier(0.22, 1, 0.36, 1)";
            line.style.opacity = "1";
            line.style.transform = "translateY(0)";
          }, thisDelay);
          cumulativeDelay += 300;
        }
      });
    }
  }

  const computePortfolioGridPosition = () => {
    const grid = document.querySelector("[data-portfolio-grid]");
    if (!grid) return;

    const visibleItems = Array.from(grid.querySelectorAll(".masonry-item")).filter(
      (item) => !item.hasAttribute("hidden")
    );

    const templateColumns = getComputedStyle(grid).gridTemplateColumns;
    const cols = templateColumns ? templateColumns.split(" ").length : 1;

    visibleItems.forEach((item, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const cascadeDelay = (row + col) * 70;
      item.style.setProperty("--reveal-delay", `${cascadeDelay}ms`);
    });
  };

  /* ── 7a. Cascade diagonal reveal for portfolio ── */
  if (!reducedMotion) {
    const masonryItems = document.querySelectorAll(".masonry-grid .masonry-item");
    if (masonryItems.length > 0) {
      computePortfolioGridPosition();
      window.addEventListener("resize", computePortfolioGridPosition);
    }
  }

  /* ── 7d. Portfolio category filter ── */
  if (portfolioFilterButtons.length > 0 && portfolioItems.length > 0) {
    const applyPortfolioFilter = (category) => {
      portfolioFilterButtons.forEach((button) => {
        const isActive = button.getAttribute("data-portfolio-filter") === category;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      portfolioItems.forEach((item) => {
        const isMatch = item.getAttribute("data-category") === category;
        item.hidden = !isMatch;
        if (isMatch) {
          item.classList.add("is-visible");
        }
      });

      computePortfolioGridPosition();
    };

    portfolioFilterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-portfolio-filter");
        if (!category) return;
        applyPortfolioFilter(category);
      });
    });

    applyPortfolioFilter(
      document.querySelector("[data-portfolio-filter].is-active")?.getAttribute("data-portfolio-filter") ||
      portfolioFilterButtons[0].getAttribute("data-portfolio-filter")
    );
  }

  /* ── Init ── */
  syncScrolledState();
  window.addEventListener("scroll", () => {
    syncScrolledState();
    updateScrollProgress();
  }, { passive: true });
  updateScrollProgress();
  markReady();

  const currentYear = new Date().getFullYear();
  yearNodes.forEach((node) => {
    node.textContent = String(currentYear);
  });
});
