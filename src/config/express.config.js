const express = require("express"),
  testRoutes = require('../routes/test.routes'),
  notesRoutes = require('../routes/notes.routes');

module.exports.init = () => {
  // initialize app
  const app = express();

  app.use('/test', testRoutes);
  app.use('/email/notes', notesRoutes)

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