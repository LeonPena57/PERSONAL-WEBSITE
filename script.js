document.addEventListener('DOMContentLoaded', () => {
    // RAIN //
    const rainContainer = document.querySelector('.rain-container');

    for (let i = 0; i < 100; i++) {
        const rain = document.createElement('div');
        rain.className = 'rain';

        // Randomize color and opacity
        if (Math.random() > 0.9) {
            rain.style.backgroundColor = 'lightblue'; // Occasionally light blue
            rain.style.opacity = Math.random() * 0.5 + 0.5; // Higher opacity for light blue
        } else {
            rain.style.opacity = Math.random() * 0.5 + 0.1; // Random opacity
        }

        rain.style.left = Math.random() * 100 + 'vw';
        rain.style.animationDuration = (Math.random() * 1.5 + 0.5) + 's, ' + (Math.random() * 2 + 1) + 's';
        rain.style.animationDelay = Math.random() * 2 + 's, ' + (Math.random() * 8 + 2) + 's';
        rain.style.height = Math.random() * 60 + 20 + 'px';
        rainContainer.appendChild(rain);
    }
    // END RAIN //

    // Function to include HTML content
    function includeHTML() {
        var z, i, elmnt, file, xhttp;
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            file = elmnt.getAttribute("include-html");
            if (file) {
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            elmnt.innerHTML = this.responseText;
                            setActiveLink(); // Ensure active link is set after including HTML
                        }
                        if (this.status == 404) {
                            elmnt.innerHTML = "Page not found.";
                        }
                        elmnt.removeAttribute("include-html");
                    }
                };
                xhttp.open("GET", file, true);
                xhttp.send();
                return;
            }
        }
    }

    // Function to set active link
    function setActiveLink() {
        const currentPage = window.location.pathname.split("/").pop(); // Extract current page name from URL
        const navLinks = document.querySelectorAll('.navbar ul li a');
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split("/").pop(); // Extract page name from href
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active'); // Ensure other links are not active
            }
        });
    }

    includeHTML(); // Call to load external HTML content
    
    // BURGER MENU //
    function toggleMenu() {
        const navbar = document.querySelector('.navbar ul');
        navbar.classList.toggle('show');

        // Get the current URL path
        const currentPath = window.location.pathname;

        // Select all anchor links in the navbar
        const navItems = navbar.querySelectorAll('a');

        // Loop through each link to check for the active one
        navItems.forEach((link) => {
            // Compare href and pathname
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active'); // Apply active class
            } else {
                link.classList.remove('active'); // Remove from others
            }
        });
    }
    // END BURGER //
});
