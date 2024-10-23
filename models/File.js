const {Schema, model, models} = require('mongoose');

const fileSchema = new Schema({
    name: {type:String, require:true, trim:true},
    path: {type:String, require:true, trim:true},
    size: {type:Number, require:true, trim:true},
    server: {type:String, require:true, trim:true}
},{ timestamps: true })

module.exports = models.File || model('File', fileSchema);