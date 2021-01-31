let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let newSchema = Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    contact : {
        type : Number,
    },
    gender : {
        type : String,
    },
    image : {
        type : String,
    },
    resTok : {
        type : String
    },
    expTok : {
        type : Date
    },
    googleId :{
        type : String
    },
    date : {
        type : Date,
        required : true
    }
});
module.exports = UserCrud = mongoose.model('user_cruds',newSchema);
