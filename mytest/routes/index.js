var express = require('express');
var request = require('request');
var router = express.Router();
var BoardContents = require('../model/boardSchema');
var multer = require('multer');
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBCkLHFGjRv7Yz5rlCu4T5sNUBcnJJHID8'
});

const path = require('path');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});


/* GET home page. */

router.get('/', function(req, res, next) {
    var content;
    var login;
     if(req.session.userName){
        content = `${req.session.userName} 님 안녕하세요.`;
        login='logout'
    } else {
        content = '';
        login = 'login';
    }
    
    request.get(
        "http://13.114.103.74:3000/get-restaurant",
        function (error, response, body) {
            if (!error && response.statusCode == 500) {
                console.log(body)
            }else
                res.render('index', { title: content, login: login, contents: JSON.parse(body)});
            });

});
router.get('/login', function(req, res, next) {
        var content;
    var login;
     if(req.session.userName){
        content = `${req.session.userName} 님 안녕하세요.`;
        login='logout'
    } else {
        content = '';
        login = 'login';
    }
  res.render('login', { title: 'login.ejs' , login: login});
});

router.get('/join', function(req, res, next) {
        var content;
    var login;
     if(req.session.userName){
        content = `${req.session.userName} 님 안녕하세요.`;
        login='logout'
    } else {
        content = '';
        login = 'login';
    }
  res.render('join', { title: 'join.ejs' , login: login});
});


router.get('/reservation', function(req, res, next) {
        var content;
    var login;
     if(req.session.userName){
        content = `${req.session.userName} 님 안녕하세요.`;
        login='logout'
    } else {
        content = '';
        login = 'login';
    }
  res.render('reservation', { title: 'reservation.ejs' , login: login});
});

router.post('/find', function(req, res, next) {
        var login;
     if(req.session.userName){
        content = `${req.session.userName} 님 안녕하세요.`;
        login='logout'
    } else {
        content = '';
        login = 'login';
    }
    request.post(
        'http://13.114.103.74:3000/query-restitle',
        { json: { 
            "name": req.body.name 
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 500) {
                console.log(body)
            }else{
                console.log(body)
                res.render('index', {login: login, contents: body});
            }
            });

});

router.get('/bullet', function(req, res, next) {
            var content;
    var login;
     if(req.session.userName){
        content = `${req.session.userName} 님 안녕하세요.`;
        login='logout'
    } else {
        content = '';
        login = 'login';
    }
        BoardContents.find({}).sort({date:-1}).exec(function(err, rawContents){
       // db에서 날짜 순으로 데이터들을 가져옴
        if(err) throw err;
        res.render('bullet', {title: "Board", contents: rawContents}); 
        // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
});
    res.render('bullet', {title: "Board", login: login,contents:""});
    });


router.get('/register', function(req, res, next) {
        var content;
    var login;
     if(req.session.userName){
        content = `${req.session.userName} 님 안녕하세요.`;
        login='logout'
    } else {
        content = '';
        login = 'login';
    }
  res.render('register', { title: 'register.ejs' , login: login});
});


router.get('/list', function(req, res, next) {
        var content;
    var login;
     if(req.session.userName){
        content = `${req.session.userName} 님 안녕하세요.`;
        login='logout'
    } else {
        content = '';
        login = 'login';
    }
  res.render('list', { title: 'list.ejs' , login: login});
});
router.get('/newwrite', function(req, res, next) {
        var content;
    var login;
     if(req.session.userName){
        content = `${req.session.userName} 님 안녕하세요.`;
        login='logout'
    } else {
        content = '';
        login = 'login';
    }
  res.render('newwrite', { title: 'newwrite.ejs' , login: login});
});
router.post('/bullet', function(req, res){
    // 글 작성하고 submit하게 되면 저장이 되는 부분
    var addNewTitle = req.body.addContentSubject;
    var addNewWriter = req.body.addContentWriter;
    var addNewContent = req.body.addContents;
    var addNewPasword = req.body.addContentPassword;
    addBoard(addNewTitle, addNewWriter, addNewContent, addNewPasword);
    res.redirect('/boards');
});

//회원가입
router.post('/postjoin', function(req, res,next){

    request.post(
        'http://13.114.103.74:3000/insert-user',
        { json: { 
            "user_id": req.body.user_id, 
            "email": req.body.email,
            "password": req.body.password,
            "name": req.body.name
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
            if (body=="Succes")
                res.redirect('/login');
            else if (body=="exist id"){
                    res.redirect('/join');
                }
            });
            
        });

//로그인

router.post('/postlogin', function(req, res,next) {
  request.post(
        'http://13.114.103.74:3000/login',
        { json: { 
            "user_id": req.body.user_id, 
            "password": req.body.password
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
            if (body=="Succes"){
                    console.log("ok")
                    req.session.userName = req.body.user_id;
                    res.redirect('/');
                }
            else if (body=="Wrong email or password."){
                    res.redirect('/login');
                }
            });
 
});

//로그아웃
router.get('/logout', function(req, res){
        sess = req.session;
        if(!sess.username){
            req.session.destroy(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/login');
                }
            })
        }else{
            res.redirect('/');
        }
    })


//회원 가입

router.post('/insert-restaurant', upload.single('picture'), function(req, res,next){
    var lat;
    var lng;

    // Geocode an address.
    googleMapsClient.geocode({
      address: req.body.adress2
    }, function(err, response) {
      if (!err) {
        lat=response.json.results[0].geometry.location.lat; 
        lng=response.json.results[0].geometry.location.lng
        console.log(lat+"/"+lng+req.body.adress2);

    request.post(
        'http://13.114.103.74:3000/insert-restaurant',
        { json: { 
            "name": req.body.name, 
            "picture": req.file.path,
            "tel": req.body.tel1+"-"+req.body.tel2+"-"+req.body.tel3,
            "address": req.body.adress2,
            "businesshours": req.body.businesshours,
            "menu": req.body.menu,
            "lat": lat,
            "lng": lng
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
            });
            res.redirect('/');
                  }
        else console.log("geocode err"+req.body.adress2);
    });
        });
module.exports = router;
