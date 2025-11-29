// ============ Dark Mode Toggle ============
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ============ Mobile Menu Toggle ============
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ============ Smooth Scrolling & Active Navigation ============
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});

// ============ Typing Animation ============
const typingText = document.querySelector('.typing-text');
const typingTexts = [
    'Aspiring Data Scientist & AI/ML Enthusiast',
    'Building Intelligent Solutions',
    'Data-Driven Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Pause before deleting
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        setTimeout(type, 500); // Pause before typing new text
        return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(type, speed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    type();
});

// ============ Fade-in on Scroll Animation ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ============ Form Validation & Submission ============
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm() {
    let isValid = true;
    
    // Reset errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    
    // Validate name
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    // Validate email
    if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Validate message
    if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    return isValid;
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Show success message
        formStatus.textContent = '✓ Message sent successfully! Thank you for reaching out.';
        formStatus.classList.add('success');
        formStatus.classList.remove('error');
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.classList.remove('success');
        }, 5000);
    } else {
        // Show error message
        formStatus.textContent = '✗ Please fix the errors above';
        formStatus.classList.add('error');
        formStatus.classList.remove('success');
    }
});

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
    } else {
        nameError.textContent = '';
    }
});

emailInput.addEventListener('blur', () => {
    if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
    } else {
        emailError.textContent = '';
    }
});

messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
    } else {
        messageError.textContent = '';
    }
});

// ============ Scroll Indicator Animation ============
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
});

// ============ Progressive Image Loading ============
document.addEventListener('DOMContentLoaded', () => {
    // Animate project cards on load
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Animate skill cards on load
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });
});

// ============ Smooth Scroll for Anchor Links ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just '#'
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============ Navbar Background on Scroll ============
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }
});

// ============ Preload Animation ============
function preloadAnimation() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'slideInUp 0.8s ease-out';
    }
}

window.addEventListener('load', preloadAnimation);

// ============ Performance: Debounce Scroll Events ============
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced scroll handler for better performance
const debouncedScroll = debounce(() => {
    // Scroll handler logic
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ============ Accessibility: Keyboard Navigation ============
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
    
    // Tab key navigation (handled by browser by default)
});

// ============ Print Styles Warning ============
window.addEventListener('beforeprint', () => {
    console.log('If you want to save this portfolio as PDF, use the print feature in your browser.');
});

// ============ Error Handling ============
window.addEventListener('error', (event) => {
    console.error('An error occurred:', event.error);
});

// ============ Performance Monitoring ============
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime, 'ms');
    });
}
