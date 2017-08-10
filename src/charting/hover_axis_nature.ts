import { AxisNature, AxisSpec } from './axis_nature';
import * as _ from 'lodash';

import { IChartDataObject, IScaleObject, ISeries } from './util/chartinfo_factory';
import ChartInfo from './model/chart_info';

class HoverAxisNature extends AxisNature {
  private svg: d3.Selection<SVGElement, ISeries[][], HTMLElement, any>;
  private useGlobalScale: any;
  private hoverSpec: any;
  private seriesKey: any;

  initialize(svg: d3.Selection<SVGElement, ISeries[][], HTMLElement, any>, chartInfo: ChartInfo) {
    this.axisGroup = svg.append<SVGGElement>('g');
    this.axisGroup.attr('class', `hover-axis-${this.specs.axisPosition}`);
  }

  draw(svg: d3.Selection<SVGElement, ISeries[][], HTMLElement, any>, chartInfo: ChartInfo, series: ISeries[][]) {
    // do nothing
    this.svg = svg;
  }

  handleEvent(chartEvent: any, chartInfo: ChartInfo) {
    if (chartEvent.eventType === 'mouseover') {
      this.showAxis(chartInfo, chartEvent.drawSpec);
    } else if (chartEvent.eventType === 'mouseout') {
      this.hideAxis();
    }
  }

  getYScale(spec: any, chartInfo: ChartInfo) {
    if (this.useGlobalScale === true) {
      return chartInfo.scales.yScales.y;
    }

    return chartInfo.scales.yScales[this.seriesKey];
  }

  getXScale(spec: any, chartInfo: ChartInfo) {
    if (this.useGlobalScale === true) {
      return chartInfo.scales.xScales.x;
    }

    return chartInfo.scales.xScales[this.seriesKey];
  }

  getStroke() {
    if (_.isUndefined(this.specs.props.stroke)) {
      return this.hoverSpec.fill;
    }

    return this.specs.stroke;
  }

  showAxis(chartInfo: ChartInfo, spec: any) {
    if (_.isUndefined(this.axisGroup)) {
      this.initialize(this.svg, chartInfo);
    }

    this.hoverSpec = spec;
    this.seriesKey = spec.getKey();
    this.useGlobalScale = spec.useGlobalScale;
    this.createAxisFunction(chartInfo);
    this.setAxisScale(chartInfo);
    this.axisGroup.call(this.axis);
    this.setAxisStyles();
  }

  hideAxis() {
    this.axisGroup.remove();
    delete this.axisGroup;
  }
}

export { HoverAxisNature };
