
import { LineSpec, LineNature } from './charting/line_nature';
import { AxisSpec, AxisNature } from './charting/axis_nature';
import { HoverAxisNature } from './charting/hover_axis_nature';
import CirclePointNature from './charting/circle_point_nature';
import TrianglePointNature from './charting/triangle_point_nature';
import { PointSpec } from './charting/point_nature';
import { BarNature, BarSpec } from './charting/bar_nature';
import { StackedBarNature, StackedBarSpec } from './charting/stacked_bar_nature';


import { IChartDataObject, IScaleObject, ISeries, Ixy } from './charting/util/chartinfo_factory';
import { ChartConfiguration, ChartNatureSpec, ChartNatures } from './charting/base_chart_config';

export interface IChartDataOld {
  data: IChartDataObject,
  natures: ChartNatures[]
}

export interface IChartDataNew {
  data: IChartDataObject,
  natures: ChartNatureSpec[]
}


export const chartdataNew: IChartDataNew = {
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
    {
      nature: 'bar',
      specs: [
        new BarSpec({
          key: 'l1',
          strokeWidth: 2,
          stroke: 'purple',
          fill: 'yellow',
          opacity: 0.4,
          barWidth: 10,
          useGlobalScale: false,
          cursor: 'pointer'
        })]
    },
{  nature: 'stackedBar', specs:[
      new StackedBarSpec({ key: 'l3',
        strokeWidth: 2,
        stroke: 'purple',
        fill: 'darkgreen',
        opacity: 0.4,
        barWidth: 10,
        cursor: 'pointer' }),
      new StackedBarSpec({ key: 'l2',
        strokeWidth: 2,
        stroke: 'black',
        fill: 'red',
        opacity: 0.4,
        barWidth: 10,
        cursor: 'pointer' }),
    ]},

    {
      nature: 'line',
      specs:
      [new LineSpec({ key: 'l1', color: 'green', thickness: 2.0 }),
      new LineSpec({ key: 'l2', color: 'blue' }),
      ]
    },
    {
      nature: 'circlePoint',
      specs: [new PointSpec({ key: 'l1', stroke: 'red', fill: 'blue', radius: 10, opacity: 0.3, cursor: 'pointer' })],
    },
    {
      nature: 'axis',
      specs: new AxisSpec({ key: '', position: 'left', ticks: 3 })
    },
    {
      nature: 'axis',
      specs: new AxisSpec({ key: '', position: 'bottom', ticks: 4, tickSizeOuter: 0 })
    },

    {
      nature: 'hoverAxis',
      specs: new AxisSpec({
        key: '',
        position: 'left',
        ticks: 1,
        useGlobalScale: false,
        tickValues: AxisSpec.MAX_ONLY,
        strokeDashArray: '8,4',
        labelFunction: tick => parseInt(tick, 10).toFixed(2)
      })
    },
    {
      nature: 'trianglePoint',
      specs: [
        new PointSpec({ key: 'l2', stroke: 'green', fill: 'darkgray', radius: 3, cursor: 'pointer' }),
      ]
    },

  ],
};