#!/usr/bin/env node
import {getMnbRates} from 'mnb-rates';
const rates = await getMnbRates()
console.log(rates);
