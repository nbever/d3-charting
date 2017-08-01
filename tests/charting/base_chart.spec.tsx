import { expect } from 'chai';
import * as sinon from 'sinon';
import * as React from 'react';
import { render } from 'react-dom';
import Chart from '../../src/charting/base_chart';

import testData from './testdata';

describe('base chart react component', () => {
  before(()=> {
    let iDiv = document.createElement('div');
    iDiv.id = 'mychart';
    document.getElementsByTagName('body')[0].appendChild(iDiv);
  });


  it('renders something', () => {
    render(<Chart domainPadding={5} padding={testData.data} data={testData.data} natures={testData.natures} />, document.getElementById('mychart'));
    expect(document.getElementsByClassName('axis-bottom')).not.to.be.empty;
    expect(document.getElementsByClassName('triangle')).not.to.be.empty;
    expect(document.getElementsByClassName('triangle').length).to.equal(5);
    expect(document.getElementsByClassName('dot').length).to.equal(5);
    expect(document.getElementsByClassName('line_nature_path').length).to.equal(1);
    expect(document.getElementsByClassName('dot_group').length).to.equal(1);
  });
});
