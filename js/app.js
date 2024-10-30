// Select the navigation container and all sections
const navContainer = document.querySelector('.navbar ul');
const sections = document.querySelectorAll('.mainContent > div'); // Using .mainContent > div
const scrollTopBtn = document.getElementById('scrollTopBtn');
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

// Function to build the navigation dynamically with icons
function buildNavigation() {
    sections.forEach(section => {
        const sectionName = section.getAttribute('id'); // Using id of the section
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        // Create an icon element
        const icon = document.createElement('i');
        if (sectionName === 'Home') {
            icon.className = 'fa-solid fa-house';
        } else if (sectionName === 'About') {
            icon.className = 'fa-solid fa-user';
        } else if (sectionName === 'Services') {
            icon.className = 'fa-solid fa-list-ul';
        } else if (sectionName === 'Portfolio') {
            icon.className = 'fa-solid fa-address-book';
        } else if (sectionName === 'Contact') {
            icon.className = 'fa-solid fa-comments';
        }

        // Append icon and text to the link
        a.appendChild(icon);
        a.innerHTML += ` ${sectionName}`;
        a.href = `#${sectionName}`; // Linking to id
        
        // Append the link to list item and list item to nav container
        li.appendChild(a);
        navContainer.appendChild(li);
        
        // Adding smooth scroll on click
        a.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            document.getElementById(sectionName).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Function to highlight active section using Intersection Observer
function highlightActiveSection() {
    const navLinks = document.querySelectorAll('.navbar ul li a'); // Define navigation links
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionName = section.getAttribute('id');

        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'))
            // Add active class to the link corresponding to the section
            navLinks.forEach(link => {
                if (link.getAttribute('href').includes(sectionName)) {
                    link.classList.add('active');
                    section.classList.add('active','bg');
                }
            });
         
        }   else {
            // Remove active state from link if section is out of view
            navLinks.forEach(link => {
                if (link.getAttribute('href').includes(sectionName)) {
                    link.classList.remove('active');        
                    section.classList.remove('active','bg');
                  
                }
            });
        }
    });
   // Toggle the visibility of the "scroll to top" button based on the user's scroll position; show it if scrolled more than 500 pixels down, otherwise hide it.
    if (window.scrollY > 500) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }

    
    // Add a class when scrolling to change the styling
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show or hide the navbar based on the scroll direction
    if (window.scrollY > lastScrollY) {
        // Scrolling down: hide the navbar
        navbar.classList.add('hidden');
    } else {
        // Scrolling up: show the navbar
        navbar.classList.remove('hidden');
    }

    lastScrollY = window.scrollY;
    
}
// Initialize the Typed.js library to create a typing animation for specific text elements
var typed = new Typed(".typing", {
    strings: ["Web developer", "Web designer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// Initial navigation build and event listener for scroll
buildNavigation();

window.addEventListener('scroll', highlightActiveSection);
// Scroll to top event
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
