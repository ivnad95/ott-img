// Vercel serverless function to retrieve saved product data
export default async function handler(req, res) {
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
        // For now, return empty data since we don't have persistent storage set up
        // In production, you would connect to a database like MongoDB, PostgreSQL, etc.
        const savedData = {};
        
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