const express = require("express");
const router = express.Router();
const newsletterCtrl = require("../Controller/Newsletter");

router.get("/", newsletterCtrl.getAll);
router.post("/", newsletterCtrl.create);
router.delete("/:id", newsletterCtrl.delete);

module.exports = router;
