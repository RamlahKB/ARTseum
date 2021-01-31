const express = require('express');
const router = express.Router();
const AddAdmin = require('./../models/admin_crud');
const bcrypt_js = require('bcryptjs');
const jwt = require('jsonwebtoken');
const privateKey = require('./../config/keys').privateKey;
const upload = require('./../config/multer');

// router.get('/adminReg',(req,res)=>{
//     res.render("register");
// });

router.post('/adminReg',upload.single("image"),(req,res)=>{
    AddAdmin.findOne({email:req.body.email})
    .then(admin=>{
        if(admin)
        {
            console.log("Exists");
            res.status(400).json({msg : "Admin Exists"});
        }
        else
        {
            let newAdmin = new AddAdmin({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                contact : req.body.contact,
                gender : req.body.gender,
                image : req.file.filename,
                date : Date.now()
            });
            bcrypt_js.genSalt(10, function(err, salt) {
                bcrypt_js.hash(req.body.password, salt, function(err, hash) {
                    newAdmin.password = hash;
                    console.log(newAdmin);
                    newAdmin.save()
                    .then(()=>{
                        console.log("Registration Successful");
                        res.status(200).json({msg : "Admin Inserted"});
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
                });
            });
        }
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({msg : "Sorry... Something went wrong."});
    });
});

// router.get('/adminLog',(req,res)=>{
//     res.render("login");
// });

router.post('/adminLog',(req,res,next)=>{
    AddAdmin.findOne({email:req.body.email})
    .then((admin)=>{
        if(!admin)
        {
            res.status(400).json({msg : "Admin does not exist"});
        }
        else
        {
            bcrypt_js.compare(req.body.password,admin.password,(err, isMatch)=>{
                if (err)
                    throw err;
                if (isMatch)
                { 
                    const payload = {
                        name : admin.name,
                        email : admin.email,
                        id : admin._id,
                        image : admin.image
                    }
                    jwt.sign(payload, privateKey,(err, token)=>{
                        res.json({
                            success : true,
                            token : "Token : " + token
                        });
                    });
                }
                else
                {
                    res.status(400).json({msg : "Incorrect EmailId or Password"});
                }
            });
        }
    }).catch((err)=>{
        console.log(err);
    });
});

module.exports = router;