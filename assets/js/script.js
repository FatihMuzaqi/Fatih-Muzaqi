/**
 * SCRIPT.JS - FATIH MUZAQI PORTFOLIO
 * Modern, Interactive & Modular
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // 1. STICKY HEADER & SCROLLSPY
  const header = document.querySelector('[data-header]');
  const backTopBtn = document.querySelector('[data-back-to-top]');
  const navLinks = document.querySelectorAll('.navbar-link');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Header active state
    if (scrollY >= 60) {
      header.classList.add('active');
    } else {
      header.classList.remove('active');
    }

    // Back to top button visibility
    if (scrollY >= 350) {
      backTopBtn.classList.add('active');
    } else {
      backTopBtn.classList.remove('active');
    }

    // ScrollSpy: highlight active nav item
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger on initial load

  // Smooth scroll for Back to Top
  if (backTopBtn) {
    backTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 2. MOBILE MENU DRAWER & OVERLAY
  const navToggleBtn = document.querySelector('[data-nav-toggle-btn]');
  const navbar = document.querySelector('[data-navbar]');
  const navbarOverlay = document.querySelector('[data-navbar-overlay]');

  function toggleNav() {
    navToggleBtn.classList.toggle('active');
    navbar.classList.toggle('active');
    navbarOverlay.classList.toggle('active');
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
  }

  function closeNav() {
    navToggleBtn.classList.remove('active');
    navbar.classList.remove('active');
    navbarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navToggleBtn) navToggleBtn.addEventListener('click', toggleNav);
  if (navbarOverlay) navbarOverlay.addEventListener('click', closeNav);

  // Close mobile nav when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // 3. DYNAMIC TYPING EFFECT
  const typingElement = document.getElementById('typing');
  if (typingElement) {
    const words = [
      'Fatih Muzaqi',
      'Web Developer',
      'Frontend Dev',
      'Backend Dev'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (!isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
          isDeleting = true;
          setTimeout(typeEffect, 2000); // Wait before deleting
          return;
        }
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(typeEffect, 400); // Wait before typing next word
          return;
        }
      }

      const speed = isDeleting ? 60 : 120;
      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

  // 4. OWL CAROUSEL INITIALIZATION
  if (window.jQuery && jQuery().owlCarousel) {
    // Projects Carousel
    $('#project-carousel').owlCarousel({
      loop: true,
      margin: 24,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      navText: [
        '<i class="fas fa-chevron-left"></i>',
        '<i class="fas fa-chevron-right"></i>'
      ],
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 }
      }
    });

    // Certificates Carousel
    $('#certificate-carousel').owlCarousel({
      loop: true,
      margin: 24,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3500,
      autoplayHoverPause: true,
      navText: [
        '<i class="fas fa-chevron-left"></i>',
        '<i class="fas fa-chevron-right"></i>'
      ],
      responsive: {
        0: { items: 1 },
        640: { items: 2 },
        1024: { items: 3 }
      }
    });
  }

  // 5. CERTIFICATE LIGHTBOX / MODAL
  const certModal = document.getElementById('cert-modal');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalIssuer = document.getElementById('cert-modal-issuer');
  const certModalClose = document.getElementById('cert-modal-close');
  const certModalLink = document.getElementById('cert-modal-link');

  function openCertModal(src, title, issuer) {
    if (!certModal) return;
    certModalImg.src = src;
    certModalTitle.textContent = title;
    certModalIssuer.textContent = issuer;
    if (certModalLink) certModalLink.href = src;
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Expose openCertModal globally for onclick handlers
  window.openCertModal = openCertModal;

  if (certModalClose) {
    certModalClose.addEventListener('click', closeCertModal);
  }

  if (certModal) {
    certModal.addEventListener('click', function (e) {
      if (e.target === certModal) {
        closeCertModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      closeCertModal();
    }
  });

  // 6. EMAILJS & CONTACT FORM
  const contactForm = document.getElementById('contact-form');
  const submitBtn = contactForm ? contactForm.querySelector('.btn-submit') : null;

  // Initialize EmailJS
  if (window.emailjs) {
    emailjs.init('BUXPtN4N6iyUGV0fI');
  }

  // Toast notification helper
  function showToast(message, type = 'success') {
    let toast = document.querySelector('.toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }

    toast.className = `toast-msg ${type} show`;
    toast.innerHTML = `
      <i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'}"></i>
      <span>${message}</span>
    `;

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (contactForm && window.emailjs) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.classList.add('loading');
      }

      emailjs
        .sendForm('service_lys94ng', 'template_jghxcnc', this)
        .then(function () {
          if (submitBtn) submitBtn.classList.remove('loading');
          showToast('Pesan berhasil terkirim! Terima kasih telah menghubungi.', 'success');
          contactForm.reset();
        })
        .catch(function (error) {
          if (submitBtn) submitBtn.classList.remove('loading');
          showToast('Gagal mengirim pesan: ' + (error.text || 'Silakan coba lagi.'), 'error');
        });
    });
  }

  // 7. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
  }
});
