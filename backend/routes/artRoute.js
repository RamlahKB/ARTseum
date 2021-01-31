const express = require('express');
const router = express.Router();
const AddArt = require('./../models/art_crud');
const AddCom = require('./../models/com_crud');
const upload = require('./../config/multer');

router.get('/addArt',(req,res)=>{
    res.render('add');
});

router.get('/viewArt',(req,res)=>{
    AddArt.find({}).sort({date:'DESC'})
    .populate("catg")
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
        console.log("viewArt1 Error : "+err);
    });
});

// let now = new Date().toISOString().
// replace(/T/, ' ').      // replace T with a space
// replace(/\..+/, '');

// let options = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
// };



router.post('/addArt',upload.single("image"),(req,res)=>{
    // const today = Date.now().toLocaleString();
    let newArt = new AddArt({
        name : req.body.name,
        catg : req.body.catg,
        artist : req.body.artist,
        year : req.body.year,
        desc : req.body.desc,
        image : req.file.filename,
        author_id : req.body.author_id,
        status : req.body.status,
        date : Date.now()
    });
    newArt.save()
    .then(()=>{
        res.status("200").json({msg : "Data Inserted"});
    }).catch(err=>{
        console.log(err);
    });  
});

router.get('/upSArt/:id',(req,res)=>{
    var myQuery = { _id: req.params.id};
    var newVal = { $set: {status: "Approved"} }
    AddArt.updateOne(myQuery,newVal)
    .then(()=>{
        res.status("200").json({msg : "Status Updated"});
    }).catch(err=>{
        console.log("upSArt Error : "+err);
    });
});

router.get('/modal/:id',(req,res)=>{
    AddArt.findOne({_id:req.params.id})
    .then((data)=>{
        res.status("200").json(data);
    }).catch(err=>{
        console.log(err);
    })
});

router.get('/delArt/:id',(req,res)=>{
    AddArt.deleteOne({_id:req.params.id})
    .then(()=>{
        AddCom.deleteMany({artId:req.params.id});
        res.status("200").json({msg:"Data Deleted"});
    }).catch(err=>{
        console.log("delArt1 Error : "+err);
    })
});

router.get('/editArt/:id',(req,res)=>{
    AddArt.findOne({_id:req.params.id})
    .then((data)=>{
        res.status("200").json(data);
    }).catch(err=>{
        console.log(err);
    })
});

router.post('/updateArt',upload.single("image"),(req,res)=>{
    AddArt.findOne({_id:req.body.id})
    .then((data)=>{
        // console.log("95 data : ",req.file.filename);
        data.name = req.body.name;
        data.catg = req.body.catg;
        data.artist = req.body.artist;
        data.year = req.body.year;
        data.desc = req.body.desc;
        if(req.file === undefined)
        {data.image = data.image;}
        else
        {data.image = req.file.filename;}
        data.save()
        .then(()=>{
            res.status("200").json({msg : "Data Updated"});
        }).catch(err=>{
            // console.log("up1 : ",err);
            res.status("400").json({msg : "Sorry... Something went wrong..."});
        });
    }).catch(err=>{
        // console.log("update ",err);
        res.status("400").json({msg : "Sorry... Something went wrong..."});
    });
    
});

router.post('/like/:id',(req, res)=>{
    var myQuery = { _id: req.params.id};
    var newVal = { $push:{likes:req.body.id} }
    AddArt.updateOne(myQuery, newVal,{new:true})
    .then((resp)=>{
        res.status(200).json({msg:resp});
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({msg : "Sorry... Something went wrong."});
    });
});

// router.post('/unlike/:id',(req, res)=>{
//     var myQuery = { _id: req.params.id};
//     var newVal = { $pull:{likes:req.body.id} }
//     AddArt.updateOne(myQuery, newVal,{new:true})
//     .then((resp)=>{
//         res.status(200).json({msg:resp});
//     }).catch((err)=>{
//         console.log(err);
//         res.status(400).json({msg : "Sorry... Something went wrong."});
//     });
// });

router.post('/dislike/:id',(req, res)=>{
    var myQuery = { _id: req.params.id};
    var newVal = { $push:{dislikes:req.body.id} }
    AddArt.updateOne(myQuery, newVal,{new:true})
    .then((resp)=>{
        res.status(200).json({msg:resp});
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({msg : "Sorry... Something went wrong."});
    });
});

module.exports = router;