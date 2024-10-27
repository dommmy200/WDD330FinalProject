export function renderCard() {
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
  const email1 = obj1.email;
  const email2 = obj2.email;

  const username1 = obj1.username;
  const username2 = obj2.username;

  if (email1 == email2 && username1 == username2) {
    return true;
  }
  return false;
}