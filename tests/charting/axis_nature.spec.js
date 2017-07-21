import chai from  'chai' ;
const expect = chai.expect;
import sinon from 'sinon';
import * as d3 from 'd3';

import {
  AxisNature, AxisSpec
} from '../../src/charting/axis_nature';

describe( "AxisNature", function() {
  it( "can be newed", function() {
    const an = new AxisNature();
    expect( an ).not.to.be.empty;

  } );
  it( "initialize can be called", ()  => {
    const an = new AxisNature(new AxisSpec({key: '', position: 'bottom', ticks: 4, tickSizeOuter: 0}));
    const initSpy = sinon.spy( an.initialize.bind(an) );
    const spyResult = initSpy( d3.select("body").append("svg"));
    expect(initSpy.threw()).to.be.false; 

  } );
} );