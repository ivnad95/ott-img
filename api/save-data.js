// Vercel serverless function to save product data
const { Pool } = require('pg');

// Use DATABASE_URL provided via environment variables
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Ensure table exists (called lazily on first request)
async function ensureTable() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS ott_data (
            id SERIAL PRIMARY KEY,
            data JSONB,
            updated_at TIMESTAMPTZ DEFAULT NOW()
        )
    `);
}

module.exports = async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { data, timestamp } = req.body;
        
        if (!data || !timestamp) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // Ensure database table exists and insert data
        await ensureTable();

        await pool.query('INSERT INTO ott_data (data) VALUES ($1)', [data]);

        console.log('Product data saved:', {
            timestamp,
            productCount: Object.keys(data).length
        });
        
        res.status(200).json({
            success: true,
            message: 'Data saved successfully',
            timestamp: new Date().toISOString(),
            productCount: Object.keys(data).length
        });
        
    } catch (error) {
        console.error('Save data error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
