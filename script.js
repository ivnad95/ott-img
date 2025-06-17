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

// Load saved data from localStorage
let savedData = JSON.parse(localStorage.getItem('ottProductData')) || {};

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
    const saveStatus = document.getElementById('save-status');
    
    // Show loading state
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span class="loading"></span> Saving...';
    saveStatus.className = 'save-status loading';
    saveStatus.textContent = 'Saving your progress...';
    
    try {
        const data = collectFormData();
        
        // Save to localStorage
        localStorage.setItem('ottProductData', JSON.stringify(data));
        savedData = data;
        
        // Send to server API
        const response = await fetch('/api/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: data,
                timestamp: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            saveStatus.className = 'save-status success';
            saveStatus.textContent = `✅ Progress saved successfully! (${Object.keys(data).length} products updated)`;
        } else {
            throw new Error('Server save failed');
        }
        
    } catch (error) {
        console.error('Save error:', error);
        saveStatus.className = 'save-status error';
        saveStatus.textContent = '⚠️ Saved locally, but server sync failed. Data is still preserved.';
    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Progress';
        
        // Clear status after 5 seconds
        setTimeout(() => {
            saveStatus.className = 'save-status';
            saveStatus.textContent = '';
        }, 5000);
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
                localStorage.setItem('ottProductData', JSON.stringify(data));
                savedData = data;
            }, 2000); // Auto-save after 2 seconds of inactivity
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    generateProductCards();
    setupCheckboxHandlers();
    setupAutoSave();
    
    // Setup save button
    document.getElementById('save-btn').addEventListener('click', saveData);
    
    // Show data count on load
    const dataCount = Object.keys(savedData).length;
    if (dataCount > 0) {
        const saveStatus = document.getElementById('save-status');
        saveStatus.className = 'save-status';
        saveStatus.textContent = `📊 ${dataCount} products have saved data`;
        setTimeout(() => {
            saveStatus.textContent = '';
        }, 3000);
    }
});

// Handle visibility change to save data when user leaves
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        const data = collectFormData();
        localStorage.setItem('ottProductData', JSON.stringify(data));
    }
});