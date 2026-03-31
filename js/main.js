/**
 * Haflati Landing Page — Main JavaScript
 * Pure vanilla JS, no dependencies.
 */

(function () {
  'use strict';

  /* ============================================================
     0. CONSTANTS & UTILITIES
     ============================================================ */
  var GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbxsXNqLSt-ISvV2QI9hIfXm_MPAV4EZqGEI1db8U5I1XeLrSQum4Gh_LXAdIpdT0jZZ/exec';

  var PHONE_REGEX = /^(05\d{8}|\+9665\d{8})$/;

  function throttle(fn, wait) {
    var last = 0;
    return function () {
      var now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(this, arguments);
      }
    };
  }

  /* ============================================================
     1. STICKY NAVBAR
     ============================================================ */
  var navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', throttle(handleNavScroll, 100), { passive: true });
  handleNavScroll();

  /* ============================================================
     2. MOBILE HAMBURGER MENU
     ============================================================ */
  var hamburger = document.getElementById('hamburger');
  var drawer = document.getElementById('mobile-drawer');
  var overlay = document.getElementById('drawer-overlay');

  function openMenu() {
    if (!drawer) return;
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    if (hamburger) hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!drawer) return;
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (drawer && drawer.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close when clicking a drawer link
  if (drawer) {
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ============================================================
     3. SMOOTH SCROLLING
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var navHeight = navbar ? navbar.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ============================================================
     4. LANGUAGE TOGGLE (AR / EN)
     ============================================================ */
  var langBtn = document.getElementById('lang-toggle');
  var htmlEl = document.documentElement;

  function setLanguage(lang) {
    var isArabic = lang === 'ar';
    htmlEl.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
    htmlEl.setAttribute('lang', lang);

    // Swap text for every element with data-ar / data-en
    document.querySelectorAll('[data-ar][data-en]').forEach(function (el) {
      el.textContent = isArabic ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    });

    // Update placeholders
    document.querySelectorAll('[data-ar-placeholder][data-en-placeholder]').forEach(function (el) {
      el.placeholder = isArabic ? el.getAttribute('data-ar-placeholder') : el.getAttribute('data-en-placeholder');
    });

    localStorage.setItem('haflati-lang', lang);
    window.dispatchEvent(new CustomEvent('haflati-lang-change', { detail: { lang: lang } }));
  }

  var savedLang = localStorage.getItem('haflati-lang') || 'ar';
  setLanguage(savedLang);

  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var current = htmlEl.getAttribute('lang') || 'ar';
      setLanguage(current === 'ar' ? 'en' : 'ar');
    });
  }

  /* ============================================================
     5. ANIMATED COUNTERS
     ============================================================ */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('[data-target]').forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ============================================================
     6. PROGRESS BAR ANIMATION
     ============================================================ */
  var progressObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var fill = entry.target;
          var width = fill.getAttribute('data-width');
          if (width) {
            fill.style.width = width + '%';
          }
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.progress-bar__fill').forEach(function (el) {
    progressObserver.observe(el);
  });

  /* ============================================================
     7. FAQ ACCORDION
     ============================================================ */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-item__question');
    if (!question) return;

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      // Close all others
      document.querySelectorAll('.faq-item.open').forEach(function (open) {
        if (open !== item) {
          open.classList.remove('open');
        }
      });

      // Toggle this one
      item.classList.toggle('open', !isOpen);
    });
  });

  /* ============================================================
     8. SCROLL ANIMATIONS (IntersectionObserver)
     ============================================================ */
  var animObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document
    .querySelectorAll('.fade-in-up, .fade-in, .scale-in, .slide-in-right, .slide-in-left')
    .forEach(function (el) {
      animObserver.observe(el);
    });

  /* ============================================================
     9. FORM HANDLING
     ============================================================ */
  function validateForm(form) {
    var data = {};
    var errors = [];

    form.querySelectorAll('[name]').forEach(function (field) {
      var name = field.name;
      var value = field.value.trim();
      data[name] = value;

      if (field.hasAttribute('required') && !value) {
        errors.push(name);
        field.classList.add('input-error');
      } else {
        field.classList.remove('input-error');
      }

      if (
        (name === 'phone' || field.type === 'tel') &&
        value &&
        !PHONE_REGEX.test(value)
      ) {
        errors.push(name + '-format');
        field.classList.add('input-error');
      }
    });

    return { valid: errors.length === 0, data: data, errors: errors };
  }

  function showConfetti() {
    var container = document.createElement('div');
    container.setAttribute('aria-hidden', 'true');
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10000;overflow:hidden';
    document.body.appendChild(container);

    var colors = ['#E8636B', '#D4A05A', '#7C3AED', '#0D9488', '#F59E0B', '#FFD700'];

    for (var i = 0; i < 80; i++) {
      var piece = document.createElement('div');
      piece.style.cssText = 'position:absolute;top:-10px;width:10px;height:10px;border-radius:2px;animation:confetti-fall linear forwards';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 0.5 + 's';
      piece.style.animationDuration = Math.random() * 1.5 + 1.5 + 's';
      container.appendChild(piece);
    }

    if (!document.getElementById('confetti-style')) {
      var style = document.createElement('style');
      style.id = 'confetti-style';
      style.textContent = '@keyframes confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}';
      document.head.appendChild(style);
    }

    setTimeout(function () { container.remove(); }, 3500);
  }

  function showFormSuccess(formId) {
    var successEl = document.getElementById(formId + '-success');
    var form = document.getElementById(formId);
    if (successEl && form) {
      form.style.display = 'none';
      successEl.style.display = 'block';
    }
    showConfetti();
  }

  function setButtonLoading(btn, loading) {
    if (!btn) return;
    if (loading) {
      btn.dataset.originalText = btn.textContent;
      btn.disabled = true;
      btn.classList.add('is-loading');
    } else {
      btn.disabled = false;
      btn.classList.remove('is-loading');
      btn.textContent = btn.dataset.originalText || btn.textContent;
    }
  }

  // Inject error style
  if (!document.getElementById('form-error-style')) {
    var s = document.createElement('style');
    s.id = 'form-error-style';
    s.textContent = '.input-error{border-color:#EF4444!important;box-shadow:0 0 0 3px rgba(239,68,68,.15)!important}';
    document.head.appendChild(s);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var formId = form.id;
    var submitBtn = form.querySelector('button[type="submit"], .form-submit');

    if (form.dataset.submitting === 'true') return;

    var result = validateForm(form);
    if (!result.valid) return;

    // Add form type
    result.data.type = (formId === 'vendor-form' || formId === 'vendor-form-page') ? 'vendor' : 'waitlist';

    form.dataset.submitting = 'true';
    setButtonLoading(submitBtn, true);

    // Use hidden iframe + form to reliably POST to Google Apps Script
    var iframeName = 'haflati-submit-' + Date.now();
    var iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    var hiddenForm = document.createElement('form');
    hiddenForm.method = 'POST';
    hiddenForm.action = GOOGLE_SCRIPT_URL;
    hiddenForm.target = iframeName;
    hiddenForm.style.display = 'none';

    var keys = Object.keys(result.data);
    for (var i = 0; i < keys.length; i++) {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = keys[i];
      input.value = result.data[keys[i]];
      hiddenForm.appendChild(input);
    }

    document.body.appendChild(hiddenForm);
    hiddenForm.submit();

    setTimeout(function () {
      showFormSuccess(formId);
      form.reset();
      setButtonLoading(submitBtn, false);
      form.dataset.submitting = 'false';
      hiddenForm.remove();
      iframe.remove();
    }, 1500);
  }

  var waitlistForm = document.getElementById('waitlist-form');
  var vendorForm = document.getElementById('vendor-form');
  var vendorFormPage = document.getElementById('vendor-form-page');

  if (waitlistForm) waitlistForm.addEventListener('submit', handleFormSubmit);
  if (vendorForm) vendorForm.addEventListener('submit', handleFormSubmit);
  if (vendorFormPage) vendorFormPage.addEventListener('submit', handleFormSubmit);

  /* ============================================================
     10. TAB SWITCHER ("How It Works")
     ============================================================ */
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = this.getAttribute('data-tab');

      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      tabPanels.forEach(function (p) { p.classList.remove('active'); });

      this.classList.add('active');
      var panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  /* ============================================================
     11. PHONE MOCKUP PARALLAX
     ============================================================ */
  var phoneMockup = document.querySelector('.hero__phone');

  function handleParallax() {
    if (!phoneMockup) return;
    var scrollY = window.scrollY;
    var offset = scrollY * 0.1;
    phoneMockup.style.transform = 'translateY(' + -offset + 'px)';
  }

  if (phoneMockup) {
    window.addEventListener('scroll', throttle(handleParallax, 16), { passive: true });
  }
})();
