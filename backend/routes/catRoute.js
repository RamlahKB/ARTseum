const express = require('express');
const router = express.Router();
const AddCatg = require('./../models/catg_crud');
const AddArt = require('./../models/art_crud');
const AddCom = require('./../models/com_crud');
const upload = require('./../config/multer');

router.get('/addCat',(req,res)=>{
    res.render('addCatg');
})

router.get('/viewCat',(req,res)=>{
    AddCatg.find({}).sort({date:'DESC'})
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

router.post('/addCat',upload.single("image"),(req,res)=>{
    let newCat = AddCatg({
        category : req.body.category,
        image : req.file.filename,
        author_id : req.body.author_id,
        date : Date.now(),
    });
    newCat.save()
    .then(()=>{
        console.log("new Cat "+newCat);
        res.status("200").json({msg : "Category Inserted"});
    }).catch(err=>{
        console.log(err);
    });  
});

router.get('/delCat/:id',(req,res)=>{
    AddCatg.deleteOne({_id:req.params.id})
    .then(()=>{
        AddArt.deleteMany({catId:req.params.id});
        AddCom.deleteMany({artId:req.params.id});
        res.status("200").json({msg:"Cat Deleted"});
    }).catch(err=>{
        console.log(err);
    });
    
});

router.get('/editCat/:id',(req,res)=>{
    AddCatg.findOne({_id:req.params.id})
    .then((data)=>{
        res.status("200").json(data);
    }).catch(err=>{
        console.log(err);
    });
});

router.post('/updateCat',upload.single("image"),(req,res)=>{
    AddCatg.findOne({_id:req.body.id})
    .then((data)=>{
        data.category = req.body.category;
        if(req.file === undefined)
        {data.image = data.image;}
        else
        {data.image = req.file.filename;}
        data.save()
        .then(()=>{
            res.status("200").json({msg : "Data Updated"});
        }).catch(err=>{
            console.log(err);
            res.status("400").json({msg : "Sorry... Something went wrong..."});
        });
    }).catch(err=>{
        console.log(err);
        res.status("400").json({msg : "Sorry... Something went wrong..."});
    });
});

module.exports = router;