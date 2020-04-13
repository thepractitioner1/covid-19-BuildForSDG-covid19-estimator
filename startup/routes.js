const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const api = require('../routes/estimator');


module.exports = (app) => {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.txt'), { flags: 'a', encoding: 'utf8' });
  const logFormat = ':method\t:url\t:status\t:response-time';
  app.use(morgan(logFormat, {
    stream: {
      write(message) {
        const finalIndex = message.length - 1;
        const lastTabIndex = message.lastIndexOf('\t');
        const str = message.substring(lastTabIndex + 1, finalIndex);
        let time = Math.ceil(parseFloat(str));
        if (time < 10) {
          time = `0${time.toString()}`;
        } else {
          time = time.toString();
        }
        const msg = `${message.substring(0, lastTabIndex + 1)}${time}ms\n`;
        accessLogStream.write(msg);
      }
    }
  }));

  app.use(express.json());
  app.use('/api/v1/on-covid-19', api);
};
