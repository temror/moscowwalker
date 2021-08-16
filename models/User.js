const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    places: [{type: Types.ObjectId, ref: 'Places'}]
})

module.exports = model('User', schema)