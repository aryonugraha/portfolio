// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateX(0)';
            entry.target.style.transition = 'all 0.8s ease-out';
        }
    });
}, observerOptions);

// Observe timeline items
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    const skillsCards = document.querySelectorAll('.skills-analytics-card');
    skillsCards.forEach(card => {
        observer.observe(card);
    });

    const technicalCanvas = document.getElementById('technicalSkillsChart');
    const managerialCanvas = document.getElementById('managerialSkillsChart');

    if (technicalCanvas && window.Chart) {
        const tctx = technicalCanvas.getContext('2d');
        new Chart(tctx, {
            type: 'bar',
            data: {
                labels: [
                    'Omnichannel',
                    'Conversational AI',
                    'Generative AI',
                    'Data Analytics',
                    'Solution & Architecture'
                ],
                datasets: [{
                    data: [90, 95, 80, 95, 90],
                    backgroundColor: 'rgba(192, 57, 43, 0.85)',
                    borderColor: 'rgba(236, 240, 241, 1)',
                    borderWidth: 1,
                    borderRadius: 10,
                    borderSkipped: false,
                    hoverBackgroundColor: 'rgba(22, 160, 133, 0.95)'
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(11, 16, 23, 0.95)',
                        borderColor: 'rgba(52, 73, 94, 0.8)',
                        borderWidth: 1,
                        titleColor: '#e5e7eb',
                        bodyColor: '#e5e7eb',
                        displayColors: false
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'rgba(236, 240, 241, 0.85)',
                            font: { size: 11 }
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            color: 'rgba(149, 165, 166, 0.7)'
                        },
                        grid: {
                            color: 'rgba(22, 160, 133, 0.3)'
                        }
                    }
                }
            }
        });
    }

    if (managerialCanvas && window.Chart) {
        const mctx = managerialCanvas.getContext('2d');
        new Chart(mctx, {
            type: 'radar',
            data: {
                labels: [
                    'Project Management',
                    'Operational Support',
                    'Presales Support'
                ],
                datasets: [{
                    data: [80, 90, 95],
                    backgroundColor: 'rgba(22, 160, 133, 0.25)',
                    borderColor: 'rgba(22, 160, 133, 1)',
                    pointBackgroundColor: '#C0392B',
                    pointBorderColor: '#0f172a',
                    pointRadius: 4,
                    pointHoverRadius: 5,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(11, 16, 23, 0.95)',
                        borderColor: 'rgba(52, 73, 94, 0.8)',
                        borderWidth: 1,
                        titleColor: '#e5e7eb',
                        bodyColor: '#e5e7eb',
                        displayColors: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        suggestedMin: 60,
                        suggestedMax: 100,
                        angleLines: {
                            color: 'rgba(52, 73, 94, 0.7)'
                        },
                            grid: {
                            color: 'rgba(22, 160, 133, 0.35)'
                        },
                        pointLabels: {
                            color: 'rgba(236, 240, 241, 0.9)',
                            font: { size: 11 }
                        },
                        ticks: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.classList.toggle('nav-open', isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('nav-open');
                }
            });
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Throttle function to improve scroll performance
function throttle(func, delay) {
    let timeoutId;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function() {
                if ((Date.now() - lastRan) >= delay) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, delay - (Date.now() - lastRan));
        }
    }
}

// Consolidated scroll event handler with throttling
const handleScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero-content');

    if (!navbar) return;

    // Update active nav link
    let current = '';
    const navHeight = navbar.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;
		
        if (scrolled >= sectionTop && scrolled < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });

    // Add shadow to navbar on scroll
    if (scrolled > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }

    // Parallax effect for hero section: desktop only
    if (hero) {
        if (window.innerWidth > 1024) {
            // Desktop: subtle parallax + fade
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - scrolled / 600;
        } else {
            // Mobile: keep hero content fixed and fully visible
            hero.style.transform = 'translateY(0)';
            hero.style.opacity = 1;
        }
    }
}, 16); // ~60fps

window.addEventListener('scroll', handleScroll);

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fillBar 1.5s ease-out forwards';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Add hover effect to timeline items
document.querySelectorAll('.timeline-content').forEach(content => {
    content.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});
