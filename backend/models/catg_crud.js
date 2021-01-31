let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let newSchema = Schema({
    category : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true
    },
    author_id : {
        type : String
    },
    date : {
        type : Date,
        required : true,
    },
});
module.exports = CatgCrud = mongoose.model('catg_cruds',newSchema);
