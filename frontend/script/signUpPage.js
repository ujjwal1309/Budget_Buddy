let form = document.getElementById("form");
// let dataArr = JSON.parse(localStorage.getItem("userData")) || [];
const messageSignUp = document.getElementById("messageSignUp");
// Add a click event listener to the button
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  let dataObj = {
    firstName: form.input1.value,
    // lastName: form.input2.value,
    email: form.input3.value,
    mobile_number: form.input4.value,
    password: form.input5.value,
  };

  await fetch("https://bbuddybe.onrender.com/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: dataObj.firstName,
    //   lname: dataObj.lastName,
      email: dataObj.email,
      password: dataObj.password,
      mobile_number: dataObj.mobile_number,
    }),
  });
  console.log(dataObj);
 alert("Your Account Created")
  window.location.href = "loginPage.html";
  // localStorage.setItem("userData", JSON.stringify(dataArr));
});
