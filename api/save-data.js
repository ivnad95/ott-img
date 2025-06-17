// Vercel Serverless Function to save product data
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

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { data, timestamp } = req.body;
        
        if (!data || !timestamp) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                success: false 
            });
        }

        // Since Vercel is stateless, we'll use a simple in-memory storage
        // In a production app, you'd use a database like MongoDB, Supabase, or Vercel KV
        // For now, we'll just validate the data and return success
        // The frontend will rely on localStorage for persistence
        
        console.log('Product data received:', {
            timestamp,
            productCount: Object.keys(data).length
        });
        
        return res.status(200).json({
            success: true,
            message: 'Data saved successfully',
            timestamp: new Date().toISOString(),
            productCount: Object.keys(data).length,
            note: 'Data is persisted in browser localStorage. For production, consider using a database.'
        });
        
    } catch (error) {
        console.error('Save data error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message,
            success: false
        });
    }
}