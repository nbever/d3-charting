import * as d3 from 'd3';
import { BarNature, BarSpec } from './bar_nature';

import { IChartDataObject, IScaleObject, ISeries } from './util/chartinfo_factory';

import {DrawSpec, ISpecInitProp} from './model/draw_spec';
import ChartInfo from './model/chart_info';
import * as _ from 'lodash';

class StackedBarNature extends BarNature {
  initialize(svg: d3.Selection<SVGGElement, ISeries[][], HTMLElement, any>) { // , chartInfo, series
    this.barGroup = svg.append<SVGGElement>('g');
    this.barGroup.attr('class', 'stacked_bar_nature');
  }
  handleEvent(){}

  private yScale: any;
  private yMin: any;
  private yMax: any;

  draw(svg: d3.Selection<SVGElement, ISeries[][], HTMLElement, any>, chartInfo: ChartInfo, series: ISeries[][]) {
    const stackedData = this.stackTheData(series);
    this.yScale = d3.scaleLinear()
      .domain([this.yMin, this.yMax])
      .range([chartInfo.yRange.min - chartInfo.padding,
      chartInfo.yRange.max - chartInfo.padding]);

    super.draw(svg, chartInfo, <any>[stackedData]);
  }

  turnStackIntoDrawableSet(staks:any) {
    const series:any = [];

    this.yMin = Number.MAX_VALUE;
    this.yMax = Number.MIN_VALUE;

    staks.forEach((data: any) => {
      const newSeries = {
        datapoints: data.map((dp: any) => {
          this.yMin = Math.min(this.yMin, dp[0]);
          this.yMax = Math.max(this.yMax, dp[1]);

          return { x: parseInt(dp.data.x, 10), y: dp[1], y0: dp[0] };
        }),
      };

      series.push(newSeries);
    });

    return series;
  }

  stackTheData(series: ISeries[][]) {
    const dataMap = this.buildXMap(series, this.specs[0]);
    const flatMap = this.flattenMap(dataMap);
    const stacked = d3.stack().keys(this.getKeys())(flatMap);
    return this.turnStackIntoDrawableSet(stacked);
  }

  buildXMap(data: any, leadSpec: any) {
    const map: any = {};

    data[0].forEach((series: any, index: any) => {
      series.datapoints.forEach((dp: any) => {
        const xVal = leadSpec.domainValue(dp);
        let record = map[xVal];

        if (_.isUndefined(record)) {
          record = {};
        }

        record[this.getKeys()[index]] = leadSpec.rangeValue(dp);
        map[xVal] = record;
      });
    });

    return map;
  }

  flattenMap(dataMap: any) {
    const stackableData: any = [];

    for (const xKey in dataMap) {
      const record: any = { x: xKey };
      for (const yKey in dataMap[xKey]) {
        record[yKey] = dataMap[xKey][yKey];
      }

      stackableData.push(record);
    }

    return stackableData;
  }

  getYScale() { // spec, chartInfo
    return this.yScale;
  }
}
export interface StackedBarSpecInitProps  extends ISpecInitProp{
  key: string,
  strokeWidth?: number,
  stroke?: string,
  fill?: string,
  opacity?: number,
  barWidth?: number,
  cursor?: string,
  domainValue?: number,
  rangeValue?: number
}
class StackedBarSpec extends BarSpec<StackedBarSpecInitProps> {

  constructor(props: StackedBarSpecInitProps) {
    super(props);
  }
  get domainValue() {
    return this.getValue(this.props.domainValue, (dp: any) => dp.x, _.isFunction);
  }

  get rangeValue() {
    return this.getValue(this.props.rangeValue, (dp: any) => dp.y, _.isFunction);
  }
}

export { StackedBarNature, StackedBarSpec };
