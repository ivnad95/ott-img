const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
});

// File to store data locally
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
async function initDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch (error) {
        // File doesn't exist, create it
        await fs.writeFile(DATA_FILE, JSON.stringify({}), 'utf8');
        console.log('Created data.json file');
    }
}

// API Routes
app.get('/api/get-data', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const savedData = JSON.parse(data);
        
        res.status(200).json({
            success: true,
            data: savedData,
            message: 'Data retrieved successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve data',
            message: error.message
        });
    }
});

app.post('/api/save-data', async (req, res) => {
    try {
        const { data, timestamp } = req.body;
        
        if (!data || !timestamp) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // Save data to local file
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        
        console.log('Product data saved:', {
            timestamp,
            productCount: Object.keys(data).length,
            sample: Object.keys(data).slice(0, 3)
        });
        
        res.status(200).json({
            success: true,
            message: 'Data saved successfully',
            timestamp: new Date().toISOString(),
            productCount: Object.keys(data).length
        });
        
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to save data',
            message: error.message
        });
    }
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
async function startServer() {
    await initDataFile();
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
        console.log(`📁 Serving files from: ${__dirname}`);
        console.log(`💾 Data will be saved to: ${DATA_FILE}`);
        console.log('\n🎯 Open http://localhost:3000 in your browser');
    });
}

startServer().catch(console.error);
