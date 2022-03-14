const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Log = mongoose.model('Log', new Schema({
    title: {type: String, required: true},
    message: {type: String, required: true}, 
    date: {type: String, required: true}
}))

module.exports = Log

