const express = require('express');
const nodeMailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt_js = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AddUser = require('./../models/user_crud');
const privateKey = require('./../config/keys').privateKey;

router.post('/frgtPass',(req,res)=>{
    // console.log("frgtpas1"+req);
    AddUser.findOne({email:req.body.email})
    .then((user)=>{
        // console.log("14 user : ",user);
        if(!user)
        {
            // console.error("Email Does not exist");
            res.status(400).json({msg : "Email ID does not exist"});
        }
        else
        {
            if(user.googleId === null)
            {
                mailFunc(user).catch(console.error);
                res.status(200).json({msg:"Mail sent. Please check your Email for a resetting link."});
            }
            else 
            {
                res.status(400).json({msg : "Passwords linked with Google accounts cannot be recovered or updated here"});
            }
        }
        // console.log("frgtpass3");
    }).catch((err)=>{
        console.log(err);
    });
});

let transporter = nodeMailer.createTransport({
    host : 'smtp.gmail.com',
    port : 465,
    secure : true,
    auth : {
        user : 'devram.test@gmail.com',
        pass : require('./../config/keys').mailPass,
    }, 
});
const cryp = crypto.randomBytes(20).toString('hex');
// var payload = {
//   expiresIn:  "12m",
//   algorithm:  "RS256"
//  };
// const token = jwt.sign(cryp, privateKey, {expiresIn: '20m'});

async function mailFunc(user){
    // console.log("async 1");
    const token = jwt.sign(cryp, privateKey);
    var link = 'http://localhost:3000/newPass/'+token+'/'+user.email;
    AddUser.findOne({email:user.email})
    .then((res)=>{
        res.resTok = token;
        // res.expTok = Date.now() + 3600000;
        res.save()
        .then(()=>{
            console.log("Token Inserted");
            // console.log("async 2");
        }).catch((err)=>{
            console.log(err);
        });
    }).catch((err)=>{
        console.log(err);
    });
    let info = await transporter.sendMail({
        from : 'devram.test@gmail.com',
        to : user.email,
        subject : 'Reset Password',
        html : 
        `
        <html>
        <head>
    
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              @media screen and (max-width: 720px) {
                body .c-v84rpm {
                  width: 100% !important;
                  max-width: 720px !important;
                }
                body .c-v84rpm .c-7bgiy1 .c-1c86scm {
                  display: none !important;
                }
                body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-pekv9n .c-1qv5bbj,
                body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-1c9o9ex .c-1qv5bbj,
                body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-90qmnj .c-1qv5bbj {
                  border-width: 1px 0 0 !important;
                }
                body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-183lp8j .c-1qv5bbj {
                  border-width: 1px 0 !important;
                }
                body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-pekv9n .c-1qv5bbj {
                  padding-left: 12px !important;
                  padding-right: 12px !important;
                }
                body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-1c9o9ex .c-1qv5bbj,
                body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-90qmnj .c-1qv5bbj {
                  padding-left: 8px !important;
                  padding-right: 8px !important;
                }
                body .c-v84rpm .c-ry4gth .c-1dhsbqv {
                  display: none !important;
                }
              }
          
          
              @media screen and (max-width: 720px) {
                body .c-v84rpm .c-ry4gth .c-1vld4cz {
                  padding-bottom: 10px !important;
                }
              }
            </style>
            <title>Recover your ARTseum password</title>
          </head>
          
          <body style="margin: 0; padding: 0; font-family: &quot; HelveticaNeueLight&quot;,&quot;HelveticaNeue-Light&quot;,&quot;HelveticaNeueLight&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 300; font-stretch: normal; font-size: 14px; letter-spacing: .35px; background: #EFF3F6; color: #333333;">
            <table border="1" cellpadding="0" cellspacing="0" align="center" class="c-v84rpm" style="border: 0 none; border-collapse: separate; width: 720px;" width="720">
              <tbody>
                <tr class="c-1syf3pb" style="border: 0 none; border-collapse: separate; height: 114px;">
                  <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                    <table align="center" border="1" cellpadding="0" cellspacing="0" class="c-f1bud4" style="border: 0 none; border-collapse: separate;">
                      <tbody>
                        <tr align="center" class="c-1p7a68j" style="border: 0 none; border-collapse: separate; padding: 16px 0 15px;">
                          <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle"><div class="c-1shuxio" style="border: 0 none; line-height: 100%; outline: none; text-decoration: none; height: 33px; width: 120px;" width="120" height="33"><span style="font-size: 40px">ARTseum</div></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr class="c-7bgiy1" style="border: 0 none; border-collapse: separate; -webkit-box-shadow: 0 3px 5px rgba(0,0,0,0.04); -moz-box-shadow: 0 3px 5px rgba(0,0,0,0.04); box-shadow: 0 3px 5px rgba(0,0,0,0.04);">
                  <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                    <table align="center" border="1" cellpadding="0" cellspacing="0" class="c-f1bud4" style="border: 0 none; border-collapse: separate; width: 100%;" width="100%">
                      <tbody>
                        <tr class="c-pekv9n" style="border: 0 none; border-collapse: separate; text-align: center;" align="center">
                          <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                            <table border="1" cellpadding="0" cellspacing="0" width="100%" class="c-1qv5bbj" style="border: 0 none; border-collapse: separate; border-color: #E3E3E3; border-style: solid; width: 100%; border-width: 1px 1px 0; background: #FBFCFC; padding: 40px 54px 42px;">
                              <tbody>
                                <tr style="border: 0 none; border-collapse: separate;">
                                  <td class="c-1m9emfx c-zjwfhk" style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: &quot; HelveticaNeueLight&quot;,&quot;HelveticaNeue-Light&quot;,&quot;HelveticaNeueLight&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 300; color: #1D2531; font-size: 25.45455px;"
                                    valign="middle">${user.name}, recover your password.</td>
                                </tr>
                                <tr style="border: 0 none; border-collapse: separate;">
                                  <td class="c-46vhq4 c-4w6eli" style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: &quot; HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeueRoman&quot;,&quot;HelveticaNeue-Roman&quot;,&quot;HelveticaNeueRoman&quot;,&quot;HelveticaNeue-Regular&quot;,&quot;HelveticaNeueRegular&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 400; color: #7F8FA4; font-size: 15.45455px; padding-top: 20px;"
                                    valign="middle">Looks like you lost your password?</td>
                                </tr>
                                <tr style="border: 0 none; border-collapse: separate;">
                                  <td class="c-eitm3s c-16v5f34" style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: &quot; HelveticaNeueMedium&quot;,&quot;HelveticaNeue-Medium&quot;,&quot;HelveticaNeueMedium&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,sans-serif;font-weight: 500; font-size: 13.63636px; padding-top: 12px;"
                                    valign="middle">We’re here to help. Click on the button below to change your password.</td>
                                </tr>
                                <tr style="border: 0 none; border-collapse: separate;">
                                  <td class="c-rdekwa" style="border: 0 none; border-collapse: separate; vertical-align: middle; padding-top: 38px;" valign="middle"><a href="${link}" target="_blank"
                                      class="c-1eb43lc c-1sypu9p c-16v5f34" style="color: #000000; -webkit-border-radius: 4px; font-family: &quot; HelveticaNeueMedium&quot;,&quot;HelveticaNeue-Medium&quot;,&quot;HelveticaNeueMedium&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,sans-serif;font-weight: 500; font-size: 13.63636px; line-height: 15px; display: inline-block; letter-spacing: .7px; text-decoration: none; -moz-border-radius: 4px; -ms-border-radius: 4px; -o-border-radius: 4px; border-radius: 4px; background-color: #288BD5; background-image: url(&quot;https://mail.crisp.chat/images/linear-gradient(-1deg,#137ECE2%,#288BD598%)&quot; );color: #ffffff; padding: 12px 24px;">Recover my password</a></td>
                                </tr>
                                <tr style="border: 0 none; border-collapse: separate;">
                                  <td class="c-ryskht c-zjwfhk" style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: &quot; HelveticaNeueLight&quot;,&quot;HelveticaNeue-Light&quot;,&quot;HelveticaNeueLight&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 300; font-size: 12.72727px; font-style: italic; padding-top: 52px;"
                                    valign="middle">If you didn’t ask to recover your password, please ignore this email.</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr class="c-1c9o9ex c-1c86scm" style="border: 0 none; border-collapse: separate;">
                          <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                            <table border="1" cellpadding="0" cellspacing="0" width="100%" class="c-1qv5bbj" style="border: 0 none; border-collapse: separate; border-color: #E3E3E3; border-style: solid; width: 100%; border-width: 1px 1px 0; background: #FFFFFF; padding: 32px 40px 40px; padding-top: 30px; padding-bottom: 40px;">
                              <tbody>
                                <tr style="border: 0 none; border-collapse: separate;">
                                  <td class="c-kjgl4z c-zjwfhk" style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: &quot; HelveticaNeueLight&quot;,&quot;HelveticaNeue-Light&quot;,&quot;HelveticaNeueLight&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 300; text-align: center; color: #7F8FA4; font-size: 20px; line-height: 22px;"
                                    valign="middle" align="center">Tired of forgetting your password?</td>
                                </tr>
                                <tr style="border: 0 none; border-collapse: separate;">
                                  <td class="c-1izzcs5 c-1gcznrt c-188skwt c-4w6eli" style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: &quot; HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeueRoman&quot;,&quot;HelveticaNeue-Roman&quot;,&quot;HelveticaNeueRoman&quot;,&quot;HelveticaNeue-Regular&quot;,&quot;HelveticaNeueRegular&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 400; text-align: center; font-size: 13.63636px; padding: 14px 0; line-height: 22px; padding-top: 16px;"
                                    valign="middle" align="center">Why wouldn’t you try using a password manager? Here are the best ones.</td>
                                </tr>
                                <tr style="border: 0 none; border-collapse: separate;">
                                  <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                                    <table border="1" cellpadding="0" cellspacing="0" width="100%" class="c-hji185" style="border: 0 none; border-collapse: separate; padding: 36px 30px 4px;">
                                      <tbody>
                                        <tr style="border: 0 none; border-collapse: separate;">
                                          <td width="33%" class="c-iwjxo3" style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                                            <table border="1" cellpadding="0" cellspacing="0" width="100%" style="border: 0 none; border-collapse: separate;">
                                              <tbody>
                                                <tr style="border: 0 none; border-collapse: separate;">
                                                  <td width="33%" class="c-1ypse9w" style="border: 0 none; border-collapse: separate; vertical-align: middle; text-align: right;" valign="middle" align="right"><span class="c-1r5mseh"><img alt="" src="https://mail.crisp.chat/images/content/account_recovery/icon_1password.png" class="c-g98bj3" style="border: 0 none; line-height: 100%; outline: none; text-decoration: none; height: 64px; width: 64px;" width="64" height="64"></span></td>
                                                  <td
                                                    width="67%" class="c-1a7tcod" style="border: 0 none; border-collapse: separate; vertical-align: middle; text-align: center; padding-right: 24px;" valign="middle" align="center">
                                                    <table border="1" cellpadding="0" cellspacing="0" width="100%" style="border: 0 none; border-collapse: separate;">
                                                      <tbody>
                                                        <tr class="c-1dvf7hf c-zjwfhk" style="border: 0 none; border-collapse: separate; font-family: &quot; HelveticaNeueLight&quot;,&quot;HelveticaNeue-Light&quot;,&quot;HelveticaNeueLight&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 300; color: #000000; font-size: 14.54545px; line-height: 35px;">
                                                          <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">1Password</td>
                                                        </tr>
                                                        <tr class="c-1jl6f0y" style="border: 0 none; border-collapse: separate; height: 32px; display: inline-block;">
                                                          <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle"><a href="https://1password.com/" target="_blank" style="text-decoration: none; letter-spacing: .7px; HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeueRoman&quot;,&quot;HelveticaNeue-Roman&quot;,&quot;HelveticaNeueRoman&quot;,&quot;HelveticaNeue-Regular&quot;,&quot;HelveticaNeueRegular&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 400; line-height: 15px; display: inline-block; font-family: &quot; -webkit-border-radius: 4px; -moz-border-radius: 4px; -ms-border-radius: 4px; -o-border-radius: 4px; border-radius: 4px; background: transparent; text-transform: lowercase; font-size: 10.90909px; padding: 3px 10px; color: #377FEA; border: 1px solid #377FEA;"
                                                              class="c-1eb43lc c-1v4o8f0 c-1eb43lc c-1h6ae2o c-4w6eli">Learn more</a></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                          </td>
                                          </tr>
                                          </tbody>
                                          </table>
                                  </td>
                                  <td width="33%" class="c-iwjxo3" style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                                    <table border="1" cellpadding="0" cellspacing="0" width="100%" style="border: 0 none; border-collapse: separate;">
                                      <tbody>
                                        <tr style="border: 0 none; border-collapse: separate;">
                                          <td width="33%" class="c-1ypse9w" style="border: 0 none; border-collapse: separate; vertical-align: middle; text-align: right;" valign="middle" align="right"><span class="c-1r5mseh"><img alt="" src="https://mail.crisp.chat/images/content/account_recovery/icon_dashlane.png" class="c-wk31m1" style="border: 0 none; line-height: 100%; outline: none; text-decoration: none; height: 64px; width: 64px;" width="64" height="64"></span></td>
                                          <td
                                            width="67%" class="c-1a7tcod" style="border: 0 none; border-collapse: separate; vertical-align: middle; text-align: center; padding-right: 24px;" valign="middle" align="center">
                                            <table border="1" cellpadding="0" cellspacing="0" width="100%" style="border: 0 none; border-collapse: separate;">
                                              <tbody>
                                                <tr class="c-1dvf7hf c-zjwfhk" style="border: 0 none; border-collapse: separate; font-family: &quot; HelveticaNeueLight&quot;,&quot;HelveticaNeue-Light&quot;,&quot;HelveticaNeueLight&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 300; color: #000000; font-size: 14.54545px; line-height: 35px;">
                                                  <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">Dashlane</td>
                                                </tr>
                                                <tr class="c-1jl6f0y" style="border: 0 none; border-collapse: separate; height: 32px; display: inline-block;">
                                                  <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle"><a href="https://www.dashlane.com/" target="_blank" style="text-decoration: none; letter-spacing: .7px; HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeueRoman&quot;,&quot;HelveticaNeue-Roman&quot;,&quot;HelveticaNeueRoman&quot;,&quot;HelveticaNeue-Regular&quot;,&quot;HelveticaNeueRegular&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 400; line-height: 15px; display: inline-block; font-family: &quot; -webkit-border-radius: 4px; -moz-border-radius: 4px; -ms-border-radius: 4px; -o-border-radius: 4px; border-radius: 4px; background: transparent; text-transform: lowercase; font-size: 10.90909px; padding: 3px 10px; color: #377FEA; border: 1px solid #377FEA;"
                                                      class="c-1eb43lc c-1v4o8f0 c-1eb43lc c-1h6ae2o c-4w6eli">Learn more</a></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                  </td>
                                  </tr>
                                  </tbody>
                                  </table>
                          </td>
                          <td width="33%" class="c-iwjxo3" style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                            <table border="1" cellpadding="0" cellspacing="0" width="100%" style="border: 0 none; border-collapse: separate;">
                              <tbody>
                                <tr style="border: 0 none; border-collapse: separate;">
                                  <td width="33%" class="c-1ypse9w" style="border: 0 none; border-collapse: separate; vertical-align: middle; text-align: right;" valign="middle" align="right"><span class="c-1r5mseh"><img alt="" src="https://mail.crisp.chat/images/content/account_recovery/icon_lastpass.png" class="c-1seagrh" style="border: 0 none; line-height: 100%; outline: none; text-decoration: none; height: 64px; width: 64px;" width="64" height="64"></span></td>
                                  <td
                                    width="67%" class="c-1a7tcod" style="border: 0 none; border-collapse: separate; vertical-align: middle; text-align: center; padding-right: 24px;" valign="middle" align="center">
                                    <table border="1" cellpadding="0" cellspacing="0" width="100%" style="border: 0 none; border-collapse: separate;">
                                      <tbody>
                                        <tr class="c-1dvf7hf c-zjwfhk" style="border: 0 none; border-collapse: separate; font-family: &quot; HelveticaNeueLight&quot;,&quot;HelveticaNeue-Light&quot;,&quot;HelveticaNeueLight&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 300; color: #000000; font-size: 14.54545px; line-height: 35px;">
                                          <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">LastPass</td>
                                        </tr>
                                        <tr class="c-1jl6f0y" style="border: 0 none; border-collapse: separate; height: 32px; display: inline-block;">
                                          <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle"><a href="https://www.lastpass.com/" target="_blank" style="text-decoration: none; letter-spacing: .7px; HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeueRoman&quot;,&quot;HelveticaNeue-Roman&quot;,&quot;HelveticaNeueRoman&quot;,&quot;HelveticaNeue-Regular&quot;,&quot;HelveticaNeueRegular&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 400; line-height: 15px; display: inline-block; font-family: &quot; -webkit-border-radius: 4px; -moz-border-radius: 4px; -ms-border-radius: 4px; -o-border-radius: 4px; border-radius: 4px; background: transparent; text-transform: lowercase; font-size: 10.90909px; padding: 3px 10px; color: #377FEA; border: 1px solid #377FEA;"
                                              class="c-1eb43lc c-1v4o8f0 c-1eb43lc c-1h6ae2o c-4w6eli">Learn more</a></td>
                                        </tr>
                                      </tbody>
                                    </table>
                          </td>
                          </tr>
                          </tbody>
                          </table>
                  </td>
                  </tr>
                  </tbody>
                  </table>
                  </td>
                  </tr>
                  </tbody>
                  </table>
                  </td>
                  </tr>
                  <tr class="c-183lp8j" style="border: 0 none; border-collapse: separate;">
                    <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                      <table border="1" cellpadding="0" cellspacing="0" width="100%" class="c-1qv5bbj" style="border: 0 none; border-collapse: separate; border-color: #E3E3E3; border-style: solid; width: 100%; background: #FFFFFF; border-width: 1px; font-size: 11.81818px; text-align: center; padding: 18px 40px 20px;"
                        align="center">
                        <tbody>
                          <tr style="border: 0 none; border-collapse: separate;">
                            <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle"><span class="c-1w4lcwx">You receive this email because you or someone initiated a password recovery operation on your ARTseum account.</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  </tbody>
                  </table>
                  </td>
                </tr>
                <tr class="c-ry4gth" style="border: 0 none; border-collapse: separate;">
                  <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                    <table border="1" cellpadding="0" cellspacing="0" width="100%" class="c-1vld4cz" style="border: 0 none; border-collapse: separate; padding-top: 26px; padding-bottom: 26px;">
                      <tbody>
                        <tr style="border: 0 none; border-collapse: separate;">
                          <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                            <table border="1" cellpadding="0" cellspacing="0" width="55%" align="center" class="c-jfe37" style="border: 0 none; border-collapse: separate; font-size: 10.90909px; text-align: center;">
                              <tbody>
                                <tr style="border: 0 none; border-collapse: separate;">
                                  <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle"><a href="http://localhost:3000/" target="_blank" class="c-1cmrz5j" style="text-decoration: underline; color: #7F8FA4;">ARTseum</a></td>
                                </tr>
                              </tbody>
                            </table>
                            <table border="1" cellpadding="0" cellspacing="0" width="100%" class="c-15u37ze" style="border: 0 none; border-collapse: separate; font-size: 10.90909px; text-align: center; color: #7F8FA4; padding-top: 22px;" align="center">
                              <tbody>
                                <tr style="border: 0 none; border-collapse: separate;">
                                  <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">© 2020 ARTseum - All rights reserved.</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
    </html>
        `
    });
    console.log("message sent : %s", info.response);
}

router.post('/newPass',(req,res)=>{
    // console.log(req);
    AddUser.findOne({resTok : req.body.resTok, email : req.body.email})
    .then((data)=>{
        // console.log("DATA : newPass : "+data);
        // console.log("newPass2");
        if(data)
        {
            data.password = req.body.password;
            bcrypt_js.genSalt(10, function(err, salt) {
                bcrypt_js.hash(req.body.password, salt, function(err, hash) {
                    data.password = hash;
                    data.save()
                    .then(()=>{
                        res.status(200).json({msg:"Password Updated"});
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.status(400).json({msg:"Error"});
                    });
                // console.log("newPass3");
                });
            });
        }
        else
        {
            res.status(400).json({msg:"Invalid link."});
        }
    }).catch((err)=>{
        console.log("Errrrrrr : "+err);
        return res.status(400).json({msg:"Invalid link."});
    });
});

router.post('/cMail',(req,res)=>{
    console.log("cmail1 : "+req);
    if(req)
    {
        let info = {
            to : 'devram.test@gmail.com',
            from : req.body.email,
            subject : 'Inquiry through website',
            html : `
                <div>
                    <h4>
                        Name : ${req.body.name}<br/>
                        Email : ${req.body.email}<br/>
                        Contact : ${req.body.contact}<br/>
                        Message : ${req.body.msg}<br/>
                    <h4/>
                <div/>
            `
        };
        transporter.sendMail(info,(err,res)=>{
            if(err)
            {
                console.log(err);
            }
            else 
            {
                console.log("Mail Sent : "+res.response);
            }
        });
    }
    else
    {
        res.status(400).json({msg : "Error"});
    }
});

module.exports = router;
// var readHTMLFile = function(path, callback) {
//     fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
//         if (err) {
//             throw err;
//             callback(err);
//         }
//         else {
//             callback(null, html);
//         }
//     });
// };
// readHTMLFile(__dirname + 'app/public/pages/emailWithPDF.html', function(err, html) {
//     var template = handlebars.compile(html);
//     var replacements = {
//          username: "John Doe"
//     };
//     var htmlToSend = template(replacements);
//     var mailOptions = {
//         from: 'my@email.com',
//         to : 'some@email.com',
//         subject : 'test subject',
//         html : htmlToSend
//      };
//     smtpTransport.sendMail(mailOptions, function (error, response) {
//         if (error) {
//             console.log(error);
//             callback(error);
//         }
//     });
// });