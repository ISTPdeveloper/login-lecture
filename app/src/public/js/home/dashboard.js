"use strict";

const registerBtn = document.querySelector("#button");
registerBtn.addEventListener("click", logout);

function logout() {
  location.href = "/";
}
