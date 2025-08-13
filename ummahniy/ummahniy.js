// --- Global Variables ---
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');
const backToTopBtn = document.getElementById('back-to-top');
const breadcrumb = document.getElementById('breadcrumb');
const currentPageSpan = document.getElementById('current-page');

// --- Page Navigation System ---
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.classList.add('fade-in');

        // Remove fade-in class after animation
        setTimeout(() => {
            targetPage.classList.remove('fade-in');
        }, 500); // Match CSS transition duration
    }

    // Update navigation active state
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeBtn = document.querySelector(`[data-page="${pageName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Update breadcrumb
    updateBreadcrumb(pageName);

    // Scroll to top of the page when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Reset filters on shop page when navigating to it
    if (pageName === 'shop') {
        applyCategoryFilter('all');
        const allCategoryBtn = document.querySelector('#category-filter button[data-category="all"]');
        if (allCategoryBtn) {
            allCategoryBtn.classList.add('active-category-btn');
            // Ensure other category buttons are inactive
            document.querySelectorAll('#category-filter button:not([data-category="all"])').forEach(btn => {
                btn.classList.remove('active-category-btn');
            });
        }
    }
}

function updateBreadcrumb(pageName) {
    if (pageName === 'home') {
        breadcrumb.classList.add('hidden');
    } else {
        breadcrumb.classList.remove('hidden');
        currentPageSpan.textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    }
}

// --- Cart Functionality ---
document.addEventListener('click', function (e) {
    if (e.target.closest('.add-to-cart')) {
        e.preventDefault();
        const button = e.target.closest('.add-to-cart');

        // Animation
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);

        // Update cart
        cartCount++;
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }

        // Success feedback notification
        const productCard = button.closest('.neomorphic-card');
        const productName = productCard ? productCard.querySelector('h4').textContent : 'Produk';

        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 transform translate-x-full transition-transform';
        notification.textContent = `${productName} ditambahkan ke keranjang!`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});

// --- Back to Top Functionality ---
window.addEventListener('scroll', () => {
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- Contact Form Submission ---
document.addEventListener('submit', function (e) {
    if (e.target.id === 'contact-form') { // Target the form by its ID
        e.preventDefault();

        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 transform translate-x-full transition-transform';
        notification.textContent = 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);

        // Reset form
        e.target.reset();
    }
});

// --- Category Filter Functionality (for Shop page) ---
function applyCategoryFilter(category) {
    const products = document.querySelectorAll('.product-item');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block'; // Show product
        } else {
            product.style.display = 'none'; // Hide product
        }
    });
}

document.addEventListener('click', function (e) {
    if (e.target.closest('#category-filter')) { // Event listener on parent for efficiency
        const clickedButton = e.target.closest('button');
        if (clickedButton) {
            const category = clickedButton.dataset.category;

            // Remove active class from all category buttons
            document.querySelectorAll('#category-filter button').forEach(btn => {
                btn.classList.remove('active-category-btn');
                btn.classList.add('text-gray-700', 'hover:bg-terracotta', 'hover:text-white');
                btn.classList.remove('bg-terracotta', 'text-white'); // Ensure default neomorphic button style
            });

            // Add active class to clicked button
            clickedButton.classList.add('active-category-btn');
            clickedButton.classList.remove('text-gray-700', 'hover:bg-terracotta', 'hover:text-white');
            clickedButton.classList.add('bg-terracotta', 'text-white'); // Apply active color

            applyCategoryFilter(category);
        }
    }
});


// --- Initial Page Load ---
document.addEventListener('DOMContentLoaded', function () {
    showPage('home'); // Display the home page by default
});
