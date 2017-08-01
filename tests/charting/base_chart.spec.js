"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var React = require("react");
var react_dom_1 = require("react-dom");
var base_chart_1 = require("../../src/charting/base_chart");
var testdata_1 = require("./testdata");
describe('base chart react component', function () {
    before(function () {
        var iDiv = document.createElement('div');
        iDiv.id = 'mychart';
        document.getElementsByTagName('body')[0].appendChild(iDiv);
    });
    it('renders something', function () {
        react_dom_1.render(React.createElement(base_chart_1.default, { domainPadding: 5, padding: testdata_1.default.data, data: testdata_1.default.data, natures: testdata_1.default.natures }), document.getElementById('mychart'));
        chai_1.expect(document.getElementsByClassName('axis-bottom')).not.to.be.empty;
        chai_1.expect(document.getElementsByClassName('triangle')).not.to.be.empty;
        chai_1.expect(document.getElementsByClassName('triangle').length).to.equal(5);
        chai_1.expect(document.getElementsByClassName('dot').length).to.equal(5);
        chai_1.expect(document.getElementsByClassName('line_nature_path').length).to.equal(1);
        chai_1.expect(document.getElementsByClassName('dot_group').length).to.equal(1);
    });
});
//# sourceMappingURL=base_chart.spec.js.map