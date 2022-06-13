var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const admin = require('firebase-admin');
var app = express();

const flag="UseCo0k13sItSM0r3SEcur3Th4nBr0w5Er";

const red = {port:6379,srv:process.env.REDIS_HOST};
const redis = require("redis");
const publisher  = redis.createClient({url:"redis://redis:6379"});
publisher.connect();

var uuid = require('uuid');
console.log(uuid.v4());

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sqliteDB.sqlite');

db.run("CREATE TABLE IF NOT EXISTS messages (id TEXT, message TEXT)");



const adminUserId='1TbFqshO1JOv6pkkXx20CJuCWrk1';

// app.use(function(req,res,next){
// 	 res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
// 	 next();
// })

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));


const serviceAccount = require("./config/sthack-sthack-firebase-adminsdk-52eh6-2b9cab5d21.json");
console.log(serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: "https://fbauthdemo-2a451.firebaseio.com"
});


function checkAuth(req, res, next) {
  
  console.log(req.headers.authtoken);

  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
      .then((infos) => {

      	console.log(infos);

      	if(infos.user_id==adminUserId){
         next()
	}
	else{
	 res.status(403).send('Limited to admin')
	}
      }).catch(() => {
        res.status(403).send('Limited to admin')
      });
  } else {
    res.status(403).send('Limited to admin')
  }
}

function checkSourceNotAdmin(req,res,next){
	//Admin is only user-agent CypressUA
	if(req.headers['user-agent']=='CypressUA'){
		res.status(403).send("Can't read flag like that");
	}
	else{
		next();
	}	
}

function checkSourceAdmin(req,res,next){
	//Admin is only user-agent CypressUA
	if(req.headers['user-agent']=='CypressUA'){
		next();
	}
	else{
		res.status(403).send("Can't access this ressource");
	}
}



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/flag', checkAuth, checkSourceNotAdmin,(req, res) => {
  res.json({
    text: flag
  });
});

app.post('/message/preview',(req,res)=>{
 res.json({
 	text:req.body.message
 })
});

app.post('/message/admin',(req,res)=>{
 var message=req.body.message;
 var id = uuid.v4();

 db.run('INSERT INTO messages(message,id) VALUES(?, ?)', [message,id], (err) => {
	if(err) {
		console.log(err.message); 
		res.json({
			text: 'Oups petite erreur'
		})
	}else{
		publisher.publish("messagerie","New message");
		res.json({
		 	text:'Message envoyé, il sera lu prochainement'
		});
	}
});

});

app.get('/message/read',checkAuth,checkSourceAdmin,(req,res)=>{
 console.log("Admin is auth and read message");
 //Limiter à l'admin
 db.each('select message,id from messages LIMIT 1', (err,msg) =>{
 	db.run("DELETE FROM messages WHERE id=?",msg.id);
 	res.json({
		text:msg.message
	});
 });
});


module.exports = app;
