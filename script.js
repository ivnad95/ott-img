// Product images list - using relative paths
const productImages = [
    './images/P4290009-Edit copy.jpg',
    './images/P4290012-Edit 2.jpg',
    './images/P4290017-Edit 3.jpg',
    './images/P4290020 copy.jpg',
    './images/P4290029-Edit.jpg',
    './images/P4290033-Edit.jpg',
    './images/P4290035-Edit.jpg',
    './images/P4290039-Edit.jpg',
    './images/P4290042-Edit.jpg',
    './images/P4290043-Edit.jpg',
    './images/P4290045-Edit.jpg',
    './images/P4290048-Edit.jpg',
    './images/P4290049-Edit.jpg',
    './images/P4290055-Edit.jpg',
    './images/P4290058-Edit.jpg',
    './images/P4290059-Edit.jpg',
    './images/P4290065-Edit.jpg',
    './images/P4290071-Edit.jpg',
    './images/P4290072-Edit.jpg',
    './images/P4290073-Edit.jpg',
    './images/P4290089-Edit.jpg',
    './images/P4290091-Edit.jpg',
    './images/P4290096-Edit.jpg',
    './images/P4290098-Edit.jpg',
    './images/P4290100-Edit.jpg',
    './images/P4290101-Edit.jpg',
    './images/_A210028-Edit.jpg',
    './images/_A210032-Edit-Edit2.jpg',
    './images/_A210032-Edit.jpg',
    './images/_A210038-Edit.jpg',
    './images/_A210038-Edit2.jpg',
    './images/_A220048-Edit.jpg',
    './images/_A220052-Edit-Edit.jpg',
    './images/_A220053-Edit-Edit.jpg',
    './images/_A220057-Edit.jpg',
    './images/_A220060-Edit.jpg',
    './images/_A220061-Edit.jpg',
    './images/_A220066-Edit.jpg',
    './images/_A220069-Edit.jpg',
    './images/_A220073-Edit.jpg'
];

// Size options
const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

// Saved product data loaded from the server
let savedData = {};

// Generate product cards
function generateProductCards() {
    const grid = document.getElementById('products-grid');
    
    productImages.forEach((image, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = createProductCardHTML(image, index);
        grid.appendChild(productCard);
    });
    
    // Load saved data into forms
    loadSavedData();
}

// Create HTML for individual product card
function createProductCardHTML(image, index) {
    const savedProduct = savedData[image] || {};
    
    return `
        <img src="${image}" alt="Product ${index + 1}" class="product-image" loading="lazy">
        
        <form class="product-form" data-image="${image}">
            <div class="form-section">
                <div class="checkbox-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="new-${index}" name="category" value="new" 
                               ${savedProduct.category === 'new' ? 'checked' : ''}>
                        <label for="new-${index}">New Product</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="current-${index}" name="category" value="current"
                               ${savedProduct.category === 'current' ? 'checked' : ''}>
                        <label for="current-${index}">Current Product</label>
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <input type="text" class="product-name" name="productName" 
                       placeholder="Type product name here..." 
                       value="${savedProduct.productName || ''}">
            </div>
            
            <div class="form-section">
                <div class="sizes-grid">
                    ${sizes.map(size => `
                        <div class="size-input">
                            <label for="${size.toLowerCase()}-${index}">${size}</label>
                            <input type="number" id="${size.toLowerCase()}-${index}" 
                                   name="size-${size.toLowerCase()}" min="0" 
                                   placeholder="0" 
                                   value="${savedProduct.sizes?.[size.toLowerCase()] || ''}">
                        </div>
                    `).join('')}
                </div>
            </div>
        </form>
    `;
}

// Handle checkbox exclusivity (only one can be selected)
function setupCheckboxHandlers() {
    document.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox' && e.target.name === 'category') {
            const form = e.target.closest('.product-form');
            const checkboxes = form.querySelectorAll('input[name="category"]');
            
            if (e.target.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== e.target) cb.checked = false;
                });
            }
        }
    });
}

// Collect form data
function collectFormData() {
    const forms = document.querySelectorAll('.product-form');
    const data = {};
    
    forms.forEach(form => {
        const image = form.dataset.image;
        
        // Get category
        const categoryCheckbox = form.querySelector('input[name="category"]:checked');
        const category = categoryCheckbox ? categoryCheckbox.value : '';
        
        // Get product name
        const productName = form.querySelector('.product-name').value.trim();
        
        // Get sizes
        const sizes = {};
        form.querySelectorAll('input[type="number"]').forEach(input => {
            const sizeName = input.name.replace('size-', '');
            const value = parseInt(input.value) || 0;
            if (value > 0) {
                sizes[sizeName] = value;
            }
        });

        // Only save if there's meaningful data
        if (category || productName || Object.keys(sizes).length > 0) {
            data[image] = {
                category,
                productName,
                sizes,
                lastUpdated: new Date().toISOString()
            };
        }
    });
    
    return data;
}

// Save data locally and to server
async function saveData() {
    const saveBtn = document.getElementById('save-btn');
    const originalText = saveBtn.textContent;
    
    // Show loading state
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite;">⏳</span> Saving...';
    
    try {
        const data = collectFormData();
        
        // Send data to the server API
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            const response = await fetch('/api/save-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: data,
                    timestamp: new Date().toISOString()
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                const result = await response.json();
                // Success feedback
                saveBtn.innerHTML = `✅ Saved! (${Object.keys(data).length} products)`;
                saveBtn.style.background = 'linear-gradient(135deg, #059669, #0f766e)';
                
                console.log('Data saved successfully:', result);
            } else {
                const errorText = await response.text();
                throw new Error(`Server responded with ${response.status}: ${errorText}`);
            }
        } catch (fetchError) {
            console.error('Server save failed:', fetchError);
            saveBtn.innerHTML = '❌ Save Failed';
            saveBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        }
        
    } catch (error) {
        console.error('Save error:', error);
        saveBtn.innerHTML = '❌ Save Failed';
        saveBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } finally {
        saveBtn.disabled = false;
        
        // Reset button after 3 seconds
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.style.background = 'linear-gradient(135deg, #10b981, #1e40af)';
        }, 3000);
    }
}

// Load saved data into forms
function loadSavedData() {
    Object.keys(savedData).forEach(image => {
        const form = document.querySelector(`[data-image="${image}"]`);
        if (!form) return;
        
        const data = savedData[image];
        
        // Set category
        if (data.category) {
            const categoryCheckbox = form.querySelector(`input[value="${data.category}"]`);
            if (categoryCheckbox) categoryCheckbox.checked = true;
        }
        
        // Set product name
        if (data.productName) {
            const nameInput = form.querySelector('.product-name');
            if (nameInput) nameInput.value = data.productName;
        }
        
        // Set sizes
        if (data.sizes) {
            Object.keys(data.sizes).forEach(size => {
                const sizeInput = form.querySelector(`input[name="size-${size}"]`);
                if (sizeInput) sizeInput.value = data.sizes[size];
            });
        }
    });
}

// Auto-save functionality
function setupAutoSave() {
    let autoSaveTimeout;

    document.addEventListener('input', function(e) {
        if (e.target.matches('.product-form input')) {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                const data = collectFormData();
                // silently persist data to the server
                fetch('/api/save-data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data, timestamp: new Date().toISOString() })
                }).catch(err => console.warn('Auto-save failed:', err));
            }, 2000); // Auto-save after 2 seconds of inactivity
        }
    });
}

// Load data from server
async function loadDataFromServer() {
    try {
        // Create abort controller for timeout (better browser support)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch('/api/get-data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
                savedData = result.data;
                console.log('Data loaded from server:', Object.keys(result.data).length, 'products');
                return true;
            }
        }
    } catch (error) {
        console.warn('Failed to load data from server:', error);
    }
    return false;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    // Try to load data from server first
    const serverDataLoaded = await loadDataFromServer();
    
    // Generate product cards and setup handlers
    generateProductCards();
    setupCheckboxHandlers();
    setupAutoSave();
    
    // Setup save button
    document.getElementById('save-btn').addEventListener('click', saveData);
    
    // Show data count on load in console
    const dataCount = Object.keys(savedData).length;
    if (dataCount > 0) {
        console.log(`📊 ${dataCount} products have saved data`);
    }
});

// Handle visibility change to save data when user leaves
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        const data = collectFormData();
        fetch('/api/save-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data, timestamp: new Date().toISOString() })
        }).catch(err => console.warn('Auto-save on hide failed:', err));
    }
});
