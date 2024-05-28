const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs")
})

router.post("/sign-in", async (req, res) => {
    const userExists = await User.findOne({ username: req.body.username})
    if (!userExists) {
        return res.send("Login failed. Try again. :(")
    }

    const passwordsMatch = bcrypt.compareSync(req.body.password, userExists.password)
    if (!passwordsMatch) {
        return res.send("Login failed. Try again. :(")
    }

    req.session.user = {
        username: userExists.username,
        _id: userExists._id
    }
    res.redirect("/")
})

router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs")
})

router.post("/sign-up", async (req, res) => {
    const usernameUsed = await User.findOne({ username: req.body.username})
    if (usernameUsed) {
        return res.send("That username is taken. :(")
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.send("You didn't confirm your password correctly. :(")
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    const newUser = await User.create(req.body)
    req.session.user = {username: newUser.username, _id: newUser._id}
    res.redirect("/")
})

router.get('/sign-out', (req, res) => {
    req.session.destroy()
    res.redirect('/')
  })

module.exports = router