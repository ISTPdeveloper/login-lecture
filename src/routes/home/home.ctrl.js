"use strict"

const home = (req, res) => {
    res.render("home/index.ejs");
};

const login = (req, res) => {
    res.render("home/login.ejs");
};

module.exports = {
    home,
    login
};