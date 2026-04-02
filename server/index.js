const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Expose 'uploads' directory statically so frontend can load images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Data file paths
const DATA_FILE = path.join(__dirname, 'data', 'products.json');

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `prod-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

// Initialize data if not exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// -----------------------------------------------------------------------------
// API Endpoints
// -----------------------------------------------------------------------------

// GET all products
app.get('/api/products', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// POST new product
app.post('/api/products', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const newProduct = req.body;
    data.push(newProduct);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save product' });
  }
});

// PUT (update) existing product
app.put('/api/products/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const id = parseInt(req.params.id, 10);
    const index = data.findIndex(p => p.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...req.body };
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      res.json(data[index]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE a product
app.delete('/api/products/:id', (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const id = parseInt(req.params.id, 10);
    data = data.filter(p => p.id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// POST image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  // Return the path that the frontend can use to render the image
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
