const mongoose = require('mongoose')

const Schema = mongoose.Schema
const itemSchema = new Schema({
    name: String,
    description: String
})

module.exports = mongoose.model('item', itemSchema, 'items')