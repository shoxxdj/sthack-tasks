const FLAG = "Not the real one :)";

const redConfig = {
  port: 6379,
  srv: "redis"
};

const session_duration = 120;
const base_cash = 300;

import express from 'express';
import session from 'express-session';
import { createCanvas } from 'canvas';
import { createClient } from 'redis';
//import sha256 from 'sha256';
import morgan from 'morgan';

import * as crypto from 'crypto';

function generateCaptchaText(length = 6) {
  const now = new Date();
  const seconds = now.getUTCSeconds().toString().padStart(2, '0');
  const seed = `second-${seconds}`;
  const hash = crypto.createHash('sha256').update(seed).digest();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < length; i++) {
    captcha += chars[hash[i] % chars.length];
  }
  return captcha;
}

function generateCaptchaImage(text) {
  const canvas = createCanvas(200, 70);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, 200, 70);
  ctx.font = '36px Arial';
  ctx.fillStyle = '#333';
  ctx.fillText(text, 30, 50);
  return canvas.toDataURL();
}

const session_alive = (rdb) => {
  return (req, res, next) => {
    const username = req.session?.username?.toString() ?? null;
    if (username != null) {
      rdb.get(username)
        .then(value => {
          console.log("Redis Value:", value);
          if (value) {
            next();
          }
          else {
            req.session.username = null;
            res.redirect('/fail');
          }
        })
        .catch(err => {
          console.error("Redis error:", err);
          res.redirect('/fail');
        });
    } else {
      req.session.username = null;
      res.redirect('/fail');
    }
  };
};

async function connectRedis() {
  const client = createClient({ url: `redis://${redConfig.srv}:${redConfig.port}` });

  client.on('error', (err) => {
    console.error('Erreur Redis:', err);
  });

  client.on('connect', () => {
    console.log('Connecté à Redis');
  });

  await client.connect();
  return client;
}

const app = express();
import cors from 'cors';

app.set('trust proxy', true);

// Session setup
app.use(session({
  secret: 'super-secret-captchaXX',
  resave: false,
  saveUninitialized: true,
	  cookie: {
      httpOnly: false,
      sameSite: 'none',
      secure:true
  }
}));

app.use(cors({
  origin: 'https://admin_website.local',
  credentials: true
}));

app.use((req, res, next) => {
  console.log('Origin header:', req.headers.origin);
  next();
});


// Express setup
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



// Redis setup
const rdb = await connectRedis();

app.set('etag', false);

// Routes
app.get('/', (req, res) => {
  const captchaText = generateCaptchaText();
  const captchaImage = generateCaptchaImage(captchaText);
  req.session.captcha = captchaText;
  console.log("Session captcha is :" + req.session.captcha);
  res.render('index', { captchaImage, captchaText });
});

app.get('/fail', (req, res) => {
  res.end('Wrong session, either expired or not created');
});

import * as openpgp from 'openpgp';
import { sha256 } from '@noble/hashes/sha256';


function utf8ToBytes(str) {
  return new TextEncoder().encode(str);
}

function bytesToHex(bytes) {
  return Buffer.from(bytes).toString('hex');
}

function generateKeyPairFromSeed(seed) {
  const seedBytes = utf8ToBytes(seed);
  const privateKey = sha256(seedBytes);
  const publicKey = getPublicKey(privateKey, true);

  return {
    privateKey: bytesToHex(privateKey),
    publicKey: bytesToHex(publicKey)
  };
}

function hexToBytes(hex) {
  return Uint8Array.from(Buffer.from(hex, 'hex'));
}

import { getPublicKey,getSharedSecret } from '@noble/secp256k1';

function encryptWithPublicKey(publicKeyHex, message) {
  const recipientPub = hexToBytes(publicKeyHex);
  const ephemeralPriv = crypto.randomBytes(32);
  const ephemeralPub = getPublicKey(ephemeralPriv, true);

  const sharedSecret = getSharedSecret(ephemeralPriv, recipientPub);
  const aesKey = sha256(sharedSecret.slice(1)); // remove prefix byte

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(aesKey), iv);
  const ciphertext = Buffer.concat([
    cipher.update(message, 'utf8'),
    cipher.final()
  ]);
  const tag = cipher.getAuthTag();

  return {
    iv: bytesToHex(iv),
    tag: bytesToHex(tag),
    ciphertext: bytesToHex(ciphertext),
    ephemeralPub: bytesToHex(ephemeralPub)
  };
}


app.post('/register', async (req, res) => {
  console.log("session" + JSON.stringify(req.session));
  const captcha = req.body.captcha;
  const username = req.body.username.toString();
  const password = req.body.password.toString();
  const redPassword = bytesToHex(sha256(password));
  let exists = await rdb.get(username)
  let user_cash = base_cash;

  if (exists == null) {
    if (captcha === req.session.captcha) {
    try {
      await rdb.set(username, user_cash, { EX: session_duration });
      await rdb.set(username+"_password", redPassword, { EX: session_duration });

      const secret = FLAG;
      const { privateKey, publicKey } = generateKeyPairFromSeed(captcha+redPassword);
      const encrypted = encryptWithPublicKey(publicKey, secret);
      const jsonHex = Buffer.from(JSON.stringify(encrypted)).toString('hex');
      console.log(privateKey);
      console.log(jsonHex);
      await rdb.set(username + "_private_key", privateKey.toString(), { EX: session_duration });
      await rdb.set(username + "_secret", jsonHex.toString(), { EX: session_duration });

      res.end("Account created !");
     } catch (err) {
       console.log(err);
       res.end("Unexpected error, call an admin");
     }
   } else {
     console.log("Expected Captcha : " + req.session.captcha);
     console.log("Receveid : "+ req.body.captcha);
     res.end('Wrong captcha sorry.');
   }
   } else {
     res.end("Sorry this username has already been taken");
   }  
});

app.post('/login', (req, res) => {
  let username = req.body.username.toString();
  let password = bytesToHex(sha256(req.body.password.toString()));
  //get password
  rdb.get(username + "_password")
    .then((pass) => {
      if (pass == password) {
        req.session.username = username;
        res.redirect('/shop');
      }
      else {
        req.session = null;
        res.end('wrong password');
      }
  })
});

app.get('/shop', session_alive(rdb), (req, res) => {
  rdb.get(req.session.username)
    .then((cash) => {
      res.render('shop.ejs',{cash:cash});
    })
    .catch((err) => {
      res.end('unexpected error');
  })
});

function updateCash(rdb, username, movment) {
  console.log("will update cash");
  rdb.get(username)
  .then(value => {
  if (value) {
    let newVal = parseInt(value) + movment;
    rdb.ttl(username)
      .then((ttl) => {
        rdb.set(username, newVal, { EX: ttl });
      })
  }
  else {
    req.session.username = null;
    res.redirect('/fail');
  }
  })
}

app.post('/buy/:item', session_alive(rdb), async (req, res) => {

  let user_cash = await rdb.get(req.session.username);
  if (user_cash < 300) {
    res.end('no enough cash !');
  }
  else {
    if (req.params.item == "key") {
      updateCash(rdb, req.session.username,-300);
      rdb.get(req.session.username + "_private_key")
        .then((value) => {
          console.log(value);
          res.render('give_item.ejs',{item:value})
        })
        .catch((err) => {
          res.end('unexpected error');
        })
    }
    else if (req.params.item == "secret") {
      updateCash(rdb, req.session.username,-300);
      rdb.get(req.session.username + "_secret")
        .then((value) => {
        console.log(value);
        res.render('give_item.ejs',{item:value})
      })
      .catch((err) => {
        res.end('unexpected error');
      })
    }
  }
});

app.get('/add/cash', (req, res) => {
  res.end('need to develop this feature');
});

// // Démarrer le serveur
app.listen(80, () => {
  console.log("Serveur lancé sur le port 80");
});

// Fermer Redis proprement
process.on('SIGINT', async () => {
  await rdb.quit();
  process.exit();
});
