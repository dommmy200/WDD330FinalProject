// import {getLocalStorage, readFromJsonFile, calcTotalAmount, properNoun, formatCardDate, issueCreditCard} from './utils.mjs';
import {getLocalStorage, calcTotalAmount, properNoun, readCardFile, readUserFile, formatCardDate, issueCreditCard} from './utils.js';

export function makingPayment() {
    const form = `
      <form id="transaction">Payment Transaction
        <label><input type="text" id="fname" name="fname">First Name: </label>
        <label><input type="text" id="lname" name="lname">Last Name: </label>
        <label><input type="text" id="credit-card" name="credit-card" placeholder="e.g. 1213-0087-9086-4563">Credit Card: </label>
        <label><input type="date" id="expiration" name="expiration" placeholder="e.g. 06/24">Expiration Date:</label>
        <label><textarea id="address" name="address" cols="30" rows="5" placeholder="Write billing address">Billing Address:</label>
        <button type="submit" id="submit" class="button">Make Transaction</button>
      </form>
    `;
    return form;
}
export function compareSelectCard(mainData, subData) {
  const nonDuplicates = [];
  for (const mainObj of mainData) {
    let isDuplicate = false;
    for (const subObj of subData) {
      if (compareObjs(mainObj, subObj)){
        isDuplicate = true;
      }
    }
    if (!isDuplicate) {
      nonDuplicates.push(mainObj);
    }
  }
  if (nonDuplicates.length == 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random()*nonDuplicates.length);
  return nonDuplicates[randomIndex];
}

function compareObjs(obj1, obj2) {
  const cardNumber1 = obj1.cardnumber;
  const cardNumber2 = obj2.cardnumber;

  const username1 = obj1.username;
  const username2 = obj2.username;

  if (cardNumber2 == cardNumber1 && username1 == username2) {
    return true;
  }
  return false;
}

export function renderCreditCard() {
    document.addEventListener('DOMContentLoaded', (e) => {
      e.preventDefault();

      const userProfile = getLocalStorage("userProfile");
      const selectedHotel = getLocalStorage("selectedHotel");
      const dataArray = readCardFile(); //import json file from database
      const profileDb = readUserFile(); //import json file from database
      const date = formatCardDate(dataArray); //manipulate dataArray for exact card first before use
      const checkIn = selectedHotel.check_in;
      const checkOut = selectedHotel.check_out;
      const price = selectedHotel.price;
      const fname = properNoun(userProfile.fname);
      const lname = properNoun(userProfile.lname);
      const cardAmount = Number(userProfile.amount); // amount is not stored 
      const surname = lname.toLowerCase();
      const totalAmount = calcTotalAmount(checkIn, checkOut, price);
      
      const newCard = issueCreditCard(surname, profileDb);
      const cardType = newCard.card_type;
      const cardNumber = newCard.card_number;
      const cardCvv = newCard.cvv;
      
      const cardTemplate = `<form id="card-template" class="card-template">
      <h2>Credit Card</h2>
      <div><span>Name: ${fname}</span><span>${lname}</span></div>
      <label>Hotel Billing: <h2>${totalAmount}</h2></label>
      <div><span>Type: ${cardType}</span><span>${cardNumber}</span></div>
      <div><span>CVV: ${cardCvv}</span><span>Expire: ${date}</span></div><br>
      <label>Fund Credit Card<input type="text" name="saving" id="saving"></label>
      </form>`;
      // Extract data from input and credit user account in the database.
      // when form loads(no time for that now.)

      const myCard = document.getElementById('user-card');
      if (myCard) {
        myCard.innerHTML = cardTemplate;
      }
      const button1 = document.getElementById('button1');
      const button2 = document.getElementById('button2');
      // Prevent user from continuing to payment
      if (cardAmount < totalAmount) {
        button1.setAttribute('disabled', 'disabled');
        button1.style.color = 'red';
        button1.style.border = '1px solid black';
      }
      button1.addEventListener('click', () => {
        window.location.href = '../booking-confirmation/transaction.html'; 
      });
      button2.addEventListener('click', () => {
        window.location.href = '../user-profile/profile.html'; 
      });
    });
}
renderCreditCard();
