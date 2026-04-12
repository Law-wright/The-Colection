/* ============================================================
   THECOLECTION — Main JavaScript
   ============================================================ */

'use strict';

/* ─── Utility ─── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ════════════════════════════════════════════════
   NAV — scroll state + mobile toggle
   ════════════════════════════════════════════════ */
function initNav() {
  const nav = $('.nav');
  if (!nav) return;

  // Scroll state
  const onScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile hamburger
  const hamburger = $('.nav-hamburger');
  const mobileNav = $('.nav-mobile');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  $$('.nav-mobile a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active link highlighting
  const currentPath = window.location.pathname.replace(/\/$/, '');
  $$('.nav-link, .footer-nav-link').forEach(link => {
    const href = link.getAttribute('href')?.replace(/\/$/, '') || '';
    if (href === currentPath || (currentPath === '' && href === '/index.html')) {
      link.classList.add('active');
    }
  });
}

/* ════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
   ════════════════════════════════════════════════ */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  $$('.reveal').forEach(el => observer.observe(el));
}

/* ════════════════════════════════════════════════
   MARQUEE — duplicate content for seamless loop
   ════════════════════════════════════════════════ */
function initMarquee() {
  const track = $('.marquee-track');
  if (!track) return;

  const inner = $('.marquee-inner', track);
  if (!inner) return;

  // Clone for seamless loop
  const clone = inner.cloneNode(true);
  track.appendChild(clone);
}

/* ════════════════════════════════════════════════
   TESTIMONIAL CYCLING — auto-highlight
   ════════════════════════════════════════════════ */
function initTestimonials() {
  const cards = $$('.testimonial-card');
  if (!cards.length) return;

  let current = 0;

  const setCurrent = (idx) => {
    cards.forEach((c, i) => c.classList.toggle('active', i === idx));
    current = idx;
  };

  setCurrent(0);

  // Auto-cycle
  const interval = setInterval(() => {
    const next = (current + 1) % cards.length;
    setCurrent(next);
  }, 3500);

  // Click to manually select
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      clearInterval(interval);
      setCurrent(i);
    });
  });
}

/* ════════════════════════════════════════════════
   PROJECT FILTER — projects page
   ════════════════════════════════════════════════ */
function initProjectFilter() {
  const tabs = $$('.filter-tab');
  const cards = $$('.project-card-full');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        if (show) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          card.style.pointerEvents = 'auto';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          card.style.pointerEvents = 'none';
        }
      });
    });
  });
}

/* ════════════════════════════════════════════════
   CONTACT FORM — client-side UX
   ════════════════════════════════════════════════ */
function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn-primary');
    const originalText = btn.innerHTML;

    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin">
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-dasharray="60" stroke-dashoffset="60">
          <animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" values="60;0;60"/>
        </path>
      </svg>
      Sending...
    `;
    btn.disabled = true;

    // Redirect to Jotform after brief delay (simulating send)
    setTimeout(() => {
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Sent! Redirecting...
      `;

      setTimeout(() => {
        window.open(
          'https://form.jotform.com/253236239169058',
          '_blank'
        );
        btn.innerHTML = originalText;
        btn.disabled = false;
        form.reset();
      }, 1000);
    }, 1200);
  });
}

/* ════════════════════════════════════════════════
   STAT COUNTERS — animate numbers up
   ════════════════════════════════════════════════ */
function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();

        const update = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out quart
          const eased = 1 - Math.pow(1 - progress, 4);
          el.textContent = Math.round(eased * target) + suffix;

          if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

/* ════════════════════════════════════════════════
   CURSOR GLOW — subtle mouse tracking effect
   ════════════════════════════════════════════════ */
function initCursorGlow() {
  // Only on desktop
  if (window.matchMedia('(max-width: 900px)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  let isVisible = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      glow.style.opacity = '1';
      isVisible = true;
    }
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
    isVisible = false;
  });

  const animate = () => {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

/* ════════════════════════════════════════════════
   HERO HEADLINE — staggered line reveal
   ════════════════════════════════════════════════ */
function initHeroReveal() {
  const lines = $$('.hero-headline .line');
  if (!lines.length) return;

  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(40px)';
    line.style.transition = `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + i * 0.12}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + i * 0.12}s`;

    requestAnimationFrame(() => {
      setTimeout(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, 80);
    });
  });

  // Animate other hero elements
  const heroEls = $$('.hero-tag, .hero-sub, .hero-actions, .hero-stats');
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.4 + i * 0.1}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.4 + i * 0.1}s`;

    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 80);
  });
}

/* ════════════════════════════════════════════════
   SMOOTH ANCHOR SCROLL
   ════════════════════════════════════════════════ */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initMarquee();
  initTestimonials();
  initProjectFilter();
  initContactForm();
  initCounters();
  initCursorGlow();
  initHeroReveal();
  initSmoothScroll();
});
