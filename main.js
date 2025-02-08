
    // متغير لتخزين السلة
    let cart = [];

    // وظيفة لإضافة منتج إلى السلة
    function addToCart(name, price) {
        const product = { name, price };
        cart.push(product);
        updateCart();
    }

    // وظيفة لتحديث عرض السلة
    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += parseFloat(item.price);
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - ${item.price} دولار `;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'حذف';
            removeBtn.onclick = () => {
                removeFromCart(index);
            };
            listItem.appendChild(removeBtn);
            cartItems.appendChild(listItem);
        });

        cartTotal.textContent = `إجمالي: ${total.toFixed(2)} دولار`;
        document.getElementById('cart-button').textContent = `Cart (${cart.length})`;
    }

    // وظيفة لحذف منتج من السلة
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    // تفعيل زر "إضافة إلى السلة"
    document.querySelectorAll('.product-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productName = button.getAttribute('data-name');
            const productPrice = button.getAttribute('data-price');
            addToCart(productName, productPrice);
        });
    });

    // تفعيل زر السلة
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');

    cartButton.onclick = () => {
        cartModal.style.display = 'block';
        updateCart();
    };

    closeModal.onclick = () => {
        cartModal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    };

    // تفعيل زر "الدفع"
    document.getElementById('checkout-btn').onclick = () => {
        alert('شكرًا لتسوقك! سيتم الدفع الآن.');
        cart = []; // إعادة تعيين السلة بعد الدفع
        updateCart();
        cartModal.style.display = 'none';
    };
