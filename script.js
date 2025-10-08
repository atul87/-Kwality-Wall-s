// Product data
const products = [
    {
        id: 1,
        name: "Classic Vanilla Cone",
        price: 25,
        image: "https://kwalitywalls-cascaron-9c3e15.netlify.app/assets/img/download%20(3).jpeg",
        category: "Cones",
        description: "Rich and creamy vanilla ice cream in a crispy cone"
    },
    {
        id: 2,
        name: "Chocolate Fudge Sundae",
        price: 85,
        image: "https://kwalitywalls-cascaron-9c3e15.netlify.app/assets/img/download%20(6).jpeg",
        category: "Sundaes",
        description: "Decadent chocolate ice cream topped with fudge sauce and nuts"
    },
    {
        id: 3,
        name: "Strawberry Delight Cake",
        price: 450,
        image: "https://kwalitywalls-cascaron-9c3e15.netlify.app/assets/img/download%20(7).jpeg",
        category: "Cakes",
        description: "Fresh strawberry ice cream layered in a delicious cake"
    },
    {
        id: 4,
        name: "Mango Mania Ice Cream",
        price: 65,
        image: "https://kwalitywalls-cascaron-9c3e15.netlify.app/assets/img/images.jpeg",
        category: "Ice Creams",
        description: "Refreshing mango flavor with real fruit pieces"
    },
    {
        id: 5,
        name: "Butterscotch Ripple",
        price: 75,
        image: "https://kwalitywalls-cascaron-9c3e15.netlify.app/assets/img/344519-6.webp",
        category: "Ice Creams",
        description: "Creamy butterscotch with delicious ripple swirls"
    },
    {
        id: 6,
        name: "Rainbow Sprinkle Cone",
        price: 35,
        image: "https://kwalitywalls-cascaron-9c3e15.netlify.app/assets/img/download%20(8).jpeg",
        category: "Cones",
        description: "Vanilla ice cream with colorful sprinkles in a waffle cone"
    }
];

// Cart array to store items
let cart = [];

// Current testimonial index
let currentTestimonial = 0;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // Initialize the page
    initPage();
    
    // Add event listeners
    setupEventListeners();
    
    // Load cart from localStorage
    loadCart();
    
    // Animate elements when they come into view
    setupScrollAnimations();
});

// Initialize the page
function initPage() {
    // Render products
    renderProducts(products);
    
    // Initialize carousel
    initializeCarousel();
    
    // Animate stats counter
    animateStats();
    
    // Set active testimonial
    showTestimonial(currentTestimonial);
}

// Set up event listeners
function setupEventListeners() {
    // Login button
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        });
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (email && password) {
                alert('Login successful!');
                const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                loginModal.hide();
                
                // Update UI to show user is logged in
                const loginButton = document.getElementById('loginButton');
                if (loginButton) {
                    loginButton.textContent = 'My Account';
                    loginButton.removeEventListener('click', loginButton.onclick);
                    loginButton.addEventListener('click', function() {
                        alert('Welcome to your account!');
                    });
                }
            }
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            
            // Simple validation
            if (name && email && password) {
                alert('Account created successfully!');
                const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
                signupModal.hide();
                
                // Update UI to show user is logged in
                const loginButton = document.getElementById('loginButton');
                if (loginButton) {
                    loginButton.textContent = 'My Account';
                    loginButton.removeEventListener('click', loginButton.onclick);
                    loginButton.addEventListener('click', function() {
                        alert('Welcome to your account!');
                    });
                }
            }
        });
    }
    
    // Show signup modal from login modal
    const showSignup = document.getElementById('showSignup');
    if (showSignup) {
        showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();
            
            setTimeout(() => {
                const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
                signupModal.show();
            }, 300);
        });
    }
    
    // Show login modal from signup modal
    const showLogin = document.getElementById('showLogin');
    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
            signupModal.hide();
            
            setTimeout(() => {
                const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                loginModal.show();
            }, 300);
        });
    }
    
    // Cart button
    const cartButton = document.getElementById('cartButton');
    if (cartButton) {
        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
            cartModal.show();
            renderCart();
        });
    }
    
    // Checkout button
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            if (cart.length > 0) {
                alert('Order placed successfully! Thank you for your purchase.');
                cart = [];
                updateCartCount();
                renderCart();
                const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
                cartModal.hide();
            } else {
                alert('Your cart is empty!');
            }
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            if (email) {
                const messageDiv = document.getElementById('newsletterMessage');
                messageDiv.innerHTML = '<div class="alert alert-success">Thank you for subscribing to our newsletter!</div>';
                document.getElementById('newsletterEmail').value = '';
                
                setTimeout(() => {
                    messageDiv.innerHTML = '';
                }, 3000);
            }
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            
            if (name && email && subject && message) {
                const messageDiv = document.getElementById('contactMessage');
                messageDiv.innerHTML = '<div class="alert alert-success">Thank you for your message! We will get back to you soon.</div>';
                contactForm.reset();
                
                setTimeout(() => {
                    messageDiv.innerHTML = '';
                }, 3000);
            }
        });
    }
    
    // Testimonial navigation
    const prevTestimonial = document.getElementById('prevTestimonial');
    const nextTestimonial = document.getElementById('nextTestimonial');
    const addTestimonial = document.getElementById('addTestimonial');
    
    if (prevTestimonial) {
        prevTestimonial.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + 3) % 3;
            showTestimonial(currentTestimonial);
        });
    }
    
    if (nextTestimonial) {
        nextTestimonial.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % 3;
            showTestimonial(currentTestimonial);
        });
    }
    
    if (addTestimonial) {
        addTestimonial.addEventListener('click', function() {
            const testimonialModal = new bootstrap.Modal(document.getElementById('testimonialModal'));
            testimonialModal.show();
        });
    }
    
    // Testimonial form
    const testimonialForm = document.getElementById('testimonialForm');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('testimonialName').value;
            const text = document.getElementById('testimonialText').value;
            const rating = document.getElementById('testimonialRating').value;
            
            if (name && text && rating) {
                alert('Thank you for your review!');
                const testimonialModal = bootstrap.Modal.getInstance(document.getElementById('testimonialModal'));
                testimonialModal.hide();
                testimonialForm.reset();
            }
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
            renderProducts(filteredProducts);
        });
    }
}

// Render products
function renderProducts(productsToRender) {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer) return;
    
    if (productsToRender.length === 0) {
        productsContainer.innerHTML = '<p class="text-center">No products found.</p>';
        return;
    }
    
    let productsHTML = '';
    productsToRender.forEach(product => {
        productsHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card product-item">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fw-bold">₹${product.price}</span>
                            <button class="btn btn-danger btn-sm add-to-cart" data-id="${product.id}">
                                <i class="bi bi-cart-plus"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    productsContainer.innerHTML = productsHTML;
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Update cart count
    updateCartCount();
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show confirmation
    alert(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Render cart
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        cartItems.innerHTML = '';
        cartTotal.textContent = '0';
        return;
    }
    
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    
    let cartHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h6>${item.name}</h6>
                    <p class="cart-item-price">₹${item.price} × ${item.quantity}</p>
                </div>
                <div class="cart-item-total">₹${itemTotal}</div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
    });
    
    cartItems.innerHTML = cartHTML;
    cartTotal.textContent = total;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Initialize carousel
function initializeCarousel() {
    // Carousel is handled by Bootstrap
}

// Show testimonial
function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            testimonial.classList.add('active');
        } else {
            testimonial.classList.remove('active');
        }
    });
}

// Animate stats counter
function animateStats() {
    const counters = document.querySelectorAll('.stats-counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 16ms per frame
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// Set up scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements that should be animated
    document.querySelectorAll('.fade-in, .about-content, .about-image, .stats-counter, .category-tile').forEach(el => {
        observer.observe(el);
    });
}

// Handle scroll events
window.addEventListener('scroll', function() {
    // Add scrolled class to header
    const header = document.querySelector('.kw-header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Animate elements when they come into view
    setupScrollAnimations();
});