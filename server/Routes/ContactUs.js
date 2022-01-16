const express = require("express");
const router = express.Router();
const contactusCtrl = require("../Controller/ContactUs");

router.get("/", contactusCtrl.getAll);
router.post("/", contactusCtrl.create);
router.delete("/:id", contactusCtrl.delete);

module.exports = router;
