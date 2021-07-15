var express = require("express");
var router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send('Server is live!')
  });

module.exports = router;