// js/common.js

document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.querySelector('.cart-count');
    let cart = JSON.parse(localStorage.getItem('shinaCart')) || [];

    function updateCart() {
        localStorage.setItem('shinaCart', JSON.stringify(cart));
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    }

    function addToCart(product, quantity = 1) {
        if (!product || !product.id || isNaN(product.price)) {
            console.error("Noto'g'ri mahsulot ma'lumoti:", product);
            return;
        }
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity: quantity });
        }
        updateCart();
    }
    
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productContainer = e.target.closest('.product-card, .product-info');
            if (!productContainer || !productContainer.dataset.id) return;

            const product = {
                id: productContainer.dataset.id,
                name: productContainer.dataset.name,
                price: parseFloat(productContainer.dataset.price),
                image: productContainer.dataset.image
            };
            
            const quantityInput = productContainer.querySelector('#quantity');
            const quantityToAdd = quantityInput ? parseInt(quantityInput.value) : 1;
            addToCart(product, quantityToAdd);

            button.textContent = 'Qo\'shildi!';
            setTimeout(() => {
                if (button.classList.contains('large-btn')) {
                    button.innerHTML = '<i class="fa fa-shopping-cart"></i> Savatga qo\'shish';
                } else {
                    button.textContent = 'Savatga qo\'shish';
                }
            }, 1500);
        });
    });

    updateCart();
});