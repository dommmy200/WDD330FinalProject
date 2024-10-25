function makePayment() {
  const payment = document.getElementById("payment");
  payment.addEventListener("DOMContentLoaded", (e) => {
      e.preventDefault();
      console.log("Making Payment!");
      return `
      <p class="xyz">You should be redirected to make payment!</p>`
      //Get user information from localStorage
      //Get external payment API
      //Request for card information...bring up a form to enter user card details
      //Validate information
      //Verify satisfactory payment
      //Redirect user...
    });
}
makePayment();
