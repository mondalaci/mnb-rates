#!/usr/bin/env node
import util from 'util';
import {getCurrentExchangeRates, getCurrencies, getCurrencyUnits, getDateInterval, getExchangeRates, getInfo} from './index.js';

console.log('getCurrentExchangeRates():');
const currentRates = await getCurrentExchangeRates();
console.log(util.inspect(currentRates, {depth: null, colors: true}));

console.log('getCurrencies():');
const currencies = await getCurrencies();
console.log(util.inspect(currencies, {depth: null, colors: true}));

console.log("getCurrencyUnits('USD,EUR,JPY'):");
const currencyUnits = await getCurrencyUnits('USD,EUR,JPY');
console.log(util.inspect(currencyUnits, {depth: null, colors: true}));

console.log('getDateInterval():');
const dateInterval = await getDateInterval();
console.log(util.inspect(dateInterval, {depth: null, colors: true}));

console.log("getExchangeRates({ startDate: '2025-01-01', endDate: '2025-02-01', currencyNames: 'EUR,USD' }):");
const rates = await getExchangeRates({
    startDate: '2025-01-01',
    endDate: '2025-02-01',
    currencyNames: 'EUR,USD'
});
console.log(util.inspect(rates, {depth: null, colors: true}));

console.log('getInfo():');
const info = await getInfo();
console.log(util.inspect(info, {depth: null, colors: true}));
