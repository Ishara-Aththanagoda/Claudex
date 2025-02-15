
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const getAdviceButton = document.getElementById('getAdvice');
    const adviceText = document.getElementById('adviceText');

    // Handle login form
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            alert(data.message);
        } catch (err) {
            console.error(err);
            alert('An error occurred during login.');
        }
    });


    getAdviceButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/advice');
            const data = await response.json();
            if (data.slip && data.slip.advice) {
                adviceText.textContent = `"${data.slip.advice}"`;
            } else {
                adviceText.textContent = 'No advice found.';
            }
        } catch (err) {
            console.error(err);
            adviceText.textContent = 'Error fetching advice.';
        }
    });
});
