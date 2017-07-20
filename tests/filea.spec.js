const chai = require('../node_modules/chai/chai');
const expect = chai.expect;
import {getSpecialValue} from '../src/filea';

describe("filea", function() {
    describe("getSpecialValue", function() {
        it("returns a special value", function() {
            expect(getSpecialValue()).to.equal(10);
        });
    });
});
  