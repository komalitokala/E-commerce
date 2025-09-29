// Product data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "electronics",
    price: 24999, // ₹24,999
    rating: 4.8,
    image: "./public/premium-wireless-headphones.png",
    imageBack: "./public/wireless-headphones-side.png",
    description: "High-quality wireless headphones with noise cancellation",
  },
  {
    id: 2,
    name: "Luxury Leather Jacket",
    category: "fashion",
    price: 49999, // ₹49,999
    rating: 4.9,
    image: "./public/luxury-leather-jacket.jpg",
    imageBack: "./public/leather-jacket-back.png",
    description: "Genuine leather jacket with premium craftsmanship",
  },
  {
    id: 3,
    name: "Smart Home Speaker",
    category: "electronics",
    price: 16699, // ₹16,699
    rating: 4.6,
    image: "./public/smart-home-speaker.png",
    imageBack: "./public/smart-speaker-top-view.jpg",
    description: "Voice-controlled smart speaker with premium sound",
  },
  {
    id: 4,
    name: "Designer Handbag",
    category: "fashion",
    price: 74999, // ₹74,999
    rating: 4.7,
    image: "./public/luxury-quilted-handbag.png",
    imageBack: "./public/handbag-interior-view.jpg",
    description: "Elegant designer handbag made from premium materials",
  },
  {
    id: 5,
    name: "Modern Table Lamp",
    category: "home",
    price: 12499, // ₹12,499
    rating: 4.5,
    image: "./public/modern-table-lamp.jpg",
    imageBack: "./public/table-lamp-illuminated.jpg",
    description: "Contemporary table lamp with adjustable brightness",
  },
  {
    id: 6,
    name: "Premium Watch",
    category: "accessories",
    price: 107999, // ₹1,07,999
    rating: 4.9,
    image: "./public/premium-luxury-watch.jpg",
    imageBack: "./public/watch-back-case-view.jpg",
    description: "Swiss-made luxury watch with sapphire crystal",
  },
  {
    id: 7,
    name: "Wireless Charging Pad",
    category: "electronics",
    price: 6699, // ₹6,699
    rating: 4.4,
    image: "./public/wireless-charging-pad.png",
    imageBack: "./public/charging-pad-with-phone.jpg",
    description: "Fast wireless charging pad compatible with all devices",
  },
  {
    id: 8,
    name: "Cashmere Scarf",
    category: "fashion",
    price: 20799, // ₹20,799
    rating: 4.8,
    image: "./public/cashmere-scarf.png",
    imageBack: "./public/scarf-texture-detail.jpg",
    description: "Luxurious cashmere scarf in multiple colors",
  },
  {
    id: 9,
    name: "Ceramic Vase Set",
    category: "home",
    price: 15799, // ₹15,799
    rating: 4.6,
    image: "./public/ceramic-vase-set.png",
    imageBack: "./public/vases-with-flowers.jpg",
    description: "Handcrafted ceramic vase set for home decoration",
  },
  {
    id: 10,
    name: "Leather Wallet",
    category: "accessories",
    price: 10799, // ₹10,799
    rating: 4.7,
    image: "./public/leather-wallet.jpg",
    imageBack: "./public/wallet-interior-compartments.jpg",
    description: "Premium leather wallet with RFID protection",
  },
  {
    id: 11,
    name: "Bluetooth Earbuds",
    category: "electronics",
    price: 13299, // ₹13,299
    rating: 4.5,
    image: "./public/bluetooth-earbuds.jpg",
    imageBack: "./public/earbuds-charging-case.jpg",
    description: "True wireless earbuds with premium sound quality",
  },
  {
    id: 12,
    name: "Silk Dress",
    category: "fashion",
    price: 33299, // ₹33,299
    rating: 4.8,
    image: "./public/flowing-silk-dress.png",
    imageBack: "./public/dress-fabric-detail.jpg",
    description: "Elegant silk dress perfect for special occasions",
  },
]

// Shopping cart
let cart = []
const likedProducts = []
let filteredProducts = [...products]

// DOM elements
const productsGrid = document.getElementById("products-grid")
const cartCount = document.getElementById("cart-count")
const cartItems = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const filterButtons = document.querySelectorAll(".filter-btn")
const sortSelect = document.getElementById("sortSelect")
const searchInput = document.getElementById("searchInput")
const searchResults = document.getElementById("searchResults")
const checkoutBtn = document.getElementById("checkout-btn")

// Import Bootstrap
const bootstrap = window.bootstrap

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  renderProducts()
  updateCartUI()
  setupEventListeners()

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

// Setup event listeners
function setupEventListeners() {
  // Filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.dataset.category
      filterProducts(category)

      // Update active button
      filterButtons.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Sort select
  sortSelect.addEventListener("change", function () {
    sortProducts(this.value)
  })

  // Search functionality
  searchInput.addEventListener("input", function () {
    searchProducts(this.value)
  })

  // Checkout button
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!")
      return
    }

    // Simulate checkout process
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    alert(`Thank you for your purchase! Total: ${formatINR(total)}`)

    // Clear cart
    cart = []
    updateCartUI()

    // Close cart offcanvas
    const cartOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("cartOffcanvas"))
    if (cartOffcanvas) {
      cartOffcanvas.hide()
    }
  })

  // Contact form
  const contactForm = document.querySelector(".contact-form")
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Show success message
    const alert = document.createElement("div")
    alert.className = "alert alert-success mt-3"
    alert.innerHTML = '<i class="fas fa-check-circle me-2"></i>Thank you! Your message has been sent successfully.'

    this.appendChild(alert)
    this.reset()

    // Remove alert after 5 seconds
    setTimeout(() => {
      alert.remove()
    }, 5000)
  })
}

// Add this helper function for INR formatting
function formatINR(amount) {
  return "₹" + amount.toLocaleString("en-IN")
}

// Render products
function renderProducts() {
  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or search terms</p>
                </div>
            </div>
        `
    return
  }

  productsGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="product-card fade-in-up">
                <div class="product-image-container">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" class="product-image-front">
                        <img src="${product.imageBack}" alt="${product.name}" class="product-image-back">
                    </div>
                    <button class="quick-view-btn" onclick="quickView(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <!-- Added like button with dynamic heart icon -->
                    <button class="like-btn ${likedProducts.includes(product.id) ? "liked" : ""}" onclick="toggleLike(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                    <h5 class="product-title">${product.name}</h5>
                    <!-- Updated rating display to use dynamic stars -->
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span class="ms-2 text-muted">(${product.rating})</span>
                    </div>
                    <div class="product-price">${formatINR(product.price)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Generate star rating
function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let stars = ""

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star text-warning"></i>'
  }

  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt text-warning"></i>'
  }

  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star text-muted"></i>'
  }

  return stars
}

function toggleLike(productId) {
  const index = likedProducts.indexOf(productId)

  if (index > -1) {
    // Remove from liked products
    likedProducts.splice(index, 1)
    showLikeFeedback(false)
  } else {
    // Add to liked products
    likedProducts.push(productId)
    showLikeFeedback(true)
  }

  // Re-render products to update like button states
  renderProducts()

  // Update liked products count in filter button
  updateLikedProductsButton()
}

function showLikeFeedback(isLiked) {
  const notification = document.createElement("div")
  notification.className = "alert position-fixed"
  notification.style.cssText = "top: 100px; right: 20px; z-index: 9999; min-width: 250px;"

  if (isLiked) {
    notification.classList.add("alert-danger")
    notification.innerHTML = '<i class="fas fa-heart me-2"></i>Added to favorites!'
  } else {
    notification.classList.add("alert-secondary")
    notification.innerHTML = '<i class="far fa-heart me-2"></i>Removed from favorites!'
  }

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 2000)
}

function updateLikedProductsButton() {
  const likedBtn = document.querySelector('[data-category="liked"]')
  if (likedBtn) {
    const count = likedProducts.length
    if (count > 0) {
      likedBtn.innerHTML = `<i class="fas fa-heart me-1"></i>Liked Products (${count})`
    } else {
      likedBtn.innerHTML = `<i class="fas fa-heart me-1"></i>Liked Products`
    }
  }
}

// Filter products
function filterProducts(category) {
  if (category === "all") {
    filteredProducts = [...products]
  } else if (category === "liked") {
    filteredProducts = products.filter((product) => likedProducts.includes(product.id))
  } else {
    filteredProducts = products.filter((product) => product.category === category)
  }

  renderProducts()
}

// Sort products
function sortProducts(sortBy) {
  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "name":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
    default:
      filteredProducts = [...products]
  }

  renderProducts()
}

// Search products
function searchProducts(query) {
  if (!query.trim()) {
    searchResults.innerHTML = ""
    return
  }

  const results = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()),
  )

  searchResults.innerHTML = results
    .map(
      (product) => `
        <div class="search-result-item" onclick="selectSearchResult(${product.id})">
            <div class="d-flex align-items-center">
                <img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 5px;" class="me-3">
                <div>
                    <div class="fw-bold">${product.name}</div>
                    <div class="text-muted small">${formatINR(product.price)}</div>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Select search result
function selectSearchResult(productId) {
  const product = products.find((p) => p.id === productId)
  if (product) {
    // Filter to show only this product's category
    filterProducts(product.category)

    // Update active filter button
    filterButtons.forEach((btn) => {
      btn.classList.remove("active")
      if (btn.dataset.category === product.category) {
        btn.classList.add("active")
      }
    })

    // Close search modal
    const searchModal = bootstrap.Modal.getInstance(document.getElementById("searchModal"))
    if (searchModal) {
      searchModal.hide()
    }

    // Scroll to products section
    document.getElementById("products").scrollIntoView({ behavior: "smooth" })

    // Clear search
    searchInput.value = ""
    searchResults.innerHTML = ""
  }
}

// Add to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      ...product,
      quantity: 1,
    })
  }

  updateCartUI()
  showAddToCartFeedback()
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  updateCartUI()
}

// Update quantity
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (!item) return

  item.quantity += change

  if (item.quantity <= 0) {
    removeFromCart(productId)
  } else {
    updateCartUI()
  }
}

// Update cart UI
function updateCartUI() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems

  // Update cart items
  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <h5>Your cart is empty</h5>
                <p>Add some products to get started</p>
            </div>
        `
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <div class="text-muted small">${formatINR(item.price)}</div>
                        <div class="quantity-controls mt-2">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="mx-2">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="text-end">
                        <div class="fw-bold">${formatINR(item.price * item.quantity)}</div>
                        <button class="btn btn-sm btn-outline-danger mt-1" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartTotal.textContent = formatINR(total)
}

// Show add to cart feedback
function showAddToCartFeedback() {
  // Create temporary notification
  const notification = document.createElement("div")
  notification.className = "alert alert-success position-fixed"
  notification.style.cssText = "top: 100px; right: 20px; z-index: 9999; min-width: 250px;"
  notification.innerHTML = '<i class="fas fa-check-circle me-2"></i>Product added to cart!'

  document.body.appendChild(notification)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Quick view function
function quickView(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const modalHTML = `
        <div class="modal fade" id="quickViewModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${product.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="position-relative">
                                    <img src="${product.image}" alt="${product.name}" class="img-fluid rounded">
                                    <button class="like-btn position-absolute ${likedProducts.includes(product.id) ? "liked" : ""}" 
                                            style="top: 10px; right: 10px;" onclick="toggleLike(${product.id})">
                                        <i class="fas fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="product-category text-muted mb-2">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                                <h4 class="mb-3">${product.name}</h4>
                                <div class="product-rating mb-3">
                                    ${generateStars(product.rating)}
                                    <span class="ms-2 text-muted">(${product.rating})</span>
                                </div>
                                <div class="product-price h3 text-primary mb-3">${formatINR(product.price)}</div>
                                <p class="mb-4">${product.description}</p>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-accent flex-grow-1" onclick="addToCart(${product.id}); bootstrap.Modal.getInstance(document.getElementById('quickViewModal')).hide();">
                                        <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                                    </button>
                                    <button class="btn btn-outline-danger" onclick="toggleLike(${product.id})">
                                        <i class="fas fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

  // Remove existing modal if any
  const existingModal = document.getElementById("quickViewModal")
  if (existingModal) {
    existingModal.remove()
  }

  // Add new modal to body
  document.body.insertAdjacentHTML("beforeend", modalHTML)

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById("quickViewModal"))
  modal.show()

  // Clean up when modal is hidden
  document.getElementById("quickViewModal").addEventListener("hidden.bs.modal", function () {
    this.remove()
  })
}

// Newsletter subscription
document.querySelector("footer .input-group .btn").addEventListener("click", function () {
  const emailInput = this.previousElementSibling
  const email = emailInput.value.trim()

  if (!email) {
    alert("Please enter your email address")
    return
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address")
    return
  }

  // Simulate subscription
  alert("Thank you for subscribing to our newsletter!")
  emailInput.value = ""
})

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Scroll animations
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".fade-in-up")
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("fade-in-up")
    }
  })
})

// Loading states for buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const button = e.target
    const originalText = button.innerHTML

    button.innerHTML = '<span class="loading"></span> Adding...'
    button.disabled = true

    setTimeout(() => {
      button.innerHTML = originalText
      button.disabled = false
    }, 1000)
  }
})
