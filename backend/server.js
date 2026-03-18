const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend folder
// The frontend folder is one level up and then into 'frontend'
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// Placeholder API Route for Products
app.get('/api/products', (req, res) => {
    res.json([
        { id: 1, name: "Premium Leather Handbag", price: 2400 },
        { id: 2, name: "Classic White T-Shirt", price: 1200 }
    ]);
});



// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Serving frontend files from:', frontendPath);
});
