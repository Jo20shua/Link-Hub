/* ============================================
   CHECKOUT PAGE - VANILLA JAVASCRIPT
   ============================================ */

/**
 * Checkout State Manager
 * Manages the current state of billing selection and payment method
 */
const CheckoutState = {
    selectedBillingType: 'annual',
    
    setBillingType(type) {
        this.selectedBillingType = type;
    },
    
    getBillingType() {
        return this.selectedBillingType;
    }
};

/**
 * DOM Element Selectors
 * Centralized references to all DOM elements
 */
const DOM = {
    // Billing cards
    billingCards: document.querySelectorAll('.billing-card'),
    
    // Summary elements
    summaryPrice: document.getElementById('summary-price'),
    summaryFrequency: document.getElementById('summary-frequency'),
    summaryTotal: document.getElementById('summary-total'),
    summarySavingsContainer: document.getElementById('summary-savings-container'),
    
    // CTA Button
    ctaButton: document.getElementById('checkout-button')
};

/**
 * Initialize Event Listeners
 */
function initializeEventListeners() {
    // Billing card selection
    DOM.billingCards.forEach(card => {
        card.addEventListener('click', handleBillingCardClick);
    });
    
    // CTA Button click
    DOM.ctaButton?.addEventListener('click', handleCheckoutClick);
}

/**
 * Handle Billing Card Selection
 * @param {Event} event - Click event
 */
function handleBillingCardClick(event) {
    const clickedCard = event.currentTarget;
    const billingType = clickedCard.dataset.billingType;
    
    // Update state
    CheckoutState.setBillingType(billingType);
    
    // Remove active class from all cards
    DOM.billingCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to clicked card
    clickedCard.classList.add('active');
    
    // Update summary and button
    updateSummarySection();
    updateCtaButton();
}

/**
 * Update Summary Section Based on Selected Billing
 */
function updateSummarySection() {
    const billingType = CheckoutState.getBillingType();
    const activeCard = document.querySelector('.billing-card.active');
    
    if (!activeCard) return;
    
    const monthlyPrice = activeCard.dataset.monthlyPrice;
    const yearlyTotal = activeCard.dataset.yearlyTotal;
    const savings = activeCard.dataset.savings;
    
    // Update price display
    if (DOM.summaryPrice) {
        if (billingType === 'annual') {
            DOM.summaryPrice.innerHTML = `$${monthlyPrice}<span class="summary-period">/month</span>`;
        } else {
            DOM.summaryPrice.innerHTML = `$${monthlyPrice}<span class="summary-period">/month</span>`;
        }
    }
    
    // Update frequency
    if (DOM.summaryFrequency) {
        DOM.summaryFrequency.textContent = billingType === 'annual' ? 'Annually' : 'Monthly';
    }
    
    // Update total
    if (DOM.summaryTotal) {
        if (billingType === 'annual') {
            DOM.summaryTotal.textContent = `$${yearlyTotal}`;
        } else {
            DOM.summaryTotal.textContent = `$${yearlyTotal}`;
        }
    }
    
    // Update or hide savings section
    if (DOM.summarySavingsContainer) {
        if (savings > 0) {
            const savingsAmount = (monthlyPrice * 12) - yearlyTotal;
            const savingsValue = DOM.summarySavingsContainer.querySelector('.summary-savings-value');
            if (savingsValue) {
                savingsValue.textContent = `$${savingsAmount}/year`;
            }
            DOM.summarySavingsContainer.style.display = 'block';
        } else {
            DOM.summarySavingsContainer.style.display = 'none';
        }
    }
}

/**
 * Update CTA Button Text Based on Billing Type
 */
function updateCtaButton() {
    const billingType = CheckoutState.getBillingType();
    
    if (!DOM.ctaButton) return;
    
    if (billingType === 'annual') {
        DOM.ctaButton.textContent = 'Start Free Trial - Annual Plan';
        DOM.ctaButton.dataset.billingType = 'annual';
    } else {
        DOM.ctaButton.textContent = 'Start Free Trial - Monthly Plan';
        DOM.ctaButton.dataset.billingType = 'monthly';
    }
}

/**
 * Format Card Number Input
 * Spaces every 4 digits
 * @param {Event} event - Input event
 */
function formatCardNumber(event) {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    event.target.value = formattedValue;
}

/**
 * Format Expiry Date Input
 * Format: MM/YY
 * @param {Event} event - Input event
 */
function formatExpiryDate(event) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    event.target.value = value;
}

/**
 * Format CVV Input
 * Digits only, max 4 characters
 * @param {Event} event - Input event
 */
function formatCVV(event) {
    event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4);
}

/**
 * Handle Checkout Button Click
 * @param {Event} event - Click event
 */
function handleCheckoutClick(event) {
    event.preventDefault();
    
    const billingType = CheckoutState.getBillingType();
    
    // Show loading state
    showCheckoutLoading();
    
    // Simulate checkout process (replace with actual API call)
    setTimeout(() => {
        hideCheckoutLoading();
        showNotification(
            `Checkout initiated: ${billingType} billing`,
            'success'
        );
        
        // In production, you would redirect or show a success screen
        console.log({
            billingType,
            timestamp: new Date().toISOString()
        });
    }, 1500);
}

/**
 * Show Checkout Loading State
 */
function showCheckoutLoading() {
    if (!DOM.ctaButton) return;
    
    const originalText = DOM.ctaButton.textContent;
    DOM.ctaButton.disabled = true;
    DOM.ctaButton.textContent = 'Processing...';
    DOM.ctaButton.dataset.originalText = originalText;
    DOM.ctaButton.style.opacity = '0.7';
}

/**
 * Hide Checkout Loading State
 */
function hideCheckoutLoading() {
    if (!DOM.ctaButton) return;
    
    const originalText = DOM.ctaButton.dataset.originalText;
    DOM.ctaButton.disabled = false;
    DOM.ctaButton.textContent = originalText;
    DOM.ctaButton.style.opacity = '1';
}

/**
 * Show Notification Toast
 * @param {string} message - Notification message
 * @param {string} type - Notification type ('success', 'error', 'info')
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '9999',
        maxWidth: '400px',
        animation: 'slideUp 0.3s ease-out',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
    });
    
    // Set colors based on type
    if (type === 'success') {
        Object.assign(notification.style, {
            backgroundColor: 'rgba(16, 185, 129, 0.9)',
            color: 'white'
        });
    } else if (type === 'error') {
        Object.assign(notification.style, {
            backgroundColor: 'rgba(239, 68, 68, 0.9)',
            color: 'white'
        });
    } else {
        Object.assign(notification.style, {
            backgroundColor: 'rgba(168, 85, 247, 0.9)',
            color: 'white'
        });
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Add animation styles to document
 */
function addAnimationStyles() {
    if (document.getElementById('notification-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideUp {
            from {
                transform: translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize Page
 */
function initializePage() {
    // Add animation styles
    addAnimationStyles();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Set initial summary
    updateSummarySection();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}


