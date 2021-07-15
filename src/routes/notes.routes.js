var express = require("express");
var router = express.Router();
const notes = require('../controller/notes.controller');

router.route('/').post(notes.send);

module.exports = router;