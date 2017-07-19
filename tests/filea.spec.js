import { getSpecialValue } from "filea";

describe("filea", function() {

    describe("getSpecialValue", function() {

        it("returns a special value", function() {
            expect(getSpecialValue()).to.equal(10);
        });

    });

});
  