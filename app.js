/**
 * VISAVA HILL RESORT - PREMIUM RESTAURANT INTERACTION CONTROLLER
 * Handles navigation states, mobile animations, interactive filtering, and viewport reveals.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Core Component Controllers
  initScrollProgressBar();
  initStickyHeader();
  initMobileNavigation();
  initMenuFilterSystem();
  initActiveNavigationScrollMapping();
  initScrollRevealAnimations();
});

/**
 * 1. CUSTOM SCROLL PROGRESS BAR
 * Fills up the custom progress indicator bar matching user reading depth.
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
 * 2. SHRUNK STICKY HEADER
 * Adjusts padding, opacity, and borders as the user leaves the top of the viewport.
 */
function initStickyHeader() {
  const mainHeader = document.getElementById("main-header");
  if (!mainHeader) return;

  const toggleHeaderState = () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add("scrolled");
    } else {
      mainHeader.classList.remove("scrolled");
    }
  };

  // Run on load and bind to scrolling interactions
  toggleHeaderState();
  window.addEventListener("scroll", toggleHeaderState);
}

/**
 * 3. MOBILE HAMBURGER TOGGLE & OVERLAY MENU
 * Coordinates active transition transformations between menu panel and action lines.
 */
function initMobileNavigation() {
  const menuToggleBtn = document.getElementById("menu-toggle-btn");
  const mobileOverlayMenu = document.getElementById("mobile-overlay-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (!menuToggleBtn || !mobileOverlayMenu) return;

  const toggleMenu = () => {
    const isOpen = menuToggleBtn.classList.toggle("open");
    mobileOverlayMenu.classList.toggle("open", isOpen);
    
    // Prevent background scrolling behind the heavy overlay blur filter
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
    link.addEventListener("click", closeMenu);
  });
}

/**
 * 4. INTERACTIVE MENU EXPLORER FILTER
 * Sorts categorical culinary metadata wrappers with dynamic CSS scale classes.
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

      // Step B: Filter data criteria processing
      const filterCategory = button.getAttribute("data-category");

      menuCardWrappers.forEach(wrapper => {
        // Collect embedded space-separated parameters inside data targets
        const itemCategories = wrapper.getAttribute("data-item-category").split(" ");

        if (filterCategory === "all" || itemCategories.includes(filterCategory)) {
          wrapper.classList.remove("hide");
          wrapper.classList.add("show");
        } else {
          wrapper.classList.remove("show");
          wrapper.classList.add("hide");
        }
      });
    });
  });
}

/**
 * 5. SMART ACTIVE NAVIGATION LINKS MAPPING
 * Tracks viewport coordinates to update navbar highlight lines dynamically.
 */
function initActiveNavigationScrollMapping() {
  const sections = document.querySelectorAll("section[id]");
  const desktopLinks = document.querySelectorAll(".desktop-nav .nav-link");
  const mobileLinks = document.querySelectorAll(".mobile-nav-links .mobile-link");

  const updateActiveState = () => {
    const scrollPosition = window.scrollY + 150; // Dynamic offset adjustments for header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Synchronize Desktop Active Link State
        desktopLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
        });

        // Synchronize Mobile Active Link State
        mobileLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
        });
      }
    });
  };

  window.addEventListener("scroll", updateActiveState);
  updateActiveState(); // Initial runtime synchronization call
}

/**
 * 6. VIEWPORT INTERSECTION SCROLL REVEAL ANIMATIONS
 * Programmatically tracks structural elements tagged with reveal configurations.
 */
function initScrollRevealAnimations() {
  const revealElements = document.querySelectorAll(".scroll-reveal");
  
  if (revealElements.length === 0) return;

  // Utilize high performance hardware-accelerated intersection observer tracking API
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Elements get injected with active translation controls defined inside layout variables
        entry.target.classList.add("reveal-active");
        
        // Stop observation overhead cycles since presentation logic has executed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Fire trigger phase immediately when 15% of the card crosses bounds
    rootMargin: "0px 0px -50px 0px" // Slight bottom offset buffer padding configurations
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}