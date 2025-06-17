# OTT Product Manager

A modern, responsive web application for managing product inventory and categorization with beautiful glassmorphism design.

## ✨ Features

- 🖼️ **Product Image Management** - Visual product cards with image display
- 📊 **Inventory Tracking** - Track quantities across all sizes (XXS to XXXL)
- 🏷️ **Product Categorization** - Mark products as "New" or "Current"
- 💾 **Auto-Save** - Automatic data persistence with local storage backup
- 🎨 **Modern UI** - Glassmorphism design with smooth animations
- 📱 **Responsive** - Works perfectly on desktop and mobile devices
- ⚡ **Real-time Feedback** - Visual save status and progress indicators

## 🚀 Live Demo

**Vercel**: Will be available after deployment

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with glassmorphism effects
- **Backend**: Node.js Express (local development)
- **API**: Vercel Serverless Functions (production)
- **Storage**: LocalStorage + Server-side persistence

## 📦 Quick Start

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ott-product-manager.git
   cd ott-product-manager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel

1. **One-Click Deploy**:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/ott-product-manager)

2. **Or using Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel --prod
   ```

## 📁 Project Structure

```
├── index.html              # Main application page
├── styles.css              # Modern CSS with glassmorphism
├── script.js               # Frontend application logic
├── server.js               # Local development server
├── package.json            # Dependencies and scripts
├── api/
│   ├── get-data.js         # API endpoint to retrieve data
│   └── save-data.js        # API endpoint to save data
└── images/
    ├── logo/               # Company branding
    └── *.jpg               # Product images
```

## 🎯 Core Functionality

### Product Management
- **Visual Interface**: Each product displays with its image
- **Category Selection**: Choose between "New Product" or "Current Product"
- **Custom Naming**: Add unique product names
- **Size Inventory**: Track stock for all clothing sizes

### Data Persistence
- **Local Storage**: Instant saves to browser storage
- **Server Backup**: API endpoints for data synchronization
- **Auto-Save**: Saves progress automatically after changes
- **Manual Save**: "Save Progress" button with visual feedback

### User Experience
- **Responsive Design**: Optimized for all screen sizes
- **Loading States**: Visual feedback during save operations
- **Error Handling**: Graceful fallbacks for network issues
- **Accessibility**: Keyboard navigation and screen reader support

## 🔧 API Endpoints

### `GET /api/get-data`
Retrieves saved product data.

**Response**:
```json
{
  "success": true,
  "data": {
    "image-path": {
      "category": "new|current",
      "productName": "Product Name",
      "sizes": { "xs": 5, "s": 10 },
      "lastUpdated": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### `POST /api/save-data`
Saves product data to the server.

**Request**:
```json
{
  "data": { /* product data structure */ },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 📱 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Modern glassmorphism design principles
- Responsive web design best practices
- Progressive enhancement methodology
