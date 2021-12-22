"use strict";

// const app = require("../../../app.js");
const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
    // location.href = "/login";
  } else {
    res.redirect("/login");
  }
};

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/dashboard", isAuth, ctrl.output.dashboard);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/dashboard", ctrl.process.dashboard);
// router.post("/logout", ctrl.process.logout);
// (req, res) => {
//   req.session.destroy((err) => {
//     if (err) throw err;
//     res.redirect("/");
//   });
//   console.log(req.session.id);
// });

module.exports = router;
