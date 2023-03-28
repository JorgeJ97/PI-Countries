const {Router} = require('express');
const countriesRouter = Router();
const {getCountriesHandler, getCountryByIdHandler} = require('../handlers/countriesHandler')





countriesRouter.get('/', getCountriesHandler);
countriesRouter.get('/:id', getCountryByIdHandler);

module.exports = countriesRouter;
