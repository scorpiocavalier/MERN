const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello GET!');
});

app.post('/', (req, res) => {
  res.send('Hello POST!');
});

app.put('/user', (req, res) => {
  res.send('Hello PUT!');
});

app.delete('/user', (req, res) => {
  res.send('Hello DELETE!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
