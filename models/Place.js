const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    location: {
        metro: {type: String, required: true},
        yandex: {type: String, required: true}
    },
    owners: [
        {
            id: {type: Types.ObjectId, ref: 'User', required: false},
            visited: {type: Boolean, required: false}
        }
    ]
})
module.exports = model('Place', schema)