const express = require("express");
const app = express();
const port = 9999;
app.use(express.static('static'))
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});