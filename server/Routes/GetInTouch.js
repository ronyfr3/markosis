const express = require("express");
const router = express.Router();
const GetInTouchCtrl = require("../Controller/GetInTouch");

router.get("/", GetInTouchCtrl.getAll);
router.post("/", GetInTouchCtrl.create);
router.delete("/:id", GetInTouchCtrl.delete);

module.exports = router;