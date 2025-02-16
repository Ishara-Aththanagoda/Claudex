document.addEventListener("DOMContentLoaded", () => {
    // Dark Mode
    const toggleTheme = document.getElementById("toggleTheme");
    if (toggleTheme) {
        toggleTheme.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            toggleTheme.textContent = document.body.classList.contains("dark-mode")
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";
        });
    }

    // Password
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePassword.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                passwordInput.type = "password";
                togglePassword.classList.replace("fa-eye-slash", "fa-eye");
            }
        });
    }

    // Login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            try {
                const response = await fetch("/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                alert(data.message);
            } catch (err) {
                console.error(err);
                alert("An error occurred during login.");
            }
        });
    }

    // Daily Advice API 
    const getAdviceButton = document.getElementById("getAdvice");
    const adviceText = document.getElementById("adviceText");
    if (getAdviceButton && adviceText) {
        getAdviceButton.addEventListener("click", async () => {
            try {
                const response = await fetch("/api/advice");
                const data = await response.json();
                if (data.slip && data.slip.advice) {
                    adviceText.textContent = `"${data.slip.advice}"`;
                } else {
                    adviceText.textContent = "No advice found.";
                }
            } catch (err) {
                console.error(err);
                adviceText.textContent = "Error fetching advice.";
            }
        });
    }

    // Random Quote API
    const quoteText = document.getElementById("quoteText");
    if (quoteText) {
        fetch("https://api.quotable.io/random")
            .then((response) => response.json())
            .then((data) => {
                quoteText.innerText = `"${data.content}" - ${data.author}`;
            })
            .catch((error) => console.error("Error fetching quote:", error));
    }
});
