const express = require('express');
const jsontoxml = require('jsontoxml');
const fs = require('fs');


const { calculateEstimate } = require('../src/calculateEstimates');

const router = express.Router();

const filepath = 'access.txt';

router.get('/', (req, res) => {
  res.send('serious work loading');
});

router.get('/logs', (req, res) => {
  try {
    const data = fs.readFileSync(filepath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    return res.send(data);
  } catch (error) {
    return res.send({ error });
  }
});


router.post('/', (req, res) => {
  const estimate = calculateEstimate(req.body);
  return res.status(200).send(estimate);
});

router.post('/xml', (req, res) => {
  const estimate = calculateEstimate(req.body);

  const xml = jsontoxml(estimate);
  return res.status(200).send(xml);
});

router.post('/json', (req, res) => {
  const estimate = calculateEstimate(req.body);
  return res.status(200).send(estimate);
});


module.exports = router;
