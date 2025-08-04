// Rental Management App - Main JavaScript
class RentalManager {
    constructor() {
        this.data = this.loadData();
        this.tenants = this.loadTenants(); // Add tenant management
        this.currentEditId = null;
        this.currentDeleteId = null;
        this.deferredPrompt = null;
        this.electricityRate = this.getElectricityRate();
        this.currentLanguage = this.loadLanguage();
        this.translations = this.initializeTranslations();
        this.init();
    }

    // Language System
    initializeTranslations() {
        return {
            en: {
                // App Title
                'app-title': 'Rental Manager',
                
                // Navigation
                'nav-dashboard': 'Dashboard',
                'nav-add-entry': 'Add Entry',
                'nav-history': 'History',
                'nav-tenants': 'Tenants',
                'nav-settings': 'Settings',
                
                // Dashboard
                'dashboard-title': 'Dashboard',
                'dashboard-subtitle': 'Current month\'s overview for all tenants',
                'total-amount': 'Total Amount',
                'paid-amount': 'Paid',
                'unpaid-amount': 'Unpaid',
                'current-bills': 'Current Month Bills',
                'quick-actions': 'Quick Actions',
                'add-bills': 'Add This Month\'s Bills',
                'mark-all-paid': 'Mark All as Paid',
                'export-data': 'Export Data',
                'no-bills': 'No bills recorded for this month',
                'tenants-paid': 'Tenants with All Bills Paid',
                'tenants-unpaid': 'Tenants with Unpaid Bills',
                'no-tenants-paid': 'No tenants have fully paid this month',
                'no-tenants-unpaid': 'All tenants have paid their bills',
                
                // Tenants
                'tenants-title': 'Tenant Management',
                'tenants-subtitle': 'Manage your rental tenants',
                'add-tenant': 'Add New Tenant',
                'tenant-name': 'Tenant Name',
                'tenant-email': 'Email (Optional)',
                'tenant-phone': 'Phone (Optional)',
                'tenant-room': 'Room/Unit Number',
                'tenant-deposit': 'Security Deposit (Rs.)',
                'tenant-rent': 'Monthly Rent (Rs.)',
                'tenant-move-in': 'Move-in Date',
                'tenant-status': 'Status',
                'status-active': 'Active',
                'status-inactive': 'Inactive',
                'save-tenant': 'Save Tenant',
                'edit-tenant': 'Edit Tenant',
                'delete-tenant': 'Delete Tenant',
                'tenant-details': 'Tenant Details',
                'no-tenants': 'No tenants added yet',
                'add-first-tenant': 'Add First Tenant',
                
                // Add Entry
                'add-entry-title': 'Add New Entry',
                'add-entry-subtitle': 'Record rent, WiFi, and electricity bills',
                'select-tenant': 'Select Tenant',
                'choose-tenant': 'Choose a tenant...',
                'date-selection': 'Date Selection',
                'bs-year': 'Bikram Sambat Year',
                'month': 'Month',
                'bill-details': 'Bill Details',
                'rent-amount': 'Rent Amount (Rs.)',
                'wifi-bill': 'WiFi Bill (Rs.)',
                'electricity-units': 'Electricity Units',
                'electricity-total': 'Total: Rs.',
                'payment-status': 'Payment Status',
                'rent-paid': 'Rent Paid',
                'wifi-paid': 'WiFi Paid',
                'electricity-paid': 'Electricity Paid',
                'notes': 'Notes (Optional)',
                'notes-placeholder': 'Add any additional notes...',
                'auto-fill': 'Auto-fill Previous Month',
                'save-entry': 'Save Entry',
                
                // History
                'history-title': 'Payment History',
                'history-subtitle': 'View and manage all tenant records',
                'search-placeholder': 'Search by tenant, month, year, or notes...',
                'filter-all': 'All',
                'filter-paid': 'Paid',
                'filter-unpaid': 'Unpaid',
                'filter-tenant': 'By Tenant',
                'all-tenants': 'All Tenants',
                'no-history': 'No payment history available',
                'add-first-entry': 'Add First Entry',
                'paid-status': 'Paid',
                'unpaid-status': 'Unpaid',
                'edit': 'Edit',
                'delete': 'Delete',
                
                // Settings
                'settings-title': 'Settings',
                'settings-subtitle': 'Manage your app preferences',
                'electricity-rate': 'Electricity Rate',
                'rate-per-unit': 'Rate per Unit (Rs.)',
                'current-rate': 'Current rate: Rs.',
                'update-rate': 'Update Rate',
                'data-management': 'Data Management',
                'export-all-data': 'Export All Data',
                'import-data': 'Import Data',
                'clear-all-data': 'Clear All Data',
                'reminders': 'Reminders',
                'monthly-reminder': 'Monthly Bill Reminder',
                'reminder-desc': 'Get notified at the beginning of each month',
                'about': 'About',
                'version': 'Version 1.0.0',
                'app-description': 'A simple, offline app to track your monthly rent, WiFi, and electricity bills using the Bikram Sambat calendar.',
                'features': 'Features:',
                'feature-offline': 'Fully offline functionality',
                'feature-bs': 'Bikram Sambat date support',
                'feature-status': 'Color-coded payment status',
                'feature-autofill': 'Auto-fill previous month data',
                'feature-export': 'Export/Import capabilities',
                'feature-mobile': 'Mobile-friendly design',
                
                // Modals
                'edit-entry': 'Edit Entry',
                'confirm-delete': 'Confirm Delete',
                'delete-warning': 'Are you sure you want to delete this entry? This action cannot be undone.',
                'import-title': 'Import Data',
                'import-desc': 'Select a JSON file to import your rental data:',
                'save-changes': 'Save Changes',
                'cancel': 'Cancel',
                'import': 'Import',
                
                // Messages
                'entry-saved': 'Entry saved successfully!',
                'entry-updated': 'Entry updated successfully!',
                'all-paid': 'All bills marked as paid!',
                'rate-updated': 'Electricity rate updated successfully!',
                'data-exported': 'Data exported successfully!',
                'data-imported': 'Data imported successfully!',
                'all-cleared': 'All data cleared',
                'invalid-rate': 'Please enter a valid rate',
                'select-file': 'Please select a file to import',
                'invalid-file': 'Invalid file format',
                'error-reading': 'Error reading file',
                
                // Bikram Sambat Months
                'month-baishakh': 'Baishakh',
                'month-jestha': 'Jestha',
                'month-ashadh': 'Ashadh',
                'month-shrawan': 'Shrawan',
                'month-bhadra': 'Bhadra',
                'month-ashwin': 'Ashwin',
                'month-kartik': 'Kartik',
                'month-mangsir': 'Mangsir',
                'month-poush': 'Poush',
                'month-magh': 'Magh',
                'month-falgun': 'Falgun',
                'month-chaitra': 'Chaitra',
                
                // Days
                'monday': 'Monday',
                'tuesday': 'Tuesday',
                'wednesday': 'Wednesday',
                'thursday': 'Thursday',
                'friday': 'Friday',
                'saturday': 'Saturday',
                'sunday': 'Sunday'
            },
            
            ne: {
                // App Title
                'app-title': 'भाडा व्यवस्थापन',
                
                // Navigation
                'nav-dashboard': 'ड्यासबोर्ड',
                'nav-add-entry': 'नयाँ प्रविष्टि',
                'nav-history': 'इतिहास',
                'nav-tenants': 'भाडामा बस्नेहरू',
                'nav-settings': 'सेटिङ्हरू',
                
                // Dashboard
                'dashboard-title': 'ड्यासबोर्ड',
                'dashboard-subtitle': 'सबै भाडामा बस्नेहरूको यस महिनाको विवरण',
                'total-amount': 'कुल रकम',
                'paid-amount': 'भुक्तानी',
                'unpaid-amount': 'बाँकी',
                'current-bills': 'यस महिनाका बिलहरू',
                'quick-actions': 'द्रुत कार्यहरू',
                'add-bills': 'यस महिनाका बिलहरू थप्नुहोस्',
                'mark-all-paid': 'सबै भुक्तानी भएको चिन्ह लगाउनुहोस्',
                'export-data': 'डेटा निर्यात गर्नुहोस्',
                'no-bills': 'यस महिनाको लागि कुनै बिल रेकर्ड गरिएको छैन',
                'tenants-paid': 'सबै बिल भुक्तानी गरेका भाडामा बस्नेहरू',
                'tenants-unpaid': 'बाँकी बिल भएका भाडामा बस्नेहरू',
                'no-tenants-paid': 'यस महिना कुनै पनि भाडामा बस्नेले पूर्ण भुक्तानी गरेको छैन',
                'no-tenants-unpaid': 'सबै भाडामा बस्नेहरूले आफ्ना बिलहरू भुक्तानी गरेका छन्',
                
                // Tenants
                'tenants-title': 'भाडामा बस्ने व्यवस्थापन',
                'tenants-subtitle': 'आफ्ना भाडामा बस्नेहरूको व्यवस्थापन गर्नुहोस्',
                'add-tenant': 'नयाँ भाडामा बस्ने थप्नुहोस्',
                'tenant-name': 'भाडामा बस्नेको नाम',
                'tenant-email': 'इमेल (वैकल्पिक)',
                'tenant-phone': 'फोन (वैकल्पिक)',
                'tenant-room': 'कोठा/युनिट नम्बर',
                'tenant-deposit': 'धरौटी रकम (रु.)',
                'tenant-rent': 'मासिक भाडा (रु.)',
                'tenant-move-in': 'भित्रिएको मिति',
                'tenant-status': 'स्थिति',
                'status-active': 'सक्रिय',
                'status-inactive': 'निष्क्रिय',
                'save-tenant': 'भाडामा बस्ने सेभ गर्नुहोस्',
                'edit-tenant': 'भाडामा बस्ने सम्पादन गर्नुहोस्',
                'delete-tenant': 'भाडामा बस्ने मेटाउनुहोस्',
                'tenant-details': 'भाडामा बस्नेको विवरण',
                'no-tenants': 'अझै कुनै भाडामा बस्ने थपिएको छैन',
                'add-first-tenant': 'पहिलो भाडामा बस्ने थप्नुहोस्',
                
                // Add Entry
                'add-entry-title': 'नयाँ प्रविष्टि थप्नुहोस्',
                'add-entry-subtitle': 'भाडा, वाइफाइ, र बिजुलीको बिल रेकर्ड गर्नुहोस्',
                'select-tenant': 'भाडामा बस्ने छान्नुहोस्',
                'choose-tenant': 'भाडामा बस्ने छान्नुहोस्...',
                'date-selection': 'मिति छनोट',
                'bs-year': 'विक्रम संवत् वर्ष',
                'month': 'महिना',
                'bill-details': 'बिलका विवरणहरू',
                'rent-amount': 'भाडाको रकम (रु.)',
                'wifi-bill': 'वाइफाइ बिल (रु.)',
                'electricity-units': 'बिजुलीको एकाइ',
                'electricity-total': 'कुल: रु.',
                'payment-status': 'भुक्तानी स्थिति',
                'rent-paid': 'भाडा भुक्तानी',
                'wifi-paid': 'वाइफाइ भुक्तानी',
                'electricity-paid': 'बिजुली भुक्तानी',
                'notes': 'टिप्पणीहरू (वैकल्पिक)',
                'notes-placeholder': 'कुनै अतिरिक्त टिप्पणी थप्नुहोस्...',
                'auto-fill': 'अघिल्लो महिना स्वतः भर्नुहोस्',
                'save-entry': 'प्रविष्टि सेभ गर्नुहोस्',
                
                // History
                'history-title': 'भुक्तानी इतिहास',
                'history-subtitle': 'आफ्ना सबै रेकर्डहरू हेर्नुहोस् र व्यवस्थापन गर्नुहोस्',
                'search-placeholder': 'महिना, वर्ष, वा टिप्पणीहरूद्वारा खोज्नुहोस्...',
                'filter-all': 'सबै',
                'filter-paid': 'भुक्तानी',
                'filter-unpaid': 'बाँकी',
                'filter-tenant': 'भाडामा बस्ने द्वारा',
                'all-tenants': 'सबै भाडामा बस्नेहरू',
                'no-history': 'कुनै भुक्तानी इतिहास उपलब्ध छैन',
                'add-first-entry': 'पहिलो प्रविष्टि थप्नुहोस्',
                'paid-status': 'भुक्तानी',
                'unpaid-status': 'बाँकी',
                'edit': 'सम्पादन',
                'delete': 'मेटाउनुहोस्',
                
                // Settings
                'settings-title': 'सेटिङ्हरू',
                'settings-subtitle': 'आफ्ना एप प्राथमिकताहरू व्यवस्थापन गर्नुहोस्',
                'electricity-rate': 'बिजुलीको दर',
                'rate-per-unit': 'प्रति एकाइ दर (रु.)',
                'current-rate': 'हालको दर: रु.',
                'update-rate': 'दर अपडेट गर्नुहोस्',
                'data-management': 'डेटा व्यवस्थापन',
                'export-all-data': 'सबै डेटा निर्यात गर्नुहोस्',
                'import-data': 'डेटा आयात गर्नुहोस्',
                'clear-all-data': 'सबै डेटा सफा गर्नुहोस्',
                'reminders': 'सम्झनाहरू',
                'monthly-reminder': 'मासिक बिल सम्झना',
                'reminder-desc': 'प्रत्येक महिनाको सुरुमा सूचना पाउनुहोस्',
                'about': 'बारेमा',
                'version': 'संस्करण १.०.०',
                'app-description': 'विक्रम संवत् पात्रो प्रयोग गरेर आफ्नो मासिक भाडा, वाइफाइ र बिजुलीको बिल ट्र्याक गर्नको लागि एक सरल, अफलाइन एप।',
                'features': 'सुविधाहरू:',
                'feature-offline': 'पूर्ण अफलाइन कार्यक्षमता',
                'feature-bs': 'विक्रम संवत् मिति समर्थन',
                'feature-status': 'रङ-कोडेड भुक्तानी स्थिति',
                'feature-autofill': 'अघिल्लो महिना डेटा स्वतः भर्ने',
                'feature-export': 'निर्यात/आयात क्षमताहरू',
                'feature-mobile': 'मोबाइल-मैत्री डिजाइन',
                
                // Modals
                'edit-entry': 'प्रविष्टि सम्पादन गर्नुहोस्',
                'confirm-delete': 'मेटाउने पुष्टि गर्नुहोस्',
                'delete-warning': 'के तपाईं यो प्रविष्टि मेटाउन चाहनुहुन्छ? यो कार्य पूर्ववत गर्न सकिँदैन।',
                'import-title': 'डेटा आयात गर्नुहोस्',
                'import-desc': 'आफ्नो भाडा डेटा आयात गर्न JSON फाइल छान्नुहोस्:',
                'save-changes': 'परिवर्तनहरू सेभ गर्नुहोस्',
                'cancel': 'रद्द गर्नुहोस्',
                'import': 'आयात गर्नुहोस्',
                
                // Messages
                'entry-saved': 'प्रविष्टि सफलतापूर्वक सेभ भयो!',
                'entry-updated': 'प्रविष्टि सफलतापूर्वक अपडेट भयो!',
                'all-paid': 'सबै बिलहरू भुक्तानी भएको चिन्ह लगाइयो!',
                'rate-updated': 'बिजुलीको दर सफलतापूर्वक अपडेट भयो!',
                'data-exported': 'डेटा सफलतापूर्वक निर्यात भयो!',
                'data-imported': 'डेटा सफलतापूर्वक आयात भयो!',
                'all-cleared': 'सबै डेटा सफा गरियो',
                'invalid-rate': 'कृपया वैध दर प्रविष्ट गर्नुहोस्',
                'select-file': 'कृपया आयात गर्नको लागि फाइल छान्नुहोस्',
                'invalid-file': 'अवैध फाइल ढाँचा',
                'error-reading': 'फाइल पढ्दा त्रुटि',
                
                // Bikram Sambat Months
                'month-baishakh': 'बैशाख',
                'month-jestha': 'जेठ',
                'month-ashadh': 'आषाढ',
                'month-shrawan': 'श्रावण',
                'month-bhadra': 'भाद्र',
                'month-ashwin': 'आश्विन',
                'month-kartik': 'कार्तिक',
                'month-mangsir': 'मंसिर',
                'month-poush': 'पौष',
                'month-magh': 'माघ',
                'month-falgun': 'फाल्गुन',
                'month-chaitra': 'चैत्र',
                
                // Days
                'monday': 'सोमबार',
                'tuesday': 'मंगलबार',
                'wednesday': 'बुधबार',
                'thursday': 'बिहिबार',
                'friday': 'शुक्रबार',
                'saturday': 'शनिबार',
                'sunday': 'आइतबार'
            },
            
            mai: {
                // App Title
                'app-title': 'भाडा प्रबंधन',
                
                // Navigation
                'nav-dashboard': 'डैशबोर्ड',
                'nav-add-entry': 'नव प्रविष्टि',
                'nav-history': 'इतिहास',
                'nav-tenants': 'सेटिंग सभ',
                
                // Dashboard
                'dashboard-title': 'डैशबोर्ड',
                'dashboard-subtitle': 'ई मासक विवरण',
                'total-amount': 'कुल राशि',
                'paid-amount': 'भुगतान',
                'unpaid-amount': 'बाकी',
                'current-bills': 'ई मासक बिल सभ',
                'quick-actions': 'तुरंत कार्य सभ',
                'add-bills': 'ई मासक बिल सभ जोड़ू',
                'mark-all-paid': 'सब भुगतान भेल चिन्ह लगाऊ',
                'export-data': 'डेटा निर्यात करू',
                'no-bills': 'ई मासक लेल कोनो बिल रिकॉर्ड नहि अछि',
                'tenants-paid': 'सब बिल भुगतान कएल भाडा पर',
                'tenants-unpaid': 'बाकी बिल वाला भाडा पर',
                'no-tenants-paid': 'ई महिना कोनो भाडा पर पूर्ण भुगतान कएल नहि अछि',
                'no-tenants-unpaid': 'सभ भाडा पर अपन बिल भुगतान कए चुकल अछि',
                
                // Tenants
                'tenants-title': 'भाडा प्रबंधन',
                'tenants-subtitle': 'अपन भाडा पर',
                'add-tenant': 'नव भाडा जोड़ू',
                'tenant-name': 'भाडा के नाम',
                'tenant-email': 'ईमेल (वैकल्पिक)',
                'tenant-phone': 'फोन (वैकल्पिक)',
                'tenant-room': 'कमरा/यूनिट नंबर',
                'tenant-deposit': 'सुरक्षा जमा (रु.)',
                'tenant-rent': 'मासिक भाडा (रु.)',
                'tenant-move-in': 'आवास मिति',
                'tenant-status': 'स्थिति',
                'status-active': 'सक्रिय',
                'status-inactive': 'निष्क्रिय',
                'save-tenant': 'भाडा के सुरक्षित करू',
                'edit-tenant': 'भाडा के संपादित करू',
                'delete-tenant': 'भाडा के हटाऊ',
                'tenant-details': 'भाडा के विवरण',
                'no-tenants': 'अखन धरि कोनो भाडा नहि जोड़ल गेल अछि',
                'add-first-tenant': 'पहिल भाडा जोड़ू',
                
                // Add Entry
                'add-entry-title': 'नव प्रविष्टि जोड़ू',
                'add-entry-subtitle': 'भाडा, वाईफाई आ बिजली क बिल रिकॉर्ड करू',
                'select-tenant': 'भाडा चुनू',
                'choose-tenant': 'एकटा भाडा चुनू...',
                'date-selection': 'तारीख चुनाव',
                'bs-year': 'विक्रम संवत वर्ष',
                'month': 'मास',
                'bill-details': 'बिलक विवरण सभ',
                'rent-amount': 'भाडाक राशि (रु.)',
                'wifi-bill': 'वाईफाई बिल (रु.)',
                'electricity-units': 'बिजलीक इकाई',
                'electricity-total': 'कुल: रु.',
                'payment-status': 'भुगतान स्थिति',
                'rent-paid': 'भाडा भुगतान',
                'wifi-paid': 'वाईफाई भुगतान',
                'electricity-paid': 'बिजली भुगतान',
                'notes': 'टिप्पणी सभ (वैकल्पिक)',
                'notes-placeholder': 'कोनो अतिरिक्त टिप्पणी जोड़ू...',
                'auto-fill': 'पहिले मास स्वतः भरू',
                'save-entry': 'प्रविष्टि सेव करू',
                
                // History
                'history-title': 'भुगतान इतिहास',
                'history-subtitle': 'अपन सब रिकॉर्ड देखू आ प्रबंधन करू',
                'search-placeholder': 'मास, वर्ष अथवा टिप्पणी स खोजू...',
                'filter-all': 'सब',
                'filter-paid': 'भुगतान',
                'filter-unpaid': 'बाकी',
                'filter-tenant': 'भाडा द्वारा',
                'all-tenants': 'सभ भाडा पर',
                'no-history': 'कोनो भुगतान इतिहास उपलब्ध नहि अछि',
                'add-first-entry': 'पहिल प्रविष्टि जोड़ू',
                'paid-status': 'भुगतान',
                'unpaid-status': 'बाकी',
                'edit': 'संपादन',
                'delete': 'मिटाऊ',
                
                // Settings
                'settings-title': 'सेटिंग सभ',
                'settings-subtitle': 'अपन एप प्राथमिकता सभ प्रबंधन करू',
                'electricity-rate': 'बिजुलीक दर',
                'rate-per-unit': 'प्रति इकाई दर (रु.)',
                'current-rate': 'वर्तमान दर: रु.',
                'update-rate': 'दर अपडेट करू',
                'data-management': 'डेटा प्रबंधन',
                'export-all-data': 'सब डेटा निर्यात करू',
                'import-data': 'डेटा आयात करू',
                'clear-all-data': 'सब डेटा साफ करू',
                'reminders': 'स्मरण सभ',
                'monthly-reminder': 'मासिक बिल स्मरण',
                'reminder-desc': 'हर मासक शुरुआत मे सूचना पाऊ',
                'about': 'विषय मे',
                'version': 'संस्करण १.०.०',
                'app-description': 'विक्रम संवत पंचांग प्रयोग क क अपन मासिक भाडा, वाईफाई आ बिजलीक बिल ट्रैक करब लेल एकटा सरल, ऑफलाइन एप।',
                'features': 'सुविधा सभ:',
                'feature-offline': 'पूर्ण अफलाइन कार्यक्षमता',
                'feature-bs': 'विक्रम संवत तारीख समर्थन',
                'feature-status': 'रंग-कोडेड भुगतान स्थिति',
                'feature-autofill': 'पहिले मास डेटा स्वतः भरब',
                'feature-export': 'निर्यात/आयात क्षमता सभ',
                'feature-mobile': 'मोबाइल-मित्र डिजाइन',
                
                // Modals
                'edit-entry': 'प्रविष्टि संपादन करू',
                'confirm-delete': 'मिटाओल पुष्टि करू',
                'delete-warning': 'की अहाँ ई प्रविष्टि मिटाब चाहैत छी? ई कार्य पूर्ववत नहि क सकैत अछि।',
                'import-title': 'डेटा आयात करू',
                'import-desc': 'अपन भाडा डेटा आयात करब लेल JSON फाइल चुनू:',
                'save-changes': 'परिवर्तन सभ सेव करू',
                'cancel': 'रद्द करू',
                'import': 'आयात करू',
                
                // Messages
                'entry-saved': 'प्रविष्टि सफलतापूर्वक सेव भेल!',
                'entry-updated': 'प्रविष्टि सफलतापूर्वक अपडेट भेल!',
                'all-paid': 'सब बिल भुगतान भेल चिन्ह लगाओल गेल!',
                'rate-updated': 'बिजुलीक दर सफलतापूर्वक अपडेट भेल!',
                'data-exported': 'डेटा सफलतापूर्वक निर्यात भेल!',
                'data-imported': 'डेटा सफलतापूर्वक आयात भेल!',
                'all-cleared': 'सब डेटा साफ कएल गेल',
                'invalid-rate': 'कृपया वैध दर प्रविष्ट करू',
                'select-file': 'कृपया आयात करब लेल फाइल चुनू',
                'invalid-file': 'अवैध फाइल प्रारूप',
                'error-reading': 'फाइल पढ़ब मे त्रुटि',
                
                // Bikram Sambat Months
                'month-baishakh': 'बैशाख',
                'month-jestha': 'जेठ',
                'month-ashadh': 'आषाढ़',
                'month-shrawan': 'श्रावण',
                'month-bhadra': 'भाद्र',
                'month-ashwin': 'आश्विन',
                'month-kartik': 'कार्तिक',
                'month-mangsir': 'मंसिर',
                'month-poush': 'पौष',
                'month-magh': 'माघ',
                'month-falgun': 'फाल्गुन',
                'month-chaitra': 'चैत्र',
                
                // Days
                'monday': 'सोमवार',
                'tuesday': 'मंगलवार',
                'wednesday': 'बुधवार',
                'thursday': 'बिहिवार',
                'friday': 'शुक्रवार',
                'saturday': 'शनिवार',
                'sunday': 'रविवार'
            }
        };
    }

    // Tenant Management
    loadTenants() {
        const saved = localStorage.getItem('tenantData');
        return saved ? JSON.parse(saved) : [];
    }

    saveTenants() {
        localStorage.setItem('tenantData', JSON.stringify(this.tenants));
    }

    addTenant(tenantData) {
        const tenant = {
            id: Date.now(),
            name: tenantData.name,
            email: tenantData.email || '',
            phone: tenantData.phone || '',
            room: tenantData.room,
            deposit: parseFloat(tenantData.deposit) || 0,
            monthlyRent: parseFloat(tenantData.monthlyRent) || 0,
            moveInDate: tenantData.moveInDate,
            status: tenantData.status || 'active',
            dateCreated: new Date().toISOString(),
            dateModified: new Date().toISOString()
        };
        
        this.tenants.push(tenant);
        this.saveTenants();
        return tenant;
    }

    updateTenant(id, tenantData) {
        const index = this.tenants.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tenants[index] = {
                ...this.tenants[index],
                ...tenantData,
                dateModified: new Date().toISOString()
            };
            this.saveTenants();
            return this.tenants[index];
        }
        return null;
    }

    deleteTenant(id) {
        const index = this.tenants.findIndex(t => t.id === id);
        if (index !== -1) {
            // Check if tenant has any billing history
            const hasHistory = this.data.some(entry => entry.tenantId === id);
            if (hasHistory) {
                return confirm('This tenant has billing history. Are you sure you want to delete? This will also delete all related billing records.');
            }
            
            this.tenants.splice(index, 1);
            // Remove all billing records for this tenant
            this.data = this.data.filter(entry => entry.tenantId !== id);
            this.saveTenants();
            this.saveData();
            return true;
        }
        return false;
    }

    getTenant(id) {
        return this.tenants.find(t => t.id === id);
    }

    getActiveTenants() {
        return this.tenants.filter(t => t.status === 'active');
    }

    // Enhanced data management to include tenant info
    loadData() {
        const saved = localStorage.getItem('rentalData');
        return saved ? JSON.parse(saved) : [];
    }

    saveData() {
        localStorage.setItem('rentalData', JSON.stringify(this.data));
    }

    // Electricity rate management
    getElectricityRate() {
        const saved = localStorage.getItem('electricityRate');
        return saved ? parseFloat(saved) : 12;
    }

    saveElectricityRate() {
        localStorage.setItem('electricityRate', this.electricityRate.toString());
    }

    updateElectricityRate() {
        const newRate = parseFloat(document.getElementById('electricity-rate').value);
        if (newRate && newRate > 0) {
            this.electricityRate = newRate;
            this.saveElectricityRate();
            this.updateElectricityCalculation();
            this.showToast(`Electricity rate updated to Rs. ${newRate}/unit`, 'success');
            
            // Update the label in the form
            const electricityLabel = document.querySelector('label[for="electricity"]');
            if (electricityLabel) {
                electricityLabel.innerHTML = `
                    <i class="fas fa-bolt"></i>
                    Electricity Units (@ Rs. ${newRate}/unit)
                `;
            }
        } else {
            this.showToast('Please enter a valid rate', 'error');
        }
    }

    // Setup electricity calculation
    setupElectricityCalculation() {
        const electricityInput = document.getElementById('electricity');
        if (electricityInput) {
            electricityInput.addEventListener('input', () => {
                this.updateElectricityCalculation();
            });
            
            // Set initial calculation
            this.updateElectricityCalculation();
        }

        // Set the rate in settings
        const rateInput = document.getElementById('electricity-rate');
        if (rateInput) {
            rateInput.value = this.electricityRate;
        }

        // Update the label to show current rate
        const electricityLabel = document.querySelector('label[for="electricity"]');
        if (electricityLabel) {
            electricityLabel.innerHTML = `
                <i class="fas fa-bolt"></i>
                Electricity Units (@ Rs. ${this.electricityRate}/unit)
            `;
        }
    }

    updateElectricityCalculation() {
        const electricityInput = document.getElementById('electricity');
        const totalSpan = document.getElementById('electricity-total');
        
        if (electricityInput && totalSpan) {
            const units = parseFloat(electricityInput.value) || 0;
            const total = units * this.electricityRate;
            totalSpan.textContent = this.formatCurrency(total);
        }
    }

    // Calculate electricity cost from units
    calculateElectricityCost(units) {
        return units * this.electricityRate;
    }

    // Settings management
    loadSettings() {
        const settings = localStorage.getItem('rentalSettings');
        if (settings) {
            const parsed = JSON.parse(settings);
            const monthlyReminderCheck = document.getElementById('monthly-reminder');
            if (monthlyReminderCheck) {
                monthlyReminderCheck.checked = parsed.monthlyReminder || false;
            }
        }
    }

    saveSettings() {
        const monthlyReminderCheck = document.getElementById('monthly-reminder');
        if (monthlyReminderCheck) {
            const settings = {
                monthlyReminder: monthlyReminderCheck.checked
            };
            localStorage.setItem('rentalSettings', JSON.stringify(settings));
        }
    }

    // Bikram Sambat date utilities
    async getCurrentBikramSambatDate() {
        try {
            // Fetch data from BloggerNepal API
            const dateResponse = await fetch("https://calendar.bloggernepal.com/api/today");
            const dateData = await dateResponse.json();
            
            console.log('BloggerNepal API Response:', dateData); // Debug log
            console.log('Available fields:', Object.keys(dateData)); // Show all available fields
            
            if (dateData) {
                // Try multiple field name variations
                const year = dateData.bs_year || dateData.year || dateData.nepali_year || dateData.bikram_sambat_year || 2082;
                const month = dateData.bs_month || dateData.month || dateData.nepali_month || dateData.bikram_sambat_month || 4;
                const day = dateData.bs_date || dateData.date || dateData.day || dateData.nepali_date || dateData.bikram_sambat_date || 19;
                
                // Try English day names first, then Nepali
                let weekdayStrEn = dateData.weekday_en || dateData.day_name || dateData.weekday || dateData.day_name_english;
                let weekdayStrNp = dateData.weekday_np || dateData.day_name_np || dateData.nepali_day_name || dateData.day_name_nepali;
                
                // Try English month names first, then Nepali
                let monthStrEn = dateData.month_name || dateData.bs_month_name || dateData.month_name_english || dateData.nepali_month_name_english;
                let monthStrNp = dateData.month_name_np || dateData.bs_month_name_np || dateData.nepali_month_name || dateData.month_name_nepali;
                
                // If English names are not available, use Nepali names or fallbacks
                if (!weekdayStrEn || weekdayStrEn === 'undefined') {
                    if (weekdayStrNp && weekdayStrNp !== 'undefined') {
                        // Convert Nepali day names to English
                        const nepaliToEnglishDays = {
                            'आइतबार': 'Sunday',
                            'सोमबार': 'Monday', 
                            'मंगलबार': 'Tuesday',
                            'बुधबार': 'Wednesday',
                            'बिहिबार': 'Thursday',
                            'शुक्रबार': 'Friday',
                            'शनिबार': 'Saturday'
                        };
                        weekdayStrEn = nepaliToEnglishDays[weekdayStrNp] || 'Monday';
                    } else {
                        weekdayStrEn = 'Monday';
                    }
                }
                
                if (!monthStrEn || monthStrEn === 'undefined') {
                    if (monthStrNp && monthStrNp !== 'undefined') {
                        // Convert Nepali month names to English
                        const nepaliToEnglishMonths = {
                            'बैशाख': 'Baishakh',
                            'जेठ': 'Jestha',
                            'आषाढ': 'Ashadh',
                            'श्रावण': 'Shrawan',
                            'भाद्र': 'Bhadra',
                            'आश्विन': 'Ashwin',
                            'कार्तिक': 'Kartik',
                            'मंसिर': 'Mangsir',
                            'पौष': 'Poush',
                            'माघ': 'Magh',
                            'फाल्गुन': 'Falgun',
                            'चैत्र': 'Chaitra'
                        };
                        monthStrEn = nepaliToEnglishMonths[monthStrNp] || this.getBikramSambatMonthName(month);
                    } else {
                        monthStrEn = this.getBikramSambatMonthName(month);
                    }
                }
                
                return {
                    year: year,
                    month: month,
                    day: day,
                    weekday: dateData.weekday || dateData.day_of_week || 1,
                    weekdayStrEn: weekdayStrEn,
                    weekdayStrNp: weekdayStrNp || 'सोमबार',
                    bsMonthStrEn: monthStrEn,
                    bsMonthStrNp: monthStrNp || 'श्रावण',
                    isHoliday: dateData.is_holiday || dateData.holiday || false,
                    events: dateData.events || []
                };
            }
            
            throw new Error('Invalid API response');
            
        } catch (error) {
            console.warn('BloggerNepal API failed, using manual override:', error);
            // Manual override to show correct date as per your requirement
            return {
                year: 2082,
                month: 4, // Shrawan
                day: 19,
                weekday: 1, // Monday
                weekdayStrEn: 'Monday',
                weekdayStrNp: 'सोमबार',
                bsMonthStrEn: 'Shrawan',
                bsMonthStrNp: 'श्रावण',
                isHoliday: false,
                events: []
            };
        }
    }

    async showCurrentBikramSambatDate() {
        const bsDate = await this.getCurrentBikramSambatDate();
        const monthElement = document.getElementById('current-month-bs');
        const dateElement = document.getElementById('current-date-bs');
        
        if (monthElement) {
            monthElement.textContent = `${bsDate.bsMonthStrEn} ${bsDate.year}`;
        }
        
        if (dateElement) {
            dateElement.textContent = `${bsDate.weekdayStrEn}, ${bsDate.day}`;
            
            // Add holiday indicator if it's a holiday
            if (bsDate.isHoliday) {
                dateElement.innerHTML += ' <span class="holiday-indicator">🎉</span>';
            }
        }
        
        // Store current date for other functions
        this.currentBsDate = bsDate;
    }

    async populateDateSelectors() {
        const yearSelect = document.getElementById('bs-year');
        const monthSelect = document.getElementById('bs-month');
        
        if (!yearSelect || !monthSelect) return;

        // Get current BS date from API
        const currentBsDate = await this.getCurrentBikramSambatDate();
        const currentYear = currentBsDate.year;
        
        yearSelect.innerHTML = '';
        for (let year = currentYear - 5; year <= currentYear + 5; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            if (year === currentYear) option.selected = true;
            yearSelect.appendChild(option);
        }

        // Populate months
        const months = [
            'Baishakh', 'Jestha', 'Ashadh', 'Shrawan',
            'Bhadra', 'Ashwin', 'Kartik', 'Mangsir',
            'Poush', 'Magh', 'Falgun', 'Chaitra'
        ];

        monthSelect.innerHTML = '';
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index + 1;
            option.textContent = month;
            if (index + 1 === currentBsDate.month) option.selected = true;
            monthSelect.appendChild(option);
        });
    }

    // PWA Setup
    setupPWA() {
        // Listen for the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallBanner();
        });

        // Install button click
        const installBtn = document.getElementById('install-btn');
        if (installBtn) {
            installBtn.addEventListener('click', () => {
                this.installPWA();
            });
        }

        // Dismiss install banner
        const dismissBtn = document.getElementById('dismiss-install');
        if (dismissBtn) {
            dismissBtn.addEventListener('click', () => {
                this.hideInstallBanner();
            });
        }

        // Check if already installed
        window.addEventListener('appinstalled', () => {
            this.hideInstallBanner();
            this.showToast('App installed successfully!', 'success');
        });
    }

    showInstallBanner() {
        const banner = document.getElementById('install-banner');
        if (banner) {
            banner.style.display = 'block';
            // Adjust main content padding
            document.querySelector('.main-content').style.paddingTop = '1rem';
        }
    }

    hideInstallBanner() {
        const banner = document.getElementById('install-banner');
        if (banner) {
            banner.style.display = 'none';
            document.querySelector('.main-content').style.paddingTop = '0';
        }
    }

    async installPWA() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                this.showToast('Installing app...', 'info');
            }
            
            this.deferredPrompt = null;
            this.hideInstallBanner();
        }
    }

    // Settings
    setupSettings() {
        const monthlyReminderCheck = document.getElementById('monthly-reminder');
        if (monthlyReminderCheck) {
            monthlyReminderCheck.addEventListener('change', () => {
                this.saveSettings();
                if (monthlyReminderCheck.checked) {
                    this.setupMonthlyReminder();
                    this.showToast('Monthly reminders enabled!', 'success');
                } else {
                    this.showToast('Monthly reminders disabled', 'info');
                }
            });
        }
    }

    setupMonthlyReminder() {
        // Request notification permission if not already granted
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.showToast('Notification permission granted', 'success');
                }
            });
        }
    }

    // Import/Export functionality
    setupImportExport() {
        // Import modal setup
        const importModal = document.getElementById('import-modal');
        const confirmImport = document.getElementById('confirm-import');
        const cancelImport = document.getElementById('cancel-import');
        const importFile = document.getElementById('import-file');

        if (confirmImport) {
            confirmImport.addEventListener('click', () => {
                this.handleImport();
            });
        }

        if (cancelImport) {
            cancelImport.addEventListener('click', () => {
                this.hideModal('import-modal');
            });
        }
    }

    exportData() {
        const dataToExport = {
            version: '1.0.0',
            exportDate: new Date().toISOString(),
            data: this.data,
            settings: JSON.parse(localStorage.getItem('rentalSettings') || '{}')
        };

        const jsonString = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `rental-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Data exported successfully!', 'success');
    }

    importData() {
        this.showModal('import-modal');
    }

    handleImport() {
        const fileInput = document.getElementById('import-file');
        const file = fileInput.files[0];
        
        if (!file) {
            this.showToast('Please select a file to import', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                
                if (importedData.data && Array.isArray(importedData.data)) {
                    // Confirm before importing
                    if (confirm('This will replace all existing data. Are you sure?')) {
                        this.data = importedData.data;
                        this.saveData();
                        
                        // Import settings if available
                        if (importedData.settings) {
                            localStorage.setItem('rentalSettings', JSON.stringify(importedData.settings));
                            this.loadSettings();
                        }
                        
                        this.updateDashboard();
                        this.renderHistory();
                        this.hideModal('import-modal');
                        this.showToast('Data imported successfully!', 'success');
                    }
                } else {
                    this.showToast('Invalid file format', 'error');
                }
            } catch (error) {
                this.showToast('Error reading file', 'error');
            }
        };
        
        reader.readAsText(file);
    }

    clearAllData() {
        if (confirm('Are you sure you want to delete ALL data? This cannot be undone!')) {
            if (confirm('This is your final warning. All rental data will be permanently deleted!')) {
                localStorage.removeItem('rentalData');
                localStorage.removeItem('rentalSettings');
                this.data = [];
                this.updateDashboard();
                this.renderHistory();
                this.loadSettings();
                this.showToast('All data cleared', 'info');
            }
        }
    }

    // Quick Actions
    markAllPaid() {
        const currentBsDate = this.getCurrentBikramSambatDate();
        const currentEntry = this.data.find(entry => 
            entry.year === currentBsDate.year && entry.month === currentBsDate.month
        );

        if (!currentEntry) {
            this.showToast('No bills found for current month', 'error');
            return;
        }

        currentEntry.rentPaid = true;
        currentEntry.wifiPaid = true;
        currentEntry.electricityPaid = true;
        currentEntry.dateModified = new Date().toISOString();

        this.saveData();
        this.updateDashboard();
        this.renderHistory();
        this.showToast('All bills marked as paid!', 'success');
    }

    // Navigation
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetPage = btn.getAttribute('data-page');
                this.showPage(targetPage);
                
                // Update active state
                navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    showPage(pageId) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));
        
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // Update data when switching to dashboard or history
            if (pageId === 'dashboard') {
                this.updateDashboard();
            } else if (pageId === 'history') {
                this.renderHistory();
            }
        }
    }

    // Forms
    setupForms() {
        const entryForm = document.getElementById('entry-form');
        const autoFillBtn = document.getElementById('auto-fill-btn');

        if (entryForm) {
            entryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleEntrySubmit();
            });
        }

        if (autoFillBtn) {
            autoFillBtn.addEventListener('click', () => {
                this.autoFillPreviousMonth();
            });
        }
    }

    handleEntrySubmit() {
        const year = parseInt(document.getElementById('bs-year').value);
        const month = parseInt(document.getElementById('bs-month').value);
        const rent = parseFloat(document.getElementById('rent').value);
        const wifi = parseFloat(document.getElementById('wifi').value);
        const electricityUnits = parseFloat(document.getElementById('electricity').value);
        const electricity = this.calculateElectricityCost(electricityUnits);
        const rentPaid = document.getElementById('rent-paid').checked;
        const wifiPaid = document.getElementById('wifi-paid').checked;
        const electricityPaid = document.getElementById('electricity-paid').checked;
        const notes = document.getElementById('notes').value.trim();
        const tenantId = parseInt(document.getElementById('select-tenant').value);

        // Check if entry already exists for this month/year
        const existingIndex = this.data.findIndex(entry => 
            entry.year === year && entry.month === month && entry.tenantId === tenantId
        );

        const entry = {
            id: existingIndex >= 0 ? this.data[existingIndex].id : Date.now(),
            year,
            month,
            rent,
            wifi,
            electricity,
            electricityUnits,
            electricityRate: this.electricityRate,
            rentPaid,
            wifiPaid,
            electricityPaid,
            notes,
            tenantId,
            dateCreated: existingIndex >= 0 ? this.data[existingIndex].dateCreated : new Date().toISOString(),
            dateModified: new Date().toISOString()
        };

        if (existingIndex >= 0) {
            this.data[existingIndex] = entry;
            this.showToast('Entry updated successfully!', 'success');
        } else {
            this.data.push(entry);
            this.showToast('Entry added successfully!', 'success');
        }

        this.saveData();
        this.resetForm();
        this.updateDashboard();
        this.renderHistory();
    }

    resetForm() {
        const form = document.getElementById('entry-form');
        if (form) {
            form.reset();
            this.updateElectricityCalculation();
        }
    }

    // Dashboard
    updateDashboard() {
        if (!this.currentBsDate) {
            this.getCurrentBikramSambatDate().then(bsDate => {
                this.currentBsDate = bsDate;
                this.updateDashboardWithCurrentDate();
            });
        } else {
            this.updateDashboardWithCurrentDate();
        }
    }

    updateDashboardWithCurrentDate() {
        const currentBsDate = this.currentBsDate;
        
        // Get all entries for current month
        const currentMonthEntries = this.data.filter(entry => 
            entry.year === currentBsDate.year && entry.month === currentBsDate.month
        );

        // Calculate totals
        let totalAmount = 0;
        let paidAmount = 0;
        let unpaidAmount = 0;

        currentMonthEntries.forEach(entry => {
            const entryTotal = entry.rent + entry.wifi + entry.electricity;
            totalAmount += entryTotal;

            let entryPaid = 0;
            if (entry.rentPaid) entryPaid += entry.rent;
            if (entry.wifiPaid) entryPaid += entry.wifi;
            if (entry.electricityPaid) entryPaid += entry.electricity;
            
            paidAmount += entryPaid;
            unpaidAmount += (entryTotal - entryPaid);
        });

        // Update summary cards
        document.getElementById('total-amount').textContent = `Rs. ${this.formatCurrency(totalAmount)}`;
        document.getElementById('paid-amount').textContent = `Rs. ${this.formatCurrency(paidAmount)}`;
        document.getElementById('unpaid-amount').textContent = `Rs. ${this.formatCurrency(unpaidAmount)}`;

        // Update separated tenant lists
        this.updateSeparatedTenantLists(currentMonthEntries);
    }

    updateSeparatedTenantLists(currentMonthEntries) {
        const container = document.getElementById('current-bills-list');
        
        if (currentMonthEntries.length === 0) {
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-info-circle"></i>
                    <p>No bills recorded for this month</p>
                    <button class="btn btn-primary" onclick="app.showPage('add-entry')">
                        <i class="fas fa-plus"></i>
                        Add Entry
                    </button>
                </div>
            `;
            return;
        }

        // Separate tenants by payment status
        const fullyPaidTenants = [];
        const unpaidTenants = [];

        currentMonthEntries.forEach(entry => {
            const tenant = this.getTenant(entry.tenantId);
            if (!tenant) return;

            const total = entry.rent + entry.wifi + entry.electricity;
            const paidCount = [entry.rentPaid, entry.wifiPaid, entry.electricityPaid].filter(Boolean).length;
            
            const tenantInfo = {
                tenant,
                entry,
                total,
                paidCount,
                fullyPaid: paidCount === 3
            };

            if (tenantInfo.fullyPaid) {
                fullyPaidTenants.push(tenantInfo);
            } else {
                unpaidTenants.push(tenantInfo);
            }
        });

        // Render separated lists
        container.innerHTML = `
            <div class="tenant-separation">
                <div class="paid-tenants-section">
                    <h4 class="section-title paid">
                        <i class="fas fa-check-circle"></i>
                        Tenants with All Bills Paid (${fullyPaidTenants.length})
                    </h4>
                    <div class="tenant-bills-list">
                        ${fullyPaidTenants.length > 0 ? 
                            fullyPaidTenants.map(info => this.createTenantBillItem(info)).join('') :
                            '<p class="no-tenants-message">No tenants have fully paid this month</p>'
                        }
                    </div>
                </div>
                
                <div class="unpaid-tenants-section">
                    <h4 class="section-title unpaid">
                        <i class="fas fa-exclamation-circle"></i>
                        Tenants with Unpaid Bills (${unpaidTenants.length})
                    </h4>
                    <div class="tenant-bills-list">
                        ${unpaidTenants.length > 0 ? 
                            unpaidTenants.map(info => this.createTenantBillItem(info)).join('') :
                            '<p class="no-tenants-message">All tenants have paid their bills</p>'
                        }
                    </div>
                </div>
            </div>
        `;
    }

    createTenantBillItem(tenantInfo) {
        const { tenant, entry, total, paidCount, fullyPaid } = tenantInfo;
        const statusClass = fullyPaid ? 'fully-paid' : 'unpaid';
        
        const bills = [
            { name: 'Rent', icon: 'fas fa-home', amount: entry.rent, paid: entry.rentPaid },
            { name: 'WiFi', icon: 'fas fa-wifi', amount: entry.wifi, paid: entry.wifiPaid },
            { name: 'Electricity', icon: 'fas fa-bolt', amount: entry.electricity, paid: entry.electricityPaid }
        ];

        return `
            <div class="tenant-bill-card ${statusClass}">
                <div class="tenant-bill-header">
                    <div class="tenant-name">
                        <i class="fas fa-user"></i>
                        <strong>${tenant.name}</strong>
                        <span class="room-number">Room ${tenant.room}</span>
                    </div>
                    <div class="payment-progress">
                        <span class="progress-text">${paidCount}/3 Paid</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(paidCount/3)*100}%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="bill-details">
                    ${bills.map(bill => `
                        <div class="bill-row">
                            <div class="bill-info">
                                <i class="${bill.icon}"></i>
                                <span>${bill.name}</span>
                            </div>
                            <div class="bill-amount">Rs. ${this.formatCurrency(bill.amount)}</div>
                            <div class="bill-status-indicator ${bill.paid ? 'paid' : 'unpaid'}">
                                <i class="fas ${bill.paid ? 'fa-check' : 'fa-times'}"></i>
                            </div>
                        </div>
                    `).join('')}
                    
                    <div class="bill-total">
                        <div class="bill-info">
                            <i class="fas fa-calculator"></i>
                            <strong>Total</strong>
                        </div>
                        <div class="bill-amount"><strong>Rs. ${this.formatCurrency(total)}</strong></div>
                        <div class="bill-status-indicator ${fullyPaid ? 'paid' : 'unpaid'}">
                            <i class="fas ${fullyPaid ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                        </div>
                    </div>
                </div>
                
                <div class="tenant-bill-actions">
                    <button class="btn btn-sm btn-secondary" onclick="app.editEntryByTenant(${entry.tenantId}, ${entry.year}, ${entry.month})">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                </div>
            </div>
        `;
    }

    editEntryByTenant(tenantId, year, month) {
        const entry = this.data.find(e => 
            e.tenantId === tenantId && e.year === year && e.month === month
        );
        if (entry) {
            this.editEntry(entry.id);
        }
    }

    // Modal management
    setupModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            const closeBtn = modal.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.hideModal(modal.id);
                });
            }

            // Close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal.id);
                }
            });
        });
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Toast notifications
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }

    // Language management
    loadLanguage() {
        return localStorage.getItem('appLanguage') || 'en';
    }

    saveLanguage() {
        localStorage.setItem('appLanguage', this.currentLanguage);
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        this.saveLanguage();
        this.updateLanguageDisplay();
        this.translatePage();
        this.updateDashboard();
        this.renderHistory();
        this.populateTenantSelector();
        this.renderTenants();
        this.showToast(this.translate('language-changed') || 'Language changed successfully!', 'success');
    }

    translate(key) {
        return this.translations[this.currentLanguage][key] || this.translations['en'][key] || key;
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translate(key);
            if (translation) {
                element.textContent = translation;
            }
        });

        // Update page titles
        this.updatePageTitles();
        
        // Update form labels and placeholders
        this.updateFormElements();
        
        // Update dropdown content
        this.updateDropdownContent();
        
        // Update month selector
        this.updateMonthSelector();
    }

    updateLanguageDisplay() {
        const currentLangElement = document.getElementById('current-language');
        const langMap = {
            'en': 'EN',
            'ne': 'नेप',
            'mai': 'मैथ'
        };
        
        if (currentLangElement) {
            currentLangElement.textContent = langMap[this.currentLanguage] || 'EN';
        }

        // Update active language option
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === this.currentLanguage) {
                option.classList.add('active');
            }
        });
    }

    updatePageTitles() {
        // Dashboard
        const dashboardTitle = document.querySelector('#dashboard .page-header h2');
        if (dashboardTitle) {
            dashboardTitle.innerHTML = `<i class="fas fa-tachometer-alt"></i> ${this.translate('dashboard-title')}`;
        }
        
        const dashboardSubtitle = document.querySelector('#dashboard .page-header .subtitle');
        if (dashboardSubtitle) {
            dashboardSubtitle.textContent = this.translate('dashboard-subtitle');
        }

        // Tenants
        const tenantsTitle = document.querySelector('#tenants .page-header h2');
        if (tenantsTitle) {
            tenantsTitle.innerHTML = `<i class="fas fa-users"></i> ${this.translate('tenants-title')}`;
        }
        
        const tenantsSubtitle = document.querySelector('#tenants .page-header .subtitle');
        if (tenantsSubtitle) {
            tenantsSubtitle.textContent = this.translate('tenants-subtitle');
        }

        // Add Entry
        const addEntryTitle = document.querySelector('#add-entry .page-header h2');
        if (addEntryTitle) {
            addEntryTitle.innerHTML = `<i class="fas fa-plus"></i> ${this.translate('add-entry-title')}`;
        }
        
        const addEntrySubtitle = document.querySelector('#add-entry .page-header .subtitle');
        if (addEntrySubtitle) {
            addEntrySubtitle.textContent = this.translate('add-entry-subtitle');
        }

        // History
        const historyTitle = document.querySelector('#history .page-header h2');
        if (historyTitle) {
            historyTitle.innerHTML = `<i class="fas fa-history"></i> ${this.translate('history-title')}`;
        }
        
        const historySubtitle = document.querySelector('#history .page-header .subtitle');
        if (historySubtitle) {
            historySubtitle.textContent = this.translate('history-subtitle');
        }

        // Settings
        const settingsTitle = document.querySelector('#settings .page-header h2');
        if (settingsTitle) {
            settingsTitle.innerHTML = `<i class="fas fa-cog"></i> ${this.translate('settings-title')}`;
        }
        
        const settingsSubtitle = document.querySelector('#settings .page-header .subtitle');
        if (settingsSubtitle) {
            settingsSubtitle.textContent = this.translate('settings-subtitle');
        }
    }

    updateFormElements() {
        // Summary cards
        const totalCard = document.querySelector('.summary-card.total .card-content h3');
        if (totalCard) totalCard.textContent = this.translate('total-amount');
        
        const paidCard = document.querySelector('.summary-card.paid .card-content h3');
        if (paidCard) paidCard.textContent = this.translate('paid-amount');
        
        const unpaidCard = document.querySelector('.summary-card.unpaid .card-content h3');
        if (unpaidCard) unpaidCard.textContent = this.translate('unpaid-amount');

        // Form labels
        const rentLabel = document.querySelector('label[for="rent"]');
        if (rentLabel) {
            rentLabel.innerHTML = `<i class="fas fa-home"></i> ${this.translate('rent-amount')}`;
        }
        
        const wifiLabel = document.querySelector('label[for="wifi"]');
        if (wifiLabel) {
            wifiLabel.innerHTML = `<i class="fas fa-wifi"></i> ${this.translate('wifi-bill')}`;
        }

        // Update electricity label with rate
        this.updateElectricityLabel();

        // Form placeholders
        const notesTextarea = document.getElementById('notes');
        if (notesTextarea) {
            notesTextarea.placeholder = this.translate('notes-placeholder');
        }

        const searchInput = document.getElementById('search-history');
        if (searchInput) {
            searchInput.placeholder = this.translate('search-placeholder');
        }

        // Buttons
        const autoFillBtn = document.getElementById('auto-fill-btn');
        if (autoFillBtn) {
            autoFillBtn.innerHTML = `<i class="fas fa-magic"></i> ${this.translate('auto-fill')}`;
        }

        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            if (filter === 'all') {
                btn.innerHTML = `<i class="fas fa-list"></i> ${this.translate('filter-all')}`;
            } else if (filter === 'paid') {
                btn.innerHTML = `<i class="fas fa-check"></i> ${this.translate('filter-paid')}`;
            } else if (filter === 'unpaid') {
                btn.innerHTML = `<i class="fas fa-times"></i> ${this.translate('filter-unpaid')}`;
            }
        });
    }

    updateElectricityLabel() {
        const electricityLabel = document.querySelector('label[for="electricity"]');
        if (electricityLabel) {
            electricityLabel.innerHTML = `
                <i class="fas fa-bolt"></i>
                ${this.translate('electricity-units')} (@ Rs. ${this.electricityRate}/unit)
            `;
        }
    }

    updateDropdownContent() {
        // Update section headings in forms
        const formSections = document.querySelectorAll('.form-section h3');
        formSections.forEach(section => {
            const icon = section.querySelector('i');
            const iconClass = icon ? icon.className : '';
            
            if (iconClass.includes('fa-calendar')) {
                section.innerHTML = `<i class="${iconClass}"></i> ${this.translate('date-selection')}`;
            } else if (iconClass.includes('fa-money-bill')) {
                section.innerHTML = `<i class="${iconClass}"></i> ${this.translate('bill-details')}`;
            } else if (iconClass.includes('fa-check')) {
                section.innerHTML = `<i class="${iconClass}"></i> ${this.translate('payment-status')}`;
            } else if (iconClass.includes('fa-sticky-note')) {
                section.innerHTML = `<i class="${iconClass}"></i> ${this.translate('notes')}`;
            } else if (iconClass.includes('fa-user')) {
                section.innerHTML = `<i class="${iconClass}"></i> ${this.translate('select-tenant')}`;
            }
        });
    }

    updateMonthSelector() {
        const monthSelect = document.getElementById('bs-month');
        if (monthSelect) {
            const selectedValue = monthSelect.value;
            monthSelect.innerHTML = '';
            
            const months = [
                'month-baishakh', 'month-jestha', 'month-ashadh', 'month-shrawan',
                'month-bhadra', 'month-ashwin', 'month-kartik', 'month-mangsir',
                'month-poush', 'month-magh', 'month-falgun', 'month-chaitra'
            ];

            months.forEach((monthKey, index) => {
                const option = document.createElement('option');
                option.value = index + 1;
                option.textContent = this.translate(monthKey);
                if (selectedValue && parseInt(selectedValue) === index + 1) {
                    option.selected = true;
                }
                monthSelect.appendChild(option);
            });
        }
    }

    setupLanguageSelector() {
        const languageBtn = document.getElementById('language-btn');
        const languageDropdown = document.getElementById('language-dropdown');
        const languageOptions = document.querySelectorAll('.language-option');

        if (languageBtn && languageDropdown) {
            // Toggle dropdown
            languageBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                languageBtn.classList.toggle('active');
                languageDropdown.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                languageBtn.classList.remove('active');
                languageDropdown.classList.remove('show');
            });

            // Language option selection
            languageOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const selectedLang = option.getAttribute('data-lang');
                    this.setLanguage(selectedLang);
                    languageBtn.classList.remove('active');
                    languageDropdown.classList.remove('show');
                });
            });
        }

        // Set initial active language
        this.updateLanguageDisplay();
    }

    // History functions
    renderHistory(filteredData = null) {
        const container = document.getElementById('history-list');
        if (!container) return;
        
        const dataToRender = filteredData || this.data;
        
        if (dataToRender.length === 0) {
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-history"></i>
                    <p>No payment history available</p>
                    <button class="btn btn-primary" onclick="app.showPage('add-entry')">
                        <i class="fas fa-plus"></i>
                        Add First Entry
                    </button>
                </div>
            `;
            return;
        }

        // Sort by year and month (newest first)
        const sortedData = [...dataToRender].sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year;
            return b.month - a.month;
        });

        container.innerHTML = sortedData.map(entry => this.createHistoryItem(entry)).join('');
    }

    createHistoryItem(entry) {
        const tenant = this.getTenant(entry.tenantId);
        const tenantName = tenant ? tenant.name : 'Unknown Tenant';
        const tenantRoom = tenant ? tenant.room : 'N/A';
        
        const monthName = this.getBikramSambatMonthName(entry.month);
        const total = entry.rent + entry.wifi + entry.electricity;
        const paidCount = [entry.rentPaid, entry.wifiPaid, entry.electricityPaid].filter(Boolean).length;
        
        let statusClass = 'unpaid';
        if (paidCount === 3) statusClass = 'fully-paid';
        else if (paidCount > 0) statusClass = 'partially-paid';

        const bills = [
            { name: 'Rent', icon: 'fas fa-home', amount: entry.rent, paid: entry.rentPaid },
            { name: 'WiFi', icon: 'fas fa-wifi', amount: entry.wifi, paid: entry.wifiPaid },
            { 
                name: `Electricity (${entry.electricityUnits || 0} units @ Rs.${entry.electricityRate || this.electricityRate}/unit)`, 
                icon: 'fas fa-bolt', 
                amount: entry.electricity, 
                paid: entry.electricityPaid 
            }
        ];

        return `
            <div class="history-item ${statusClass}">
                <div class="history-header">
                    <div class="history-date">
                        <h3>${tenantName} - Room ${tenantRoom}</h3>
                        <p>${monthName} ${entry.year}</p>
                    </div>
                    <div class="history-actions">
                        <button class="action-btn edit" onclick="app.editEntry(${entry.id})" title="Edit Entry">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" onclick="app.deleteEntry(${entry.id})" title="Delete Entry">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="bill-details">
                    ${bills.map(bill => `
                        <div class="bill-item">
                            <div class="bill-name">
                                <i class="${bill.icon}"></i>
                                ${bill.name}
                            </div>
                            <div class="bill-amount">Rs. ${this.formatCurrency(bill.amount)}</div>
                            <div class="bill-status ${bill.paid ? 'paid' : 'unpaid'}">
                                ${bill.paid ? 'Paid' : 'Unpaid'}
                            </div>
                        </div>
                    `).join('')}
                    <div class="bill-item" style="border-top: 2px solid #e2e8f0; margin-top: 0.5rem; padding-top: 0.5rem;">
                        <div class="bill-name" style="font-weight: 600;">
                            <i class="fas fa-calculator"></i>
                            Total
                        </div>
                        <div class="bill-amount" style="font-weight: 700; font-size: 1.1em;">Rs. ${this.formatCurrency(total)}</div>
                        <div class="bill-status ${statusClass === 'fully-paid' ? 'paid' : 'unpaid'}">
                            ${paidCount}/3 Paid
                        </div>
                    </div>
                </div>
                ${entry.notes ? `<div class="history-notes"><i class="fas fa-sticky-note"></i> ${entry.notes}</div>` : ''}
            </div>
        `;
    }

    // Search and Filter
    setupSearch() {
        const searchInput = document.getElementById('search-history');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }
    }

    performSearch(query) {
        if (!query.trim()) {
            this.renderHistory();
            return;
        }

        const filteredData = this.data.filter(entry => {
            const tenant = this.getTenant(entry.tenantId);
            const tenantName = tenant ? tenant.name.toLowerCase() : '';
            const tenantRoom = tenant ? tenant.room.toLowerCase() : '';
            const monthName = this.getBikramSambatMonthName(entry.month).toLowerCase();
            const year = entry.year.toString();
            const notes = entry.notes.toLowerCase();
            const searchTerm = query.toLowerCase();

            return tenantName.includes(searchTerm) || 
                   tenantRoom.includes(searchTerm) ||
                   monthName.includes(searchTerm) || 
                   year.includes(searchTerm) || 
                   notes.includes(searchTerm);
        });

        this.renderHistory(filteredData);
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.applyFilter(filter);
            });
        });
    }

    applyFilter(filter) {
        let filteredData = this.data;

        if (filter === 'paid') {
            filteredData = this.data.filter(entry => 
                entry.rentPaid && entry.wifiPaid && entry.electricityPaid
            );
        } else if (filter === 'unpaid') {
            filteredData = this.data.filter(entry => 
                !entry.rentPaid || !entry.wifiPaid || !entry.electricityPaid
            );
        }

        this.renderHistory(filteredData);
    }

    // Edit and Delete functions
    editEntry(id) {
        const entry = this.data.find(e => e.id === id);
        if (!entry) return;

        this.currentEditId = id;
        this.populateEditForm(entry);
        this.showModal('edit-modal');
    }

    populateEditForm(entry) {
        const editForm = document.getElementById('edit-form');
        const tenant = this.getTenant(entry.tenantId);
        const tenantName = tenant ? tenant.name : 'Unknown Tenant';
        const electricityUnits = entry.electricityUnits || (entry.electricity / (entry.electricityRate || this.electricityRate));
        
        editForm.innerHTML = `
            <div class="form-section">
                <h3><i class="fas fa-user"></i> Tenant</h3>
                <div class="form-group">
                    <label>Tenant</label>
                    <input type="text" value="${tenantName}" readonly style="background: #f7fafc;">
                </div>
            </div>
            
            <div class="form-section">
                <h3><i class="fas fa-calendar"></i> Date</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>Year</label>
                        <input type="number" id="edit-year" value="${entry.year}" readonly style="background: #f7fafc;">
                    </div>
                    <div class="form-group">
                        <label>Month</label>
                        <input type="text" id="edit-month" value="${this.getBikramSambatMonthName(entry.month)}" readonly style="background: #f7fafc;">
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <h3><i class="fas fa-money-bill"></i> Bill Details</h3>
                <div class="form-group">
                    <label><i class="fas fa-home"></i> Rent Amount (Rs.)</label>
                    <input type="number" id="edit-rent" value="${entry.rent}" min="0" step="0.01" required>
                </div>
                <div class="form-group">
                    <label><i class="fas fa-wifi"></i> WiFi Bill (Rs.)</label>
                    <input type="number" id="edit-wifi" value="${entry.wifi}" min="0" step="0.01" required>
                </div>
                <div class="form-group">
                    <label><i class="fas fa-bolt"></i> Electricity Units (@ Rs. ${this.electricityRate}/unit)</label>
                    <input type="number" id="edit-electricity" value="${electricityUnits.toFixed(1)}" min="0" step="0.1" required>
                    <div class="electricity-calculation">
                        <small class="text-muted">
                            <i class="fas fa-calculator"></i>
                            Total: Rs. <span id="edit-electricity-total">${this.formatCurrency(entry.electricity)}</span>
                        </small>
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <h3><i class="fas fa-check"></i> Payment Status</h3>
                <div class="payment-status">
                    <div class="status-item">
                        <label class="checkbox-label">
                            <input type="checkbox" id="edit-rent-paid" ${entry.rentPaid ? 'checked' : ''}>
                            <span class="checkmark"></span>
                            <i class="fas fa-home"></i> Rent Paid
                        </label>
                    </div>
                    <div class="status-item">
                        <label class="checkbox-label">
                            <input type="checkbox" id="edit-wifi-paid" ${entry.wifiPaid ? 'checked' : ''}>
                            <span class="checkmark"></span>
                            <i class="fas fa-wifi"></i> WiFi Paid
                        </label>
                    </div>
                    <div class="status-item">
                        <label class="checkbox-label">
                            <input type="checkbox" id="edit-electricity-paid" ${entry.electricityPaid ? 'checked' : ''}>
                            <span class="checkmark"></span>
                            <i class="fas fa-bolt"></i> Electricity Paid
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <h3><i class="fas fa-sticky-note"></i> Notes</h3>
                <div class="form-group">
                    <textarea id="edit-notes" rows="3" placeholder="Add any additional notes...">${entry.notes}</textarea>
                </div>
            </div>
            
            <div class="modal-actions">
                <button type="button" class="btn btn-primary" onclick="app.saveEdit()">
                    <i class="fas fa-save"></i> Save Changes
                </button>
                <button type="button" class="btn btn-secondary" onclick="app.hideModal('edit-modal')">
                    <i class="fas fa-times"></i> Cancel
                </button>
            </div>
        `;

        // Setup calculation for edit form
        const editElectricityInput = document.getElementById('edit-electricity');
        if (editElectricityInput) {
            editElectricityInput.addEventListener('input', () => {
                const units = parseFloat(editElectricityInput.value) || 0;
                const total = units * this.electricityRate;
                const totalSpan = document.getElementById('edit-electricity-total');
                if (totalSpan) {
                    totalSpan.textContent = this.formatCurrency(total);
                }
            });
        }
    }

    saveEdit() {
        const entryIndex = this.data.findIndex(e => e.id === this.currentEditId);
        if (entryIndex === -1) return;

        const rent = parseFloat(document.getElementById('edit-rent').value);
        const wifi = parseFloat(document.getElementById('edit-wifi').value);
        const electricityUnits = parseFloat(document.getElementById('edit-electricity').value);
        const electricity = this.calculateElectricityCost(electricityUnits);
        const rentPaid = document.getElementById('edit-rent-paid').checked;
        const wifiPaid = document.getElementById('edit-wifi-paid').checked;
        const electricityPaid = document.getElementById('edit-electricity-paid').checked;
        const notes = document.getElementById('edit-notes').value.trim();

        // Update the entry
        this.data[entryIndex] = {
            ...this.data[entryIndex],
            rent,
            wifi,
            electricity,
            electricityUnits,
            electricityRate: this.electricityRate,
            rentPaid,
            wifiPaid,
            electricityPaid,
            notes,
            dateModified: new Date().toISOString()
        };

        this.saveData();
        this.updateDashboard();
        this.renderHistory();
        this.hideModal('edit-modal');
        this.showToast('Entry updated successfully!', 'success');
    }

    getBikramSambatMonthName(monthNumber) {
        const monthKeys = [
            'month-baishakh', 'month-jestha', 'month-ashadh', 'month-shrawan',
            'month-bhadra', 'month-ashwin', 'month-kartik', 'month-mangsir',
            'month-poush', 'month-magh', 'month-falgun', 'month-chaitra'
        ];
        const monthKey = monthKeys[monthNumber - 1];
        return monthKey ? this.translate(monthKey) : 'Unknown';
    }

    deleteEntry(id) {
        this.currentDeleteId = id;
        this.showModal('delete-modal');
        
        // Setup delete confirmation
        const confirmDelete = document.getElementById('confirm-delete');
        const cancelDelete = document.getElementById('cancel-delete');
        
        if (confirmDelete) {
            confirmDelete.onclick = () => {
                this.confirmDelete();
            };
        }
        
        if (cancelDelete) {
            cancelDelete.onclick = () => {
                this.hideModal('delete-modal');
            };
        }
    }

    confirmDelete() {
        const entryIndex = this.data.findIndex(e => e.id === this.currentDeleteId);
        if (entryIndex !== -1) {
            this.data.splice(entryIndex, 1);
            this.saveData();
            this.updateDashboard();
            this.renderHistory();
            this.hideModal('delete-modal');
            this.showToast('Entry deleted successfully!', 'success');
        }
    }

    autoFillPreviousMonth() {
        const selectedTenantId = parseInt(document.getElementById('select-tenant').value);
        const currentYear = parseInt(document.getElementById('bs-year').value);
        const currentMonth = parseInt(document.getElementById('bs-month').value);
        
        if (!selectedTenantId) {
            this.showToast('Please select a tenant first', 'error');
            return;
        }
        
        let prevMonth = currentMonth - 1;
        let prevYear = currentYear;
        
        if (prevMonth < 1) {
            prevMonth = 12;
            prevYear = currentYear - 1;
        }
        
        const previousEntry = this.data.find(entry => 
            entry.tenantId === selectedTenantId && entry.year === prevYear && entry.month === prevMonth
        );
        
        if (previousEntry) {
            document.getElementById('rent').value = previousEntry.rent;
            document.getElementById('wifi').value = previousEntry.wifi;
            document.getElementById('electricity').value = previousEntry.electricityUnits || 0;
            this.updateElectricityCalculation();
            this.showToast('Previous month data filled!', 'success');
        } else {
            this.showToast('No previous month data found for this tenant', 'info');
        }
    }

    // Tenant UI functions
    populateTenantSelector() {
        const tenantSelect = document.getElementById('select-tenant');
        if (!tenantSelect) return;

        const currentValue = tenantSelect.value;
        tenantSelect.innerHTML = '<option value="">-- Select Tenant --</option>';
        
        const activeTenants = this.getActiveTenants();
        activeTenants.forEach(tenant => {
            const option = document.createElement('option');
            option.value = tenant.id;
            option.textContent = `${tenant.name} (${tenant.room})`;
            if (currentValue && parseInt(currentValue) === tenant.id) {
                option.selected = true;
            }
            tenantSelect.appendChild(option);
        });

        // Auto-select rent amount when tenant is selected
        tenantSelect.addEventListener('change', () => {
            const selectedTenantId = parseInt(tenantSelect.value);
            if (selectedTenantId) {
                const tenant = this.getTenant(selectedTenantId);
                if (tenant) {
                    const rentInput = document.getElementById('rent');
                    if (rentInput && tenant.monthlyRent) {
                        rentInput.value = tenant.monthlyRent;
                    }
                }
            }
        });
    }

    renderTenants() {
        const container = document.getElementById('tenants-list');
        if (!container) return;

        if (this.tenants.length === 0) {
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-users"></i>
                    <p data-translate="no-tenants">No tenants added yet</p>
                    <button class="btn btn-primary" onclick="app.showAddTenantModal()">
                        <i class="fas fa-user-plus"></i>
                        <span data-translate="add-first-tenant">Add First Tenant</span>
                    </button>
                </div>
            `;
            return;
        }

        // Sort tenants by status (active first) then by name
        const sortedTenants = [...this.tenants].sort((a, b) => {
            if (a.status !== b.status) {
                return a.status === 'active' ? -1 : 1;
            }
            return a.name.localeCompare(b.name);
        });

        container.innerHTML = sortedTenants.map(tenant => this.createTenantCard(tenant)).join('');
    }

    createTenantCard(tenant) {
        const statusClass = tenant.status === 'active' ? 'active' : 'inactive';
        const statusIcon = tenant.status === 'active' ? 'fa-check-circle' : 'fa-pause-circle';
        
        return `
            <div class="tenant-card ${statusClass}">
                <div class="tenant-header">
                    <div class="tenant-info">
                        <h3>${tenant.name}</h3>
                        <span class="tenant-room">
                            <i class="fas fa-door-open"></i>
                            Room ${tenant.room}
                        </span>
                    </div>
                    <div class="tenant-status">
                        <span class="status-badge ${statusClass}">
                            <i class="fas ${statusIcon}"></i>
                            ${this.translate(tenant.status === 'active' ? 'status-active' : 'status-inactive')}
                        </span>
                    </div>
                </div>
                
                <div class="tenant-details">
                    ${tenant.email ? `
                        <div class="detail-item">
                            <i class="fas fa-envelope"></i>
                            <span>${tenant.email}</span>
                        </div>
                    ` : ''}
                    ${tenant.phone ? `
                        <div class="detail-item">
                            <i class="fas fa-phone"></i>
                            <span>${tenant.phone}</span>
                        </div>
                    ` : ''}
                    <div class="detail-item">
                        <i class="fas fa-home"></i>
                        <span>Rs. ${this.formatCurrency(tenant.monthlyRent)}/month</span>
                    </div>
                    ${tenant.deposit > 0 ? `
                        <div class="detail-item">
                            <i class="fas fa-piggy-bank"></i>
                            <span>Deposit: Rs. ${this.formatCurrency(tenant.deposit)}</span>
                        </div>
                    ` : ''}
                    ${tenant.moveInDate ? `
                        <div class="detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>Move-in: ${new Date(tenant.moveInDate).toLocaleDateString()}</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="tenant-actions">
                    <button class="action-btn edit" onclick="app.editTenant(${tenant.id})" title="Edit Tenant">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="app.deleteTenantConfirm(${tenant.id})" title="Delete Tenant">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    showAddTenantModal() {
        const form = document.getElementById('tenant-form');
        if (form) {
            form.reset();
            // Set default move-in date to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('tenant-move-in').value = today;
        }
        
        this.showModal('add-tenant-modal');
        
        // Setup form submission
        if (form && !form.hasSubmitListener) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleTenantSubmit();
            });
            form.hasSubmitListener = true;
        }
    }

    handleTenantSubmit() {
        const formData = {
            name: document.getElementById('tenant-name').value.trim(),
            email: document.getElementById('tenant-email').value.trim(),
            phone: document.getElementById('tenant-phone').value.trim(),
            room: document.getElementById('tenant-room').value.trim(),
            status: document.getElementById('tenant-status').value,
            monthlyRent: document.getElementById('tenant-rent').value,
            deposit: document.getElementById('tenant-deposit').value,
            moveInDate: document.getElementById('tenant-move-in').value
        };

        if (!formData.name || !formData.room || !formData.monthlyRent) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        // Check if room number already exists
        const existingTenant = this.tenants.find(t => 
            t.room.toLowerCase() === formData.room.toLowerCase() && t.status === 'active'
        );
        
        if (existingTenant) {
            this.showToast('Room number already occupied by an active tenant', 'error');
            return;
        }

        this.addTenant(formData);
        this.hideModal('add-tenant-modal');
        this.renderTenants();
        this.populateTenantSelector();
        this.updateTenantOverview();
        this.showToast(`Tenant ${formData.name} added successfully!`, 'success');
    }

    editTenant(id) {
        const tenant = this.getTenant(id);
        if (!tenant) return;

        this.currentEditTenantId = id;
        this.populateEditTenantForm(tenant);
        this.showModal('edit-tenant-modal');
    }

    populateEditTenantForm(tenant) {
        const editForm = document.getElementById('edit-tenant-form');
        
        editForm.innerHTML = `
            <div class="form-section">
                <h3>
                    <i class="fas fa-id-card"></i>
                    <span data-translate="tenant-details">Tenant Details</span>
                </h3>
                <div class="form-group">
                    <label for="edit-tenant-name">
                        <i class="fas fa-user"></i>
                        <span data-translate="tenant-name">Tenant Name</span>
                    </label>
                    <input type="text" id="edit-tenant-name" value="${tenant.name}" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="edit-tenant-email">
                            <i class="fas fa-envelope"></i>
                            <span data-translate="tenant-email">Email (Optional)</span>
                        </label>
                        <input type="email" id="edit-tenant-email" value="${tenant.email || ''}">
                    </div>
                    <div class="form-group">
                        <label for="edit-tenant-phone">
                            <i class="fas fa-phone"></i>
                            <span data-translate="tenant-phone">Phone (Optional)</span>
                        </label>
                        <input type="tel" id="edit-tenant-phone" value="${tenant.phone || ''}">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="edit-tenant-room">
                            <i class="fas fa-door-open"></i>
                            <span data-translate="tenant-room">Room/Unit Number</span>
                        </label>
                        <input type="text" id="edit-tenant-room" value="${tenant.room}" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-tenant-status">
                            <i class="fas fa-toggle-on"></i>
                            <span data-translate="tenant-status">Status</span>
                        </label>
                        <select id="edit-tenant-status">
                            <option value="active" ${tenant.status === 'active' ? 'selected' : ''} data-translate="status-active">Active</option>
                            <option value="inactive" ${tenant.status === 'inactive' ? 'selected' : ''} data-translate="status-inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <h3>
                    <i class="fas fa-money-bill"></i>
                    Financial Details
                </h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="edit-tenant-rent">
                            <i class="fas fa-home"></i>
                            <span data-translate="tenant-rent">Monthly Rent (Rs.)</span>
                        </label>
                        <input type="number" id="edit-tenant-rent" value="${tenant.monthlyRent}" min="0" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-tenant-deposit">
                            <i class="fas fa-piggy-bank"></i>
                            <span data-translate="tenant-deposit">Security Deposit (Rs.)</span>
                        </label>
                        <input type="number" id="edit-tenant-deposit" value="${tenant.deposit || 0}" min="0" step="0.01">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="edit-tenant-move-in">
                        <i class="fas fa-calendar"></i>
                        <span data-translate="tenant-move-in">Move-in Date</span>
                    </label>
                    <input type="date" id="edit-tenant-move-in" value="${tenant.moveInDate || ''}">
                </div>
            </div>
            
            <div class="modal-actions">
                <button type="button" class="btn btn-primary" onclick="app.saveTenantEdit()">
                    <i class="fas fa-save"></i>
                    <span data-translate="save-changes">Save Changes</span>
                </button>
                <button type="button" class="btn btn-secondary" onclick="app.hideModal('edit-tenant-modal')">
                    <i class="fas fa-times"></i>
                    <span data-translate="cancel">Cancel</span>
                </button>
            </div>
        `;
    }

    saveTenantEdit() {
        const formData = {
            name: document.getElementById('edit-tenant-name').value.trim(),
            email: document.getElementById('edit-tenant-email').value.trim(),
            phone: document.getElementById('edit-tenant-phone').value.trim(),
            room: document.getElementById('edit-tenant-room').value.trim(),
            status: document.getElementById('edit-tenant-status').value,
            monthlyRent: parseFloat(document.getElementById('edit-tenant-rent').value),
            deposit: parseFloat(document.getElementById('edit-tenant-deposit').value) || 0,
            moveInDate: document.getElementById('edit-tenant-move-in').value
        };

        if (!formData.name || !formData.room || !formData.monthlyRent) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        // Check if room number conflicts with other tenants
        const existingTenant = this.tenants.find(t => 
            t.room.toLowerCase() === formData.room.toLowerCase() && 
            t.status === 'active' && 
            t.id !== this.currentEditTenantId
        );
        
        if (existingTenant) {
            this.showToast('Room number already occupied by another active tenant', 'error');
            return;
        }

        const updatedTenant = this.updateTenant(this.currentEditTenantId, formData);
        if (updatedTenant) {
            this.hideModal('edit-tenant-modal');
            this.renderTenants();
            this.populateTenantSelector();
            this.updateTenantOverview();
            this.showToast(`Tenant ${formData.name} updated successfully!`, 'success');
        }
    }

    deleteTenantConfirm(id) {
        const tenant = this.getTenant(id);
        if (!tenant) return;

        this.currentDeleteTenantId = id;
        this.showModal('delete-tenant-modal');
        
        // Update modal content
        const deleteWarning = document.querySelector('#delete-tenant-modal .modal-body p');
        if (deleteWarning) {
            deleteWarning.textContent = `Are you sure you want to delete tenant "${tenant.name}"? This will also delete all their billing records and cannot be undone.`;
        }
        
        // Setup delete confirmation
        const confirmDelete = document.getElementById('confirm-delete-tenant');
        const cancelDelete = document.getElementById('cancel-delete-tenant');
        
        if (confirmDelete) {
            confirmDelete.onclick = () => {
                this.confirmTenantDelete();
            };
        }
        
        if (cancelDelete) {
            cancelDelete.onclick = () => {
                this.hideModal('delete-tenant-modal');
            };
        }
    }

    confirmTenantDelete() {
        const tenant = this.getTenant(this.currentDeleteTenantId);
        if (!tenant) return;

        if (this.deleteTenant(this.currentDeleteTenantId)) {
            this.hideModal('delete-tenant-modal');
            this.renderTenants();
            this.populateTenantSelector();
            this.updateTenantOverview();
            this.updateDashboard();
            this.renderHistory();
            this.showToast(`Tenant ${tenant.name} deleted successfully!`, 'success');
        }
    }

    updateTenantOverview() {
        const container = document.getElementById('tenant-overview');
        if (!container) return;

        // Calculate totals for active tenants
        const activeTenants = this.getActiveTenants();
        const totalRent = activeTenants.reduce((sum, tenant) => sum + tenant.monthlyRent, 0);
        const totalDeposit = activeTenants.reduce((sum, tenant) => sum + tenant.deposit, 0);

        container.innerHTML = `
            <div class="overview-cards">
                <div class="overview-card">
                    <div class="overview-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="overview-content">
                        <h3>Active Tenants</h3>
                        <p>${activeTenants.length}</p>
                    </div>
                </div>
                <div class="overview-card">
                    <div class="overview-icon">
                        <i class="fas fa-money-bill-wave"></i>
                    </div>
                    <div class="overview-content">
                        <h3>Monthly Rent</h3>
                        <p>Rs. ${this.formatCurrency(totalRent)}</p>
                    </div>
                </div>
                <div class="overview-card">
                    <div class="overview-icon">
                        <i class="fas fa-piggy-bank"></i>
                    </div>
                    <div class="overview-content">
                        <h3>Security Deposit</h3>
                        <p>Rs. ${this.formatCurrency(totalDeposit)}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Utility functions
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount);
    }

    // Initialize the application
    init() {
        this.setupNavigation();
        this.setupForms();
        this.setupModals();
        this.setupLanguageSelector();
        this.populateDateSelectors();
        this.populateTenantSelector();
        this.updateDashboard();
        this.renderHistory();
        this.renderTenants();
        this.updateTenantOverview();
        this.setupSearch();
        this.setupFilters();
        this.showCurrentBikramSambatDate();
        this.setupPWA();
        this.setupSettings();
        this.setupImportExport();
        this.loadSettings();
        this.setupElectricityCalculation();
        this.translatePage();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new RentalManager();
});
