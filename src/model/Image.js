const {Schema , model} = require('mongoose')
const path = require('path');

const ImageSchema = new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    filename:{type:String, required:true},
    views:{type:Number, default:0},
    likes:{type:Number, default:0},
    created_at:{type:Date , default: Date.now()}

}, {timestamp: true} )

ImageSchema.virtual('UniqueID').get(function(){
    return this.filename.replace(path.extname(this.filename),'')
})

module.exports = model('Image', ImageSchema)