const express = require('express');
const router = express.Router();
const AddCom = require('./../models/com_crud');
const upload = require('./../config/multer');

router.get('/viewCom',(req,res)=>{
    AddCom.find({}).sort({date:'DESC'}).populate("artId")
    .then((data)=>{
        if (data.length >= 0)
        {
            res.status("200").json(data);
        }
        else
        {
            res.status("404").json({msg : "No Data Found"});
        }
    }).catch(err=>{
        console.log(err);
    });
});

router.post('/addCom',upload.single("image"),(req,res)=>{
    let newCom = new AddCom({
            author_name : req.body.author_name,
            author_id : req.body.author_id,
            author_email : req.body.author_email,
            author_img : req.body.author_img,
            catId : req.body.catId,
            artId : req.body.artId,
            text : req.body.text,
            date : Date.now(),
        });
    newCom.save()
    .then(()=>{
        // console.log("new Com "+newCom);
        res.status("200").json({msg : "Comment Inserted"});
    }).catch(err=>{
        console.log(err);
        res.status("400").json({msg : "Sorry.. Something went wrong..."});
    });  
});

router.get('/delCom/:id',(req,res)=>{
    AddCom.deleteOne({_id:req.params.id})
    .then(()=>{
        res.status("200").json({msg:"Comment Deleted"});
    }).catch(err=>{
        console.log(err);
    });
    
});

module.exports = router;