const express = require("express");
const router = express.Router();
const blogCtrl = require("../Controller/Blogs");

router.get("/", blogCtrl.getAll);
router.get("/recent", blogCtrl.recentBlogs);
router.post("/", blogCtrl.create);
router.delete("/:id", blogCtrl.delete);

module.exports = router;
