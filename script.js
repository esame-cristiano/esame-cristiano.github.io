// Console Log di DEBUG
console.log('script.js caricato correttamente!');
console.log('SitoWeb Caricato e pronto all\'uso.')
console.log(' ');
console.log('Sezioni disponibili:');
console.log('- Il Digitale');
console.log('- Cybersecurity');
console.log('- Cyberbullismo');

// Chiudi il menu quando clicki su un link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========== ACCORDION ========== 
function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.toggle-icon');

    // Chiudi tutti gli altri accordion
    const allButtons = document.querySelectorAll('.accordion-header');
    const allContents = document.querySelectorAll('.accordion-content');
    
    allButtons.forEach(btn => {
        if (btn !== button) {
            btn.classList.remove('active');
            btn.nextElementSibling.classList.remove('active');
        }
    });

    // Toggle dell'accordion attuale
    button.classList.toggle('active');
    content.classList.toggle('active');
}

// Primo accordion aperto di default
document.addEventListener('DOMContentLoaded', () => {
    const firstButton = document.querySelector('.accordion-header');
    if (firstButton) {
        firstButton.classList.add('active');
        firstButton.nextElementSibling.classList.add('active');
    }

    // Animate on scroll
    observeElements();
});

// Animazioni
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    const cards = document.querySelectorAll('.card, .responsibility-card, .solution-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
        }
    });
});

// Torna Sopra
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '⬆️ Torna Sopra';
scrollToTopButton.id = 'backToTop';
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
`;

document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.opacity = '1';
        scrollToTopButton.style.visibility = 'visible';
    } else {
        scrollToTopButton.style.opacity = '0';
        scrollToTopButton.style.visibility = 'hidden';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// Statische 
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const increment = target / 50;
    let current = 0;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Animazioni Statistiche
window.addEventListener('load', () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(stat);
                    observer.unobserve(stat);
                }
            });
        });
        observer.observe(stat);
    });
});

// Fix per dispositivi Android 14+ e iOS 18+
function closeMenuOnEscape(event) {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

document.addEventListener('keydown', closeMenuOnEscape);

