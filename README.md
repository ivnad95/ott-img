# OTT Product Images Manager

A mobile-friendly web application for managing product inventory and categorization. Built with vanilla HTML, CSS, and JavaScript, optimized for Vercel deployment.

## Features

- **Mobile-Responsive Grid Layout**: Clean, modern grid that works on all devices
- **Product Categorization**: Mark products as "New" or "Current" 
- **Inventory Management**: Input stock quantities for sizes XXS through XXXL
- **Auto-Save**: Automatically saves progress locally as you type
- **Data Persistence**: Saves data both locally and to server
- **Clean UI**: Modern, user-friendly interface with smooth animations

## Live Demo

The application is deployed on Vercel and accessible at: [Your Vercel URL]

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

3. Run locally with Vercel CLI:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## Deployment

The app is configured for automatic deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Push changes to the main branch
3. Vercel will automatically build and deploy

## Data Storage

- **Local Storage**: Data is automatically saved to browser localStorage
- **Server Storage**: Form submissions are sent to `/api/save-data` endpoint
- **Auto-Save**: Changes are automatically saved every 2 seconds

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
├── vercel.json         # Vercel configuration
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