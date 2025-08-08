# 🏠 Rental Management App

A modern, offline-first Progressive Web Application (PWA) for tracking monthly rent, WiFi, and electricity bills using the Bikram Sambat calendar system. Perfect for renters who want to keep organized records of their monthly expenses.

## ✨ Features

### 📊 Dashboard
- **Monthly Overview**: Current month's bill summary with total, paid, and unpaid amounts
- **Quick Actions**: Fast access to common tasks like adding bills and marking all as paid
- **Bikram Sambat Calendar**: Native support for Nepali calendar system

### 📝 Bill Management
- **Multi-Bill Tracking**: Manage rent, WiFi, and electricity bills in one place
- **Smart Electricity Calculation**: Automatic cost calculation based on units consumed and configurable rate
- **Payment Status Tracking**: Color-coded status indicators for easy visualization
- **Auto-fill Feature**: Copy previous month's data for faster entry

### 📱 Modern Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Offline Support**: Full functionality without internet connection
- **PWA Features**: Install as a native app on your device
- **Dark Theme Support**: Eye-friendly interface

### 🔍 Advanced Features
- **Search & Filter**: Find specific entries by month, year, or notes
- **Data Export/Import**: Backup and restore your data in JSON format
- **Monthly Reminders**: Optional notifications for bill due dates
- **Detailed History**: Comprehensive view of all past entries with edit/delete options

## 🚀 Installation

### Option 1: Direct Use
1. Download or clone this repository
2. Open `index.html` in your web browser
3. The app will work immediately - no server required!

### Option 2: Install as PWA
1. Open the app in a supported browser (Chrome, Edge, Firefox, Safari)
2. Look for the "Install" banner at the top
3. Click "Install" to add the app to your home screen/desktop
4. Launch like any native app!

### Option 3: Local Server (Optional)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have live-server installed)
npx live-server

# Then open http://localhost:8000 in your browser
```

## 📖 Usage Guide

### Getting Started
1. **First Launch**: The app will show the current Bikram Sambat month on the dashboard
2. **Add Your First Entry**: 
   - Click "Add Entry" in navigation
   - Select year and month (defaults to current)
   - Enter your bill amounts
   - Mark payment status
   - Save the entry

### Adding Bills
- **Rent**: Enter your monthly rent amount
- **WiFi**: Enter your internet bill amount
- **Electricity**: Enter units consumed (cost calculated automatically)
- **Payment Status**: Check boxes for bills you've already paid
- **Notes**: Add any additional information (optional)

### Managing Data
- **Edit Entries**: Click the edit icon on any history item
- **Delete Entries**: Click the trash icon with confirmation
- **Search**: Use the search box in History to find specific entries
- **Filter**: View all, paid only, or unpaid only entries

### Settings Configuration
- **Electricity Rate**: Update the per-unit cost (default: Rs. 12/unit)
- **Reminders**: Enable monthly notification reminders
- **Data Management**: Export, import, or clear all data

## 🛠️ Technical Details

### Technologies Used
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: LocalStorage for offline data persistence
- **Calendar**: Bikram Sambat date conversion
- **Icons**: Font Awesome 6.0
- **PWA**: Service Worker for offline functionality

### File Structure
```
rental-data/
├── index.html          # Main HTML file
├── app.js             # Core application logic
├── styles.css         # CSS styling
├── sw.js              # Service worker for PWA
├── manifest.json      # PWA manifest
└── README.md          # This file
```

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Data Storage
- All data is stored locally in your browser's LocalStorage
- No data is sent to external servers
- Data persists between sessions
- Export feature creates backup files

## 🔧 Configuration

### Electricity Rate
The default electricity rate is Rs. 12 per unit. To change:
1. Go to Settings page
2. Update "Rate per Unit" field
3. Click "Update Rate"
4. All future calculations will use the new rate

### Backup Your Data
**Important**: Since data is stored locally, regular backups are recommended:
1. Go to Settings → Data Management
2. Click "Export All Data"
3. Save the JSON file in a safe location
4. Use "Import Data" to restore if needed

## 📱 Mobile Experience

### Installing on Mobile
- **Android**: Open in Chrome → Menu → "Add to Home screen"
- **iOS**: Open in Safari → Share → "Add to Home Screen"

### Mobile Features
- Touch-friendly interface
- Optimized for portrait orientation
- Offline functionality
- Native app-like experience

## 🎨 Customization

### Themes
The app uses CSS custom properties for easy theming. Key color variables:
```css
--primary-color: #667eea
--secondary-color: #764ba2
--success-color: #48bb78
--error-color: #f56565
```

### Adding New Bill Types
To add additional bill categories, modify:
1. `app.js`: Add fields to the data structure
2. `index.html`: Add form fields and display elements
3. `styles.css`: Add appropriate styling

## 🐛 Troubleshooting

### Common Issues

**App not loading properly**
- Ensure JavaScript is enabled in your browser
- Try refreshing the page (Ctrl+F5 or Cmd+Shift+R)

**Data not saving**
- Check if LocalStorage is enabled
- Ensure you have sufficient storage space
- Try exporting data as backup

**PWA not installing**
- Use a supported browser (Chrome, Edge, Firefox)
- Ensure you're on HTTPS (or localhost)
- Check for browser install prompt

**Bikram Sambat dates incorrect**
- The app includes a fallback date converter
- For precise conversion, ensure internet connection for external library

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## 🤝 Contributing

Feel free to:
- Report bugs or issues
- Suggest new features
- Submit pull requests
- Improve documentation

## 📞 Support

For questions or support:
- Check the troubleshooting section above
- Review the usage guide
- Create an issue for bugs or feature requests

---

**Made with ❤️ for organized rental management**


*Keep track of your bills, stay organized, and never miss a payment!*
