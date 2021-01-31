app.post('/forgot',(req,res)=>{
    const token = crypto.randomBytes(20).toString('hex');
    let transporter = nodemailer.createTransport({
        host : 'smtp.gmail.com',
        port : 465,
        secure : true,
        auth : {
            user : 'devram.test@gmail.com',
            pass : require('./config/keys').mailPass,
        }
    });
    AddUser.findOne({email:req.body.email})
    .then((user)=>{
        console.log("frgt1 : "+user);
        if(!user)
        {
            console.error("Email Does not exist");
            return res.status(400).json({error:"email not in db"});
        }
        else
        {
            // resPass(res.email).catch(console.error);
            var link = 'http://localhost:3000/reset/'+token+'/'+user.email;
            user.resTok = token;
            user.expTok = Date.now() + 3600000;
            console.log("frgt 2");
            user.save()
            .then((result)=>{
                let info = {
                    from : 'devram.test@gmail.com',
                    to : `${res.email}`,
                    subject : 'Link to Reset Password',
                    html : "To complete the resetting process, please click on the following link : <br><br><a href="+link+">Reset Password</a>"
                };
                res.json({msg : "Mail sent. Please check your Email for a resetting link."});
            }).catch((err)=>{
                console.log(err);
            });
            // const token = crypto.randomBytes(20).toString('hex');
        //     res.update({
        //         resetPasswordToken : token,
        //         resetPasswordExpires : Date.now() + 3600000
        //     });
        //     let transporter = nodemailer.createTransport({
        //         host : 'smtp.gmail.com',
        //         port : 465,
        //         secure : true,
        //         auth : {
        //             user : 'devram.test@gmail.com',
        //             pass : require('./config/keys').mailPass,
        //         }
        //     });
        //     var link = 'http://localhost:3000/reset/'+token+'/'+res.email;
        //     let info = {
        //         from : 'devram.test@gmail.com',
        //         to : `${res.email}`,
        //         subject : 'Link to Reset Password',
        //         html : "To complete the resetting process, please click on the following link : <br><br><a href="+link+">Reset Password</a>"
        //     };
        //     console.log("sending mail");
            transporter.sendMail(info,(err,resp)=>{
                if(err)
                {
                    console.err("Error : "+err);
                }
                else
                {
                    console.log("Result : "+resp);
                    res.status(200).json("recover email sent");
                }
            });
        }
        
        console.log("Response : "+res);
        console.log("9");
    }).catch((err)=>{
        console.log(err);
    });
});

async function resPass(email){
    let transporter = nodeMailer.createTransport({
        host : 'smtp.gmail.com',
        port : 465,
        secure : true,
        auth : {
            user : 'devram.test@gmail.com',
            pass : require('./config/keys').mailPass,
        }
    });
    console.log("fror pass 1");
    console.log("2");
    const token = crypto.randomBytes(20).toString('hex');
    var link = 'http://localhost:3000/ /'+token+'/'+email;
    AddUser.findOne({email:email})
    .then((res)=>{
        res.Token = token;
        res.save()
        .then(()=>{
            console.log("Token Inserted");
            console.log("3");
        }).catch((err)=>{
            console.log(err);
        });
    }).catch((err)=>{
        console.log(err);
    });
    let info = await transporter.sendMail({
        from : 'devram.test@gmail.com',
        to : email,
        subject : 'Reset Password',
        html : "To complete the resetting process, please click on the following link : <br><br><a href="+link+">New Password</a>"
    });
    console.log("message sent : %s", info.response);
}
//     var link = 'http://localhost:3000/newPass/'+token+'/'+email;
//     AddUser.findOne({email:email})
//     .then((res)=>{
//         res.Token = token;
//         res.save()
//         .then(()=>{
//             console.log("Token Inserted");
//             console.log("for pass 2");
//         }).catch((err)=>{
//             console.log(err);
//         });
//     }).catch((err)=>{
//         console.log(err);
//     });
//     let info = await transporter.sendMail({
//         from : 'devram.test@gmail.com',
//         to : email,
//         subject : 'Reset Password',
//         html : "To complete the resetting process, please click on the following link : <br><br><a href="+link+">New Password</a>"
//     });
//     console.log("message sent : %s", info.response);
// }

// app.post('/mail',(req,res)=>{
//     let data = req.body;
//     let transporter = nodeMailer.createTransport({
//         host : 'smtp.gmail.com',
//         port : 465,
//         secure : true,
//         auth : {
//             user : 'devram.test@gmail.com',
//             pass : require('./config/keys').mailPass,
//         }, 
//     });
//     let info ={
//         from : data.email,
//         to : 'devram.test@gmail.com',
//         subject : `Message from ${data.name}`,
//         html : `
//             <div>
//                 <h3>Inquiry throught site</h3>
//                 <h6>
//                     Name : ${data.name} <br/>
//                     Contact : ${data.contact} <br/>
//                     Email : ${data.email} <br/>
//                     Message : <p>${data.msg}<p/>
//                 </h6>
//             </div>
//         `
//     };
//     transporter.sendMail(info,(err,res)=>{
//         if(err)
//         {
//             res.send(err);
//         }
//         else
//         {
//             res.send("success");
//         }
//     });
//     transporter.close();
// });.

























if(email_verified)
            {
                AddUser.findOne({email}).exec((err, user)=>{
                    if (err)
                    {
                        return res.status(400).json({error: "Something went wrong..."});
                    }
                    else
                    {
                        if(user)
                        {
                            const payload = {
                                name : user.name,
                                email : user.email,
                                id : user._id
                            }
                            jwt.sign(payload, privateKey,(err, token)=>{
                                res.json({
                                    success : true,
                                    token : "Token : " + token,
                                    name : user.name,
                                    email : user.email,
                                });
                            });
                        }
                    }
                });
            }






            AddUser.findOne({email}).exec((err, user)=>{
                if (err)
                {
                    return res.status(400).json({error: "Something went wrong..."});
                }
                else
                {
                    if(user)
                    {
                        const payload = {
                            name : user.name,
                            email : user.email,
                            id : user._id
                        }
                        jwt.sign(payload, privateKey,(err, token)=>{
                            res.json({
                                success : true,
                                token : "Token : " + token,
                                name : user.name,
                                email : user.email,
                            });
                        });
                    }
                    else
                    {
                        let password = email+privateKey;
                        let newUser = new AddUser({name, email, password});
                        newUser.save((err, data)=>{
                            if (err)
                            {
                                return res.status(400).json({error: "Something went wrong..."});
                            }
                            const payload = {
                                name : data.name,
                                email : data.email,
                                id : data._id
                            }
                            jwt.sign(payload, privateKey,(err, token)=>{
                                res.json({
                                    success : true,
                                    token : "Token : " + token,
                                    name : newUser.name,
                                    email : newUser.email,
                                });
                            });
                        });
                        // res.status(400).json({msg : "Incorrect EmailId or Password"});
                    }
                }
            });

















