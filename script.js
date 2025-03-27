document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav ul li a"); // Select all menu links
    const body = document.querySelector("body");

    // Function to highlight active menu item
    function highlightActivePage() {
        let currentPage = window.location.pathname.split("/").pop(); // Get current page name
        if (currentPage === "") currentPage = "index.html"; // Default to home page

        links.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active"); // Add active class
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Smooth transition effect when navigating between pages
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default navigation

            let targetPage = this.getAttribute("href"); // Get target page
            body.classList.add("fade-out"); // Apply fade-out animation

            setTimeout(() => {
                window.location.href = targetPage; // Navigate after animation
            }, 500); // Delay for smooth effect
        });
    });

    // Highlight the active page on load
    highlightActivePage();

    // ✅ Language Switching Logic (Now Persistent Across Pages)
    function setLanguage(lang) {
        localStorage.setItem("language", lang); // Store selected language
        loadTranslations(lang);
    }

    function loadTranslations(lang) {
        fetch("translations.json") // Load translations.json
            .then(response => response.json())
            .then(translations => {
                document.querySelectorAll("[data-key]").forEach(element => {
                    const key = element.getAttribute("data-key");
                    if (translations[lang] && translations[lang][key]) {
                        element.textContent = translations[lang][key];
                    }
                });
            })
            .catch(error => console.error("Error loading translations:", error));
    }

    // Load the saved language on every page
    const savedLang = localStorage.getItem("language") || "en"; 
    loadTranslations(savedLang);

    // Expose function to global scope for language switch button
    window.setLanguage = setLanguage;
});
