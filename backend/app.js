const express = require('express');
// const exphbs=require('express-handlebars');
const Bodyparser = require('body-parser');
const mongoose = require('mongoose');
const mongoDBUri = require('./config/keys').mongoDBUri;
var fs = require('fs');
// const Handlebars = require('handlebars');

const cors = require('cors');

const app = express();
// const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
// app.engine('handlebars',exphbs({
//     handlebars: allowInsecurePrototypeAccess(Handlebars)
// }))
app.set('view engine','handlebars');

app.use(Bodyparser.urlencoded({extended:false}));
app.use(Bodyparser.json());

mongoose.connect(mongoDBUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('Connected!!')
}).catch(err=>{
    console.log(err);
})

app.use(express.static('public'));

app.use(cors());

const port = 2000;
app.listen(port,()=>{
    console.log('Port : '+port);
});

// app.get('/',(req,res)=>{
//     res.render('home');
// });

const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const artRoute = require('./routes/artRoute');
const catRoute = require('./routes/catRoute');
const mailRoute = require('./routes/mailRoute');
const comRoute = require('./routes/comRoute');
app.use('/', artRoute, userRoute, catRoute, adminRoute, mailRoute, comRoute);
