import chai from 'chai';
import sinon from 'sinon';
import * as d3 from 'd3';

import {
  AxisNature, AxisSpec,
} from '../../src/charting/axis_nature';

const expect = chai.expect;

describe('AxisNature', () => {
  it('can be newed', () => {
    const an = new AxisNature();
    expect(an).not.to.be.empty;
  });

  it('initialize can be called', () => {
    const an = new AxisNature(new AxisSpec({ key: '', position: 'bottom', ticks: 4, tickSizeOuter: 0 }));
    const initSpy = sinon.spy(an.initialize.bind(an));
    initSpy(d3.select('body').append('svg'));
    expect(initSpy.threw()).to.be.false;
  });

  it('draws something', () => {
    const an = new AxisNature(new AxisSpec({ key: '', position: 'bottom', ticks: 4, tickSizeOuter: 0 }));
    // const initSpy = sinon.spy(an.initialize.bind(an));
    // initSpy(d3.select('body').append('svg'));
    // expect(initSpy.threw()).to.be.false;
    an.draw(d3.select('body').append('svg'), {}, {});
  });
});
