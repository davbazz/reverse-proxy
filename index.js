import 'dotenv/config';
import express from 'express';
import request from 'request';
import axios from 'axios';
import cors from 'cors';

const app = express()
const port = process.env.PORT || 3000


app.use(cors(
    {
        origin: process.env.ORIGIN,
        credentials: true
    }
));

app.use((req, res, next) => {
    console.log(req.headers);
    next();
})

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get('/check-symbol', async (req, res) => {
    const targetUrl = `${process.env.API_BASE_URL}/search?q=AAPl&token=${process.env.API_KEY}`
    try {
        axios.get(`${targetUrl}`)
        .then(response => res.send(response.data))
        .then(response => console.log(response.data))
        .catch(error => res.send(error));
    } catch (error) {
        console.log(error) 
    }
})

app.get('/quote-default-stocks', async (req, res) => {
    try {
        axios.get(`${process.env.API_BASE_URL}/quote?symbol=AAPL&token=${process.env.API_KEY}`)
        .then(response => res.send(response.data))
        .then(response => console.log(response.data))
        .catch(error => res.send(error));
    } catch (error) {
        console.log(error) 
    }
})

app.get('/news', async (req, res) => {
    try {
        axios.get(`${process.env.API_BASE_URL}/company-news?symbol=AAPL&from=2022-12-20&to=2022-12-30&token=${process.env.API_KEY}`)
            .then(response => res.send(response.data))
            .then(response => console.log(response.req.query.symbol))
            .catch(error => res.send(error));
    } catch (error) {
        console.log(error) 
    }
})

app.get("/:anyPath", (req, res) => {
  console.log(req.url)
  const targetUrl = process.env.TARGET +"/"+ req.url;
  request(targetUrl).pipe(res);
});


app.listen(port)


/*
const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = 'your_api_key';
const API_BASE_URL = 'https://finnhub.io/api/v1';

app.get('/news', (req, res) => {
  axios.get(`${API_BASE_URL}/news`, {
    params: {
      token: API_KEY,
      symbol: req.query.symbol
    }
  })
  .then(response => res.send(response.data))
  .catch(error => res.send(error));
});

app.get('/quote', (req, res) => {
  axios.get(`${API_BASE_URL}/quote`, {
    params: {
      token: API_KEY,
      symbol: req.query.symbol
    }
  })
  .then(response => res.send(response.data))
  .catch(error => res.send(error));
});

app.get('/symbol', (req, res) => {
  axios.get(`${API_BASE_URL}/stock/symbol`, {
    params: {
      token: API_KEY,
      exchange: req.query.exchange
    }
  })
  .then(response => res.send(response.data))
  .catch(error => res.send(error));
});

app.listen(3000, () => {
  console.log('Reverse proxy listening on port 3000');
});

*/
