// js/cart-page.js

document.addEventListener('DOMContentLoaded', () => {
    // Savatdagi ma'lumotlarni localStorage'dan oladi yoki bo'sh massiv yaratadi
    let cart = JSON.parse(localStorage.getItem('shinaCart')) || [];
    const cartContainer = document.querySelector('.cart-container');
    
    // Savat sahifasini ko'rsatish uchun funksiya
    function renderCartPage() {
        if (!cartContainer) return;

        // Agar savat bo'sh bo'lsa, maxsus xabar chiqaradi
        if (cart.length === 0) {
            cartContainer.innerHTML = `<div class="cart-empty"><h2>Savatda hozircha mahsulot yo'q</h2><p>Mahsulotlarni topish uchun katalogga o'ting.</p><a href="index.html" class="hero-btn">Katalogga o'tish</a></div>`;
            return;
        }
        
        let totalSum = 0;
        // Savatdagi har bir mahsulot uchun HTML qatorini yaratadi
        const cartItemsHTML = cart.map(item => {
            const price = item.price || 0;
            const quantity = item.quantity || 0;
            const itemTotal = price * quantity;
            totalSum += itemTotal; // Jami summani hisoblaydi
            return `<div class="cart-item" data-id="${item.id}"><img src="${item.image || ''}" alt="${item.name || ''}"><div class="item-details"><h3>${item.name}</h3><span class="price">${price.toLocaleString()} so'm</span></div><input type="number" value="${quantity}" min="1" class="item-quantity"><div class="item-total">${itemTotal.toLocaleString()} so'm</div><button class="remove-item-btn" title="O'chirish"><i class="fa fa-trash"></i></button></div>`;
        }).join('');

        // Mahsulotlar ro'yxati va buyurtma xulosasini sahifaga joylaydi
        cartContainer.innerHTML = `
            <div class="cart-items">${cartItemsHTML}</div>
            <!-- Buyurtma xulosasi bo'limi -->
            <div class="cart-summary">
                <h2>Buyurtma xulosasi</h2>
                <div class="summary-row">
                    <span>Mahsulotlar:</span>
                    <span>${totalSum.toLocaleString()} so'm</span>
                </div>
                <div class="summary-row">
                    <span>Yetkazib berish:</span>
                    <span>Bepul</span>
                </div>
                <div class="summary-total">
                    <span>Jami:</span>
                    <span>${totalSum.toLocaleString()} so'm</span>
                </div>
                <a href="checkout.html" class="checkout-btn">Rasmiylashtirishga o'tish</a>
            </div>`;
    }

    // Tugmalarni bosish va miqdorni o'zgartirishni boshqarish uchun funksiya
    function setupCartPageEventListeners() {
        if (!cartContainer) return;
        cartContainer.addEventListener('click', e => {
            // "O'chirish" tugmasi bosilganda mahsulotni savatdan olib tashlaydi
            if (e.target.closest('.remove-item-btn')) {
                const id = e.target.closest('.cart-item').dataset.id;
                cart = cart.filter(item => item.id !== id);
                localStorage.setItem('shinaCart', JSON.stringify(cart));
                window.location.reload(); // Sahifani yangilaydi
            }
        });
        cartContainer.addEventListener('change', e => {
            // Mahsulot miqdori o'zgartirilganda
            if (e.target.classList.contains('item-quantity')) {
                const id = e.target.closest('.cart-item').dataset.id;
                const newQuantity = parseInt(e.target.value);
                const itemInCart = cart.find(item => item.id === id);
                if (itemInCart && newQuantity > 0) {
                    itemInCart.quantity = newQuantity;
                } else {
                    // Agar miqdor 0 bo'lsa, mahsulotni o'chiradi
                    cart = cart.filter(item => item.id !== id);
                }
                localStorage.setItem('shinaCart', JSON.stringify(cart));
                renderCartPage(); // Savatni qayta chizadi
            }
        });
    }
    
    // Asosiy funksiyalarni ishga tushirish
    renderCartPage();
    setupCartPageEventListeners();
});