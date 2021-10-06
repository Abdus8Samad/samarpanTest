const mongoose = require('mongoose'),
Schema = mongoose.Schema,
model = mongoose.model;

const imageSchema = Schema({
    img:{
        contentType:String,
        data:Buffer
    }
})

const Image = model('image', imageSchema);

module.exports = Image;