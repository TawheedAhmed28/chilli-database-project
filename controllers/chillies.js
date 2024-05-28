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

module.exports = router