const chai = require( '../../node_modules/chai/chai' );
const expect = chai.expect;
import {
  AxisNature
} from '../../src/charting/axis_nature';

describe( "AxisNature", function() {
  it( "can be newed", function() {
    const an = new AxisNature();
    expect( an ).not.to.be.empty;
    it( "initialize can be called", function() {
      an.initialize();
    } );
  } );
} );