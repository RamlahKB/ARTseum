let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let newSchema = Schema({
    author_id : {
        type : String,
        required : true
    },
    author_name : {
        type :String,
        required : true
    },
    author_email : {
        type : String,
        required : true,
    },
    author_img : {
        type : String
    },
    catId : {
        type : Schema.Types.ObjectId,
        ref : "catg_cruds"
    },
    artId : {
        type : Schema.Types.ObjectId,
        ref : "art_cruds"
    },
    text : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
});
module.exports = ComCrud = mongoose.model('com_cruds',newSchema);
