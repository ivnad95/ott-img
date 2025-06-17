// API endpoint to save product data
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
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { data, timestamp } = req.body;
        
        if (!data || !timestamp) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // In a real application, you would save this to a database
        // For now, we'll just log it and return success
        console.log('Product data received:', {
            timestamp,
            productCount: Object.keys(data).length,
            data: JSON.stringify(data, null, 2)
        });
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 500));
        
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