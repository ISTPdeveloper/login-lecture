"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");

const output = {
  home: (req, res) => {
    // req.session.isAuth = true;
    // console.log(req.session);
    // console.log(req.session.id);
    logger.info(`GET / 304 "홈 화면으로 이동"`);
    res.render("home/index");
  },
  login: (req, res) => {
    logger.info(`GET /login 304 "로그인 화면으로 이동"`);
    res.render("home/login");
    // req.session.isAuth = true;
    // console.log(req.session);
    // console.log(req.session.id);
  },
  register: (req, res) => {
    logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
    res.render("home/register");
  },
  logout: (req, res) => {
    logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
    res.render("home/register");
  },
  dashboard: (req, res) => {
    logger.info(`GET /dashboard 304 "메인 화면으로 이동"`);
    res.render("home/dashboard");
    // req.session.isAuth = true;
    // console.log(req.session);
    // console.log(req.session.id);
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();

    const url = {
      method: "POST",
      path: "/login",
      status: response.err ? 400 : 200,
    };
    req.session.isAuth = true;
    // console.log(req.session);
    // console.log(req.session.id);

    log(response, url);
    return res.status(url.status).json(response);
  },
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();

    const url = {
      method: "POST",
      path: "/register",
      status: response.err ? 409 : 201,
    };

    log(response, url);
    return res.status(url.status).json(response);
  },
  // logout: async (req, res) => {
  //   const url = {
  //     method: "POST",
  //     path: "/logout",
  //     status: response.err ? 409 : 201,
  //   };
  //   req.session.destroy((err) => {
  //     if (err) throw err;
  //     alert("로그아웃 되었습니다.");
  //     res.redirect("/");
  //   });
  //   log(response, url);
  //   return res.status(url.status).json(response);
  // },
  dashboard: async (req, res) => {
    const url = {
      method: "POST",
      path: "/dashboard",
      status: response.err ? 409 : 201,
    };

    log(response, url);
    return res.status(url.status).json(response);
  },
};

module.exports = {
  output,
  process,
};

const log = (response, url) => {
  if (response.err) {
    logger.error(
      `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}`
    );
  } else {
    logger.info(
      `${url.method} ${url.path} ${url.status} Response : ${response.success} ${
        response.msg || ""
      }`
    );
  }
};
