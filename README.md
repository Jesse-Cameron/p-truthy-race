# p-truthy-race

This is a small utility function that does some nifty promise logic.

The goal is to race a collection of promises against one another and return the first to resolve true against a evaluator function.

*For example:* say you wish to send a bunch of API calls to crypto-exchanges to get the price of BitCoin. You could initiate them all, then use `p-truthy-race` to determine which has returned the fastest. Then display this to the user.

## Documentation

`pTruthyRace`

- *evaluator* (function, required) - the function to evaluate the results against.
    - accepts a single param
    - returns a boolean
- *promises* (Promise[], required) - array of promises
- *returns* - the first result that resolves true against the `evaluator`, false otherwise


## Example Implementation

```js
const { pTruthyRace } = require('p-truthy-race');

const isValidPrice = (result) => {
    if (!isNaN(result)) {
        return true;
    }
    return false;
};

const getCryptoPrice = (api) => {
    // logic to make your HTTP call
};
const apis = [ /* list of apis */ ];


const promises = apis.map(api => getCryptoPrice(api))

pTruthyRace(isValidPrice, promises).then(result => {
    // do what you must with the first result to resolve true
}).catch(error => {
    // do what you must with any promises that reject
})
```