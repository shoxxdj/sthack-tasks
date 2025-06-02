import express from 'express';
import morgan from 'morgan';

const app = express();
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//const rdb = await connectRedis();
import mysql from 'mysql2/promise';
// Création d'un pool réutilisable de connexions
const pool = mysql.createPool({
  host: 'mysql',
  port: 3306,
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
import path from 'path';
import { fileURLToPath } from 'url';
// Pour résoudre __dirname avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/source_code', (req, res) => {
  res.sendFile(path.join(__dirname, 'source_code.js'));
});


app.get('/admin/feedbacks/:id', async (req, res) => {
    let id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID invalide.' });
  }

  try {
    const connection = await pool.getConnection();

    try {
      // Lire le feedback
      const [rows] = await connection.execute(
        'SELECT * FROM feedback WHERE id_feedback = ?',
        [id]
      );

      if (rows.length === 0) {
        connection.release();
        return res.status(404).json({ error: 'Feedback non trouvé.' });
      }

      const feedback = rows[0];
      console.log(feedback);

      // Supprimer le feedback
      await connection.execute(
        'DELETE FROM feedback WHERE id_feedback = ?',
        [id]
      );

        connection.release();
        
        res.render('read_feedback.ejs',{feedback:feedback.content})

    //   res.json({
    //     message: 'Feedback lu et supprimé.',
    //     feedback
    //   });

    } catch (err) {
      connection.release();
      throw err;
    }

  } catch (error) {
    console.error("❌ Erreur lors de la lecture/suppression :", error);
    res.status(500).json({ error: "Erreur serveur lors du traitement du feedback." });
  }
})


app.listen(80);

