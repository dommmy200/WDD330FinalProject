// import { writeToJsonFile } from "./utils.mjs";
function userProfile() {
  document.getElementById("user-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      // const profileArray = [];
      const fname = document.getElementById("firstname").value;
      const lname = document.getElementById("surname").value;
      const oname = document.getElementById("othername").value;
      const gender = document.getElementById("gender").value;
      const age = document.getElementById("age").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const remark = document.getElementById("remark").value;

      const profileObj = {
        fname: fname,
        lname: lname,
        oname: oname,
        age: age,
        gender: gender,
        email: email,
        phone: phone,
        username: username,
        password: password,
        remark: remark,
      };
      // profileArray.push(profileObj);

      localStorage.setItem("userProfile", JSON.stringify(profileObj));
      alert("Thank You!\n\nRedirecting to make payment.");
      window.location.href = "../booking-confirmation/confirm.html";
    } catch (error) {
      console.log("Error:", error);
    }
  });
}
userProfile();
