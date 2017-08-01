import * as d3 from 'd3';
import { Nature, IspecsObj } from './model/nature';
import DrawSpec from './model/draw_spec';
import * as _ from 'lodash';

import ChartInfo from './model/chart_info';
class AxisNature extends Nature {
  public axis: d3.Axis<{}>;
  public axisGroup: d3.Selection<SVGElement, {}, HTMLElement, any>;
  public specs: IspecsObj;

  initialize(svg: d3.Selection<SVGElement, {}, HTMLElement, any>, ...rest) {
    this.axisGroup = svg.append<SVGGElement>('g').attr('class', `axis-${this.specs.axisPosition}`);
  }

  createAxisFunction(chartInfo: ChartInfo) {
    switch (this.specs.axisPosition) {
      case 'top':
        this.axis = d3.axisBottom(this.getXScale(this.specs, chartInfo));
        break;
      case 'bottom':
        this.axis = d3.axisBottom(this.getXScale(this.specs, chartInfo));
        this.axisGroup.attr('transform', `translate(0,${chartInfo.yRange.max})`);
        break;
      case 'left':
        this.axis = d3.axisRight(this.getYScale(this.specs, chartInfo));
        this.axisGroup.attr('transform', `translate( ${chartInfo.yRange.min}, 0)`);
        break;
      case 'right':
        this.axis = d3.axisLeft(this.getYScale(this.specs, chartInfo));
        break;
      default:
        throw new Error('Invalid axis position type');
    }

    this.axis.tickFormat(this.specs.labelFunction);
    this.axis.tickSizeOuter(this.specs.tickSizeOuter);

    if (!_.isUndefined(this.specs.ticks)) {
      this.axis.ticks(this.specs.ticks);
    }
  }

  setAxisScale(chartInfo) {
    switch (this.specs.axisPosition) {
      case 'top':
        this.axis.scale(this.getXScale(this.specs, chartInfo));
        break;
      case 'bottom':
        this.axis.scale(this.getXScale(this.specs, chartInfo));
        this.axisGroup.attr('transform', `translate(0,${chartInfo.yRange.max})`);
        break;
      case 'left':
        this.axis.scale(this.getYScale(this.specs, chartInfo));
        this.axisGroup.attr('transform', `translate( ${chartInfo.yRange.min}, 0)`);
        break;
      case 'right':
        this.axis.scale(this.getYScale(this.specs, chartInfo));
        break;
      default:
        throw new Error('Invalid axis position type');
    }

    if (!_.isUndefined(this.specs.tickValues)) {
      if (this.specs.tickValues === AxisSpec.MAX_ONLY) {
        const val = this.getYScale(this.specs, chartInfo).domain()[1];
        this.axis.tickValues([val]);
      } else {
        this.axis.tickValues(this.specs.tickValues);
      }
    }
  }

  setAxisStyles() {
    const stroke = this.getStroke();

    this.axisGroup.selectAll('path')
      .attr('stroke', d => this.getStroke())
      .attr('stroke-dasharray', this.specs.strokeDashArray);

    this.axisGroup.selectAll('line')
      .attr('stroke', d => this.getStroke());

    this.axisGroup.selectAll('text')
      .attr('fill', d => this.getStroke());
  }

  getStroke() {
    return this.specs.stroke;
  }

  draw(svg?, chartInfo?, series?) {
    if (_.isUndefined(this.axisGroup)) {
      this.initialize(svg, chartInfo, series);
      this.createAxisFunction(chartInfo);
    }

    this.setAxisScale(chartInfo);
    this.axisGroup.call(this.axis);
    this.setAxisStyles();
  }
}

class AxisSpec extends DrawSpec {
  static MAX_ONLY = 'MAX_ONLY';
  static positionTypes = ['top', 'bottom', 'left', 'right'];

  get stroke() {
    return this.getValue(this.props.stroke, 'black', _.isString);
  }

  get axisPosition() {
    return this.getValue(this.props.position, 'bottom', _.isString);
  }

  get tickPosition() {
    return this.getValue(this.props.position, 'bottom', _.isString);
  }

  get ticks() {
    return this.props.ticks;
  }

  get labelFunction() {
    return this.getValue(this.props.labelFunction, value => value, _.isFunction);
  }

  get tickValues() {
    return this.props.tickValues;
  }

  get strokeDashArray() {
    return this.getValue(this.props.strokeDashArray, '', _.isString);
  }

  get tickSizeOuter() {
    return this.getValue(this.props.tickSizeOuter, 6, _.isNumber);
  }
  get position() {
    return this.getValue(this.props.position, 'bottom', _.isString);
  }
}

export { AxisNature, AxisSpec };
