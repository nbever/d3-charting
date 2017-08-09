import * as React from 'react';
import { render } from 'react-dom';
import * as  $ from 'jquery';
import * as _ from 'lodash';

import ChartBlock from './components/chart_block';

import { LineSpec, LineNature } from './charting/line_nature';
import { AxisSpec, AxisNature } from './charting/axis_nature';
import { HoverAxisNature } from './charting/hover_axis_nature';
import CirclePointNature from './charting/circle_point_nature';
import TrianglePointNature from './charting/triangle_point_nature';
import { PointSpec } from './charting/model/point_nature';
import { BarNature, BarSpec } from './charting/bar_nature';
import { StackedBarNature, StackedBarSpec } from './charting/stacked_bar_nature';

import { Chart, ChartProps, ChartState } from './charting/base_chart';

import Header from './components/header';
import { strings } from './utils/strings';

import { chartdata } from './chartdata';
import App from './app';


const stringPt: any = String.prototype;
stringPt.width = function monkeyWidth(font: any) {
  const o = $(`<div>${this}</div>`)
    .css({ position: 'absolute', float: 'left', 'white-space': 'nowrap', visibility: 'hidden', font })
    .appendTo($('body'));
  const w = o.width();
  o.remove();
  return w;
};

render(<App />, document.getElementById('app'));
