"use strict";

const registerBtn = document.querySelector("#button");
registerBtn.addEventListener("click", index);

function index(res, req) {
  location.href = "/login";
}
