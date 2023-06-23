import express from 'express';
import { promises as fs } from 'fs';

const app = express();
app.use(express.json()); //app accepts json

const filePath = 'data.json';

// Retrieve every entry logged in the static table
app.get('/api/static', async (req, res) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const staticEntries = JSON.parse(data);
    res.status(200).json(staticEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retrieve a specific entry from the static table by ID
app.get('/api/static/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(filePath, 'utf8');
    const staticEntries = JSON.parse(data);
    const singleEntry = staticEntries.find((entry) => entry.id === id);
    if (singleEntry) {
      res.status(200).json(singleEntry);
    } else {
      res.status(404).json({ message: 'Entry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new entry to the static table
app.post('/api/static', async (req, res) => {
  try {
    const { body } = req;
    const data = await fs.readFile(filePath, 'utf8');
    const staticEntries = JSON.parse(data);
    const newEntry = { id: Date.now().toString(), ...body };
    staticEntries.push(newEntry);
    await fs.writeFile(filePath, JSON.stringify(staticEntries, null, 2));
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a specific entry from the static table (that matches the given id)
app.delete('/api/static/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(filePath, 'utf8');
    let staticEntries = JSON.parse(data);
    const entryIndex = staticEntries.findIndex((entry) => entry.id === id);
    if (entryIndex !== -1) {
      staticEntries.splice(entryIndex, 1);
      await fs.writeFile(filePath, JSON.stringify(staticEntries, null, 2));
      res.status(200).json({ message: 'Entry deleted successfully' });
    } else {
      res.status(404).json({ message: 'Entry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a specific entry from the static table (that matches the given id)
app.put('/api/static/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const data = await fs.readFile(filePath, 'utf8');
    let staticEntries = JSON.parse(data);
    const entryIndex = staticEntries.findIndex((entry) => entry.id === id);
    if (entryIndex !== -1) {
      staticEntries[entryIndex] = { id, ...body };
      await fs.writeFile(filePath, JSON.stringify(staticEntries, null, 2));
      res.status(200).json(staticEntries[entryIndex]);
    } else {
      res.status(404).json({ message: 'Entry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3001, () => {
  console.log('Node is running on port 3001');
});
