const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs", {incorrect: null})
})

router.post("/sign-in", async (req, res) => {
    try {
        const userExists = await User.findOne({ username: req.body.username})
        if (!userExists) {
            const incorrectMessage = "Login failed. Try again. :("
            return res.render("auth/sign-in.ejs", {incorrect: incorrectMessage})
        }
    
        const passwordsMatch = bcrypt.compareSync(req.body.password, userExists.password)
        if (!passwordsMatch) {
            const incorrectMessage = "Login failed. Try again. :("
            return res.render("auth/sign-in.ejs", {incorrect: incorrectMessage})
        }
    
        req.session.user = {
            username: userExists.username,
            _id: userExists._id
        }
        res.redirect("/")
        
    } catch (error) {
        res.render("error.ejs", {message: error.message})       
    }
})

router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs", {incorrect: null})
})

router.post("/sign-up", async (req, res) => {
    try {
        const usernameUsed = await User.findOne({ username: req.body.username})
        if (usernameUsed) {
            const incorrectMessage = "That username is taken. :("
            return res.render("auth/sign-up.ejs", {incorrect: incorrectMessage})
        }
    
        if (req.body.password !== req.body.confirmPassword) {
            const incorrectMessage = "You didn't confirm your password correctly. :("
            return res.render("auth/sign-up.ejs", {incorrect: incorrectMessage})
        }

        if (req.body.password.length < 8) {
            const incorrectMessage = "Your password must be at least 8 characters long. :("
            return res.render("auth/sign-up.ejs", {incorrect: incorrectMessage})
        }
    
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hashedPassword
    
        const newUser = await User.create(req.body)
        req.session.user = {username: newUser.username, _id: newUser._id}
        res.redirect("/")
    } catch (error) {
        res.render("error.ejs", {message: error.message})    
    }
})

router.get('/sign-out', (req, res) => {
    req.session.destroy()
    res.redirect('/')
  })

module.exports = router