import { getLocalStorage, calcTotalAmount, readCardFile, readUserFile, formatCardDate } from "./utils";


function transactionForm() {
    document.addEventListener("DOMContentLoaded", (e) => {
        e.preventDefault();
        const transaction = document.getElementById('transaction');
        const selectedHotel = getLocalStorage("selectedHotel");
        const userProfile = getLocalStorage("userProfile");
        const checkIn = selectedHotel.check_in;
        const checkOut = selectedHotel.check_out;
        const price = selectedHotel.price;

      const dataArray = readCardFile(); //import json file from database
      const profileDb = readUserFile(); //import json file from database
      const date = formatCardDate(dataArray); //manipulate dataArray for exact card first before use
      const cardAmount = userProfile.amount;
      const totalAmount = calcTotalAmount(checkIn, checkOut, price);
        const cardRendered = 
        `<form id="to-payment" class="to-payment">
            <h2>Make Payment</h2>
            <div>
                <strong>${totalAmount}</strong>
            </div>
            <label>Pay Here:
                <input type="text" name="pass-w" id="pass-w" required>
            </label><br>
            <label>Card Number:
                <input type="text" name="card-n" id="card-n" required>
            </label><br>
            <label>Expiration Date:
                <input type="text" name="exp-d" id="exp-d" required>
            </label><br>
            <label>CVV:
                <input type="text" name="cvv" id="cvv" required>
            </label><br>
            <label>Password:
                <input type="password" name="pass-w" id="pass-w" pattern="^(?=.*[a-z])(?=.[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,}$" required>
            </label><br>
        </form>`;
        transaction.innerHTML = cardRendered;
        // From database:
        // Get card number, cvv, type, savings, background img, fname, lname,
        // username
        try {
            const fname = document.getElementById("card-n").value;
            const lname = document.getElementById("exp-d").value;
            const username = document.getElementById("cvv").value;
            const password = document.getElementById("pass-w").value;
        
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
}
function validatePassword(password) {
    const passwordRegex = "^(?=.*[a-z])(?=.[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,}$";
    return passwordRegex.text(password);
}
// to ensure that 
// requestAnimationFrame(() => {
const passwordInput = document.getElementById('pass-w');
if (passwordInput){


passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const isValid = validatePassword(password);
    if (isValid) {
        console.log('Password is valid1');
    } else {
        alert('Password must be at least 6 characters,\nhave a lower and an upper cases, \na number and a special character.');
    }
});
}
// });
transactionForm();