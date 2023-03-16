let myExpress = require('express');

let mongoose = require('mongoose');
let User = require('./models/user');
let Ads = require('./models/ads');

require('./models/user');


mongoose.connect('mongodb://localhost:27017/fsdDB').then(function(err, connection){
    console.log(err || connection)
});


let app = myExpress();
app.use(myExpress.json())

console.log("server chaling")

// common JS format
let jwt = require('jsonwebtoken');


// app.get('/12.png', function(req, res){

//     res.sendfile('./data/12.png ')

// });
// app.get('/', function(req, res){

//     res.sendfile('./data/index.html')

// });

// FRONT_END ROUTES
// react-router-dom
// just UI ko change kran 

// BACK_END ROUTES
// nodejs,PHP,DJango, Rails
// data communication krne keliye

let users = [];

app.get('/get-users',async function(req, res){
    
    let users = await User.find();
    res.json(users);

})

app.get('/dashboard', function(req, res){
    res.end("OK g");
    console.log("code caling")
})

const multer  = require('multer');
// const { default: users } = require('./src/components/users/users');
// const { Delete } = require('@mui/icons-material');

// const upload = multer({ dest: './server/uploaded/soap' });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploaded')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  const upload = multer({ storage: storage })


app.get("/users-lao", async function(req, res){
    let users = await User.find();
    res.json(users);
})

app.delete('/user-delete', function(req, res){

   users.splice(req.query.meraIndex, 1);
   
   res.json({
    success:true
   })
    

})

app.post('/session-check-karo', function(req, res){

    // let user = users.find(user=>user.id == req.body.somToken)
    // res.json(user);
    
jwt.verify(req.body.somToken, "cat is boling mioon in faisalabad", async function(err, data){


    // let user = users.find(user=>user.id == data.id)
    let user = await User.findById(data.id)
    res.json(user);
        
    console.log(data);
});

    

});

app.post('/login', async function(req, res){

    let user =  await User.findOne({
        name:req.body.name, 
        password:req.body.password
    })

    app.get("/check-users", async function(req, res){
        let users = await User.find();
        res.json(users);
    })

    // let name = req.body.name;
    // let password = req.body.password;

    // let user = users.find(function(myUser){

    //     if(myUser.name == name && myUser.password == password){
    //         return true;
    //     }

    // })

    if(user != undefined){

        // res.json({
        //     user,
        //     meraToken:user.id
        // })

        jwt.sign( {id:user._id}, "cat is boling mioon in faisalabad", {expiresIn:'1d'}, function(err, meraToken){

        res.json({
            user,
            meraToken
        });

        })    

    }else{
        res.json(null);
    }



})

app.use(function(req, res, next){
    req.a = 10;
    next();
});

app.use(function(req, res, next){
    req.b = 20;
    next();
});

app.use(function(req, res, next){
    req.c = 30;
    next();
});

app.get('/testing', function(req, res, next){

    if(req.query.city == undefined){
        res.end("security issue")
    }else{
        next();
    }


},  (req, res)=>{
    res.end('code chaling ')
})

// GET,POST,PUT, Delete
app.post('/create-user', upload.single('file'), async function(req, res){
    
// req.body.imgKaPath = req.files.filename;
// req.body.imgKaPath = req.files[0].filename;

// nyaUser.name = req.body.name;
// nyaUser.city = req.body.city;
// nyaUser.password =req.body.password;
users.push(req.body);
let nyaUser  =new User(req.body);
nyaUser.file=req.file.originalname
await nyaUser.save();
console.log(req.file)
    // users.push(req.body);

    console.log(req.body);

})

// app.get('/check-old-user', function(req, res){
//     res.json(mera_users)
// })
app.post('/save-ads', upload.single('adPicture'),async function(req,res){
    // req.body.imgKaPath = req.files[0].filename;

    // nyaAds.title = req.body.title;
    // nyaAds.price = req.body.price;
    let nyaAds  =new Ads(req.body);
    nyaAds.adPicture=req.file.originalname;
    await nyaAds.save();
    console.log(req.body)
res.end('ads create hogia')


})

app.get('/show-ads', async function(req, res){
    let ad= await Ads.find();
    res.json(ad);
})
app.post('/checking', function(req, res){
    console.log("reqestr chaling");
    res.end("OK HGYA")
})
app.use(myExpress.static('./build'))

app.use(myExpress.static('./data'))
app.use(myExpress.static('./uploaded'))
app.use(myExpress.static('./hello/new'))

app.use(function(err, req, res,next){

    res.end("erroer agya tha " +err.message)
})

app.listen(1234, function(){
    console.log("express OK");
})