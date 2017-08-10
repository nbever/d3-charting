import { expect } from 'chai';
import * as sinon from 'sinon';
import * as React from 'react';
import { render } from 'react-dom';

import { Chart, ChartProps, ChartState } from '../../src/charting/base_chart';

import testData from './testdata';
import testDataNew from './testdata_new';

import * as styles from '../../src/styles/base.scss';

describe('base chart react component', () => {
  before(() => {
    let iDiv = document.createElement('div');
    iDiv.id = 'mychart';
    document.getElementsByTagName('body')[0].appendChild(iDiv);
  });

  it('renders something', () => {
    render(<Chart domainPadding={5} padding={8} rangePadding={0} data={testDataNew.data} natures={testDataNew.natures} />, document.getElementById('mychart'));
    expect(document.getElementsByClassName('axis-bottom')).not.to.be.empty;
    // expect(document.getElementsByClassName('triangle')).not.to.be.empty;
    // expect(document.getElementsByClassName('triangle').length).to.equal(5);
    // expect(document.getElementsByClassName('dot').length).to.equal(5);
    expect(document.getElementsByClassName('line_nature_path').length).to.equal(2);
    // expect(document.getElementsByClassName('dot_group').length).to.equal(1);
  });
});
