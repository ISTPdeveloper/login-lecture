"use strict";

// http로 서버 열어보기
// const http = require("http");
// const app = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//     if (req.url === "/") {
//         res.end("여기는 루트입니다.");
//     } else if (req.url === "/login") {
//         res.end("여기는 로그인 화면입니다.")
//     }
// });

// app.listen(3001, () => {
//     console.log("http로 가동된 서버입니다.");
// });

// 모듈
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);
// const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
// const flash = require("connect-flash");

dotenv.config();

const app = express();

// 라우팅
const home = require("./src/routes/home");

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
// 실제 서버 경로에는 public이 들어있지만, 요청주소는 public이 들어있지않음(보안상 좋음)
app.use(express.static(path.join(__dirname, "/src/public")));
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWD,
      database: process.env.DB_DATABASE,
    }),
  })
);

app.use("/", home); // use -> 미들웨어를 등록해주는 메소드.

app.post("/logout", (req, res) => {
  console.log("로그아웃 성공");
  req.session.destroy(function (err) {
    if (err) throw err;
    res.redirect("/");
  });
});

module.exports = app;
