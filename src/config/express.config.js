const express = require("express"),
  testRoutes = require('../routes/test.routes'),
  path = require("path");

module.exports.init = () => {
  // initialize app
  const app = express();

  app.use('/test', testRoutes);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err });
  });

  return app;
};