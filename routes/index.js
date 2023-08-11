
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller.js");

router.get("/", homeController.home);
router.use('/posts', require('./posts.js'));
router.use('/users', require('./users'));

module.exports = router;

