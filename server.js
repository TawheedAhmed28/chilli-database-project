const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const auth = require("./controllers/auth.js")
const chillies = require("./controllers/chillies.js");
const sessionUserToLocal = require('./middleware/session-user-to-local.js');

const port = process.env.PORT ? process.env.PORT : "3000"

mongoose.connect(process.env.MONGODB_URI)

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(sessionUserToLocal)

app.get("/", (req, res) => {
    res.render("index.ejs", {})
})

app.get("/all-chillies",  async (req, res) => {
    try {
        const User = require("./models/user.js")
        const allUsers = await User.find({}).populate("chillies.creator")
        const chilliesArray = []
        await allUsers.forEach((user) => {
            user.chillies.forEach((chilli) => {
                chilliesArray.push(chilli)
            })
        })
        res.render("chillies/all-chillies.ejs", {
            chillies: chilliesArray,
        })
    } catch (error) {
        res.render("error.ejs", {message: error.message})
    } 
    })

app.use("/auth", auth)
app.use("/users", chillies)

app.get("*", (req, res) => {
    res.render("error.ejs", {message: "Page not found."})
})

app.listen(port, () => {
    console.log(`All systems are go, on port ${port}!`)
})