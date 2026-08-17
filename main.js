/* ============================================================
   SOORA BUBBLE — main.js
   Navegação, scroll-reveal, menu mobile, smooth-scroll.
   Sem dependências externas.
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. NAVBAR: transparente → sólida ao rolar ── */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    // Adiciona classe .scrolled após 60px de rolagem
    navbar.classList.toggle('scrolled', scrollY > 60);

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Estado inicial

  /* ── 2. MENU MOBILE ── */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks   = document.getElementById('navLinks');

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', isOpen);
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    // Previne scroll do body enquanto menu está aberto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  menuToggle.addEventListener('click', () => toggleMenu());

  // Fecha ao clicar em qualquer link
  navLinks.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Fecha ao clicar fora do menu em mobile
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });

  // Fecha ao pressionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      toggleMenu(false);
      menuToggle.focus();
    }
  });

  /* ── 3. SMOOTH SCROLL para âncoras internas ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = navbar.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ── 4. SCROLL REVEAL (IntersectionObserver) ── */
  const revealElements = document.querySelectorAll('.reveal, .reveal-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // Anima só uma vez
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -48px 0px'
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: mostra tudo para browsers sem suporte
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ── 5. HIGHLIGHT do link da nav ativa (scroll spy leve) ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.navbar__link:not(.navbar__link--cta)');

  function updateActiveLink() {
    const scrollMid = window.scrollY + window.innerHeight / 2;

    let activeId = null;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollMid) {
        activeId = sec.id;
      }
    });

    navLinkItems.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.style.color = href === activeId ? 'var(--verde-lima)' : '';
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ── 6. LAZY LOADING de imagens (tag <img> com data-src) ── */
  const lazyImgs = document.querySelectorAll('img[data-src]');
  if (lazyImgs.length && 'IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    });
    lazyImgs.forEach(img => imgObserver.observe(img));
  }

  /* ── 7. LIGHTBOX ── */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxImg.style.transform = 'none';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  }

  // Estilo cursor nas fotos
  document.querySelectorAll('.img-ph img, .galeria__item img, .foto-stack__main img, .foto-stack__float img').forEach(img => {
    img.style.cursor = 'zoom-in';
  });

  // Abre lightbox em qualquer container de foto
  function attachLightbox() {
    document.querySelectorAll('.galeria__item, .foto-stack__main, .foto-stack__float').forEach(container => {
      let touchMoved = false;

      container.addEventListener('touchstart', () => {
        touchMoved = false;
      }, { passive: true });

      container.addEventListener('touchmove', () => {
        touchMoved = true;
      }, { passive: true });

      container.addEventListener('touchend', (e) => {
        if (touchMoved) return;
        e.preventDefault();
        const img = container.querySelector('img');
        if (img && !lightbox.classList.contains('active')) {
          openLightbox(img.currentSrc || img.src, img.alt);
        }
      });

      container.addEventListener('click', () => {
        const img = container.querySelector('img');
        if (img && !lightbox.classList.contains('active')) {
          openLightbox(img.currentSrc || img.src, img.alt);
        }
      });
    });
  }
  attachLightbox();

  // Fechar ao clicar no fundo
  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) closeLightbox();
  });
  lightboxClose.addEventListener('click', closeLightbox);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });

  // Swipe down to close (touch)
  let touchStartY = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (dy > 80) closeLightbox();
  }, { passive: true });

})();
