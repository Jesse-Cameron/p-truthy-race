const { pTruthyRace } = require('..');

describe('p-truthy-race ', () => {
  let p1;
  let p2;
  let p3;

  beforeEach(() => {
    // Reset the promises
    p1 = new Promise(resolve => {
      setTimeout(resolve, 50, 'foo');
    });
    p2 = new Promise(resolve => {
      setTimeout(resolve, 100, 'bar');
    });
    p3 = new Promise(resolve => {
      setTimeout(resolve, 200, 'wat');
    });
  });

  it('should resolve the first promise', done => {
    const evalFunc = result => {
      if (result === 'bar') {
        return true;
      }

      return false;
    };

    const promises = [p1, p2, p3];
    pTruthyRace(evalFunc, promises).then(result => {
      expect(result).toEqual('bar');
      done();
    });
  });

  it('should resolve false if no promises evaluate true', done => {
    const evalFunc = result => {
      if (result === 'bar') {
        return true;
      }

      return false;
    };

    const promises = [p1, p3];
    pTruthyRace(evalFunc, promises).then(result => {
      expect(result).toBeFalsy();
      done();
    });
  });

  it('should resolve with custom alternative if no promises evaluate true', done => {
    const promises = [p1];
    pTruthyRace(() => false, promises, 42).then(result => {
      expect(result).toBe(42);
      done();
    });
  });

  it('should resolve with custom alternative if no promises evaluate true', done => {
    const promises = [p1];
    pTruthyRace(() => false, promises, true).then(result => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should reject if any of the promises reject', done => {
    const evalFunc = result => {
      if (result === 'bar') {
        return true;
      }

      return false;
    };

    const p4 = new Promise((resolve, reject) => {
      setTimeout(reject, 25, 'baz');
    });

    const promises = [p2, p3, p4];
    pTruthyRace(evalFunc, promises).catch(error => {
      expect(error).toEqual('baz');
      done();
    });
  });
});
