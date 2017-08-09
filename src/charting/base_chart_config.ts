
import { LineSpec } from '../charting/line_nature';
import { BarSpec } from '../charting/bar_nature';
import { AxisSpec } from '../charting/axis_nature';
import { PointSpec } from '../charting/model/point_nature';
import { StackedBarSpec } from '../charting/stacked_bar_nature';


import { LineNature } from '../charting/line_nature';
import { BarNature } from '../charting/bar_nature';
import { StackedBarNature } from '../charting/stacked_bar_nature';
import { AxisNature } from '../charting/axis_nature';
import { HoverAxisNature } from '../charting/hover_axis_nature';
import CirclePointNature from '../charting/circle_point_nature';
import TrianglePointNature from '../charting/triangle_point_nature';



// type Natures = LineNature | BarNature | StackedBarNature |
//   AxisNature | HoverAxisNature |
//   CirclePointNature | TrianglePointNature;

export interface LineNatureSpec {
  nature: 'line';
  specs: [LineSpec];
  ctor?: LineNature;
}
export interface BarNatureSpec {
  nature: 'bar';
  specs: [BarSpec];
  ctor?: BarNature;
}

export interface StackedBarNatureSpec {
  nature: 'stackedBar';
  specs: [BarSpec];
  ctor?: StackedBarNature;
}

export interface AxisNatureSpec {
  nature: 'axis';
  specs: [AxisSpec];
  ctor?: AxisNature;
}

export interface HoverAxisNatureSpec {
  nature: 'hoverAxis';
  specs: [AxisSpec];
  ctor?: HoverAxisNature;
}

export interface CirclePointNatureSpec {
  nature: 'circlePoint';
  specs: [PointSpec];
  ctor?: CirclePointNature;
}

export interface TrianglePointNatureSpec {
  nature: 'trianglePoint';
  specs: [PointSpec];
  ctor?: TrianglePointNature;
}

export type ChartNatureSpec = LineNatureSpec | BarNatureSpec | StackedBarNatureSpec | AxisNatureSpec |
  HoverAxisNatureSpec | CirclePointNatureSpec | TrianglePointNatureSpec;

export type ChartNatures = LineNature | BarNature| StackedBarNature| AxisNature| HoverAxisNature| CirclePointNature| TrianglePointNature;

export interface ChartConfiguration {
  natures: ChartNatureSpec[]
}
