// const inputdataArr = JSON.parse(localStorage.getItem("userData")) || [];
// const messageLogin = document.getElementById("messageLogin");
// const logo = document.getElementById("logo");
// logo.style.cursor = "pointer";
// logo.addEventListener("click", () => {
//   window.location.href = "index.html";
// });
let loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    let res = await fetch("https://bbuddybe.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        email: email,
        password: password,
        
      }),
    });
    let data = await res.json();
console.log(data);

//setting data in local storage
localStorage.setItem("token", JSON.stringify(data.token))
localStorage.setItem("refresh", JSON.stringify(data.refreshToken))


if(data.token=== undefined){
  alert("Invalid Credential")
}else{
  // console.log("78964")
 alert("Login Successful")
 window.location.href = "admin.html";
}

  });

