import {readFromJsonFile} from './utils.mjs';

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
export function renderCard() {
  document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
    const jsonFile = "cards.json"; 
    const dataArray = readFromJsonFile(jsonFile); //import json file reader
    
    // Retrieve hotels from localStorage
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    `<form id="user-card" class="user-card">
    <h2>Credit Card</h2>
    <div><span>${fname}</span><span>${lname}</span></div>
    <label>Amount Required: <h2>${totalAmount}</h2></label>
    <div><span>${cardtype}</span><span>${cardnumnber}</span><span>${cvv}</span></div>
    <label><input type="text" name="saving" id="saving" required>Fund Credit Card</input></label>
    <button name="submit" id="button1">Continue to Payment</button>
    <button name="submit" id="button2">Back To Profile</button>
    </form>`
  });
}