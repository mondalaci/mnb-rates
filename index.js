const soap = require('soap');
const xml2js = require('xml2js');

function wsdlRequest(wsdlUrl, method, req) {
    return new Promise((resolve, reject) => {
        const res = {};
        soap.createClient(wsdlUrl, function(err, client) {
            client.on('response', responseXml => {
                res.responseXml = responseXml;
            });

            const clientMethod = client[method];

            clientMethod(req, function(err, response) {
                if (err) {
                    reject(err);
                }
                res.response = response;
                resolve(res);
            });
        });
    });
}

async function getMnbRawRates() {
    const res = await wsdlRequest('https://www.mnb.hu/arfolyamok.asmx?wsdl', 'GetCurrentExchangeRates', {})
    const ratesRoot = await xml2js.parseStringPromise(res.response.GetCurrentExchangeRatesResult);
    const rawRates = ratesRoot.MNBCurrentExchangeRates.Day[0].Rate;
    return rawRates;
}

async function getMnbRates() {
    const res = await getMnbRawRates();
    rates = {};
    for (const rate of res) {
        rates[rate.$.curr] = +rate._.replace(',', '.') / +rate.$.unit;
    }
    return rates;
}

module.exports = getMnbRates;
