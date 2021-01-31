const multer = require("multer");
const DIR = "./public";

const storage = multer.diskStorage({
    destination : (req, res, cb)=>{
        cb(null, DIR);
    },
    filename : (req, file, cb)=>{
        const filename = file.originalname.toLowerCase().split(" ").join("-");
        const date = Date.now();
        cb(null, date+"-"+filename);
    }
});

const upload = multer({
    storage : storage,
    fileFilter : (req, file, cb)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif")
        {
            cb(null, true);
        }
        else
        {
            cb(null, false);
            return cb(new Error("Only '*.jpg', '*.png', '*.jpeg' or '*.svg' image format allowed."));
        }
    }
});

module.exports = upload;