const mongoose= require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
    author:{type: String, require: true},
    location:{type: String, require: true},
    description:{type: String, require: true},
    image:{type: String, require: true}
});

const postModel= mongoose.model('posts', postSchema)

module.exports= postModel;