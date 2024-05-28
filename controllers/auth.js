const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs")
})

router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs")
})

router.post

module.exports = router