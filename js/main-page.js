// js/main-page.js

document.addEventListener('DOMContentLoaded', () => {
    const filterTabsContainer = document.querySelector('.filter-tabs');
    if (!filterTabsContainer) return;

    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.filter-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            tab.classList.add('active');
            const activeContent = document.getElementById(`tab-${tab.dataset.tab}`);
            if (activeContent) activeContent.classList.add('active');
        });
    });

    const carData = {
        chevrolet: { Cobalt: ["2013-2016", "2017-2023"], Lacetti: ["2008-2013", "2014-2020"], Spark: ["2010-2015", "2016-2022"] },
        hyundai: { Accent: ["2015-2018", "2019-2022"], Sonata: ["2017-2019", "2020-2023"] },
        kia: { K5: ["2018-2020", "2021-2024"], Seltos: ["2020-2023"] }
    };
    const tireSizes = {
        "Chevrolet-Cobalt-2017-2023": "185 / 75 R14", "Chevrolet-Lacetti-2014-2020": "195 / 55 R15",
        "Chevrolet-Spark-2016-2022": "165 / 65 R14", "Hyundai-Accent-2019-2022": "185 / 65 R15",
        "Hyundai-Sonata-2020-2023": "215 / 55 R17", "Kia-K5-2021-2024": "235 / 45 R18", "Kia-Seltos-2020-2023": "215 / 60 R17"
    };

    const brandSelect = document.getElementById('car-brand');
    const modelSelect = document.getElementById('car-model');
    const yearSelect = document.getElementById('car-year');
    const findAutoBtn = document.querySelector('#tab-auto .find-btn');
    const resultSize = document.getElementById('result-size');

    if (brandSelect) {
        brandSelect.addEventListener('change', () => { /* ... */ });
        modelSelect.addEventListener('change', () => { /* ... */ });
        yearSelect.addEventListener('change', () => { /* ... */ });
        document.querySelector('#tab-auto .filter-form').addEventListener('submit', (e) => { /* ... */ });
    }
});