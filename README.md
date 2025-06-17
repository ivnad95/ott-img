# OTT Product Images Manager

A mobile-friendly web application for managing product inventory and categorization. Built with vanilla HTML, CSS, and JavaScript, deployed on Vercel.

## Features

- **Mobile-Responsive Grid Layout**: Clean, modern grid that works on all devices
- **Product Categorization**: Mark products as "New" or "Current"
- **Inventory Management**: Input stock quantities for sizes XXS through XXXL
- **Auto-Save**: Automatically saves progress locally as you type
- **Data Persistence**: Saves data both locally and to serverless API
- **Clean UI**: Modern, user-friendly interface with smooth animations

## Live Demo

The application is deployed on Vercel and can be accessed at your deployment URL.

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/ivnad95/OTT-product-Images.git
   cd OTT-product-Images
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run locally with Vercel dev server:
   ```bash
   npm run dev
   ```

4. Open <http://localhost:3000> in your browser

## Deployment to Vercel

### Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push to main branch

### Manual Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   npm run deploy
   # or
   ./deploy.sh
   ```

## Architecture

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Vercel Serverless Functions (Node.js)
- **Storage**: Browser LocalStorage + Serverless API endpoints
- **Deployment**: Vercel (Static Site + Serverless Functions)

## API Endpoints

- `POST /api/save-data` - Save product data
- `GET /api/get-data` - Retrieve saved data

## Data Storage

- **Local Storage**: Data is automatically saved to browser localStorage
- **Serverless API**: Data is sent to Vercel serverless functions
- **Auto-Save**: Changes are automatically saved locally every 2 seconds
- **Data Synchronization**: Server data is loaded on startup and merged with local data

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/ivnad95/OTT-product-Images.git
   cd OTT-product-Images
   ```

2. Install dependencies (optional):
   ```bash
   npm install
   ```

3. Run the server:
   ```bash
   # Using npm script
   npm start
   
   # Or directly with Python
   python3 server.py
   
   # To use a different port
   python3 server.py 8001
   ```

4. Open http://localhost:8000 in your browser

## Server Features

The application now includes a full-featured Python server that:

- **Serves static files** (HTML, CSS, JS, images)
- **Handles API endpoints** for data persistence
- **Saves data to local JSON files** for development
- **Supports CORS** for cross-origin requests
- **Provides proper error handling** and logging

## Data Storage

- **Local Storage**: Data is automatically saved to browser localStorage
- **Server Storage**: Data is saved to `data/product-data.json` on the server
- **Auto-Save**: Changes are automatically saved locally every 2 seconds
- **Data Synchronization**: Server data is loaded on startup and merged with local data

## API Endpoints

- `POST /api/save-data` - Save product data
- `GET /api/get-data` - Retrieve saved data

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── api/
│   ├── save-data.js    # Save data API endpoint
│   └── get-data.js     # Get data API endpoint
├── package.json        # Node.js dependencies
└── [product-images]    # Product image files
```

## Browser Support

- Chrome 60+
- Safari 12+
- Firefox 60+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on mobile and desktop
5. Submit a pull request

## License

MIT License - see LICENSE file for details