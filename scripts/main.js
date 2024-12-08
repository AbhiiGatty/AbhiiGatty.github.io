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

document.addEventListener("DOMContentLoaded", function () {
    // Select the projects section
    const projectsSection = document.querySelector("#projects-section");

    // Proceed only if the projects section exists
    if (projectsSection) {
        // Select the scrollable container and scroll indicator
        const scrollableContainer = projectsSection.querySelector("div[style*='overflow-y: auto']");
        const scrollIndicator = document.querySelector("#projectScrollMoreMessage");

        // Ensure scrollable container and scroll indicator exist
        if (scrollableContainer && scrollIndicator) {
            // Count the number of project links inside the container
            const projectItems = scrollableContainer.querySelectorAll("a");

            // Show the scroll indicator only if there are more than 3 items
            if (projectItems.length > 3) {
                scrollIndicator.style.display = "block"; // Ensure it's visible
            } else {
                scrollIndicator.style.display = "none"; // Hide it if not needed
            }
        }
    }
});
