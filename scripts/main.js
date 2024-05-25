// Latest Year in footer
const yearElement = document.getElementById('copyright_year');
const currentYear = new Date().getFullYear();
yearElement.textContent = `${currentYear}`;

// Add shadow to nav bar on scroll
window.addEventListener('scroll', function() {
const nav = document.querySelector('header');
const scrollY = window.scrollY;

if (scrollY > 20) { // Adjust the threshold value as needed (in pixels)
    nav.classList.add('is-fixed');
} else {
    nav.classList.remove('is-fixed');
}
});