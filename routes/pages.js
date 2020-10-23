const express = require("express");
const path = require("path");
const authController = require("../controllers/auth");
const router = express.Router();

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});
router.get("/home", function (request, response) {
  if (request.session.loggedin) {
    response.send(`Welcome, ${request.session.email}  Login successful`);
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

module.exports = router;
