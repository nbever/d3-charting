
import { LineSpec } from '../charting/line_nature';
import { BarSpec } from '../charting/bar_nature';
import { AxisSpec } from '../charting/axis_nature';
import { PointSpec } from '../charting/point_nature';
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
  specs: LineSpec[];
  Nctor?: LineNature;
  
}
export interface BarNatureSpec {
  nature: 'bar';
  specs: BarSpec[];
  Nctor?: BarNature;
  
}

export interface StackedBarNatureSpec {
  nature: 'stackedBar';
  specs: BarSpec[];
  Nctor?: StackedBarNature;
  
}

export interface AxisNatureSpec {
  nature: 'axis';
  specs: AxisSpec;
  Nctor?: AxisNature;
  
}

export interface HoverAxisNatureSpec {
  nature: 'hoverAxis';
  specs: AxisSpec;
  Nctor?: HoverAxisNature;
  
}

export interface CirclePointNatureSpec {
  nature: 'circlePoint';
  specs: PointSpec[];
  Nctor?: CirclePointNature;
  
}

export interface TrianglePointNatureSpec {
  nature: 'trianglePoint';
  specs: PointSpec[];
  Nctor?: TrianglePointNature;
  
}

export type ChartNatureSpec = LineNatureSpec | BarNatureSpec | StackedBarNatureSpec | AxisNatureSpec |
  HoverAxisNatureSpec | CirclePointNatureSpec | TrianglePointNatureSpec;

export type ChartNatures = LineNature | BarNature| StackedBarNature| AxisNature| HoverAxisNature| CirclePointNature| TrianglePointNature;

export type ChartSpecs = LineSpec| BarSpec|AxisSpec| PointSpec;

export interface ChartConfiguration {
  natures: ChartNatureSpec[]
}
