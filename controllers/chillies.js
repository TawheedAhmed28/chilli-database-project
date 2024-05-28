const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get("/", async (req, res) => {
    if (req.session.user) {
    const foundUser = await User.findOne({username: req.session.user.username})
    console.log(foundUser)
    res.render("chillies/index.ejs", {
        chillies: foundUser.chillies
    })
} else {
    res.redirect("/auth/sign-in")
}
})

router.get("/new", (req, res) => {
    res.render("chillies/new.ejs")
})

router.post("/", async (req, res) => {
    const currentUser = await User.findById(req.session.user._id)
    const existingChillies = await currentUser.chillies.map((chilli) => chilli.name)
    if (existingChillies.includes(req.body.name)) {
        return res.send("That chilli is already in your database!")
    } else {
    currentUser.chillies.push(req.body)
    }
    await currentUser.save()
})

module.exports = router