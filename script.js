const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Initial slide
showSlide(currentSlide);

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const stickyHeader = document.querySelector('.sticky-header');

// Toggle Mobile Navigation Menu
hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    hamburger.classList.toggle('open'); // Toggle 'open' class on the hamburger icon
});

// Sticky Navbar Visibility on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        stickyHeader.classList.add('visible');
    } else {
        stickyHeader.classList.remove('visible');
    }
});


// Scroll Animation Using Intersection Observer
const scrollElements = document.querySelectorAll('.scroll-animation');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.4, // Trigger when 30% of the element is visible
});

scrollElements.forEach((element) => {
    observer.observe(element);
});

// Parallax Effect for Overlay
const overlay = document.querySelector('.ontop');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    overlay.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});



 const circles = document.querySelectorAll('.circle');
let currentFocus = 2;

// Detect if user is on mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Update carousel for mobile behavior
function updateCarousel() {
    circles.forEach((circle, index) => {
        circle.classList.remove('focus');

        if (isMobile()) {
            // On mobile, only focus on one circle at a time
            circle.style.opacity = index === currentFocus ? '1' : '0';
            circle.style.transform = index === currentFocus ? 'translateX(0) scale(1.8)' : 'translateX(100vw)';
            circle.style.zIndex = index === currentFocus ? '2' : '1';
        } else {
            // On larger screens, maintain horizontal animation
            const newIndex = (index - currentFocus + circles.length) % circles.length;
            circle.style.transform = `translateX(${(newIndex - 2) * 250}px)`;
            circle.style.opacity = newIndex === 2 ? '1' : '0.5';
            circle.style.zIndex = newIndex === 2 ? '2' : '1';

            if (newIndex === 2) {
                circle.classList.add('focus');
            }
        }
    });
}

// Transition between circles every 5 seconds
function transitionCarousel() {
    currentFocus = (currentFocus + 1) % circles.length;
    updateCarousel();
}

// Ensure behavior updates on window resize
window.addEventListener('resize', updateCarousel);

// Initial setup
updateCarousel();
setInterval(transitionCarousel, 5000);





const timelineEvents = document.querySelectorAll('.timeline-event');
const timelineLine = document.querySelector('.timeline-line');
let isLocked = false; // Lock state
let currentIndex = -1; // To track the current active event
let lastScrollPosition = window.pageYOffset; // To track the scroll direction

function lockScroll() {
  document.body.style.overflow = 'hidden'; // Disable scrolling
}

function unlockScroll() {
  document.body.style.overflow = ''; // Enable scrolling
}

function scrollToElement(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
}

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.pageYOffset;
  const isScrollingDown = currentScrollPosition > lastScrollPosition; // Detect scroll direction
  lastScrollPosition = currentScrollPosition; // Update the last scroll position

  if (isLocked) return; // If scrolling is locked, do nothing

  const windowHeight = window.innerHeight;
  let maxActiveStep = 0;

  timelineEvents.forEach((event, index) => {
    const rect = event.getBoundingClientRect();
    const isInView = rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2;

    if (isInView && index !== currentIndex && isScrollingDown) {
      // If scrolling down and a new card is in view
      currentIndex = index; // Update current index
      isLocked = true;

      // Lock scrolling and scroll to the card
      lockScroll();
      scrollToElement(event);

      // Unlock scrolling after 2 seconds
      setTimeout(() => {
        isLocked = false;
        unlockScroll();
      }, 1000);
    }

    if (isInView) {
      event.classList.add('active');
      maxActiveStep = index + 1;
    } else {
      event.classList.remove('active');
    }
  });

  // Adjust the height of the timeline line based on the max active step
  const lineHeight = (maxActiveStep / timelineEvents.length) * 100;
  timelineLine.style.height = `${lineHeight}%`;
});








// 🌟 Sustainability Circle Counter Animation on Scroll
document.addEventListener('DOMContentLoaded', () => {
  const sustainableAreas = document.querySelectorAll('.sustainablearea');

  const startAnimation = (circle, number, percent) => {
    let currentPercent = 0;
    const interval = setInterval(() => {
      currentPercent++;
      circle.style.background = `conic-gradient(mediumseagreen ${currentPercent}%, #ccc ${currentPercent}%)`;
      number.innerText = `${currentPercent}%`;

      if (currentPercent >= percent) {
        clearInterval(interval);
      }
    }, 20); // Adjust animation speed
  };

  const handleScroll = () => {
    sustainableAreas.forEach((area) => {
      const rect = area.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0 && !area.classList.contains('active')) {
        area.classList.add('active');
        const circle = area.querySelector('.sustainablecircle');
        const number = area.querySelector('.sustainablenumbers');
        const percent = parseInt(area.getAttribute('data-percent'));
        startAnimation(circle, number, percent);
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
});



document.querySelector('.btnwhy a').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    const targetId = this.getAttribute('href'); // Get the href attribute value
    const targetSection = document.querySelector(targetId); // Find the target element

    targetSection.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start' // Scroll to the top of the section
    });
});
