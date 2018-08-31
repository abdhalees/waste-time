const express = require('express');
const port = 4000;

const app = express();

app.use(express.static(`${__dirname}/./public`));

module.exports = app.listen(port, () => {
  console.log('App running on port', port);
});
