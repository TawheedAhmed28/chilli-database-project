const mongoose = require("mongoose")
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { password: true } })

const chilliSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    min_scoville_units: {type: Number, required: true, trim: true},
    max_scoville_units: {type: Number, required: true, trim: true},
    colour: {type: String, required: true, trim: true},
    creator: {type: mongoose.Schema.ObjectId, required: true, ref: "User"},
    image_url: {type: String, required: false, trim: true}
})

const userSchema = mongoose.Schema({
    username: {type: String, required: true, trim: true},
    password: {type: String, required: true},
    chillies: [chilliSchema]
})

userSchema.plugin(mongooseHidden)

module.exports = mongoose.model("User", userSchema)