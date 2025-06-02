const redConfig = {
  port: 6379,
  srv: "redis"
};

const mariaConfig = {
  srv: "mysql",
  port:3306
}

import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import { createClient } from 'redis';
import axios from 'axios';

import mysql from 'mysql2/promise';

const app = express();
// Express setup
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


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
// Redis setup
const rdb = await connectRedis();



// Création d'un pool réutilisable de connexions
const pool = mysql.createPool({
  host: mariaConfig.srv,
  port: mariaConfig.port,
  user: 'monutilisateur',
  password: 'monmdp',
  database: 'ma_base',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Vérifie ou crée la table `feedback`
async function initDB() {
  const connection = await pool.getConnection();

  console.log("✅ Connecté à MariaDB");

  const [rows] = await connection.execute(`
    SELECT COUNT(*) AS table_exists
    FROM information_schema.tables
    WHERE table_schema = 'ma_base'
    AND table_name = 'feedback';
  `);

  if (rows[0].table_exists === 0) {
    console.log("📦 Table 'feedback' non trouvée. Création...");
    await connection.execute(`
      CREATE TABLE feedback (
        id_feedback INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT
      );
    `);
    console.log("✅ Table 'feedback' créée.");
  } else {
    console.log("✅ Table 'feedback' existe déjà.");
  }

  connection.release(); // Ne pas fermer le pool, juste relâcher la connexion
}

initDB().catch(err => {
  console.error("❌ Erreur lors de la connexion ou de la création :", err);
  process.exit(1);
});

app.get('/',(req,res)=>{
 res.render('index.ejs');
});

app.post('/feedbacks', async (req, res) => {
    try{
        // let result = await axios({
        //     method: 'post',
        //     url: 'https://www.google.com/recaptcha/api/siteverify',
        //     params: {
        //         secret: '//',
        //         response: req.body['g-recaptcha-response']
        //     }
        // });
      // let data = result.data || {};
      let data = {};
      data.success = true;
        if(!data.success){
          res.status(500).json({ error: "Captcha error" });
        } else {
            let feedback = req.body.feedback;
            if (!feedback) {
              return res.status(400).json({ error: 'Le champ "feedback" est requis.' });
            }
            try {
              const [result] = await pool.execute(
                'INSERT INTO feedback (content) VALUES (?)',
                [feedback]
              );
              rdb.publish("bot_feedbacks", result.insertId.toString());
              res.status(201).json({ text: "Message envoyé, il sera lu rapidement" });
            } catch (error) {
              console.error("Erreur lors de l'insertion :", error);
              res.status(500).json({ error: "Erreur lors de l'ajout du feedback." });
            }
        }
    }catch(err){
        res.status(500).json({ error: "Captcha error." });
    }
})

app.listen(80);