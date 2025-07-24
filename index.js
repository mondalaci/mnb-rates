import soap from 'soap';
import xml2js from 'xml2js';

function wsdlRequest(method, req, resultPropertyName) {
    return new Promise((resolve, reject) => {
        const res = {};
        soap.createClient('https://www.mnb.hu/arfolyamok.asmx?wsdl', function(err, client) {
            client.on('response', responseXml => {
                res.responseXml = responseXml;
            });

            const clientMethod = client[method];

            clientMethod(req, async function(err, response) {
                if (err) {
                    reject(err);
                }
                try {
                    const xml = response[resultPropertyName];
                    const parsed = await xml2js.parseStringPromise(xml);
                    resolve(parsed);
                } catch (parseErr) {
                    reject(parseErr);
                }
            });
        });
    });
}

export async function getCurrentExchangeRates() {
    const ratesRoot = await wsdlRequest('GetCurrentExchangeRates', {}, 'GetCurrentExchangeRatesResult');
    const rawRates = ratesRoot.MNBCurrentExchangeRates.Day[0].Rate;
    const rates = {};
    for (const rate of rawRates) {
        rates[rate.$.curr] = +rate._.replace(',', '.') / +rate.$.unit;
    }
    return rates;
}

export async function getCurrencies() {
    const parsed = await wsdlRequest('GetCurrencies', {}, 'GetCurrenciesResult');
    return parsed.MNBCurrencies.Currencies[0].Curr;
}

export async function getCurrencyUnits(currencyNames) {
    const parsed = await wsdlRequest('GetCurrencyUnits', { currencyNames }, 'GetCurrencyUnitsResult');
    const unitsArr = parsed?.MNBCurrencyUnits?.Units?.[0]?.Unit || [];
    const entries = unitsArr.map(e => [e['$'].curr, parseFloat(e['_'].replace(',', '.'))]);
    let result = Object.fromEntries(entries);
    if (currencyNames && currencyNames.length > 0) {
        result = Object.fromEntries(
            Object.entries(result).filter(([curr]) => currencyNames.includes(curr))
        );
    }
    return result;
}

export async function getDateInterval() {
    const parsed = await wsdlRequest('GetDateInterval', {}, 'GetDateIntervalResult');
    return parsed.MNBStoredInterval.DateInterval[0]['$'];
}

export async function getExchangeRates({ startDate, endDate, currencyNames }) {
    if (!startDate || !endDate || !currencyNames) {
        throw new Error('getExchangeRates requires startDate, endDate, and currencyNames parameters.');
    }
    const req = { startDate, endDate, currencyNames };
    const parsed = await wsdlRequest('GetExchangeRates', req, 'GetExchangeRatesResult');
    const days = parsed.MNBExchangeRates.Day || [];
    return days.map(day => {
        const obj = { date: day['$'].date };
        for (const rate of day.Rate) {
            const curr = rate['$'].curr.toLowerCase();
            obj[curr] = +rate._.replace(',', '.');
        }
        return obj;
    });
}

export async function getInfo() {
    const parsed = await wsdlRequest('GetInfo', {}, 'GetInfoResult');
    return {
        FirstDate: parsed.MNBExchangeRatesQueryValues.FirstDate,
        LastDate: parsed.MNBExchangeRatesQueryValues.LastDate,
        Currencies: parsed.MNBExchangeRatesQueryValues.Currencies[0].Curr
    };
}
