/**
 * Resolves all promises and returns the first that returns true
 *
 * @param {Function} evaluator - a function with takes a single argument.
 * @param {Promise[]} promises - array of promises to resolve
 * @param {Any} alternative - value to return if no promises resolve true against the evalutor. Defaults to false.
 * @returns {Promise} - the first result to resolve true against evaluator or alternative (false) otherwise
 */
const pTruthyRace = (evaluator, promises, alternative = false) => {
  let pending = promises.length;

  return new Promise((resolve, reject) => {
    promises.map(p => {
      return p.then(result => {
        if (evaluator(result)) {
          resolve(result);
        }
        pending -= 1;
        if (pending === 0) {
          resolve(alternative);
        }
      }).catch(reject);
    });
  });
};

module.exports = { pTruthyRace };
