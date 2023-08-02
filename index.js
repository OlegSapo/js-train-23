// Композит (Composite) — це патерн програмування, який дозволяє створювати структуру об'єктів у вигляді дерева, де кожен об'єкт може бути окремим елементом або групою об'єктів.
// Ця структура називається "деревоподібною" через ієрархію "один-багато".

// Клас ContentContainer використовується для управління списком вкладених елементів контенту
class ContentContainer {
  // Створюємо властивість elements для зберігання вкладених елементів контенту. Початкове значення - порожній масив.
  elements = [];
  // Створюємо addElement, який отримує element як параметр та додає його в масив elements.
  addElement(element) {
    this.elements.push(element);
  }
  // Створюємо removeElement, який отримує element як параметр, знаходить його індекс у масиві та видаляє, якщо елемент знайдено.
  removeElement(element) {
    let indxElement = this.elements.indexOf(element);
    if (indxElement !== -1) this.elements.splice(indxElement, 1);
  }
}

// Клас Message, що є розширенням класу ContentContainer. Використовується для створення повідомлень з текстом.
class Message extends ContentContainer {
  // Створюємо конструктор класу, який приймає content як параметр та ініціалізує його
  constructor(content) {
    super();
    this.content = content;
  }
  // Створюємо метод display, який виводить ${this.content} для всіх елементів масиву
  display() {
    console.log(`${this.content}`);
    for (const elem of this.elements) {
      elem.display();
    }
  }
}

// Клас Article, що є розширенням класу ContentContainer. Використовується для створення статті з вкладеними елементами.
class Article extends ContentContainer {
  // Створюємо конструктор класу, який приймає title назву статті як параметр та ініціалізує об'єкт з нею
  constructor(title) {
    super();
    this.title = title;
  }
  // Створюємо метод display, який виводить Стаття: ${this.title} для всіх елементів масиву
  display() {
    console.log(`Стаття: ${this.title}`);
    for (const elem of this.elements) {
      elem.display();
    }
  }
}

console.log("Завдання 1 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо об'єкт Article з назвою "Навчальна стаття"
const article = new Article("Навчальна стаття");

// Додаємо повідомлення до статті
article.addElement(new Message("Дуже корисна стаття"));
article.addElement(new Message("Дякую за чудовий матеріал!"));

// Додаємо вкладене повідомлення до першого повідомлення в статті
article.elements[0].addElement(new Message("Відповідь: Згоден!"));

// Виводимо інформацію про статтю та всі її вкладені елементи
article.display();

// Виводимо масив вкладених елементів статті
console.log(article.elements);

// Муха (Flyweight) — це патерн програмування, основна ідея якого полягає в тому, щоб спільно використовувати об'єкт-одиночка
// замість створення окремих унікальних об'єктів для кожного випадку використання

// Клас Group. Він використовує шаблон "Одиночка" та відповідає за створення груп товарів.
class Group {
  // Створюємо приватне статичне поле #groups використовується для зберігання усіх створених груп. Має початкове значени: пустий об'єкт
  //Об'єкт використовується для зберігання груп, де ключ - це назва групи, а значення - екземпляр групи.
  static #groups = {};

  // Створюмєо конструктор класу, який приймає назву групи як аргумент та ініціалізує поле this.name.
  constructor(name) {
    this.name = name;
  }

  // Створюємо статичний метод create, який приймає назву групи name як аргумент.
  // Метод завжди повертає екземпляр групи з вказаною назвою.
  static create(name) {
    // Перевірка чи група з такою назвою ще не була створена
    if (!this.#groups[name]) {
      // то вона створюється та зберігається в полі #groups.
      this.#groups[name] = new Group(name);
    }
    // в кінці повертає #groups[name]
    return this.#groups[name];
  }
}

// Клас Product відповідає за створення продуктів.
class Product {
  // Створюємо конструктор класу, який приймає назву продукту name та групу group як аргументи та ініціалізує відповідні поля.
  constructor(name, group) {
    this.name = name;
    this.group = group;
  }

  // Робимо метод display, який виводить інформацію про продукт в консоль Продукт: ${this.name}, Група: ${this.group.name}.
  display() {
    console.log(`Продукт: ${this.name}, Група: ${this.group.name}`);
  }
}
console.log("Завдання 2 ====================================");
// Після виконання розкоментуйте код нижче

// Створення груп за допомогою методу Group.create. Цей метод гарантує, що кожна група з унікальною назвою буде створена лише один раз.
const electronics = Group.create("Електроніка");
const books = Group.create("Книги");
const electronics2 = Group.create("Електроніка");

// Виведення груп в консоль. Ми бачимо, що electronics та electronics2 - це один і той же об'єкт.
console.log(electronics, books, electronics2);
console.log(electronics === electronics2); // true

// Створення продуктів. Кожен продукт належить до певної групи.
const product1 = new Product("Ноутбук", electronics);
const product2 = new Product("Навушники", electronics);
const product3 = new Product("Воно", books);
const product4 = new Product("Смартфон", Group.create("Електроніка")); // тут створюється нова група або використовується вже створена

// Виведення продуктів в консоль.
product1.display();
product2.display();
product3.display();
product4.display();

// Перевірка, чи належать два продукти до однієї групи.
console.log(product1.group === product4.group); // true

// Фільтрація продуктів за групою. В даному випадку виводяться тільки продукти групи "Електроніка".
const list = [product1, product2, product3, product4].filter(
  (product) => product.group === Group.create("Електроніка")
);

console.log(list); // виводиться список продуктів, що належать до групи "Електроніка"

// Шаблонний метод (Template Method) — це патерн програмування, який визначає загальну структуру алгоритму, залишаючи певні кроки реалізації підкласам.
// Клас-шаблон визначає основну логіку алгоритму, а підкласи можуть змінювати або розширювати окремі кроки.

// Клас TeaMaker відповідає за загальні дії, необхідні для приготування чаю.
class TeaMaker {
  // Робимо метод makeTea, який викликає всі кроки приготування чаю по черзі boilWater, addTeaLeaves, #steepTea,
  // pourIntoCup, addCondiments, serveTea.
  makeTea() {
    this.addTeaLeavesboilWater();
    this.addTeaLeaves();
    this.steepTea();
    this.pourIntoCup();
    this.addCondiments();
    this.serveTea();
  }
  // Робимо метод boilWater, який відповідає за кип'ятіння води та виводить в консоль Кип'ятимо воду....
  addTeaLeavesboilWater() {
    console.log("Кип'ятимо воду....");
  }
  // Робимо метод aserveTea()ddTeaLeaves, який відповідає за додавання чайних листків та виводить в консоль Додаємо чайні листки....
  addTeaLeaves() {
    console.log("Додаємо чайні листки....");
  }
  // Робимо метод steepTea, що відповідає за заварювання чаю та виводить в консоль Заварюємо чай....
  steepTea() {
    console.log("Заварюємо чай....");
  }
  // Робимо метод pourIntoCup, що відповідає за переливання чаю в чашку та виводить в консоль Переливаємо чай в чашку....
  pourIntoCup() {
    console.log("Переливаємо чай в чашку....");
  }
  // Робимо метод addCondiments, що залишається пустим і може бути перевизначений у підкласах.
  addCondiments() {
    console.log("Переливаємо чай в чашку....");
  }
  // Робимо метод serveTea, що відповідає за подачу чаю та виводить в консоль Чай подається!.
  serveTea() {
    console.log("Чай подається!");
  }
}

// Клас GreenTeaMaker є підкласом класу TeaMaker та додає інгредієнти для зеленого чаю.
class GreenTeaMaker extends TeaMaker {
  // Робимо метод addCondiments, який виводить в консоль Додаємо мед, щоб приготувати зелений чай...
  addCondiments() {
    console.log("Додаємо мед, щоб приготувати зелений чай...");
  }
}

// Клас BlackTeaMaker є підкласом класу TeaMaker та додає інгредієнти для чорного чаю.
class BlackTeaMaker extends TeaMaker {
  // Робимо метод addCondiments, який виводить в консоль Додаємо мед, щоб приготувати чорний чай...
  addCondiments() {
    console.log("Додаємо мед, щоб приготувати чорний чай...");
  }
}

console.log("Завдання 3 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо екземпляри класів GreenTeaMaker та BlackTeaMaker.
const greenTeaMaker = new GreenTeaMaker();
greenTeaMaker.makeTea();

const blackTeaMaker = new BlackTeaMaker();
blackTeaMaker.makeTea();

// Відвідувач (Visitor) — це патерн програмування, який дозволяє додавати нові операції до групи об'єктів, не змінюючи самі об'єкти.
// Відвідувач розділяє алгоритм від представлення об'єктів, що дозволяє додавати нові операції, не змінюючи класи цих об'єктів.

// Клас Letter представляє об'єкт листа з назвою і текстом.
class Letter {
  // Створіть конструктор, що приймає назву листа title та його текстовий вміст text та ініціалізує відповідні поля
  // Записуємо аргумент title в властивість title, яка представляє назву листа в класі
  // Записуємо аргумент text в властивість text, яка представляє  текстовий вміст листа в класі
  constructor(title, text) {
    this.title = title;
    this.text = text;
  }
}

// Клас Picture представляє об'єкт зображення з назвою та розміром
class Picture {
  // Створіть конструктор, що приймає назву зображення title та його розмір size та ініціалізує відповідні поля
  // Записуємо аргумент title в властивість title, яка представляє назву зображення в класі
  //  Записуємо аргумент size в властивість size, яка представляє розмір зображення
  constructor(title, size) {
    this.title = title;
    this.size = size;
  }
}

// Клас Movie представляє об'єкт відеофільму з назвою та тривалістю
class Movie {
  // Конструктор приймає назву відеофільму title та його тривалість duration та ініціалізує відповідні поля
  // Записуємо аргумент title в властивість title, яка представляє назву відеофільму в класі
  // Записуємо аргумент duration в властивість duration, яка представляє тривалість відеофільму
  constructor(title, duration) {
    this.title = title;
    this.duration = duration;
  }
}

// Клас Portfolio представляє колекцію об'єктів, таких як листи, зображення та відеофільми
class Portfolio {
  // Створимо властивість elements, яка представляє список об'єктів в портфоліо, початкове значення пустий масив
  elements = [];
  // Зрібть метод addElement, що приймає element та додає об'єкт до портфоліо
  addElement(element) {
    this.elements.push(element);
  }
  // Зробіть методи readLetter, що приймає letter та виводить в консоль: "Лист: ${letter.title}, Розмір: ${letter.text.length} символів"
  readLetter(letter) {
    console.log(
      `Лист: ${letter.title}, Розмір: ${letter.text.length} символів`
    );
  }
  // Зробіть методи readPicture, що приймає letter та виводить в консоль: "Картина: ${picture.title}, Розмір: ${picture.size} KB"
  readPicture(picture) {
    console.log(`Картина: ${picture.title}, Розмір: ${picture.size} KB`);
  }
  // Зробіть методи readMovie, що приймає letter та виводить в консоль: "Фільм: ${movie.title}, Тривалість: ${movie.duration} хвилин"
  readMovie(movie) {
    console.log(`Фільм: ${movie.title}, Тривалість: ${movie.duration} хвилин`);
  }
  // Зробіть метод readElements, який читає інформацію про всі об'єкти в портфоліо в залежності від того якого класу елемент викликає readLetter, readPicture, readMovie
  // Робимо ітерацію for де є змінна element в яку приходять елементи this.elements
  // Через instanceof по черзі через if та instanceof перевіряємо відношення element до кожного класу.
  // Якщо element є елементом певного класу, то викликати відповідний метод для читання об'єкту певного класу
  readElements() {
    for (const element of this.elements) {
      if (element instanceof Letter) this.readLetter(element);
      if (element instanceof Picture) this.readPicture(element);
      if (element instanceof Movie) this.readMovie(element);
    }
  }
}

console.log("Завдання 4 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо екземпляр класу Portfolio
const myPortfolio = new Portfolio();

// Створюємо різні об'єкти
const letter = new Letter("My Letter", "Hello, this is a letter.");
const picture = new Picture("My Picture", 2048);
const movie = new Movie("My Movie", 120);

// Додаємо об'єкти до портфоліо
myPortfolio.addElement(letter);
myPortfolio.addElement(picture);
myPortfolio.addElement(movie);

// Виводимо всі об'єкти в портфоліо
console.log(myPortfolio.elements);

// Читаємо інформацію про всі об'єкти в портфоліо
myPortfolio.readElements();
