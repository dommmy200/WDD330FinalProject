import { renderCard } from "./hotelCard";

function transactionForm() {
    if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", (e) => {
            e.preventDefault();
            const transaction = document.getElementById('transaction')
            const cardRendered = renderCard();
            transaction.innerHTML = cardRendered;
            // From database:
            // Get card number, cvv, type, savings, background img, fname, lname,
            // username
            try {
                const fname = document.getElementById("firstname").value;
                const lname = document.getElementById("surname").value;
                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;
            
                const profileObj = {
                    fname: `${fname}`,
                    lname: `${lname}`,
                    username: `${username}`,
                    password: `${password}`,
                };
                // Payment should be made here and redirect user to home page to wrap up
                // the hotel booking.
                localStorage.setItem("userProfile", JSON.stringify(profileObj));
                alert("Thank You for your patronage!");
                window.location.href = "../index.html";
            } catch (error) {
                console.log("Error:", error);
            }
        });
    } else {
        // Run immediately if the DOM is already loaded
        console.log('DOM already loaded and parsed');
    }
}
transactionForm();