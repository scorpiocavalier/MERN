import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import md5 from 'md5';
import dotenv from 'dotenv';

const port = 3001;

dotenv.config();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/comics', async (req, res) => {
  const publicKey = process.env.MARVEL_PUBLIC_API_KEY;
  const privateKey = process.env.MARVEL_PRIVATE_API_KEY;
  const ts = new Date().getTime().toString();
  const hash = md5(`${ts}${privateKey}${publicKey}`);

  try {
    const response = await fetch(
      `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
