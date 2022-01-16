const express = require("express");
const router = express.Router();
const carrerPortalCtrl = require("../Controller/CarrerPortal");

router.get("/", carrerPortalCtrl.getAll);
router.get("/recent", carrerPortalCtrl.recentPortals);
router.post("/", carrerPortalCtrl.create);
router.delete("/:id", carrerPortalCtrl.delete);

module.exports = router;