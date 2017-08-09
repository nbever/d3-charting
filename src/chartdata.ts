
import { LineSpec, LineNature } from './charting/line_nature';
import { AxisSpec, AxisNature } from './charting/axis_nature';
import { HoverAxisNature } from './charting/hover_axis_nature';
import CirclePointNature from './charting/circle_point_nature';
import TrianglePointNature from './charting/triangle_point_nature';
import { PointSpec } from './charting/model/point_nature';
import { BarNature, BarSpec } from './charting/bar_nature';
import { StackedBarNature, StackedBarSpec } from './charting/stacked_bar_nature';
import { GroupedBarNature, GroupedBarSpec } from './charting/grouped_bar_nature';



export const chartdata = {
  data: {
    l1: {
      datapoints: [
      ],
    },
    l2: {
      datapoints: [
      ],
    },
    l3: {
      datapoints: [],
    },
  },
  natures: [
    new BarNature([
      new BarSpec({
        key: 'l1',
        strokeWidth: 2,
        stroke: 'purple',
        fill: 'yellow',
        opacity: 0.4,
        barWidth: 10,
        useGlobalScale: false,
        cursor: 'pointer'
      }),
    ]),

    // new StackedBarNature([
    //   new StackedBarSpec({ key: 'l3',
    //     strokeWidth: 2,
    //     stroke: 'purple',
    //     fill: 'darkgreen',
    //     opacity: 0.4,
    //     barWidth: 10,
    //     cursor: 'pointer' }),
    //   new StackedBarSpec({ key: 'l2',
    //     strokeWidth: 2,
    //     stroke: 'black',
    //     fill: 'red',
    //     opacity: 0.4,
    //     barWidth: 10,
    //     cursor: 'pointer' }),
    // ]),

    // new GroupedBarNature([
    //   new GroupedBarSpec({
    //     key: 'l1',
    //     strokeWidth: 2,
    //     stroke: 'purple',
    //     fill: 'darkgreen',
    //     opacity: 0.4,
    //     barWidth: 10,
    //     cursor: 'pointer'
    //   }),
    //   new GroupedBarSpec({
    //     key: 'l2',
    //     strokeWidth: 2,
    //     stroke: 'black',
    //     fill: 'red',
    //     opacity: 0.4,
    //     barWidth: 10,
    //     cursor: 'pointer'
    //   }),
    // ]),

    new LineNature([
      new LineSpec({ key: 'l1', color: 'green', thickness: 2.0 }),
      new LineSpec({ key: 'l2', color: 'blue' }),
    ]),
    new CirclePointNature([
      new PointSpec({ key: 'l1', stroke: 'red', fill: 'blue', radius: 10, opacity: 0.3, cursor: 'pointer' }),
    ]),
    new TrianglePointNature([
      new PointSpec({ key: 'l2', stroke: 'green', fill: 'darkgray', radius: 3, cursor: 'pointer' }),
    ]),
    new AxisNature(new AxisSpec({ key: '', position: 'left', ticks: 3 })),
    new HoverAxisNature(new AxisSpec({
      key: '',
      position: 'left',
      ticks: 1,
      useGlobalScale: false,
      tickValues: AxisSpec.MAX_ONLY,
      strokeDashArray: '8,4',
      labelFunction: tick => parseInt(tick, 10).toFixed(2)
    })),
    new AxisNature(new AxisSpec({ key: '', position: 'bottom', ticks: 4, tickSizeOuter: 0 })),
  ],
};
