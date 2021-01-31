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
        required : true,
    },
    gender : {
        type : String,
    },
    image : {
        type : String,
    },
    date : {
        type : Date,
        required : true
    }
});
module.exports = AdminCrud = mongoose.model('admin_cruds',newSchema);
