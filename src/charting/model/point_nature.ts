
import { Nature } from './nature';
import DrawSpec from './draw_spec';
import ChartEvent from './chart_event';

import ChartInfo from '../model/chart_info';
import { IChartDataObject } from '../util/chartinfo_factory';

import * as _ from 'lodash';

class PointNature extends Nature {

  public pointGroup: any;
  initialize(svg: d3.Selection< SVGElement,{},HTMLElement,any>, chartInfo: ChartInfo, series:IChartDataObject) { // 
    this.pointGroup = svg.append('g').attr('class', `${this.getNatureName()}_nature`);
  }

  buildNewShapes(chartInfo, series) {
    this.pointGroup.selectAll(`.${this.getNatureName()}_group`).remove();

    const points = this.pointGroup.selectAll(`.${this.getNatureName()}_nature`).data(series[0]).enter()
      .append('g')
      .attr('class', `${this.getNatureName()}_group`)
      .attr('data-spec-index', (d, i) => i);

    const appender = points
      .selectAll(`.${this.getNatureName()}`)
      .data(d => d.datapoints)
      .enter();

    this.drawShape(appender)
      .on('mouseover', (d, i, nodes) => {
        const spec = this.getSpecFromChild(nodes[0]);
        chartInfo.fireEvent(new ChartEvent('mouseover', d, spec));
      })
      .on('mouseout', (d, i, nodes) => {
        const spec = this.getSpecFromChild(nodes[0]);
        chartInfo.fireEvent(new ChartEvent('mouseout', d, spec));
      })
      .attr('class', `${this.getNatureName()}`);
  }

  draw(svg, chartInfo, series) {
    if (_.isUndefined(this.pointGroup)) {
      this.initialize(svg, chartInfo, series);
    }

    const elmCount = this.countElements();
    const points = series[0].reduce((total, s) => total + s.datapoints.length, 0);

    if (points !== elmCount) {
      this.buildNewShapes(chartInfo, series);
    }

    const shape = this.pointGroup.selectAll(`.${this.getNatureName()}_group`)
      .data(series[0])
      .attr('visibility', (d, i) => { // , nodes
        if (this.specs[i].show === false) {
          return 'hidden';
        }

        return 'visible';
      })
      .selectAll(`.${this.getNatureName()}`)
      .data(d => d.datapoints)
      .transition();

    this.setShapeAttrs(shape, chartInfo)
      .attr('stroke', (d, i, nodes) => this.getSpecFromChild(nodes[0]).stroke)
      .attr('stroke-width', (d, i, nodes) => this.getSpecFromChild(nodes[0]).strokeWidth)
      .attr('fill', (d, i, nodes) => this.getSpecFromChild(nodes[0]).fill)
      .attr('fill-opacity', (d, i, nodes) => this.getSpecFromChild(nodes[0]).opacity)
      .attr('cursor', (d, i, nodes) => this.getSpecFromChild(nodes[0]).cursor);
  }

  countElements() {
    throw new Error('countElements is not implemented!');
  }

  drawShape(appender? : any): any { // appender
    throw new Error('drawShape is not implemented!');
  }

  setShapeAttrs(arg1?:any, arg2?:any): any { // shape
    throw new Error('setShapeAttrs is not implemented!');
  }

  getNatureName() {
    return 'point';
  }

  getSpecFromChild(child) {
    if (_.isUndefined(child)) {
      return undefined;
    }

    return this.specs[parseInt(child.parentNode.getAttribute('data-spec-index'), 10)];
  }
}

class PointSpec extends DrawSpec {
  get radius() {
    return this.getValue(this.props.radius, 10, <any> _.isNumber);
  }

  get stroke() {
    return this.getValue(this.props.stroke, 'black', _.isString);
  }

  get strokeWidth() {
    return this.getValue(this.props.strokeWidth, 1, _.isNumber);
  }

  get fill() {
    return this.getValue(this.props.fill, 'transparent', _.isString);
  }

  get opacity() {
    return this.getValue(this.props.opacity, 1.0, _.isNumber);
  }
}

export { PointSpec, PointNature };
