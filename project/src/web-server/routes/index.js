const express = require('express');


const _router = Symbol('_router');
const _getRoutes = Symbol('_getRoutes');

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
    this[_router].get('/lesson01', (request, response) => {
      response.render('pages/lesson01.hbs', {
        pageTitle: 'Lesson 01',
        pageStyle: 'style01',
        pageScript: 'script01'
      });
    });
  }
}


module.exports = new Router();