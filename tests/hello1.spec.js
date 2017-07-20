const chai = require('../node_modules/chai/chai');
const expect = chai.expect;

describe("test1 describe",  () => {
  it("should return assert true",  () => {
     expect('true').equals('true');
  });
});