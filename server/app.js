const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();
const dbPath = path.join(__dirname, 'db.json');

app.use(express.json());
const corsOptions = {
    origin: 'http://127.0.0.1:5500'
  };
  
  app.use(cors(corsOptions));

app.post('/click', (req, res) => {
  fs.readFile(dbPath, 'utf8', (error, data) => {
    if (error) {
      res.status(500).send({ error: 'Failed to read database' });
      return;
    }

    const db = JSON.parse(data);
    db.entries.push(req.body);

    fs.writeFile(dbPath, JSON.stringify(db), error => {
      if (error) {
        res.status(500).send({ error: 'Failed to write to database' });
        return;
      }

      res.status(201).send({ message: 'Entry added successfully' });
    });
  });
});

app.post('/pre-task')

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
