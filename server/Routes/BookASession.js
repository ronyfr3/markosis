const express = require("express");
const router = express.Router();
const booksessionCtrl = require("../Controller/BookASession");

router.get("/", booksessionCtrl.getAll);
router.post("/", booksessionCtrl.create);
router.delete("/:id", booksessionCtrl.delete);

module.exports = router;
