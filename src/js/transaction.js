import { renderCard } from "./hotelCard";
export function transactionForm() {
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
        
            localStorage.setItem("userProfile", JSON.stringify(profileObj));
            alert("Thank You!\n\nRedirecting to make payment.");
            window.location.href = "../booking-confirmation/payment.html";
        } catch (error) {
            console.log("Error:", error);
        }
    });
}