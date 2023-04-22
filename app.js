//Відео: 
// 0 - 0:20 - Як створити веб сервер і додати 1ші записи
// 


const express = require("express");
const contacts = require("./db/contacts.js");
// const contacts = require("./db/contacts.json");

const app = express(); // створюєм веб-сервер app для цього викликаєм express як функцію

const PORT = 3000;

app.get("/", (request, response)=>{
        response.send("<h2>Home page</h2>"); // .send() метод response для відповіді
        // щоб надіслати цілу html сторінку кращє використовувати шаблонізатори
})

app.get("/contacts",(req, res)=>{
        res.send(contacts); // в .send можна передати об'єкт або масив вони перед відправкою автоматично сконвертується в json
})

app.get("/null",(req, res)=>{
        const dataBaseResponse = null;
        // res.send(dataBaseResponse); // проте .send() не вміє опацьовувати null тому краще для передачі об'єктів або масивів використовувати .json()
        res.json(dataBaseResponse);
})

app.get("/contacts",(req, res)=>{
    
})

app.listen(PORT, ()=>console.log("Server running on port", PORT)); // запускаєм сервер на прослуховування портів ( якщо одночасно працювати над фронтендом порти мають бути різні !!! ), 2 аргумент колбек функція для візуалізації старту

