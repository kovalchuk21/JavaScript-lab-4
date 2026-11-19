// Лабораторна робота №4, варіант 10 — Сільськогосподарські постачання
// Ковальчук Ігор, КН-25-1

//Task 1
// Ліва сутність — Підприємство
class Enterprise {
    constructor(id, name, workersCount, activity) {
        this.id = id;
        this.name = name;
        this.workersCount = workersCount;
        this.activity = activity;
    }
    printToConsole() {
        console.log(`${this.id}: ${this.name}, працівників: ${this.workersCount}, вид діяльності: ${this.activity}`);
    }
}

// Права сутність — Продукція
class Product {
    constructor(id, name, unit, shelfLife, purchasePrice) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.shelfLife = shelfLife;
        this.purchasePrice = purchasePrice;
    }
    printToConsole() {
        console.log(`${this.id}: ${this.name} — ${this.purchasePrice} грн/${this.unit}, термін придатності: ${this.shelfLife}`);
    }
}

// Центральна сутність — Постачання (зв'язує підприємство і продукцію)
class Supply {
    constructor(id, enterpriseId, productId, date, volume, salePrice, deliveryMethod, invoiceNumber) {
        this.id = id;
        this.enterpriseId = enterpriseId;
        this.productId = productId;
        this.date = date;
        this.volume = volume;
        this.salePrice = salePrice;
        this.deliveryMethod = deliveryMethod;
        this.invoiceNumber = invoiceNumber;
    }
    printToConsole() {
        console.log(`${this.id}: ${this.enterpriseId} → ${this.productId}, ${this.date}, обсяг ${this.volume}, ` +
            `ціна продажу ${this.salePrice} грн, доставка: ${this.deliveryMethod}, накладна № ${this.invoiceNumber}`);
    }
}

//Task 2
class Repository {
    #items = [];

    constructor(initialItems = []) {
        this.#items = [...initialItems];
    }
    create(item) {
        this.#items.push(item);
        return item;
    }
    readById(id) {
        return this.#items.find(item => item.id === id);
    }
    readAll() {
        return [...this.#items];
    }
    update(id, changes) {
        const item = this.readById(id);
        if (item) Object.assign(item, changes);
        return item;
    }
    delete(id) {
        this.#items = this.#items.filter(item => item.id !== id);
    }
    printAll() {
        this.#items.forEach(item => item.printToConsole());
    }
}

//Task 3
const enterprises = new Repository([
    new Enterprise("E-001", "ТОВ «Агроланд»", 120, "Рослинництво"),
    new Enterprise("E-002", "ФГ «Карпатське молоко»", 35, "Тваринництво"),
    new Enterprise("E-003", "ПП «Прикарпатський лан»", 58, "Змішане господарство"),
]);

const products = new Repository([
    new Product("P-001", "Пшениця м'яка озима, 2 клас", "т", "12 місяців", 8200),
    new Product("P-002", "Молоко коров'яче незбиране, 3.2%", "л", "3 доби", 16.5),
    new Product("P-003", "Картопля продовольча сорту «Слов'янка»", "кг", "6 місяців", 9.8),
    new Product("P-004", "Олія соняшникова нерафінована", "л", "9 місяців", 62),
]);

const supplies = new Repository([
    new Supply("S-001", "E-001", "P-001", "2026-09-02", 40, 8900, "залізниця", "ВН-0145"),
    new Supply("S-002", "E-001", "P-004", "2026-09-10", 1200, 68, "автотранспорт", "ВН-0152"),
    new Supply("S-003", "E-002", "P-002", "2026-09-11", 3000, 18.5, "автоцистерна", "ВН-0153"),
    new Supply("S-004", "E-003", "P-001", "2026-09-18", 25, 8750, "автотранспорт", "ВН-0161"),
    new Supply("S-005", "E-003", "P-003", "2026-09-25", 5000, 11.2, "автотранспорт", "ВН-0170"),
]);

console.log("Завдання 1–3. Вміст репозиторіїв");
console.log("Підприємства:");
enterprises.printAll();
console.log("Продукція:");
products.printAll();
console.log("Постачання:");
supplies.printAll();

//Task 4
console.log("Завдання 4. Зв'язок «багато до багатьох»");

console.log("Яку продукцію постачає ТОВ «Агроланд» (E-001):");
for (const supply of supplies.readAll()) {
    if (supply.enterpriseId === "E-001") {
        const product = products.readById(supply.productId);
        console.log(`- ${product.name}, ${supply.volume} ${product.unit}, накладна № ${supply.invoiceNumber}`);
    }
}

console.log("Хто постачає пшеницю (P-001):");
for (const supply of supplies.readAll()) {
    if (supply.productId === "P-001") {
        const enterprise = enterprises.readById(supply.enterpriseId);
        console.log(`- ${enterprise.name}, ${supply.date}, ціна продажу ${supply.salePrice} грн/т`);
    }
}

//Task 5
console.log("Завдання 5. CRUD для репозиторію «Постачання»");
console.log("Початковий стан:");
supplies.printAll();

// Create
supplies.create(new Supply("S-006", "E-002", "P-004", "2026-10-03", 300, 66, "автотранспорт", "ВН-0178"));
console.log("Після Create (додано S-006):");
supplies.printAll();

// Read
console.log("Read S-003:");
supplies.readById("S-003").printToConsole();

// Update
supplies.update("S-003", { volume: 3500, deliveryMethod: "самовивіз" });
console.log("Після Update (S-003: новий обсяг і спосіб доставки):");
supplies.printAll();

// Delete
supplies.delete("S-002");
console.log("Після Delete (видалено S-002):");
supplies.printAll();
