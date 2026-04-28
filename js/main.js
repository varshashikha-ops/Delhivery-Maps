// Delhivery Maps Landing Page Scripts

document.addEventListener('DOMContentLoaded', () => {

  // --- Nav Active State on Click ---
  const navLinks = document.querySelectorAll('.header__nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('mailto')) {
        navLinks.forEach(function(l) { l.classList.remove('header__nav-link--active'); });
        link.classList.add('header__nav-link--active');
      } else {
        navLinks.forEach(function(l) { l.classList.remove('header__nav-link--active'); });
        link.classList.add('header__nav-link--active');
      }
    });
  });

  // --- Scroll Spy: Highlight nav based on visible section ---
  const scrollSpySections = [
    { id: 'hero', navText: 'Home' },
    { id: 'showcase', navText: 'Product' },
    { id: 'pricing', navText: 'Pricing' }
  ];

  function updateActiveNav() {
    const scrollY = window.scrollY + 120; // offset for fixed header
    let currentSection = 'hero';

    for (let i = scrollSpySections.length - 1; i >= 0; i--) {
      const section = document.getElementById(scrollSpySections[i].id);
      if (section && section.offsetTop <= scrollY) {
        currentSection = scrollSpySections[i].id;
        break;
      }
    }

    const matchingEntry = scrollSpySections.find(s => s.id === currentSection);
    if (!matchingEntry) return;

    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      // Skip external page links (Developer, Support)
      if (href && (href.includes('.html'))) return;

      link.classList.remove('header__nav-link--active');

      if (currentSection === 'hero' && (href === '#' || href === '#hero')) {
        link.classList.add('header__nav-link--active');
      } else if (href === '#' + currentSection) {
        link.classList.add('header__nav-link--active');
      }
    });
  }

  // Only run scroll spy on the homepage (index.html)
  if (!window.location.pathname.includes('developer') && !window.location.pathname.includes('support') && !window.location.pathname.includes('signin')) {
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  // --- Custom Location Cursor ---
  const cursorPin = document.querySelector('.cursor-pin');
  if (cursorPin && window.matchMedia('(hover: hover)').matches) {
    let cx = 0, cy = 0, px = 0, py = 0;
    document.addEventListener('mousemove', (e) => {
      cx = e.clientX;
      cy = e.clientY;
      if (!cursorPin.classList.contains('is-active')) cursorPin.classList.add('is-active');
    });
    document.addEventListener('mouseleave', () => cursorPin.classList.remove('is-active'));
    (function loop() {
      px += (cx - px) * 0.15;
      py += (cy - py) * 0.15;
      cursorPin.style.left = px + 'px';
      cursorPin.style.top = py + 'px';
      requestAnimationFrame(loop);
    })();
  }

  // --- Typewriter Effect for "Precision" ---

  // --- Map Spotlight Reveal ---
  var mapReveal = document.querySelector('.hero');
  var mapBright = document.getElementById('mapBright');
  if (mapReveal && mapBright && window.matchMedia('(hover: hover)').matches) {
    var spotX = 0, spotY = 0, targetX = 0, targetY = 0;
    var spotRadius = 120;

    mapReveal.style.cursor = 'none';
    mapBright.style.pointerEvents = 'none';

    mapReveal.addEventListener('mousemove', function(e) {
      var mapBg = document.getElementById('mapReveal');
      var rect = mapBg ? mapBg.getBoundingClientRect() : mapReveal.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    });

    mapReveal.addEventListener('mouseleave', function() {
      mapBright.style.maskImage = 'radial-gradient(circle 0px at ' + spotX + 'px ' + spotY + 'px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)';
      mapBright.style.webkitMaskImage = 'radial-gradient(circle 0px at ' + spotX + 'px ' + spotY + 'px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)';
    });

    (function spotLoop() {
      spotX += (targetX - spotX) * 0.12;
      spotY += (targetY - spotY) * 0.12;
      var mask = 'radial-gradient(circle ' + spotRadius + 'px at ' + spotX + 'px ' + spotY + 'px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)';
      mapBright.style.maskImage = mask;
      mapBright.style.webkitMaskImage = mask;
      requestAnimationFrame(spotLoop);
    })();
  }

  const typeTarget = document.getElementById('typewriterTarget');
  if (typeTarget) {
    const words = ['Precision', 'Intelligence', 'Accuracy', 'Speed'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 120;

    function typeLoop() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typeTarget.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 60;
      } else {
        typeTarget.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 120;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000; // pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400; // pause before next word
      }

      setTimeout(typeLoop, typingSpeed);
    }
    setTimeout(typeLoop, 800); // initial delay
  }

  // --- Scroll Reveal (reversible) ---
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // --- Staggered Button (Get Started) ---
  document.querySelectorAll('.btn--swipe').forEach(function(btn) {
    var label = btn.dataset.label || btn.textContent.trim();
    var container = btn.querySelector('.swipe-letters');
    if (!container) return;
    container.innerHTML = '';
    var chars = Array.from(label);
    var stagger = 30; // ms per letter
    var duration = 300; // ms

    chars.forEach(function(ch, i) {
      var c = ch === ' ' ? '\u00a0' : ch;
      var span = document.createElement('span');
      span.className = 'swipe-letter';

      var inner = document.createElement('span');
      inner.className = 'swipe-letter-inner';
      inner.style.transform = 'translateY(0%)';
      inner.style.transitionDuration = duration + 'ms';
      inner.style.transitionTimingFunction = 'cubic-bezier(0.25, 0.1, 0.25, 1)';
      inner.style.transitionDelay = (i * stagger) + 'ms';

      var s1 = document.createElement('span'); s1.textContent = c; // visible letter
      var s2 = document.createElement('span'); s2.textContent = c; // letter coming from below
      inner.appendChild(s1);
      inner.appendChild(s2);
      span.appendChild(inner);
      container.appendChild(span);
    });

    btn.addEventListener('mouseenter', function() {
      container.querySelectorAll('.swipe-letter-inner').forEach(function(inner) {
        inner.style.transform = 'translateY(-50%)';
      });
    });
    btn.addEventListener('mouseleave', function() {
      container.querySelectorAll('.swipe-letter-inner').forEach(function(inner) {
        inner.style.transform = 'translateY(0%)';
      });
    });
  });

  // --- TiltCard Controller (Industries + non-flip Showcase) — tilt only ---
  (function initTiltCards() {
    var isHoverDevice = window.matchMedia('(hover: hover)').matches;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var TILT_FACTOR = 15;
    var TILT_SPEED = 0.2;
    var HOVER_SCALE = 1.05;

    // After reveal animation ends on industries cards, free the transform property for tilt
    document.querySelectorAll('.industries__card.reveal').forEach(function(card) {
      card.addEventListener('transitionend', function handler(e) {
        if (e.propertyName === 'transform' && card.classList.contains('is-visible')) {
          card.removeEventListener('transitionend', handler);
          card.classList.remove('reveal', 'is-visible');
          card.style.opacity = '1';
          card.classList.add('tilt-ready');
        }
      });
    });

    if (isHoverDevice && !reducedMotion) {
      var tiltCards = document.querySelectorAll('.industries__card, .sc-card:not(.sc-card--flip)');
      tiltCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
          if (card.classList.contains('reveal')) return;
          card.style.transition = 'transform ' + TILT_SPEED + 's ease-out, box-shadow ' + TILT_SPEED + 's ease-out';
          card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)';
        });

        card.addEventListener('mousemove', function(e) {
          if (card.classList.contains('reveal')) return;

          var rect = card.getBoundingClientRect();
          var x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
          var y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
          var tiltX = -(y / 50) * TILT_FACTOR;
          var tiltY = (x / 50) * TILT_FACTOR;
          card.style.transition = 'transform ' + TILT_SPEED + 's ease-out, box-shadow ' + TILT_SPEED + 's ease-out';
          card.style.transform = 'perspective(1000px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) scale(' + HOVER_SCALE + ')';
        });

        card.addEventListener('mouseleave', function() {
          if (card.classList.contains('reveal')) return;
          card.style.transition = 'transform 0.35s ease-out, box-shadow 0.35s ease-out';
          card.style.transform = '';
          card.style.boxShadow = '';
        });
      });
    }
  })();

  // --- Flip Card Controller (Showcase only) ---
  (function initFlipCards() {
    var flipCards = document.querySelectorAll('.sc-card--flip');
    if (!flipCards.length) return;

    var isHoverDevice = window.matchMedia('(hover: hover)').matches;

    flipCards.forEach(function(card) {
      function setFlipped(flipped) {
        if (flipped) {
          card.classList.add('sc-card--flipped');
        } else {
          card.classList.remove('sc-card--flipped');
        }
        card.setAttribute('aria-expanded', flipped ? 'true' : 'false');
      }

      if (isHoverDevice) {
        card.addEventListener('mouseenter', function() { setFlipped(true); });
        card.addEventListener('mouseleave', function() { setFlipped(false); });
      } else {
        card.addEventListener('click', function() {
          var isFlipped = card.classList.contains('sc-card--flipped');
          setFlipped(!isFlipped);
        });
      }

      // Keyboard: Enter/Space to toggle
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var isFlipped = card.classList.contains('sc-card--flipped');
          setFlipped(!isFlipped);
        }
      });
    });
  })();
  document.querySelectorAll('.faq__item').forEach(function(item) {
    var btn = item.querySelector('.faq__question');
    var answer = item.querySelector('.faq__answer');
    if (!btn || !answer) return;
    btn.addEventListener('click', function() {
      var isOpen = item.classList.contains('is-open');
      // Close all
      document.querySelectorAll('.faq__item.is-open').forEach(function(openItem) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq__answer').style.maxHeight = '0';
        openItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });
      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- Word-by-Word Scroll Reveal ---
  const revealTextEl = document.getElementById('scrollRevealText');
  if (revealTextEl) {
    const rawText = revealTextEl.textContent.trim();
    const words = rawText.split(/\s+/);
    revealTextEl.innerHTML = '';
    const wordSpans = [];
    words.forEach(function(word, i) {
      var span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      span.style.opacity = '0.2';
      revealTextEl.appendChild(span);
      if (i < words.length - 1) {
        revealTextEl.appendChild(document.createTextNode(' '));
      }
      wordSpans.push(span);
    });

    var stickyWrap = document.querySelector('.tagline__sticky-wrap');

    function onScroll() {
      if (!stickyWrap || wordSpans.length === 0) return;
      var wrapTop = stickyWrap.getBoundingClientRect().top;
      var wrapHeight = stickyWrap.offsetHeight;
      var viewH = window.innerHeight;
      var scrollable = wrapHeight - viewH;
      if (scrollable <= 0) return;
      var scrolled = -wrapTop;
      var progress = scrolled / scrollable;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      var total = wordSpans.length;
      for (var i = 0; i < total; i++) {
        var wordStart = i / total;
        var wordEnd = (i + 1) / total;
        if (progress >= wordEnd) {
          wordSpans[i].style.opacity = '1';
        } else if (progress >= wordStart) {
          var t = (progress - wordStart) / (wordEnd - wordStart);
          wordSpans[i].style.opacity = String(0.2 + t * 0.8);
        } else {
          wordSpans[i].style.opacity = '0.2';
        }
      }
    }

    window.addEventListener('scroll', onScroll, false);
    onScroll();
  }

  // --- Bento card stagger (reversible) ---
  const bentoGrid = document.querySelector('.bento__grid');
  if (bentoGrid) {
    const bentoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const cards = entry.target.querySelectorAll('.bento__card');
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          cards.forEach(card => card.style.animationPlayState = 'running');
        } else {
          entry.target.classList.remove('is-visible');
          cards.forEach(card => {
            card.style.animation = 'none';
            card.offsetHeight; // trigger reflow
            card.style.animation = '';
            card.style.animationPlayState = 'paused';
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    bentoObserver.observe(bentoGrid);
  }

  // --- Parallax Particle Drift ---
  const particles = document.querySelector('.committed__particles');
  if (particles) {
    window.addEventListener('scroll', () => {
      const section = particles.closest('.committed');
      if (section) {
        const rect = section.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2) * 0.05;
        particles.style.transform = `translateY(${offset}px)`;
      }
    }, { passive: true });
  }

  // --- Parallax Sparkles ---
  const sparkles = document.querySelectorAll('.committed__sparkle');
  if (sparkles.length) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      sparkles.forEach((sparkle, i) => {
        const speed = 0.02 + (i * 0.008);
        sparkle.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }, { passive: true });
  }

  // --- Showcase: Parallax avatars on multilingual card ---
  const parallaxCard = document.querySelector('[data-parallax]');

  // --- Showcase: Scroll-in converging reveal ---
  const scCards = document.querySelectorAll('.sc-card');
  // Row 1: cards 0=left, 1=center, 2=right. Row 2: cards 3=bleft, 4=bright
  const directions = ['sc-animate--left', 'sc-animate--center', 'sc-animate--right', 'sc-animate--bleft', 'sc-animate--bright'];
  scCards.forEach((card, i) => {
    if (directions[i]) card.classList.add(directions[i]);
  });

  const scObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15 });
  scCards.forEach(card => scObserver.observe(card));

  if (parallaxCard) {
    const avatars = parallaxCard.querySelectorAll('.sc-lang__av');
    const speeds = [0.8, 1.0, 1.2];
    parallaxCard.addEventListener('mousemove', (e) => {
      const rect = parallaxCard.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      avatars.forEach((av, i) => {
        const s = speeds[i] || 1;
        av.style.transform = `translate(${-(mx * s * 0.05)}px, ${-(my * s * 0.05)}px)`;
      });
    });
    parallaxCard.addEventListener('mouseleave', () => {
      avatars.forEach(av => { av.style.transform = 'translate(0,0)'; });
    });
  }

  // --- Brand voice toggle ---
  document.querySelectorAll('.sc-brand__pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.sc-brand__pill').forEach(p => p.classList.remove('sc-brand__pill--on'));
      pill.classList.add('sc-brand__pill--on');
    });
  });

  // --- Odometer Counter (committed stats) ---
  const odometerEls = document.querySelectorAll('[data-odometer]');
  if (odometerEls.length) {
    function buildOdometer(el) {
      const target = parseInt(el.dataset.odometer, 10);
      const suffix = el.dataset.suffix || '';
      const digits = String(target).split('');
      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      const digitH = fontSize * 1.2;

      el.innerHTML = '';
      const wrap = document.createElement('span');
      wrap.className = 'odometer-wrap';

      const wheels = [];
      digits.forEach(function(d) {
        const digitWrap = document.createElement('span');
        digitWrap.className = 'odometer-digit';
        digitWrap.style.width = (fontSize * 0.65) + 'px';
        digitWrap.style.height = digitH + 'px';

        const inner = document.createElement('span');
        inner.className = 'odometer-digit-inner';
        // Build strip 0-9
        for (var i = 0; i <= 9; i++) {
          const s = document.createElement('span');
          s.textContent = i;
          s.style.height = digitH + 'px';
          inner.appendChild(s);
        }
        inner.style.transform = 'translateY(0)'; // start at 0
        digitWrap.appendChild(inner);
        wrap.appendChild(digitWrap);
        wheels.push({ inner: inner, target: parseInt(d, 10), digitH: digitH });
      });

      if (suffix) {
        const suf = document.createElement('span');
        suf.className = 'odometer-suffix';
        suf.textContent = suffix;
        wrap.appendChild(suf);
      }

      el.appendChild(wrap);
      return wheels;
    }

    function spinOdometer(wheels) {
      wheels.forEach(function(w) {
        var y = -w.target * w.digitH;
        w.inner.style.transform = 'translateY(' + y + 'px)';
      });
    }

    var odometerData = [];
    odometerEls.forEach(function(el) {
      var wheels = buildOdometer(el);
      odometerData.push({ el: el, wheels: wheels, triggered: false });
    });

    var odometerObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var item = odometerData.find(function(d) { return d.el === entry.target; });
        if (!item) return;
        if (entry.isIntersecting) {
          spinOdometer(item.wheels);
          item.triggered = true;
        } else if (item.triggered) {
          // Reset on scroll out
          item.wheels.forEach(function(w) { w.inner.style.transform = 'translateY(0)'; });
          item.triggered = false;
        }
      });
    }, { threshold: 0.3 });

    odometerData.forEach(function(d) { odometerObserver.observe(d.el); });
  }

  // --- Inject company logos into testimonial cards ---
  (function() {
    var companies = [
      { name: 'Flipkart', domain: 'flipkart.com' },
      { name: 'Swiggy', domain: 'swiggy.com' },
      { name: 'Meesho', domain: 'meesho.com' },
      { name: 'Zepto', domain: 'zeptonow.com' },
      { name: 'Dunzo', domain: 'dunzo.com' },
      { name: 'PhonePe', domain: 'phonepe.com' },
      { name: 'Zomato', domain: 'zomato.com' },
      { name: 'BigBasket', domain: 'bigbasket.com' },
      { name: 'Delhivery', domain: 'delhivery.com' }
    ];
    var cards = document.querySelectorAll('.testi__card');
    cards.forEach(function(card, i) {
      var company = companies[i % companies.length];
      var logo = document.createElement('img');
      logo.className = 'testi__company-logo';
      logo.src = 'https://logo.clearbit.com/' + company.domain + '?size=40';
      logo.alt = company.name;
      logo.loading = 'lazy';
      logo.onerror = function() {
        // Fallback to text if logo fails
        var text = document.createElement('span');
        text.className = 'testi__company';
        text.textContent = company.name;
        card.appendChild(text);
        logo.remove();
      };
      card.appendChild(logo);
    });
  })();

  // --- Pricing Carousel (button-only navigation) ---
  var pricingCarousel = document.getElementById('pricingCarousel');
  var pricingTrack = document.getElementById('pricingTrack');
  if (pricingCarousel && pricingTrack) {
    var trackXVal = 0;
    var activeIdx = 0;
    var slideWidth = 380;
    var gapVal = 24;
    var stepVal = slideWidth + gapVal;
    var perspective = 1200;
    var maxRotateY = 30;
    var depth = 80;
    var activeScale = 1.0;
    var inactiveScale = 0.88;
    var inactiveOpacity = 0.55;
    var snapDuration = 500;

    function getSlides() { return Array.from(pricingTrack.querySelectorAll('.pricing__slider-card')); }

    function centerXFor(i) {
      return pricingCarousel.offsetWidth / 2 - i * stepVal - slideWidth / 2;
    }

    function renderSlides() {
      var slides = getSlides();
      var center = pricingCarousel.offsetWidth / 2;
      pricingTrack.style.transform = 'translateX(' + trackXVal + 'px)';
      slides.forEach(function(slide, i) {
        var slideCenter = i * stepVal + slideWidth / 2 + trackXVal;
        var norm = (slideCenter - center) / stepVal;
        var abs = Math.abs(norm);
        var ry = norm * maxRotateY;
        var tz = -abs * depth;
        var sc = Math.max(inactiveScale, activeScale - abs * (activeScale - inactiveScale));
        var op = Math.max(inactiveOpacity, 1 - abs * (1 - inactiveOpacity));
        slide.style.transform = 'perspective(' + perspective + 'px) rotateY(' + ry + 'deg) translateZ(' + tz + 'px) scale(' + sc + ')';
        slide.style.opacity = op;
        slide.style.zIndex = Math.round(100 - abs * 10);
      });
    }

    var snapRaf = null;
    function snapTo(idx) {
      var slides = getSlides();
      idx = Math.max(0, Math.min(slides.length - 1, idx));
      activeIdx = idx;
      var targetX = centerXFor(idx);
      var startXSnap = trackXVal;
      var startTime = null;
      if (snapRaf) cancelAnimationFrame(snapRaf);
      function animate(ts) {
        if (!startTime) startTime = ts;
        var elapsed = ts - startTime;
        var t = Math.min(elapsed / snapDuration, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        trackXVal = startXSnap + (targetX - startXSnap) * eased;
        renderSlides();
        if (t < 1) snapRaf = requestAnimationFrame(animate);
        else { trackXVal = targetX; renderSlides(); }
      }
      snapRaf = requestAnimationFrame(animate);
      document.querySelectorAll('.pricing-carousel__dot').forEach(function(dot, i) {
        dot.classList.toggle('is-active', i === idx);
      });
    }

    // Arrow buttons only
    var prevBtn = document.getElementById('pricingPrev');
    var nextBtn = document.getElementById('pricingNext');
    if (prevBtn) prevBtn.addEventListener('click', function() { snapTo(activeIdx - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function() { snapTo(activeIdx + 1); });

    // Dots
    document.querySelectorAll('.pricing-carousel__dot').forEach(function(dot) {
      dot.addEventListener('click', function() { snapTo(parseInt(dot.dataset.index)); });
    });

    getSlides().forEach(function(card) { card.style.transition = 'none'; });
    snapTo(0);
    window.addEventListener('resize', function() { snapTo(activeIdx); });
  }

  // --- Price count-up animation (repeatable on scroll) ---
  const priceEls = document.querySelectorAll('[data-count]');
  if (priceEls.length) {
    const priceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.dataset.animating) return;
          entry.target.dataset.animating = 'true';
          const target = parseInt(entry.target.dataset.count, 10);
          const duration = 2500;
          const start = performance.now();
          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            entry.target.textContent = '\u20B9' + current;
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              delete entry.target.dataset.animating;
            }
          };
          requestAnimationFrame(tick);
        } else {
          entry.target.textContent = '\u20B9' + 0;
          delete entry.target.dataset.animating;
        }
      });
    }, { threshold: 0.3 });
    priceEls.forEach(el => priceObserver.observe(el));
  }

});
