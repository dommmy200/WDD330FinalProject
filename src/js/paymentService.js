import { calcTotalAmount, getTotalDays, styleDate, properNoun } from "./utils";

function billingInfo() {
  document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    const payment = document.getElementById('payment');
    const userRequest = JSON.parse(localStorage.getItem('userProfile'));
    const selectedHotel = JSON.parse(localStorage.getItem('selectedHotel'));
    const checkIn = selectedHotel.check_in;
    const checkOut = selectedHotel.check_out;
    const price = selectedHotel.price;
    const fname = userRequest.fname.charAt(0).toUpper();
    const lname = userRequest.lname.charAt(0).toUpper();
    const totalAmount = calcTotalAmount(checkIn, checkOut, price);

    payment.innerHTML = `
      <h1>Selected Hotel: ${selectedHotel.hotel_name}</h1>
      <p>Guest Name: ${lname} ${fname}</p>
      <p>email: ${userRequest.email}</p>
      <p>Phone Number: ${userRequest.phone}</p><br><br>
      <p>Room Type: ${selectedHotel.room[0]}</p>
      <p>Number of Days: ${getTotalDays(checkIn, checkOut)}</p>
      <p>Required Amenities: ${getAmenities(selectedHotel)}</p>
      <p>Check-in Date: ${styleDate(selectedHotel.check_in)}</p>
      <p>Total amount to pay: <strong>$${totalAmount}</strong></p><br>
      <button class="to-pay" id="to-pay">Make Payment</button>
      <button class="to-pay" id="to-home">Try Another Hotel?</button>
    `;
    const toHomePage = document.getElementById('to-pay');
    const toPayment = document.getElementById('to-home');
    
    toPayment.addEventListener('click', () => {
      window.location.href = '../booking-confirmation/payment.html';
    });

    toHomePage.addEventListener('click', () => {
      alert('We guarantee an availability\nof more choices for you.')
      window.location.href = '../search-form/search.html';
    });
  });
}
export function transactionForm() {
  const payment = document.getElementById('payment')
  const form = `
    <form id="transaction">Payment Transaction
      <label><input type="text" id="fname" name="fname">First Name: </label>
      <label><input type="text" id="lname" name="lname">Last Name: </label>
      <label><input type="text" id="credit-card" name="credit-card" placeholder="e.g. 1213-0087-9086-4563">Credit Card: </label>
      <label><input type="date" id="expiration" name="expiration" placeholder="e.g. 06/24">Expiration Date:</label>
      <label><textarea id="address" name="address" cols="30" rows="5" placeholder="Write billing address">Billing Address:</label>
    </form>
  `;
  payment.innerHTML = form;
  document.getElementById('transaction').addEventListener('submit', () => {

  });
}
billingInfo();
// transactionForm();
// makePayment();