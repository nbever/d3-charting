import { LineSpec, LineNature } from '../../src/charting/line_nature';
import { HoverAxisNature } from '../../src/charting/hover_axis_nature';
import CirclePointNature from '../../src/charting/circle_point_nature';
import TrianglePointNature from '../../src/charting/triangle_point_nature';
import { PointSpec } from '../../src/charting/point_nature';
// import { BarNature, BarSpec } from '../../src/charting/bar_nature';
import { AxisNature, AxisSpec } from '../../src/charting/axis_nature';
import { IChartDataOld, IChartDataNew } from '../../src/chartdata';




const testData: IChartDataNew = {
  data: {
    l1: {
      datapoints: [
        { x: 0, y: 123 },
        { x: 1, y: 100 },
        { x: 2, y: 83 },
        { x: 3, y: 185 },
        { x: 4, y: 12 },
      ],
    },
    l2: {
      datapoints: [
        { x: 0, y: 45 },
        { x: 1, y: 72 },
        { x: 2, y: 6 },
        { x: 3, y: 111 },
        { x: 4, y: 12 },
      ],
    },
    l3: {
      datapoints: [
        { x: 0, y: 1.32 },
        { x: 1, y: 24.123242 },
        { x: 2, y: 62.12 },
        { x: 3, y: 0.432 },
        { x: 4, y: 10 },
      ],
    },
  },
  natures: [{
    nature: 'line',
    specs: [
      new LineSpec({ key: 'l1', color: 'green', thickness: 2.0 })
    ]
  },
  // {
  //   nature: 'circlePoint',
  //   specs: [
  //     new PointSpec({ key: 'l1', stroke: 'red', fill: 'blue', radius: 10, opacity: 0.3, cursor: 'pointer' }),
  //   ]
  // }, {
  //   nature: 'trianglePoint',
  //   specs: [
  //     new PointSpec({ key: 'l1', stroke: 'green', fill: 'darkgray', radius: 3, cursor: 'pointer' }),
  //   ]
  // },
  // {
  //   nature: 'hoverAxis',
  //   specs: [new AxisSpec({
  //     key: '',
  //     position: 'left',
  //     ticks: 1,
  //     useGlobalScale: false,
  //     tickValues: AxisSpec.MAX_ONLY,
  //     strokeDashArray: '8,4',
  //     labelFunction: tick => parseInt(tick, 10).toFixed(2)
  //   })
  //   ]
  // }, {
  //   nature: 'axis',
  //   specs: [
  //     new AxisSpec({ key: '', position: 'bottom', ticks: 4, tickSizeOuter: 0 })
  //   ]
  // }
  ]
};
export default testData;

    // new AxisNature(new AxisSpec({key: '', position: 'left', ticks: 3})),