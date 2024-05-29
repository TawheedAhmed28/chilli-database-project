const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const isSignedIn = require('../middleware/is-signed-in.js');

router.get("/:userId/chillies/", async (req, res) => {
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

router.get("/:userId/chillies/new", (req, res) => {
    res.render("chillies/new.ejs")
})

router.post("/:userId/chillies/", async (req, res) => {
    const currentUser = await User.findById(req.session.user._id)
    const existingChillies = await currentUser.chillies.map((chilli) => chilli.name)
    if (existingChillies.includes(req.body.name)) {
        return res.send("That chilli is already in your database!")
    } else {
        req.body.creator = currentUser._id
        currentUser.chillies.push(req.body)
    }
    await currentUser.save()
    res.redirect(`/users/${req.params.userId}/chillies`)
})

router.use(isSignedIn)

router.get("/:userId/chillies/:chilliId", async (req, res) => {
    const chilliUser = await User.findById(req.params.userId).populate("chillies.creator")
    const oneChilliArray = await chilliUser.chillies.filter((chilli) => chilli._id == req.params.chilliId)
    const creator = await User.findById(oneChilliArray[0].creator)
    res.render("chillies/show.ejs", {
        chilli: oneChilliArray[0],
        creator: creator,
    })
})

router.get("/:userId/chillies/:chilliId/edit", async (req, res) => {
    const currentUser = await User.findById(req.session.user._id)
    const oneChilliArray = await currentUser.chillies.filter((chilli) => chilli._id.equals(req.params.chilliId))
    console.log(oneChilliArray)
    res.render("chillies/edit.ejs", {chilli: oneChilliArray[0]})
})

router.put("/:userId/chillies/:chilliId", async (req, res) => {
    const currentUser = await User.findById(req.session.user._id)
    const chilliToUpdate = currentUser.chillies.filter((chilli) => chilli._id.toString() === req.params.chilliId.toString())
    chilliToUpdate[0].set(req.body)
    await currentUser.save()
    console.log(chilliToUpdate)
    res.redirect(`/users/${req.params.userId}/chillies/${req.params.chilliId}`)
})

router.delete("/:userId/chillies/:chilliId", async (req, res) => {
    const currentUser = await User.findById(req.session.user._id)
    currentUser.chillies = currentUser.chillies.filter((chilli) => chilli._id.toString() !== req.params.chilliId.toString())
    await currentUser.save()
    res.redirect(`/users/${req.params.userId}/chillies`)
})

module.exports = router