var express = require('express');

var port = process.env.PORT || 8080;

const app = express.init();
app.listen(port, () => console.log(`Server now running on port ${port}!`));