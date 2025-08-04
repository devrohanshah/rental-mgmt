// Rental Management App - Main JavaScript
class RentalManager {
    constructor() {
        this.data = this.loadData();
        this.currentEditId = null;
        this.currentDeleteId = null;
        this.deferredPrompt = null;
        this.electricityRate = this.getElectricityRate();
        this.init();
    }

    // Initialize the application
    init() {
        this.setupNavigation();
        this.setupForms();
        this.setupModals();
        this.populateDateSelectors();
        this.updateDashboard();
        this.renderHistory();
        this.setupSearch();
        this.setupFilters();
        this.showCurrentBikramSambatDate();
        this.setupPWA();
        this.setupSettings();
        this.setupImportExport();
        this.loadSettings();
        this.setupElectricityCalculation();
    }

    // Data management
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
    getCurrentBikramSambatDate() {
        try {
            const now = new Date();
            // Using bikram-sambat-js library
            const bsDate = nepaliDateConverter.englishToNepali(
                now.getFullYear(),
                now.getMonth() + 1,
                now.getDate()
            );
            return bsDate;
        } catch (error) {
            // Fallback if library fails
            console.warn('Bikram Sambat library not available, using fallback');
            return {
                year: 2081,
                month: 4,
                day: 19,
                strMonth: 'Shrawan',
                strDay: 'Mangalbar'
            };
        }
    }

    showCurrentBikramSambatDate() {
        const bsDate = this.getCurrentBikramSambatDate();
        const monthElement = document.getElementById('current-month-bs');
        if (monthElement) {
            monthElement.textContent = `${this.getBikramSambatMonthName(bsDate.month)} ${bsDate.year}`;
        }
    }

    getBikramSambatMonthName(monthNumber) {
        const months = [
            'Baishakh', 'Jestha', 'Ashadh', 'Shrawan',
            'Bhadra', 'Ashwin', 'Kartik', 'Mangsir',
            'Poush', 'Magh', 'Falgun', 'Chaitra'
        ];
        return months[monthNumber - 1] || 'Unknown';
    }

    populateDateSelectors() {
        const yearSelect = document.getElementById('bs-year');
        const monthSelect = document.getElementById('bs-month');
        
        if (!yearSelect || !monthSelect) return;

        // Populate years (current year ± 5 years)
        const currentBsDate = this.getCurrentBikramSambatDate();
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

        // Check if entry already exists for this month/year
        const existingIndex = this.data.findIndex(entry => 
            entry.year === year && entry.month === month
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

    autoFillPreviousMonth() {
        const currentYear = parseInt(document.getElementById('bs-year').value);
        const currentMonth = parseInt(document.getElementById('bs-month').value);
        
        let prevYear = currentYear;
        let prevMonth = currentMonth - 1;
        
        if (prevMonth < 1) {
            prevMonth = 12;
            prevYear--;
        }

        const previousEntry = this.data.find(entry => 
            entry.year === prevYear && entry.month === prevMonth
        );

        if (previousEntry) {
            document.getElementById('rent').value = previousEntry.rent;
            document.getElementById('wifi').value = previousEntry.wifi;
            document.getElementById('electricity').value = previousEntry.electricityUnits || 0;
            
            // Update calculation
            this.updateElectricityCalculation();
            
            // Don't auto-fill payment status - let user decide
            document.getElementById('rent-paid').checked = false;
            document.getElementById('wifi-paid').checked = false;
            document.getElementById('electricity-paid').checked = false;
            
            this.showToast('Previous month data filled!', 'info');
        } else {
            this.showToast('No previous month data found', 'error');
        }
    }

    // Dashboard
    updateDashboard() {
        const currentBsDate = this.getCurrentBikramSambatDate();
        const currentMonthData = this.data.find(entry => 
            entry.year === currentBsDate.year && entry.month === currentBsDate.month
        );

        // Update summary cards
        this.updateSummaryCards(currentMonthData);
        
        // Update current bills list
        this.updateCurrentBillsList(currentMonthData);
    }

    updateSummaryCards(data) {
        const totalElement = document.getElementById('total-amount');
        const paidElement = document.getElementById('paid-amount');
        const unpaidElement = document.getElementById('unpaid-amount');

        if (!data) {
            totalElement.textContent = 'Rs. 0';
            paidElement.textContent = 'Rs. 0';
            unpaidElement.textContent = 'Rs. 0';
            return;
        }

        const total = data.rent + data.wifi + data.electricity;
        let paid = 0;
        
        if (data.rentPaid) paid += data.rent;
        if (data.wifiPaid) paid += data.wifi;
        if (data.electricityPaid) paid += data.electricity;
        
        const unpaid = total - paid;

        totalElement.textContent = `Rs. ${this.formatCurrency(total)}`;
        paidElement.textContent = `Rs. ${this.formatCurrency(paid)}`;
        unpaidElement.textContent = `Rs. ${this.formatCurrency(unpaid)}`;
    }

    updateCurrentBillsList(data) {
        const container = document.getElementById('current-bills-list');
        
        if (!data) {
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

        const bills = [
            { name: 'Rent', icon: 'fas fa-home', amount: data.rent, paid: data.rentPaid },
            { name: 'WiFi', icon: 'fas fa-wifi', amount: data.wifi, paid: data.wifiPaid },
            { 
                name: `Electricity (${data.electricityUnits || 0} units)`, 
                icon: 'fas fa-bolt', 
                amount: data.electricity, 
                paid: data.electricityPaid 
            }
        ];

        container.innerHTML = bills.map(bill => `
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
        `).join('');
    }

    // History
    renderHistory(filteredData = null) {
        const container = document.getElementById('history-list');
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
                    <div class="history-date">${monthName} ${entry.year}</div>
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
            const monthName = this.getBikramSambatMonthName(entry.month).toLowerCase();
            const year = entry.year.toString();
            const notes = entry.notes.toLowerCase();
            const searchTerm = query.toLowerCase();

            return monthName.includes(searchTerm) || 
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

    // Edit and Delete
    editEntry(id) {
        const entry = this.data.find(e => e.id === id);
        if (!entry) return;

        this.currentEditId = id;
        this.populateEditForm(entry);
        this.showModal('edit-modal');
    }

    populateEditForm(entry) {
        const editForm = document.getElementById('edit-form');
        const electricityUnits = entry.electricityUnits || (entry.electricity / (entry.electricityRate || this.electricityRate));
        
        editForm.innerHTML = `
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

        const entry = this.data[entryIndex];
        const electricityUnits = parseFloat(document.getElementById('edit-electricity').value);
        
        entry.rent = parseFloat(document.getElementById('edit-rent').value);
        entry.wifi = parseFloat(document.getElementById('edit-wifi').value);
        entry.electricityUnits = electricityUnits;
        entry.electricity = this.calculateElectricityCost(electricityUnits);
        entry.electricityRate = this.electricityRate;
        entry.rentPaid = document.getElementById('edit-rent-paid').checked;
        entry.wifiPaid = document.getElementById('edit-wifi-paid').checked;
        entry.electricityPaid = document.getElementById('edit-electricity-paid').checked;
        entry.notes = document.getElementById('edit-notes').value.trim();
        entry.dateModified = new Date().toISOString();

        this.saveData();
        this.hideModal('edit-modal');
        this.renderHistory();
        this.updateDashboard();
        this.showToast('Entry updated successfully!', 'success');
    }

    deleteEntry(id) {
        this.currentDeleteId = id;
        this.showModal('delete-modal');
    }

    confirmDelete() {
        const index = this.data.findIndex(e => e.id === this.currentDeleteId);
        if (index !== -1) {
            this.data.splice(index, 1);
            this.saveData();
            this.hideModal('delete-modal');
            this.renderHistory();
            this.updateDashboard();
            this.showToast('Entry deleted successfully!', 'success');
        }
    }

    // Modals
    setupModals() {
        // Close buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.hideModal(modal.id);
            });
        });

        // Cancel delete
        const cancelDelete = document.getElementById('cancel-delete');
        if (cancelDelete) {
            cancelDelete.addEventListener('click', () => {
                this.hideModal('delete-modal');
            });
        }

        // Confirm delete
        const confirmDelete = document.getElementById('confirm-delete');
        if (confirmDelete) {
            confirmDelete.addEventListener('click', () => {
                this.confirmDelete();
            });
        }

        // Click outside to close
        document.querySelectorAll('.modal').forEach(modal => {
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

    // Utilities
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount);
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'check-circle' : 
                     type === 'error' ? 'exclamation-triangle' : 
                     'info-circle';
        
        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 5000);
    }
}

// Fallback Bikram Sambat converter (simplified)
const nepaliDateConverter = {
    englishToNepali: function(year, month, day) {
        // This is a simplified fallback - in a real app, you'd use the bikram-sambat-js library
        // For now, we'll return approximate values
        const bsYear = year + 57;
        const bsMonth = month <= 4 ? month + 8 : month - 4;
        return {
            year: bsYear,
            month: bsMonth,
            day: day,
            strMonth: this.getMonthName(bsMonth)
        };
    },
    
    getMonthName: function(month) {
        const months = [
            'Baishakh', 'Jestha', 'Ashadh', 'Shrawan',
            'Bhadra', 'Ashwin', 'Kartik', 'Mangsir',
            'Poush', 'Magh', 'Falgun', 'Chaitra'
        ];
        return months[month - 1] || 'Unknown';
    }
};

// Initialize the app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new RentalManager();
});

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}