// API endpoint to retrieve saved product data
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
        // In a real application, you would retrieve this from a database
        // For now, return empty data as this is just a demo endpoint
        
        res.status(200).json({
            success: true,
            data: {},
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