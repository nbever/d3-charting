import * as d3 from 'd3';
import { BarNature, BarSpec } from './bar_nature';

import { IChartDataObject, IScaleObject, ISeries } from './util/chartinfo_factory';
import ChartInfo from './model/chart_info';
import * as _ from 'lodash';

class StackedBarNature extends BarNature {
  initialize(svg: d3.Selection<SVGGElement,{},HTMLElement,any>) { // , chartInfo, series
    this.barGroup = svg.append<SVGGElement>('g');
    this.barGroup.attr('class', 'stacked_bar_nature');
  }

private yScale:any;
private yMin:any;
private yMax:any;

  draw(svg, chartInfo: ChartInfo, series: ISeries) {
    const stackedData = this.stackTheData(series);
    this.yScale = d3.scaleLinear()
      .domain([this.yMin, this.yMax])
      .range([chartInfo.yRange.min - chartInfo.padding,
        chartInfo.yRange.max - chartInfo.padding]);

    super.draw(svg, chartInfo, <any>[stackedData]);
  }

  turnStackIntoDrawableSet(staks) {
    const series = [];

    this.yMin = Number.MAX_VALUE;
    this.yMax = Number.MIN_VALUE;

    staks.forEach((data) => {
      const newSeries = {
        datapoints: data.map((dp) => {
          this.yMin = Math.min(this.yMin, dp[0]);
          this.yMax = Math.max(this.yMax, dp[1]);

          return { x: parseInt(dp.data.x, 10), y: dp[1], y0: dp[0] };
        }),
      };

      series.push(newSeries);
    });

    return series;
  }

  stackTheData(series: ISeries) {
    const dataMap = this.buildXMap(series, this.specs[0]);
    const flatMap = this.flattenMap(dataMap);
    const stacked = d3.stack().keys(this.getKeys())(flatMap);
    return this.turnStackIntoDrawableSet(stacked);
  }

  buildXMap(data, leadSpec) {
    const map = {};

    data[0].forEach((series, index) => {
      series.datapoints.forEach((dp) => {
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

  flattenMap(dataMap) {
    const stackableData = [];

    for (const xKey in dataMap) {
      const record = { x: xKey };
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

class StackedBarSpec extends BarSpec {
  get domainValue() {
    return this.getValue(this.props.domainValue, dp => dp.x, _.isFunction);
  }

  get rangeValue() {
    return this.getValue(this.props.rangeValue, dp => dp.y, _.isFunction);
  }
}

export { StackedBarNature, StackedBarSpec };
