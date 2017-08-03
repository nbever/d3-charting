import * as d3 from 'd3';
import { BarNature, BarSpec } from './bar_nature';

import * as _ from 'lodash';


class GroupedBarNature extends BarNature {
  initialize(svg: d3.Selection<SVGGElement, {}, HTMLElement, any>) { // , chartInfo, series
    this.barGroup = svg.append<SVGGElement>('g');
    this.barGroup.attr('class', 'grouped_bar_nature');
  }

  private yScale: any;
  private yMin: any;
  private yMax: any;

  draw(svg, chartInfo, series) {
    // debugger
    const groupedData = this.groupTheData(series);
    this.yScale = d3.scaleLinear()
      .domain([this.yMin, this.yMax])
      .range([chartInfo.yRange.min - chartInfo.padding,
      chartInfo.yRange.max - chartInfo.padding]);

    super.draw(svg, chartInfo, groupedData);
  }

  groupTheData(series) {
    return series;
  }

  getYScale() { // spec, chartInfo
    return this.yScale;
  }
}

class GroupedBarSpec extends BarSpec {
  get domainValue() {
    return this.getValue(this.props.domainValue, dp => dp.x, _.isFunction);
  }

  get rangeValue() {
    return this.getValue(this.props.rangeValue, dp => dp.y, _.isFunction);
  }
}

export { GroupedBarNature, GroupedBarSpec };