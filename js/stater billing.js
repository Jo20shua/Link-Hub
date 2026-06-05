/* ============================================
   CHECKOUT PAGE - VANILLA JAVASCRIPT
   ============================================ */

/**
 * Checkout State Manager
 * Manages the current state of billing selection and payment method
 */
const CheckoutState = {
    selectedBillingType: 'annual',
    selectedPaymentMethod: 'card',
    
    setBillingType(type) {
        this.selectedBillingType = type;
    },
    
    setPaymentMethod(method) {
        this.selectedPaymentMethod = method;
    },
    
    getBillingType() {
        return this.selectedBillingType;
    },
    
    getPaymentMethod() {
        return this.selectedPaymentMethod;
    }
};

/**
 * DOM Element Selectors
 * Centralized references to all DOM elements
 */
const DOM = {
    // Billing cards
    billingCards: document.querySelectorAll('.billing-card'),
    
    // Payment tabs
    paymentTabs: document.querySelectorAll('.payment-tab'),
    paymentTabContents: document.querySelectorAll('.payment-tab-content'),
    
    // Form inputs
    cardInputs: document.querySelectorAll('.card-form .form-input'),
    bankInputs: document.querySelectorAll('.bank-form .form-input'),
    
    // Summary elements
    summaryPrice: document.getElementById('summary-price'),
    summaryFrequency: document.getElementById('summary-frequency'),
    summaryTotal: document.getElementById('summary-total'),
    summarySavingsContainer: document.getElementById('summary-savings-container'),
    
    // CTA Button
    ctaButton: document.getElementById('checkout-button'),
    
    // Forms
    cardForm: document.getElementById('card-form'),
    bankForm: document.getElementById('bank-form')
};

/**
 * Initialize Event Listeners
 */
function initializeEventListeners() {
    // Billing card selection
    DOM.billingCards.forEach(card => {
        card.addEventListener('click', handleBillingCardClick);
    });
    
    // Payment tab switching
    DOM.paymentTabs.forEach(tab => {
        tab.addEventListener('click', handlePaymentTabClick);
    });
    
    // Form input formatting
    document.getElementById('card-number')?.addEventListener('input', formatCardNumber);
    document.getElementById('expiry-date')?.addEventListener('input', formatExpiryDate);
    document.getElementById('cvv')?.addEventListener('input', formatCVV);
    
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
 * Handle Payment Tab Switching
 * @param {Event} event - Click event
 */
function handlePaymentTabClick(event) {
    const clickedTab = event.currentTarget;
    const tabName = clickedTab.dataset.tab;
    
    // Update state
    CheckoutState.setPaymentMethod(tabName);
    
    // Remove active class from all tabs and contents
    DOM.paymentTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    DOM.paymentTabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to clicked tab
    clickedTab.classList.add('active');
    
    // Show corresponding content
    const activeContent = document.getElementById(`${tabName}-tab`);
    if (activeContent) {
        activeContent.classList.add('active');
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
    const paymentMethod = CheckoutState.getPaymentMethod();
    
    // Validate form based on payment method
    if (!validateForm(paymentMethod)) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Show loading state
    showCheckoutLoading();
    
    // Simulate checkout process (replace with actual API call)
    setTimeout(() => {
        hideCheckoutLoading();
        showNotification(
            `Checkout initiated: ${billingType} billing via ${paymentMethod}`,
            'success'
        );
        
        // In production, you would redirect or show a success screen
        console.log({
            billingType,
            paymentMethod,
            timestamp: new Date().toISOString()
        });
    }, 1500);
}

/**
 * Validate Form Based on Payment Method
 * @param {string} paymentMethod - Payment method to validate
 * @returns {boolean} - Is valid
 */
function validateForm(paymentMethod) {
    if (paymentMethod === 'card') {
        return validateCardForm();
    } else if (paymentMethod === 'bank') {
        return validateBankForm();
    }
    return false;
}

/**
 * Validate Card Form
 * @returns {boolean} - Is valid
 */
function validateCardForm() {
    const cardholderName = document.getElementById('cardholder-name');
    const cardNumber = document.getElementById('card-number');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    
    return (
        cardholderName?.value.trim().length > 0 &&
        cardNumber?.value.replace(/\s/g, '').length === 16 &&
        expiryDate?.value.match(/^\d{2}\/\d{2}$/) &&
        cvv?.value.match(/^\d{3,4}$/)
    );
}

/**
 * Validate Bank Form
 * @returns {boolean} - Is valid
 */
function validateBankForm() {
    const bankSelect = document.getElementById('bank-select');
    return bankSelect?.value !== '';
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

/* ============================================
   UTILITY FUNCTIONS FOR FUTURE ENHANCEMENTS
   ============================================ */

/**
 * Get current checkout data
 * Useful for debugging or API calls
 * @returns {object} - Current checkout state and form data
 */
function getCheckoutData() {
    const activeCard = document.querySelector('.billing-card.active');
    const paymentMethod = CheckoutState.getPaymentMethod();
    
    const data = {
        billingType: CheckoutState.getBillingType(),
        monthlyPrice: activeCard?.dataset.monthlyPrice,
        yearlyTotal: activeCard?.dataset.yearlyTotal,
        savings: activeCard?.dataset.savings,
        paymentMethod: paymentMethod
    };
    
    // Add form data if card payment
    if (paymentMethod === 'card') {
        data.card = {
            cardholder: document.getElementById('cardholder-name')?.value,
            cardNumber: document.getElementById('card-number')?.value,
            expiryDate: document.getElementById('expiry-date')?.value,
            cvv: document.getElementById('cvv')?.value
        };
    } else if (paymentMethod === 'bank') {
        data.bank = {
            selectedBank: document.getElementById('bank-select')?.value
        };
    }
    
    return data;
}

/**
 * Reset form to initial state
 */
function resetCheckoutForm() {
    // Reset to annual billing
    CheckoutState.setBillingType('annual');
    const annualCard = document.querySelector('[data-billing-type="annual"]');
    
    DOM.billingCards.forEach(card => card.classList.remove('active'));
    annualCard?.classList.add('active');
    
    // Reset to card payment
    CheckoutState.setPaymentMethod('card');
    DOM.paymentTabs.forEach(tab => tab.classList.remove('active'));
    DOM.paymentTabs[0]?.classList.add('active');
    DOM.paymentTabContents.forEach(content => content.classList.remove('active'));
    document.getElementById('card-tab')?.classList.add('active');
    
    // Clear form inputs
    document.getElementById('cardholder-name')?.setValue('');
    document.getElementById('card-number')?.setValue('');
    document.getElementById('expiry-date')?.setValue('');
    document.getElementById('cvv')?.setValue('');
    document.getElementById('bank-select')?.setValue('');
    
    // Update summary
    updateSummarySection();
    updateCtaButton();
}

/**
 * Update bank options (call this when you add banks)
 * @param {array} banks - Array of bank objects {code, name}
 */
function updateBankOptions(banks) {
    const bankSelect = document.getElementById('bank-select');
    if (!bankSelect) return;
    
    // Keep the default option
    bankSelect.innerHTML = '<option value="">Choose your bank</option>';
    
    // Add bank options
    banks.forEach(bank => {
        const option = document.createElement('option');
        option.value = bank.code;
        option.textContent = bank.name;
        bankSelect.appendChild(option);
    });
}

/**
 * Export checkout data (useful for logging/analytics)
 */
window.CheckoutAPI = {
    getState: () => getCheckoutData(),
    reset: () => resetCheckoutForm(),
    updateBanks: (banks) => updateBankOptions(banks)
};
