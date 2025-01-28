
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

showSlide(currentSlide);

setInterval(nextSlide, 5000);


   const menuToggle = document.getElementById('mainmenusec');
        const mobileNav = document.getElementById('mobilehead');
        const closeBtn = document.getElementById('closingham');

        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            closeBtn.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            closeBtn.classList.remove('active');
        });


const scrollElements = document.querySelectorAll('.scroll-animation');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.4, 
});

scrollElements.forEach((element) => {
    observer.observe(element);
});

const overlay = document.querySelector('.ontop');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    overlay.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});



 const circles = document.querySelectorAll('.circle');
let currentFocus = 2;

function isMobile() {
    return window.innerWidth <= 768;
}

function updateCarousel() {
    circles.forEach((circle, index) => {
        circle.classList.remove('focus');

        if (isMobile()) {
          
            circle.style.opacity = index === currentFocus ? '1' : '0';
            circle.style.transform = index === currentFocus ? 'translateX(0) scale(1.8)' : 'translateX(100vw)';
            circle.style.zIndex = index === currentFocus ? '2' : '1';
        } else {
           
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

function transitionCarousel() {
    currentFocus = (currentFocus + 1) % circles.length;
    updateCarousel();
}

window.addEventListener('resize', updateCarousel);

updateCarousel();
setInterval(transitionCarousel, 5000);





const timelineEvents = document.querySelectorAll('.timeline-event');
const timelineLine = document.querySelector('.timeline-line');
let isLocked = false; 
let currentIndex = -1; 
let lastScrollPosition = window.pageYOffset;

function lockScroll() {
  document.body.style.overflow = 'hidden'; 
}

function unlockScroll() {
  document.body.style.overflow = ''; 
}

function scrollToElement(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
}

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.pageYOffset;
  const isScrollingDown = currentScrollPosition > lastScrollPosition; 
  lastScrollPosition = currentScrollPosition;

  if (isLocked) return; 

  const windowHeight = window.innerHeight;
  let maxActiveStep = 0;

  timelineEvents.forEach((event, index) => {
    const rect = event.getBoundingClientRect();
    const isInView = rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2;

    if (isInView && index !== currentIndex && isScrollingDown) {
      
      currentIndex = index; 
      isLocked = true;

      lockScroll();
      scrollToElement(event);

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

  const lineHeight = (maxActiveStep / timelineEvents.length) * 100;
  timelineLine.style.height = `${lineHeight}%`;
});




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
    }, 20); 
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
    event.preventDefault(); 
    const targetId = this.getAttribute('href'); 
    const targetSection = document.querySelector(targetId); 

    targetSection.scrollIntoView({
        behavior: 'smooth', 
        block: 'start'
    });
});


