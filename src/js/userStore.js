import { writeToJsonFile } from "./utils.mjs";
function userProfile() {
  document.getElementById("user-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const fname = document.getElementById("firstname").value;
      const lname = document.getElementById("surname").value;
      const oname = document.getElementById("othername").value;
      const gender = document.getElementById("gender").value;
      const age = document.getElementById("age").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const amount = document.getElementById("amount").value;
      const remark = document.getElementById("remark").value;
      // Template for localStorage
      const profileObj = {
        fname: fname,
        lname: lname,
        oname: oname,
        age: age,
        gender: gender,
        email: email,
        amount: amount,
        phone: phone,
      };
      // Template for local DB
      const profileToDB = {
        card: {
          id_number: 0,
          cvv: 0,
          card_type: "",
          card_number: "",
          expiration_date: "",
          username: String(username).trim(),
          amount: parseFloat(amount) || 0.0,
          password: String(password).trim(),
        },
        person: {
          fname: String(fname).trim(),
          lname: String(lname).trim(),
          oname: String(oname).trim(),
          age: parseInt(age, 10) || 0,
          gender: String(gender).trim(),
          email: String(oname).trim(),
          phone: parseInt(age, 10) || 0,
          remark: String(remark).trim(),
        },
        status: "false",
      };
      profileArray.push(profileObject);

      localStorage.setItem('userProfile', JSON.stringify(profileArray));
      alert('Redirecting to Payment Page!');
      window.location.href = '../booking-confirmation/';
    } catch (error){
      console.log('Error: ', error); //console.error(error);
    }
  });
}
userProfile();
