#!/usr/bin/env node
import util from 'util';
import {GetCurrentExchangeRates, GetCurrencies, GetCurrencyUnits, GetDateInterval, GetExchangeRates, GetInfo} from './index.js';

console.log('GetCurrentExchangeRates():');
const currentRates = await GetCurrentExchangeRates();
console.log(util.inspect(currentRates, {depth: null, colors: true}));

console.log('GetCurrencies():');
const currencies = await GetCurrencies();
console.log(util.inspect(currencies, {depth: null, colors: true}));

console.log("GetCurrencyUnits('USD,EUR,JPY'):");
const currencyUnits = await GetCurrencyUnits('USD,EUR,JPY');
console.log(util.inspect(currencyUnits, {depth: null, colors: true}));

console.log('GetDateInterval():');
const dateInterval = await GetDateInterval();
console.log(util.inspect(dateInterval, {depth: null, colors: true}));

console.log("GetExchangeRates({ startDate: '2025-01-01', endDate: '2025-02-01', currencyNames: 'EUR,USD' }):");
const rates = await GetExchangeRates({
    startDate: '2025-01-01',
    endDate: '2025-02-01',
    currencyNames: 'EUR,USD'
});
console.log(util.inspect(rates, {depth: null, colors: true}));

console.log('GetInfo():');
const info = await GetInfo();
console.log(util.inspect(info, {depth: null, colors: true}));
