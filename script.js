const categories = {
    cosmetics: [
        { name: "Космецевтика для лица", img: "static/img/cat1.png" },
        { name: "Космецевтика для тела", img: "static/img/cat2.png" },
        { name: "Карбокситерапия", img: "static/img/cat3.png" },
        { name: "Альгинатные и тканевые маски", img: "static/img/cat4.png" },
        { name: "Биодобавки", img: "static/img/cat5.png" },
        { name: "Биоревитализация", img: "static/img/cat1.png" },
        { name: "Очищение кожи", img: "static/img/cat2.png" },
        { name: "Нормализация пищеварения", img: "static/img/cat3.png" }
    ],
    medicine: [
        { name: "Мед. препараты", img: "static/img/cat5.png" },
        { name: "Анализы", img: "static/img/med2.jpg" },
        { name: "Диагностика", img: "static/img/med3.jpg" },
        { name: "УЗИ", img: "static/img/med4.jpg" },

    ]
};

const categoryList = document.getElementById("category-list");
const tabs = document.querySelectorAll(".tab");
let currentTab = "cosmetics"; // Текущая активная вкладка
let showAll = false; // Флаг для отображения всех категорий

function renderCategories() {
    const items = categories[currentTab]; // Получаем категории для текущей вкладки
    const displayItems = showAll ? items : items.slice(0, 5);
    categoryList.innerHTML = "";
    displayItems.forEach(({ name, img }) => {
        const div = document.createElement("div");
        div.className = "category";
        div.innerHTML = `
            <img src="${img}" alt="${name}">
            <div class="category-title">${name}</div>
        `;
        categoryList.appendChild(div);
    });
    // Добавляем кнопку "Показать ещё" только если есть что показывать
    if (!showAll && items.length > 5) {
        const showMoreBtn = document.createElement("div");
        showMoreBtn.className = "category";
        showMoreBtn.innerHTML = `
            <button class="show-more">Показать ещё</button>
        `;
        categoryList.appendChild(showMoreBtn);

        // Вешаем обработчик на новую кнопку
        showMoreBtn.querySelector("button").addEventListener("click", () => {
            showAll = true;
            renderCategories();
        });
    }

}

// Обработчики для переключателя
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        currentTab = tab.dataset.type;
        showAll = false;
        renderCategories();
    });
});


// Товары
const products = [
    { id: 1, name: "Evasion Bio Integral Stop Acne cream Крем для лица против акне", img: "static/img/Bio.png" },
    { id: 2, name: "Evasion Absolute Air regenerative gel-cream Регенерирующий гель-крем для лица", img: "static/img/pure.png" },
    { id: 3, name: "Evasion Pure Blanc Depegmentor R+М Система для лица от пигментации любой этиологии", img: "static/img/air.png" },
    { id: 4, name: "Evasion Absolute Air regenerative gel-cream Регенерирующий гель-крем для лица", img: "static/img/pure.png"},
    { id: 5, name: "Evasion Pure Blanc Depegmentor R+М Система для лица от пигментации любой этиологии", img: "static/img/air.png"},
    { id: 6, name: "Evasion Bio Integral Stop Acne cream Крем для лица против акне", img: "static/img/Bio.png" }
];

const productList = document.getElementById("product-list");
const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

function renderProducts() {
    productList.innerHTML = "";
    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
      <div class="heart ${favorites.includes(p.id) ? "favorited" : ""}" data-id="${p.id}">♥</div>
      <img src="${p.img}" alt="${p.name}">
      <p>${p.name}</p>
      <button>Подробнее</button>
    `;
        productList.appendChild(div);
    });
    // Обработчики для иконок "сердечко"
    document.querySelectorAll(".heart").forEach(heart => {
        heart.addEventListener("click", () => {
            const id = +heart.dataset.id;
            if (favorites.includes(id)) {
                favorites.splice(favorites.indexOf(id), 1);
                heart.classList.remove("favorited");
            } else {
                favorites.push(id);
                heart.classList.add("favorited");
            }
            localStorage.setItem("favorites", JSON.stringify(favorites));
        });
    });
}

renderCategories();
renderProducts();
