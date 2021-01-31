let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let newSchema = Schema({
    name : {
        type : String,
        required : true
    },
    catg : {
        type : Schema.Types.ObjectId,
        ref : "catg_cruds"
    },
    artist : {
        type : String,
        required : true
    },
    year : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    author_id : {
        type : String
    },
    status : {
        type : String
    },
    date : {
        type : Date,
        required : true
    },
    likes : [{
        type : Schema.Types.ObjectId,
        ref : "user_cruds"
    }],
    dislikes : [{
        type : Schema.Types.ObjectId,
        ref : "user_cruds"
    }]
});
module.exports = ArtCrud = mongoose.model('art_cruds',newSchema);
