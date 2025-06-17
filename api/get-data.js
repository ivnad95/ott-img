// Vercel serverless function to retrieve saved product data
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

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
    
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        await ensureTable();

        const { rows } = await pool.query(
            'SELECT data FROM ott_data ORDER BY updated_at DESC LIMIT 1'
        );

        const savedData = rows[0]?.data || {};

        res.status(200).json({
            success: true,
            data: savedData,
            message: 'Data retrieved successfully',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Get data error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
