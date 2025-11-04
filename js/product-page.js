// js/product-page.js

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('compatibility-modal');
    if (!modal) return;

    const openModalBtn = document.getElementById('show-compatibility-modal');
    const closeModalBtn = modal.querySelector('.close-modal');

    if (openModalBtn) openModalBtn.addEventListener('click', () => { modal.style.display = 'block'; });
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => { modal.style.display = 'none'; });
    window.addEventListener('click', (event) => { if (event.target == modal) modal.style.display = 'none'; });
});