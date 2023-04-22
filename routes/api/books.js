// так як ми вказали поваток адреси /api/books в middleware в обробниках його дублювати не потрібно, можна лишити лише /
const express = require("express");

// const app = express(); // так робити не можна оскільки так я створю окремий додаток
const router = express.Router() // так я створюю об'єкт міні додатку ("аркуш адрес записної книги")

const books = require("../../db/books.js");
// const contacts = require("./db/contacts.json");

router.get("/", (req, res) => {
    res.json(books); // в .send можна передати об'єкт або масив вони перед відправкою автоматично сконвертується в json
  });

  router.get("/:id", (req, res) => {
    res.json(books[0]); // в .send можна передати об'єкт або масив вони перед відправкою автоматично сконвертується в json
  });

  router.post("/", (req, res) => {
    res.json(books[0]); // в .send можна передати об'єкт або масив вони перед відправкою автоматично сконвертується в json
  });

  router.put("/:id", (req, res) => {
    res.json(books[0]); // в .send можна передати об'єкт або масив вони перед відправкою автоматично сконвертується в json
  });

  router.delete("/:id", (req, res) => {
    res.json(books[0]); // в .send можна передати об'єкт або масив вони перед відправкою автоматично сконвертується в json
  });

module.exports = router;