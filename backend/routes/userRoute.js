const express = require('express');
const router = express.Router();
const AddUser = require('./../models/user_crud');
const bcrypt_js = require('bcryptjs');
const jwt = require('jsonwebtoken');
const privateKey = require('./../config/keys').privateKey;
const upload = require('./../config/multer');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("458279433769-qsheqt8c1luhh5pfdvojolj8ro6tdolh.apps.googleusercontent.com");

router.post('/userReg',upload.single("image"),(req,res)=>{
    AddUser.findOne({email:req.body.email})
    .then(user=>{
        if(user)
        {
            console.log("Exists");
            res.status(400).json({msg : "User Exists"});
        }
        else
        {
            let newUser;
            if(req.file === undefined)
            {
                newUser = new AddUser({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    contact : req.body.contact,
                    gender : req.body.gender,
                    image : null,
                    googleId : null,
                    date : Date.now()
                });
            }
            else
            {
                newUser = new AddUser({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    contact : req.body.contact,
                    gender : req.body.gender,
                    image : req.file.filename,
                    googleId : null,
                    date : Date.now()
                });
            }
            bcrypt_js.genSalt(10, function(err, salt) {
                bcrypt_js.hash(req.body.password, salt, function(err, hash) {
                    newUser.password = hash;
                    // console.log(newUser);
                    newUser.save()
                    .then(()=>{
                        console.log("Registration Successful");
                        res.status(200).json({msg : "User Inserted"});
                    }).catch((err)=>{
                        console.log(err);
                    });
                });
            });
        }
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json({msg : "Sorry... Something went wrong."});
    });
});

router.post('/userLog',(req,res,next)=>{
    AddUser.findOne({email:req.body.email})
    .then((user)=>{
        if(!user)
        {
            res.status(400).json({msg : "User does not exist"});
        }
        else
        {
            bcrypt_js.compare(req.body.password,user.password,(err, isMatch)=>{
                if (err)
                    throw err;
                if (isMatch)
                { 
                    const payload = {
                        name : user.name,
                        email : user.email,
                        id : user._id,
                        image : user.image,
                        googleId : user.googleId,
                        gender : user.gender,
                        contact : user.contact
                    }
                    jwt.sign(payload, privateKey,(err, token)=>{
                        res.json({
                            success : true,
                            token : "Token : " + token,
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

router.get('/delUser/:id',(req,res)=>{
    AddUser.deleteOne({_id:req.params.id})
    .then(()=>{
        res.status("200").json({msg:"Your Account has been successfully Deleted"});
    }).catch(err=>{
        console.log("delUser1 Error : "+err);
    })
});

router.post('/updUsr',upload.single("image"),(req,res)=>{
    AddUser.findOne({_id:req.body.id})
    .then((data)=>{
        console.log("95 data : "+data);
        data.name = req.body.name;
        data.email = req.body.email;
        data.gender = req.body.gender;
        data.contact = req.body.contact;
        if(req.file === undefined)
        {data.image = null;}
        else
        {data.image = req.file.filename;}
        data.save()
        .then((usr)=>{
            res.status("200").json(usr);
        }).catch(err=>{
            console.log(err);
        });
    }).catch(err=>{
        console.log(err);
    });
    
});

router.post("/googleLog",(req,res)=>{
    // console.log("glog : "+req.body);
    const {tokenId, googleId} = req.body;

    client.verifyIdToken({idToken: tokenId, audience: "458279433769-qsheqt8c1luhh5pfdvojolj8ro6tdolh.apps.googleusercontent.com"})
    .then((resp)=>{
        console.log("glog payload",resp.payload);
        const{email_verified, name, email, picture} = resp.payload;
        if(email_verified)
        {
            AddUser.findOne({email:email})
            .then((user)=>{
                if(user)
                {
                    console.log(user);
                    const payload = {
                        name : user.name,
                        email : user.email,
                        id : user._id,
                        googleId : user.googleId,
                        image : user.image
                    }
                    jwt.sign(payload, privateKey,(err, token)=>{
                        res.json({
                            success : true,
                            token : "Token : " + token,
                        });
                    });
                }
                else
                {
                    let password = email+privateKey;
                    let newUser = new AddUser({
                        name:name, 
                        email:email, 
                        password:password,
                        googleId : googleId,
                        image :picture,
                        date : Date.now()
                    });
                    console.log("else");
                    bcrypt_js.genSalt(10, function(err, salt) {
                        bcrypt_js.hash(password, salt, function(err, hash) {
                            newUser.password = hash;
                            // console.log("141: "+newUser);
                            newUser.save()
                            .then((data)=>{
                                console.log("144 : "+data);
                                const payload = {
                                    name : data.name,
                                    email : data.email,
                                    id : data._id,
                                    image : data.image,
                                    googleId : data.googleId
                                }
                                jwt.sign(payload, privateKey,(err, token)=>{
                                    res.json({
                                        success : true,
                                        token : "Token : " + token
                                    });
                                    // console.log("new");
                                });                             
                            }).catch((err)=>{
                                console.log(err);
                                return res.status(400).json({error: "Something went wrong..."});
                            });
                        });
                    });
                }

            });
        }
        else
        {
            res.status(400).json({msg : "Something went wrong... Please try again later..."});
        }
    }).catch((err)=>{
        console.log("GLog Error : "+err);
    });
});


module.exports = router;