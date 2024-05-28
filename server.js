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
    const User = require("./models/user.js")
    const allUsers = await User.find({})
    const allChillies = await allUsers.chillies
    // console.log(allChillies)
    res.render("chillies/all-chillies.ejs", {chillies: allChillies})
})

app.use("/auth", auth)
app.use("/users/:userId/chillies", chillies)

app.listen(port, () => {
    console.log(`All systems are go, on port ${port}!`)
})