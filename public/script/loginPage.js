// const inputdataArr = JSON.parse(localStorage.getItem("userData")) || [];
const messageLogin = document.getElementById("messageLogin");
const logo = document.getElementById("logo");
logo.style.cursor = "pointer";
logo.addEventListener("click", () => {
  window.location.href = "index.html";
});
let loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  await fetch("", {method : "POST" ,headers: {
    "Content-type": "application/json",
    
  },
body:JSON.stringify({email,password})
} ) //he we can use mongodb API link
})

// to merge HOMEPAGE
// window.location.href= "hp.html"
