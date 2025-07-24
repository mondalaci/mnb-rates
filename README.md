A node module that retrieves the actual currency exchange rates from the Hungarian National Bank SOAP API.

Install with:

`npm i mnb-rates`

Usage examples:

```js
import {
  getCurrentExchangeRates,
  getCurrencies,
  getCurrencyUnits,
  getDateInterval,
  getExchangeRates,
  getInfo
} from 'mnb-rates';

// Get current exchange rates
const rates = await getCurrentExchangeRates();
console.log(rates);
// Output:
// {
//   AUD: 224.19,
//   BGN: 203.56,
//   BRL: 61.37,
//   CAD: 248.86,
//   CHF: 426.45,
//   CNY: 47.32,
//   CZK: 16.21,
//   DKK: 53.34,
//   EUR: 398.13,
//   GBP: 458.63,
//   HKD: 43.14,
//   IDR: 0.0208,
//   ILS: 101.44,
//   INR: 3.92,
//   ISK: 2.8,
//   JPY: 2.3105,
//   KRW: 0.24710000000000001,
//   MXN: 18.26,
//   MYR: 80.31,
//   NOK: 33.57,
//   NZD: 205.06,
//   PHP: 5.98,
//   PLN: 93.64,
//   RON: 78.43,
//   RSD: 3.4,
//   RUB: 4.28,
//   SEK: 35.61,
//   SGD: 265.28,
//   THB: 10.5,
//   TRY: 8.37,
//   UAH: 8.11,
//   USD: 338.6,
//   ZAR: 19.24
// }

// Get all supported currencies
const currencies = await getCurrencies();
console.log(currencies);
// Output:
// [
//   'HUF', 'EUR', 'AUD', 'BGN', 'BRL', 'CAD', 'CHF',
//   'CNY', 'CZK', 'DKK', 'GBP', 'HKD', 'HRK', 'IDR',
//   'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR',
//   'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RSD', 'RUB',
//   'SEK', 'SGD', 'THB', 'TRY', 'UAH', 'USD', 'ZAR',
//   'ATS', 'AUP', 'BEF', 'BGL', 'CSD', 'CSK', 'DDM',
//   'DEM', 'EEK', 'EGP', 'ESP', 'FIM', 'FRF', 'GHP',
//   'GRD', 'IEP', 'ITL', 'KPW', 'KWD', 'LBP', 'LTL',
//   'LUF', 'LVL', 'MNT', 'NLG', 'OAL', 'OBL', 'OFR',
//   'ORB', 'PKR', 'PTE', 'ROL', 'SDP', 'SIT', 'SKK',
//   'SUR', 'VND', 'XEU', 'XTR', 'YUD'
// ]

// Get currency units for specific currencies
const units = await getCurrencyUnits('USD,EUR,JPY');
console.log(units);
// Output:
// { EUR: 1, JPY: 100, USD: 1 }

// Get available date interval
const interval = await getDateInterval();
console.log(interval);
// Output:
// { startdate: '1949-01-03', enddate: '2025-07-24' }

// Get exchange rates for a date range and currencies
const ratesRange = await getExchangeRates({
  startDate: '2025-01-01',
  endDate: '2025-02-01',
  currencyNames: 'EUR,USD'
});
console.log(ratesRange);
// Output:
// [
//   { date: '2025-01-31', eur: 407.91, usd: 392.83 },
//   { date: '2025-01-30', eur: 407.41, usd: 391.44 },
//   ...
// ]

// Get info about available data
const info = await getInfo();
console.log(info);
// Output:
// {
//   firstDate: [ '1949-01-03' ],
//   lastDate: [ '2025-07-24' ],
//   currencies: [ ... ]
// }
```
