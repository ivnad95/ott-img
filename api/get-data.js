// Vercel Serverless Function to retrieve saved product data
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Since Vercel is stateless, we can't store files persistently
        // In a production app, you'd use a database like MongoDB, Supabase, or Vercel KV
        // For now, we'll return empty data and rely on localStorage in the frontend
        
        const savedData = {};
        
        return res.status(200).json({
            success: true,
            data: savedData,
            message: 'Data retrieved successfully (using localStorage for persistence)',
            timestamp: new Date().toISOString(),
            note: 'No server-side storage configured. Data is persisted in browser localStorage.'
        });
        
    } catch (error) {
        console.error('Get data error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message,
            success: false
        });
    }
}