import * as chai from 'chai';
import * as sinon from 'sinon';
import * as d3 from 'd3';
import * as React from 'react';
import { render } from 'react-dom';
import testData from './testdata';
import { buildChartInfoObject } from '../../src/charting/util/chartinfo_factory';
import { createSvgElement } from '../../src/charting/util/svg_factory';
import { AxisNature, AxisSpec } from '../../src/charting/axis_nature';

const expect = chai.expect;

describe('AxisNature', () => {
  it('can be newed', () => {
    const an = new AxisNature(new AxisSpec({ key: '', position: 'bottom', ticks: 4, tickSizeOuter: 0 }));
    expect(an).not.to.be.empty;
  });

  it('initialize can be called', () => {
    const an = new AxisNature(new AxisSpec({ key: '', position: 'bottom', ticks: 4, tickSizeOuter: 0 }));
    const initSpy = sinon.spy(an.initialize.bind(an));
    initSpy(createSvgElement('body', '1000px', '400px'));
    expect(initSpy.threw()).to.be.false;
  });

  it('draws something', () => {
    const an = new AxisNature(new AxisSpec({ key: '', position: 'bottom', ticks: 4, tickSizeOuter: 0 }));
    const chartInfo = buildChartInfoObject(testData.data,
      [0, 1000], 20,
      [0, 1000], 10,
      () => { });
    an.draw(createSvgElement('body', '1000px', '300px'), chartInfo, [[]]);
    expect(document.getElementsByClassName('axis-bottom')).not.to.be.empty;
    expect(document.getElementsByClassName('tick').length).to.equal(5);
    expect(document.getElementsByTagName('text').length).to.equal(5);
  });

  it('has specs that are properly passed through from the specs object', () => {
    const axisSpec = new AxisSpec({ key: '', position: 'bottom', ticks: 4, tickSizeOuter: 0 });
    const an = new AxisNature(axisSpec);
 
    expect( an.getStroke()).to.equal(axisSpec.stroke);    
    expect( an.specs.ticks).to.equal(axisSpec.ticks);
    expect( an.specs.tickSizeOuter).to.equal(axisSpec.tickSizeOuter);
    expect( an.specs.position).to.equal(axisSpec.position);
  });
});
