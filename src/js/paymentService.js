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
    const fname = properNoun(userRequest.fname);
    const lname = properNoun(userRequest.lname);
    const totalAmount = calcTotalAmount(checkIn, checkOut, price);

    payment.innerHTML = `
      <h1>Your Booking!</h1>
      <h2><strong>Selected Hotel:</strong> ${selectedHotel.hotel_name}</h2>
      <p><strong>Guest Name:</strong> ${lname} ${fname}</p>
      <p><strong>Email:</strong> ${userRequest.email}</p>
      <p><strong>Phone Number:</strong> ${userRequest.phone}</p>
      <p><strong>Room Type:</strong> ${selectedHotel.room[0]}</p>
      <p><strong>Number of Days:</strong> ${getTotalDays(checkIn, checkOut)}</p>
      <p><strong>Check-in Date:</strong> ${styleDate(checkIn)}</p><br>
      <p><strong>Total amount to pay:</strong> <strong>$${totalAmount}</strong></p><br>
      <button class="to-pay" id="to-pay">Make Payment</button>
      <button class="to-pay" id="to-home">Try Another Hotel?</button>
    `;
    const toHomePage = document.getElementById('to-home');
    const toPayment = document.getElementById('to-pay');
    
    toPayment.addEventListener('click', () => {
      window.location.href = '../card-services/card-issuer.html';
    });

    toHomePage.addEventListener('click', () => {
      alert('We guarantee an availability\nof more choices for you.')
      window.location.href = '../search-form/search.html';
    });
  });
}

billingInfo();
// makePayment();