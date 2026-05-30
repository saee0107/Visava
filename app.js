/* ==========================================================================
   VISAVA HILL RESORT - CLIENT-SIDE INTERACTION CONTROLLER
   Pure JavaScript, zero-dependencies. Highly performance-optimized.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. GLOBAL ELEMENTS SELECTORS
  // ==========================================
  const header = document.getElementById('main-header');
  const scrollProgress = document.getElementById('scroll-progress');
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const mobileOverlayMenu = document.getElementById('mobile-overlay-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const menuTabs = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card-wrapper');
  const contactForm = document.getElementById('visava-contact-form');
  const successAlert = document.getElementById('form-success-message');

  // ==========================================
  // 2. SCROLL EVENTS: STICKY HEADER & PROGRESS
  // ==========================================
  const handleScrollEffects = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Calculate scroll progress percentage
    if (scrollHeight > 0) {
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = `${scrollPercentage}%`;
    }

    // Shrink header on scroll
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScrollEffects, { passive: true });
  handleScrollEffects(); // Initial check on load

  // ==========================================
  // 3. MOBILE MENU OVERLAY TRANSITIONS
  // ==========================================
  const toggleMobileMenu = () => {
    const isOpen = mobileOverlayMenu.classList.contains('open');
    if (isOpen) {
      // Close menu
      mobileOverlayMenu.classList.remove('open');
      menuToggleBtn.classList.remove('open');
      document.body.style.overflow = ''; // Enable scrolling
    } else {
      // Open menu
      mobileOverlayMenu.classList.add('open');
      menuToggleBtn.classList.add('open');
      document.body.style.overflow = 'hidden'; // Lock scrolling
    }
  };

  menuToggleBtn.addEventListener('click', toggleMobileMenu);

  // Close mobile menu on clicking links
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileOverlayMenu.classList.remove('open');
      menuToggleBtn.classList.remove('open');
      document.body.style.overflow = '';
      
      // Update active mobile class immediately
      mobileLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // ==========================================
  // 4. INTERSECTION OBSERVER FOR SCROLL REVEALS
  // ==========================================
  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once animated in
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  const elementsToReveal = document.querySelectorAll('.scroll-reveal');
  elementsToReveal.forEach(elem => {
    revealObserver.observe(elem);
  });

  // ==========================================
  // 5. ACTIVE NAVIGATION SYNC ON SCROLL
  // ==========================================
  const sectionObserverOptions = {
    threshold: 0.35,
    rootMargin: '-80px 0px -20% 0px'
  };

  const updateActiveNavLink = (activeId) => {
    // Sync Desktop Nav Links
    navLinks.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      if (href === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Sync Mobile Nav Links
    mobileLinks.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      if (href === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveNavLink(id);
      }
    });
  }, sectionObserverOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // ==========================================
  // 6. INTERACTIVE MENU CATEGORY FILTERING (FIXED)
  // ==========================================
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active tab visual
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-category');

      // Filter card containers safely
      menuCards.forEach(card => {
        const rawCategory = card.getAttribute('data-item-category');
        // Fallback check to prevent crashing if attribute is missing
        const itemCategories = rawCategory ? rawCategory.split(' ') : [];

        if (filterValue === 'all' || itemCategories.includes(filterValue)) {
          card.classList.remove('hide');
          card.classList.add('show');
          card.style.display = 'block'; // Ensures smooth layout rendering
        } else {
          card.classList.remove('show');
          card.classList.add('hide');
          card.style.display = 'none'; // Prevents hidden elements from layout-hogging
        }
      });
    });
  });

  // ==========================================
  // 7. ELEGANT CONTACT FORM HANDLER (OPTIMIZED)
  // ==========================================
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get values for client visual success feedback
      const userName = document.getElementById('form-name').value;
      const userPhone = document.getElementById('form-phone').value;
      const userEmail = document.getElementById('form-email').value;

      // Animate the button to custom loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending message <i class="fa-solid fa-spinner fa-spin icon-right"></i>';
      submitBtn.style.opacity = '0.7';

      // Simulate API post delay (1.5 seconds)
      setTimeout(() => {
        // Fade out form fields cleanly
        contactForm.style.transition = 'opacity 0.3s ease';
        contactForm.style.opacity = '0';
        
        setTimeout(() => {
          contactForm.style.display = 'none';
          
          // Custom success alert modification
          successAlert.querySelector('h4').textContent = `Message Sent, ${userName}!`;
          successAlert.style.display = 'flex';
          successAlert.style.opacity = '1';
          
          console.log('Inquiry details captured:', {
            name: userName,
            phone: userPhone,
            email: userEmail,
            inquiry: document.getElementById('form-inquiry').value,
            message: document.getElementById('form-message').value,
            timestamp: new Date().toISOString()
          });

          // Reset form fields internally in the background
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane icon-right"></i>';
          submitBtn.style.opacity = '1';
        }, 300);

      }, 1500);

    });
  }

  // Smooth scroll logic fallback for iOS safari back/forward button issues
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = 80; // height of sticky nav
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});