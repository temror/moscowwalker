const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    visited: {type: Boolean, required: false},
    owner: {type: Types.ObjectId, ref: 'User'}
})
module.exports = model('UserPlace', schema)