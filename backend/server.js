const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());

// Configura o body-parser para lidar com requisições POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cria (ou abre) o banco de dados SQLite no localhost
const db = new sqlite3.Database('./sensor_data.db');

// Cria a tabela se não existir
db.run('CREATE TABLE IF NOT EXISTS sensor_data (id INTEGER PRIMARY KEY AUTOINCREMENT, temperature REAL, humidity REAL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)');

// Rota para receber os dados do ESP8266
app.post('/save_data', (req, res) => {
  const temperature = req.body.temperature;
  const humidity = req.body.humidity;

  if (!temperature || !humidity) {
    return res.status(400).send('Dados incompletos');
  }

  // Inserir os dados no banco de dados
  const stmt = db.prepare('INSERT INTO sensor_data (temperature, humidity) VALUES (?, ?)');
  stmt.run(temperature, humidity, (err) => {
    if (err) {
      return res.status(500).send('Erro ao salvar os dados');
    }
    res.send('Dados recebidos e armazenados!');
  });
  stmt.finalize();
});

// Rota para visualizar os dados armazenados (para o front-end)
app.get('/data', (req, res) => {
  db.all('SELECT * FROM sensor_data ORDER BY id DESC LIMIT 1008', (err, rows) => {
    if (err) {
      return res.status(500).send('Erro ao buscar os dados');
    }
    res.json(rows.reverse());  // Reverte a ordem para que os mais antigos venham primeiro
  });
});

// Rota para calcular a média de temperatura e umidade dos últimos 7 dias
app.get('/average_last_7_days', (req, res) => {
  const query = `
    SELECT AVG(temperature) AS avg_temperature, AVG(humidity) AS avg_humidity
    FROM sensor_data
    WHERE timestamp >= datetime('now', '-30 days')
  `;

  db.get(query, (err, row) => {
    if (err) {
      return res.status(500).send('Erro ao calcular a média');
    }
    res.json({
      avg_temperature: row.avg_temperature,
      avg_humidity: row.avg_humidity,
    });
  });
});


// Inicia o servidor no localhost
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
