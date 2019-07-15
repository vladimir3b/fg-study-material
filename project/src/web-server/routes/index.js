const express = require('express');

const _router = Symbol('_router');
const _getRoutes = Symbol('_getRoutes');

const NUMBER_OF_PAGES = require('./../../../../config.json').numberOfPages;

function twoDigits(number) {
  return (number <= 9) ? `0${number}` : `${number}`;
}

class Router {
  constructor() {
    this[_router] = express.Router();
    this[_getRoutes]();
  }
  get router() {
    return this[_router];
  }

  [_getRoutes]() {
    this[_router].get('/', (request, response) => {
      response.render('root.hbs', { pageTitle: 'Main menu' });
    });
    for(let i = 1; i <= NUMBER_OF_PAGES; i++) {
      this[_router].get(`/lesson0${i}`, (request, response) => {
        response.render(`pages/lesson0${i}.hbs`, {
          pageTitle: `Lesson ${twoDigits(i)}`,
          pageStyle: `style${twoDigits(i)}`,
          pageScript: `script${twoDigits(i)}`
        });
      });
    }
  }
}


module.exports = new Router();