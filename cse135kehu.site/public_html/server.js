import express from 'express';
import mysql from 'mysql';

const app = express();
app.use(express.json()); //app accepts JSON

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'cse135.SQL',
  database: 'cse_135_site',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// CORS configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://reporting.cse135kehu.site');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Retrieve every entry logged in the static table
app.get('/api/static', (req, res) => {
  const query = 'SELECT * FROM static_data';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving entries:', err);
      res.status(500).json({ message: 'Error retrieving entries' });
      return;
    }
    res.status(200).json(results);
  });
});

// Retrieve a specific entry from the static table by ID
app.get('/api/static/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM static_data WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving entry:', err);
      res.status(500).json({ message: 'Error retrieving entry' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Add a new entry to the static table
app.post('/api/static', (req, res) => {
  const { body } = req;
  const query = 'INSERT INTO static_data SET ?';
  connection.query(query, body, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      res.status(500).json({ message: 'Error adding entry' });
      return;
    }
    const newEntry = { id: result.insertId, ...body };
    res.status(201).json(newEntry);
  });
});

// Delete a specific entry from the static table (that matches the given id)
app.delete('/api/static/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM static_data WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      res.status(500).json({ message: 'Error deleting entry' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      res.status(200).json({ message: 'Entry deleted successfully' });
    }
  });
});

// Update a specific entry from the static table (that matches the given id)
app.put('/api/static/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const query = 'UPDATE static_data SET ? WHERE id = ?';
  connection.query(query, [body, id], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      res.status(500).json({ message: 'Error updating entry' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      const updatedEntry = { id, ...body };
      res.status(200).json(updatedEntry);
    }
  });
});

app.get('/api/performance', (req, res) => {
  const query = 'SELECT * FROM performance_data';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving entries:', err);
      res.status(500).json({ message: 'Error retrieving entries' });
      return;
    }
    res.status(200).json(results);
  });
});

// Retrieve a specific entry from the static table by ID
app.get('/api/performance/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM performance_data WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving entry:', err);
      res.status(500).json({ message: 'Error retrieving entry' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Add a new entry to the static table
app.post('/api/performance', (req, res) => {
  const { body } = req;
  const query = 'INSERT INTO performance_data SET ?';
  connection.query(query, body, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      res.status(500).json({ message: 'Error adding entry' });
      return;
    }
    const newEntry = { id: result.insertId, ...body };
    res.status(201).json(newEntry);
  });
});

// Delete a specific entry from the static table (that matches the given id)
app.delete('/api/performance/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM performance_data WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      res.status(500).json({ message: 'Error deleting entry' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      res.status(200).json({ message: 'Entry deleted successfully' });
    }
  });
});

app.put('/api/performance/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const query = 'UPDATE performance_data SET ? WHERE id = ?';
  connection.query(query, [body, id], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      res.status(500).json({ message: 'Error updating entry' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      const updatedEntry = { id, ...body };
      res.status(200).json(updatedEntry);
    }
  });
});


// Retrieve every entry logged in the static table
app.get('/api/activity', (req, res) => {
  const query = 'SELECT * FROM activity_data';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving entries:', err);
      res.status(500).json({ message: 'Error retrieving entries' });
      return;
    }
    res.status(200).json(results);
  });
});

// Retrieve a specific entry from the static table by auto-generated ID
app.get('/api/activity/:autoid', (req, res) => {
  const { autoid } = req.params;
  const query = 'SELECT * FROM activity_data WHERE autoid = ?';
  connection.query(query, [autoid], (err, results) => {
    if (err) {
      console.error('Error retrieving entry:', err);
      res.status(500).json({ message: 'Error retrieving entry' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Add a new entry to the static table
app.post('/api/activity', (req, res) => {
  const { body } = req;
  const query = 'INSERT INTO activity_data SET ?';
  connection.query(query, body, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      res.status(500).json({ message: 'Error adding entry' });
      return;
    }
    const newEntry = { id: result.insertId, ...body };
    res.status(201).json(newEntry);
  });
});

// Delete a specific entry from the static table (that matches the given auto-generated id)
app.delete('/api/activity/:autoid', (req, res) => {
  const { autoid } = req.params;
  const query = 'DELETE FROM activity_data WHERE autoid = ?';
  connection.query(query, [autoid], (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      res.status(500).json({ message: 'Error deleting entry' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      res.status(200).json({ message: 'Entry deleted successfully' });
    }
  });
});

// Update a specific entry in the static table (that matches the given auto-generated id)
app.put('/api/activity/:autoid', (req, res) => {
  const { autoid } = req.params;
  const { body } = req;
  const query = 'UPDATE activity_data SET ? WHERE autoid = ?';
  connection.query(query, [body, autoid], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      res.status(500).json({ message: 'Error updating entry' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      const updatedEntry = { autoid, ...body };
      res.status(200).json(updatedEntry);
    }
  });
});

// Pulling data from routes to populate zinggrid
app.get('/api/static', function(req, res) {
  const queryString = 'SELECT * FROM static_data';
  connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

app.get('/api/performance', function(req, res) {
  const queryString = 'SELECT * FROM performance_data';
  connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

app.get('/api/activity', function(req, res) {
  const queryString = 'SELECT * FROM activity_data';
  connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

app.listen(3001, () => {
  console.log('Node is running on port 3001');
});
