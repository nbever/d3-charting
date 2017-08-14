import * as chai from 'chai';
import * as sinon from 'sinon';
import * as d3 from 'd3';
import * as React from 'react';
import { render } from 'react-dom';
import testData from './testdata_new';
import { buildChartInfoObject } from '../../src/charting/util/chartinfo_factory';
import { createSvgElement } from '../../src/charting/util/svg_factory';
import { LineNature,LineSpec, LineSpecInitProps } from '../../src/charting/line_nature';

const expect = chai.expect;

describe('LineNature', () => {
  it('can be newed', () => {
    const ln = new LineNature([new LineSpec({ key: 'l1' })]);
    expect(ln).not.to.be.empty;
  });

  it('initialize can be called', () => {
    const ln = new LineNature([new LineSpec({ key: 'l1' })]);
    const initSpy = sinon.spy(ln.initialize.bind(ln));
      const chartInfo = buildChartInfoObject(testData.data,
      [0, 1000], 20,
      [0, 1000], 10,
      () => { });
    initSpy(createSvgElement('body', '1000px', '400px'), chartInfo,[testData.data]);
    expect(initSpy.threw()).to.be.false;
  });

  it('draws something', () => {
    const ln = new LineNature([new LineSpec({ key: 'l1' })]);
    const chartInfo = buildChartInfoObject(testData.data,
      [0, 500], 20,
      [0, 500], 10,
      () => { });
    ln.draw(createSvgElement('body', '1000px', '300px'), chartInfo, [testData.data] as any);
    // expect(document.getElementsByClassName('axis-bottom')).not.to.be.empty;
    // expect(document.getElementsByClassName('tick').length).to.equal(10);
    // expect(document.getElementsByTagName('text').length).to.equal(10);
  });

  it('has specs that are properly passed through from the specs object', () => {
    const lineSpec = new LineSpec({ key: ''});
    const ln = new LineNature([lineSpec]);
 
    expect(ln.getKeys()).not.to.be.empty;
  });
});
