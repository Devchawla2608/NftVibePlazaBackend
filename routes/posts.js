
const express = require("express");
const router = express.Router();
const postController = require("../controllers/post_controller.js");

router.post("/create", postController.create);
router.get("/fetchPost", postController.fetchPost);
module.exports = router;

