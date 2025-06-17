# OTT Product Images Manager

A mobile-friendly web application for managing product inventory and categorization. Built with vanilla HTML, CSS, and JavaScript, deployed on Vercel.

## Features

- **Mobile-Responsive Grid Layout**: Clean, modern grid that works on all devices
- **Product Categorization**: Mark products as "New" or "Current" 
- **Inventory Management**: Input stock quantities for sizes XXS through XXXL
- **Auto-Save**: Automatically saves progress locally as you type
- **Data Persistence**: Saves data in browser localStorage with serverless API support
- **Clean UI**: Modern, user-friendly interface with smooth animations
- **Vercel Deployment**: Serverless functions for scalable deployment

## Live Demo

🚀 **Deployed on Vercel**: [View Live App](https://product-images-ott.vercel.app)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/ivnad95/product-images-ott.git
   cd product-images-ott
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run locally with Vercel Dev:
   ```bash
   npm run dev
   # or
   vercel dev
   ```

4. Open http://localhost:3000 in your browser

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   npm run deploy
   # or
   vercel --prod
   ```

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ivnad95/product-images-ott)

## Architecture

The application uses a **serverless architecture** with:

- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Backend**: Vercel Serverless Functions (Node.js)
- **Storage**: Browser localStorage (with API endpoints for future database integration)
- **Deployment**: Vercel platform

## API Endpoints

- `POST /api/save-data` - Save product data
- `GET /api/get-data` - Retrieve saved data

## Data Storage

- **Local Storage**: Data is automatically saved to browser localStorage
- **Serverless Functions**: API endpoints ready for database integration
- **Auto-Save**: Changes are automatically saved locally every 2 seconds
- **Data Persistence**: Currently uses localStorage; ready for database upgrade

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── api/
│   ├── save-data.js    # Vercel serverless function to save data
│   └── get-data.js     # Vercel serverless function to get data
├── images/             # Product image files
├── package.json        # Node.js dependencies
├── vercel.json         # Vercel deployment configuration
└── README.md           # This file
```

## Browser Support

- Chrome 60+
- Safari 12+
- Firefox 60+
- Edge 79+

## Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build (no build step needed for static files)
npm run build
```

### Environment Variables
For production database integration, you can add environment variables in Vercel:
- `DATABASE_URL` - Database connection string
- `API_SECRET` - API authentication secret

## Future Enhancements

- [ ] Database integration (MongoDB, Supabase, or Vercel KV)
- [ ] User authentication
- [ ] Image upload functionality
- [ ] Export data to CSV/Excel
- [ ] Advanced filtering and search
- [ ] Real-time collaboration

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test on mobile and desktop
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

If you have any questions or need help, please [open an issue](https://github.com/ivnad95/product-images-ott/issues).