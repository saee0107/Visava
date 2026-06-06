/**
 * VISAVA HILL RESORT - ENHANCED PREMIUM RESTAURANT INTERACTION CONTROLLER
 * Handles navigation states, mobile animations, interactive filtering, and viewport reveals.
 * ENHANCED: Better animations, smooth transitions, and improved user experience
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Core Component Controllers
  initScrollProgressBar();
  initStickyHeader();
  initMobileNavigation();
  initMenuFilterSystem();
  initActiveNavigationScrollMapping();
  initScrollRevealAnimations();
  initContactForm();
});

/**
 * 1. CUSTOM SCROLL PROGRESS BAR - ENHANCED
 * Fills up the custom progress indicator bar matching user reading depth with smooth animation.
 */
function initScrollProgressBar() {
  const progressBar = document.getElementById("scroll-progress");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (totalHeight > 0) {
      const scrollPercentage = (windowScroll / totalHeight) * 100;
      progressBar.style.width = `${scrollPercentage}%`;
    }
  });
}

/**
 * 2. SHRUNK STICKY HEADER - ENHANCED
 * Adjusts padding, opacity, and borders as the user leaves the top of the viewport with smooth transitions.
 */
function initStickyHeader() {
  const mainHeader = document.getElementById("main-header");
  if (!mainHeader) return;

  const toggleHeaderState = () => {
    const scrollThreshold = 50;
    const isScrolled = window.scrollY > scrollThreshold;
    
    if (isScrolled) {
      mainHeader.classList.add("scrolled");
    } else {
      mainHeader.classList.remove("scrolled");
    }
  };

  // Run on load and bind to scrolling interactions
  toggleHeaderState();
  window.addEventListener("scroll", toggleHeaderState, { passive: true });
}

/**
 * 3. MOBILE HAMBURGER TOGGLE & OVERLAY MENU - ENHANCED
 * Coordinates active transition transformations between menu panel and action lines with smooth animations.
 */
function initMobileNavigation() {
  const menuToggleBtn = document.getElementById("menu-toggle-btn");
  const mobileOverlayMenu = document.getElementById("mobile-overlay-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (!menuToggleBtn || !mobileOverlayMenu) return;

  const toggleMenu = () => {
    const isOpen = menuToggleBtn.classList.toggle("open");
    mobileOverlayMenu.classList.toggle("open", isOpen);
    
    // Prevent background scrolling behind the overlay
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  const closeMenu = () => {
    menuToggleBtn.classList.remove("open");
    mobileOverlayMenu.classList.remove("open");
    document.body.style.overflow = "";
  };

  // Desktop/Mobile toggle actions
  menuToggleBtn.addEventListener("click", toggleMenu);

  // Close interface when clicking individual navigation routing hooks
  mobileLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      closeMenu();
      
      // Smooth scroll to section
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      }
    });
  });

  // Close menu when clicking outside
  mobileOverlayMenu.addEventListener("click", (e) => {
    if (e.target === mobileOverlayMenu) {
      closeMenu();
    }
  });
}

/**
 * 4. INTERACTIVE MENU EXPLORER FILTER - ENHANCED
 * Sorts categorical culinary metadata wrappers with smooth fade animations.
 */
function initMenuFilterSystem() {
  const tabButtons = document.querySelectorAll(".menu-tab-btn");
  const menuCardWrappers = document.querySelectorAll(".menu-card-wrapper");

  if (tabButtons.length === 0 || menuCardWrappers.length === 0) return;

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Step A: Synchronize active buttons visual state markers
      tabButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Step B: Filter data criteria processing with smooth animation
      const filterCategory = button.getAttribute("data-category");

      menuCardWrappers.forEach((wrapper, index) => {
        // Collect embedded space-separated parameters inside data targets
        const itemCategories = wrapper.getAttribute("data-item-category").split(" ");
        const shouldShow = filterCategory === "all" || itemCategories.includes(filterCategory);

        if (shouldShow) {
          wrapper.classList.remove("hide");
          wrapper.classList.add("show");
          // Stagger animation for visual appeal
          wrapper.style.animationDelay = `${index * 0.05}s`;
        } else {
          wrapper.classList.remove("show");
          wrapper.classList.add("hide");
        }
      });
    });
  });
}

/**
 * 5. SMART ACTIVE NAVIGATION LINKS MAPPING - ENHANCED
 * Tracks viewport coordinates to update navbar highlight lines dynamically with better accuracy.
 */
function initActiveNavigationScrollMapping() {
  const sections = document.querySelectorAll("section[id]");
  const desktopLinks = document.querySelectorAll(".desktop-nav .nav-link");
  const mobileLinks = document.querySelectorAll(".mobile-nav-links .mobile-link");

  const updateActiveState = () => {
    // Dynamic offset for better accuracy
    const scrollPosition = window.scrollY + 150;

    let currentSection = null;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });

    if (currentSection) {
      // Synchronize Desktop Active Link State
      desktopLinks.forEach(link => {
        const isActive = link.getAttribute("href") === `#${currentSection}`;
        link.classList.toggle("active", isActive);
      });

      // Synchronize Mobile Active Link State
      mobileLinks.forEach(link => {
        const isActive = link.getAttribute("href") === `#${currentSection}`;
        link.classList.toggle("active", isActive);
      });
    }
  };

  window.addEventListener("scroll", updateActiveState, { passive: true });
  updateActiveState(); // Initial runtime synchronization call
}

/**
 * 6. VIEWPORT INTERSECTION SCROLL REVEAL ANIMATIONS - ENHANCED
 * Programmatically tracks structural elements tagged with reveal configurations using Intersection Observer.
 */
function initScrollRevealAnimations() {
  const revealElements = document.querySelectorAll(".scroll-reveal");
  
  if (revealElements.length === 0) return;

  // Utilize high performance hardware-accelerated intersection observer tracking API
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Elements get injected with active translation controls
        entry.target.classList.add("reveal-active");
        
        // Add fade-in animation class
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        
        // Stop observation overhead cycles since presentation logic has executed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Fire trigger phase when 15% of the card crosses bounds
    rootMargin: "0px 0px -50px 0px" // Slight bottom offset buffer padding
  });

  revealElements.forEach(element => {
    // Set initial state
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    
    revealObserver.observe(element);
  });
}

/**
 * 7. ENHANCED CONTACT FORM HANDLER
 * Validates form input and provides user feedback.
 */
function initContactForm() {
  const contactForm = document.getElementById("visava-contact-form");
  const successMessage = document.getElementById("form-success-message");

  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("form-name").value.trim();
    const phone = document.getElementById("form-phone").value.trim();
    const email = document.getElementById("form-email").value.trim();
    const inquiry = document.getElementById("form-inquiry").value;
    const message = document.getElementById("form-message").value.trim();

    // Basic validation
    if (!name || !phone || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Log form data (In production, this would send to a server)
    console.log({
      name,
      phone,
      email,
      inquiry,
      message,
      timestamp: new Date().toISOString()
    });

    // Show success message
    if (successMessage) {
      successMessage.style.display = "flex";
      successMessage.style.alignItems = "center";
      successMessage.style.gap = "12px";
      
      // Scroll to success message
      setTimeout(() => {
        successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 300);
    }

    // Reset form
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      if (successMessage) {
        successMessage.style.display = "none";
      }
    }, 5000);
  });
}

/**
 * 8. SMOOTH SCROLL LINK HANDLER
 * Enhances navigation link clicks with smooth scrolling.
 */
document.addEventListener("DOMContentLoaded", () => {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      
      // Skip if href is just "#"
      if (href === "#") return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});