A node module that retrieves the actual currency exchange rates from the Hungarian National Bank SOAP API.

Install with:

`npm i mnb-rates`

Then run the following script:

```js
import {getMnbRates} from 'mnb-rates';
const rates = await getMnbRates();
console.log(rates);
```

Which should print:

```js
{
  AUD: 232.4,
  BGN: 187.95,
  BRL: 58.03,
  CAD: 258.07,
  CHF: 352.48,
  CNY: 51.3,
  CZK: 14.44,
  DKK: 49.44,
  EUR: 367.62,
  GBP: 431.4,
  HKD: 41.77,
  HRK: 48.85,
  IDR: 0.0227,
  ILS: 104.83,
  INR: 4.32,
  ISK: 2.5,
  JPY: 2.8699,
  KRW: 0.2768,
  MXN: 15.51,
  MYR: 77.11,
  NOK: 36.32,
  NZD: 220.9,
  PHP: 6.48,
  PLN: 80.05,
  RON: 74.3,
  RSD: 3.13,
  RUB: 4.42,
  SEK: 35.85,
  SGD: 238.72,
  THB: 9.73,
  TRY: 23.8,
  UAH: 11.97,
  USD: 325.76,
  ZAR: 20.59
}
```
