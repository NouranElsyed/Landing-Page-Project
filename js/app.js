// Select navigation container, all sections, the navbar, and scrollTop button
const navContainer = document.querySelector('.navbar ul');
const sections = document.querySelectorAll('.mainContent > div');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;



// Initialize the Typed.js library to create a typing animation for specific text elements
var typed = new Typed(".typing", {
    strings: ["Web developer", "Web designer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});


// Scroll to top event
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



// Function to build the navigation dynamically with icons and smooth scroll
function buildNavigation() {
    sections.forEach(section => {
        const sectionName = section.getAttribute('id');
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        // Create icon for each section
        const icon = document.createElement('i');
        if (sectionName === 'Home') icon.className = 'fa-solid fa-house';
        else if (sectionName === 'About') icon.className = 'fa-solid fa-user';
        else if (sectionName === 'Services') icon.className = 'fa-solid fa-list-ul';
        else if (sectionName === 'Portfolio') icon.className = 'fa-solid fa-address-book';
        else if (sectionName === 'Contact') icon.className = 'fa-solid fa-comments';

        a.appendChild(icon);
        a.innerHTML += ` ${sectionName}`;
        a.href = `#${sectionName}`;
        
        li.appendChild(a);
        navContainer.appendChild(li);

        // Smooth scroll to section on click
        a.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById(sectionName).scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Initialize navigation build function
buildNavigation();

// Add scroll event to control active section and navbar behavior
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.navbar ul li a');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionName = section.getAttribute('id');

        // Check if section is in viewport
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
            // Remove active class from all links and sections
            navLinks.forEach(link => link.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active', 'bg'));

            // Add active class to the current link and section
            navLinks.forEach(link => {
                if (link.getAttribute('href').includes(sectionName)) {
                    link.classList.add('active');
                    section.classList.add('active', 'bg');
                }
            });
        } else {
            // Remove active state if section is out of view
            navLinks.forEach(link => {
                if (link.getAttribute('href').includes(sectionName)) {
                    link.classList.remove('active');
                    section.classList.remove('active', 'bg');
                }
            });
        }
    });

    // Show/hide scroll-to-top button
    scrollTopBtn.style.display = window.scrollY > 500 ? 'block' : 'none';

    // Navbar styling and visibility control based on scroll direction
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > lastScrollY) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }

    lastScrollY = window.scrollY;
});


