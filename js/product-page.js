// js/product-page.js

// Barcha kod bitta DOMContentLoaded ichida bo'lishi shart
document.addEventListener('DOMContentLoaded', function() {
    
    // --- "MA'LUMOTLAR BAZASI": Qaysi o'lcham qaysi mashinaga mos keladi ---
    const compatibilityDatabase = {
        "205/55 R16": [
            "Chevrolet Lacetti", "Hyundai Elantra", "Kia Cerato", "Kia Ceed",
            "Volkswagen Jetta", "Ford Focus", "Toyota Corolla", "Mazda 3",
            "Skoda Octavia", "Honda Civic", "Renault Megane"
        ],
        "185/65 R15": [
            "Chevrolet Cobalt", "Chevrolet Nexia 3", "Lada Vesta", "Hyundai Accent",
            "Kia Rio", "Renault Sandero"
        ],
        "215/60 R17": [
            "Toyota Camry", "Hyundai Sonata (ba'zi mod.)", "Kia K5 (ba'zi mod.)", 
            "Nissan Qashqai", "Mitsubishi Outlander"
        ]
    };

    // --- Sahifadagi asosiy elementlarni topish ---
    const productInfo = document.querySelector('.product-info');
    const modal = document.getElementById('compatibility-modal');
    const openModalBtn = document.getElementById('show-compatibility-modal');
    const closeModalSpan = modal ? modal.querySelector('.close-modal') : null; // Modal mavjud bo'lsa qidirish

    // --- Modal Oynani Boshqarish ---
    if (modal && openModalBtn && closeModalSpan && productInfo) {
        
        // "Batafsil ro'yxat" tugmasini bosganda modalni ochish
        openModalBtn.addEventListener('click', function() {
            const currentTireSize = productInfo.dataset.tireSize;
            if (!currentTireSize) {
                console.error("Mahsulot uchun 'data-tire-size' atributi topilmadi!");
                return;
            }

            const modalTitle = document.getElementById('modal-tire-size');
            const carListContainer = document.getElementById('modal-car-list');
            
            modalTitle.textContent = `O'lcham: ${currentTireSize}`;
            carListContainer.innerHTML = ''; // Eski ro'yxatni tozalash

            if (compatibilityDatabase[currentTireSize]) {
                const cars = compatibilityDatabase[currentTireSize];
                cars.forEach(carName => {
                    const listItem = document.createElement('li');
                    listItem.textContent = carName;
                    carListContainer.appendChild(listItem);
                });
            } else {
                carListContainer.innerHTML = '<li>Bu o\'lcham uchun hozircha mos keladigan avtomobillar ro\'yxati kiritilmagan.</li>';
            }
            modal.style.display = "block";
        });

        // "x" belgisi bosilganda modalni yopish
        closeModalSpan.addEventListener('click', function() {
            modal.style.display = "none";
        });

        // Modal oynadan tashqariga bosilganda yopish
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }
    
    // --- Savatga Qo'shish Mantig'i ---
    const addToCartBtn = document.querySelector('.add-to-cart-btn.large-btn');
    if (addToCartBtn && productInfo) {
        addToCartBtn.addEventListener('click', function() {
            const productId = productInfo.dataset.id;
            const productName = productInfo.dataset.name;
            const quantity = parseInt(document.getElementById('quantity').value);

            // common.js dagi global funksiyani chaqirishga urinish
            if (typeof addToCart === 'function') {
                addToCart(productId, quantity); // Bu funksiya common.js da bo'lishi kerak
                alert(`${quantity} dona "${productName}" savatga muvaffaqiyatli qo'shildi!`);
            } else {
                alert(`"${productName}" savatga qo'shildi (prototip rejimi).`);
                console.log(`Funksiya topilmadi: addToCart. ${quantity} dona ${productName} (ID: ${productId}) savatga qo'shildi.`);
            }
        });
    }

});