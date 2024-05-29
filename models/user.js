const mongoose = require("mongoose")

const chilliSchema = new mongoose.Schema({
    name: {type: String, required: true},
    min_scoville_units: {type: Number, required: true},
    max_scoville_units: {type: Number, required: true},
    colour: {type: String, required: true},
    creator: {type: mongoose.Schema.ObjectId, required: true, ref: "User"}
})

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    chillies: [chilliSchema]
})

module.exports = mongoose.model("User", userSchema)