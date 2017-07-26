import {expect} from 'chai';
import * as sinon from 'sinon';
import * as d3 from 'd3';
import * as React from 'react';
import { render } from 'react-dom';
import Chart from '../../src/charting/base_chart';
import { LineSpec, LineNature } from '../../src/charting/line_nature';
import { HoverAxisNature } from '../../src/charting/hover_axis_nature';
import { CirclePointNature } from '../../src/charting/circle_point_nature';
import { TrianglePointNature } from '../../src/charting/triangle_point_nature';
import { PointSpec } from '../../src/charting/model/point_nature';
import { BarNature, BarSpec } from '../../src/charting/bar_nature';

import { buildChartInfoObject } from '../../src/charting/util/chartinfo_factory';
import { createSvgElement } from '../../src/charting/util/svg_factory';
import { AxisNature, AxisSpec } from '../../src/charting/axis_nature';

import testData from './testdata';

describe('base chart react component', () => {
  it('renders something',() => {
    render(<Chart domainPadding={5} padding={18} data={testData.data} natures={testData.natures} />, document.body);
    expect(document.getElementsByClassName('axis-bottom')).not.to.be.empty;
    expect(document.getElementsByClassName('triangle')).not.to.be.empty;
    expect(document.getElementsByClassName('triangle').length).to.equal(5);
    expect(document.getElementsByClassName('dot').length).to.equal(5);
    expect(document.getElementsByClassName('line_nature_path').length).to.equal(1);
    expect(document.getElementsByClassName('dot_group').length).to.equal(1);
  });  
});
