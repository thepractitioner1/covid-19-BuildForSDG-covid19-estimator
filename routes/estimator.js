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
    return res.send(data.toString().trim());
  } catch (error) {
    return res.send({ error });
  }
});


router.post('/', (req, res) => {
  const estimate = calculateEstimate(req.body);
  return res.status(200).send(estimate);
});

router.post('/:format', (req, res) => {
  const estimate = calculateEstimate(req.body);
  if (req.params.format === 'json') {
    return res.status(200).send(estimate);
  }
  if (req.params.format === 'xml') {
    const xml = jsontoxml(estimate);
    return res.status(200).send(xml);
  }

  return res.status(404).json({ response: 'Please use /json or /xml' });
});


module.exports = router;
