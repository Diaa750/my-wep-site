let cart = [];
let totalPrice = 0;

function addToCart(productName) {
    const productPrice = parseInt(productName.match(/(\d+)/)[0]); 
    cart.push(productName);
    totalPrice += productPrice;

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cartItems.appendChild(li);
    });

    document.getElementById('total-price').textContent = totalPrice;
}

function filterProducts(category) {
    // هنا يمكنك إضافة منطق لتصفية المنتجات حسب الفئة المختارة
    console.log(`تصفية المنتجات حسب: ${category}`);
}