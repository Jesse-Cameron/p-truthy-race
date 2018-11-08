/**
 * Resolves all promises and returns the first that returns true
 *
 * @param {Function} evaluator - a function with takes a single argument.
 * @param {Promise[]} promises - array of promises to resolve
 * @returns {Promise} - the first result to resolve true against evaluator or false otherwise
 */
const pTruthyRace = (evaluator, promises) => {
  let pending = promises.length;

  return new Promise((resolve, reject) => {
    promises.map(p => {
      return p.then(result => {
        if (evaluator(result)) {
          resolve(result);
        }
        pending -= 1;
        if (pending === 0) {
          resolve(false);
        }
      }).catch(reject);
    });
  });
};

module.exports = { pTruthyRace };
