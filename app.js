//Відео:
// 0 - 0:20 - Як створити веб сервер і додати 1ші записи
// 0:20 - 1:00 - Що таке middleware, навіщо вони і як їх створювати
// 57 - як дозволити кросдоменні запити
// 1:14 - restAPI - набір рекомендацій для написання веб сервера який реалізує CRUD операції (Create,Dead,Update,Delete)
//      основні правила:
//      1) кінцева точка запиту (endpoint) іменник в множині /products /orders /users
//      2) CRUD операція визначається методом HTTP запиту: GET/products - поверне всі товари, POST/products - додати новий товар
//      3) Звернення до окремої одиниці сдійснюється через /:id (параметри маршруту): GET/products/:id поверне визначений товар POST/products/:id оновить визначений товар ...
//      додаткові правила:
//      1) адресу кращє починати з /api: /api/products або /api/products
//      2) версія API вказується в адресі /api/v1/products або /api/v2/products
//      3) Код відповіді вказує як пройшла обробка на сервері
//      4) При додаванні, оновленні сутності треба повертати доданий в бд об'єкт з id
// 1:29 виносимо в окремі файли запити що стосуються окремих сутностей (для більшої читабельності) routes/aps/contacts.js + routes/aps/books.js ...
// 1:35 пояснення 2гої ДР


const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");
const moment = require("moment");
const booksRouter = require("./routes/api/books");

const app = express(); // створюєм веб-сервер app для цього викликаєм express як функцію

const PORT = 3000;

app.use( cors() ); // middleWare викликає cors() яка дозволяє крослатформенні запити

// middleware перед запитами
app.use(async (req, res, next) => {
  console.log("middleware");
  const { method, url } = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile("public/server.log", `\n${method} ${url} ${date}`);
  next();
}); // Для створ. використовується .use() який 1м аргументом приймати адресу і 2м колбек або тільки колбек якщо це стосується всіх запитів

// middleware яка для запитів /api/books... перенаправляє шукати обробник в booksRouter ("./routes/api/books")
app.use("/api/books", booksRouter);
// так як ми вказали поваток адреси /api/books в middleware в обробниках його дублювати не потрібно, можна лишити лише /

app.get("/", (request, response) => {
  response.send("<h2>Home page</h2>"); // .send() метод response для відповіді проте, щоб надіслати цілу html сторінку кращє використовувати шаблонізатори
});

app.get("/contacts", (req, res) => {
  res.send(contacts); // в .send можна передати об'єкт або масив вони перед відправкою автоматично сконвертується в json
});

app.get("/null", (req, res) => {
  const dataBaseResponse = null;
  // res.send(dataBaseResponse); // проте .send() не вміє опацьовувати null тому краще для передачі об'єктів або масивів використовувати .json()
  res.json(dataBaseResponse);
});

app.get("/arr", (req, res) => {
  res([]);
});

// middleware після запитів
app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(PORT, () => console.log("Server running on port", PORT)); // запускаєм сервер на прослуховування портів ( якщо одночасно працювати над фронтендом порти мають бути різні !!! ), 2 аргумент колбек функція для візуалізації старту
