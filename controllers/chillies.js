const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("chillies/index.ejs", {
        chillies: req.session.user.chillies
    })
})

module.exports = router