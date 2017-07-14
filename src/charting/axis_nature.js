import * as d3 from 'd3';
import Nature from './model/nature.js';
import DrawSpec from './model/draw_spec.js';

class AxisNature extends Nature {

  initialize(svg, chartInfo, series) {
    this.axisGroup = svg.append('g').attr('class', 'axis-' + this.specs.axisPosition);
  }

  createAxisFunction(chartInfo) {
    switch(this.specs.axisPosition) {
      case 'top':
        this.axis = d3.axisBottom(this.getXScale(this.specs, chartInfo));
        break;
      case 'bottom':
        this.axis = d3.axisBottom(this.getXScale(this.specs, chartInfo));
        this.axisGroup.attr('transform', 'translate(0,' + chartInfo.yRange.max + ')');
        break;
      case 'left':
        this.axis = d3.axisRight(this.getYScale(this.specs, chartInfo));
        this.axisGroup.attr('transform', 'translate( ' + chartInfo.yRange.min + ', 0)');
        break;
      case 'right':
        this.axis = d3.axisLeft(this.getYScale(this.specs, chartInfo));
        break;
      default:
        throw 'Invalid axis position type';
    }

    this.axis.tickFormat(this.specs.labelFunction);

    if (!_.isUndefined(this.specs.ticks)) {
      this.axis.ticks(this.specs.ticks);
    }
  }

  setAxisScale(chartInfo) {
    switch(this.specs.axisPosition) {
      case 'top':
        this.axis.scale(this.getXScale(this.specs, chartInfo));
        break;
      case 'bottom':
        this.axis.scale(this.getXScale(this.specs, chartInfo));
        this.axisGroup.attr('transform', 'translate(0,' + chartInfo.yRange.max + ')');
        break;
      case 'left':
        this.axis.scale(this.getYScale(this.specs, chartInfo));
        this.axisGroup.attr('transform', 'translate( ' + chartInfo.yRange.min + ', 0)');
        break;
      case 'right':
        this.axis.scale(this.getYScale(this.specs, chartInfo));
        break;
      default:
        throw 'Invalid axis position type';
    }

    if (!_.isUndefined(this.specs.tickValues)) {
      if (this.specs.tickValues === AxisSpec.MAX_ONLY) {
        const val = this.getYScale(this.specs, chartInfo).domain()[1];
        this.axis.tickValues([val]);
      }
      else {
        this.axis.tickValues(this.specs.tickValues);
      }
    }
  }

  setAxisStyles() {
    this.axisGroup.selectAll('path')
      .attr('stroke', d => {
        return this.specs.stroke;
      })
      .attr('stroke-dasharray', this.specs.strokeDashArray);

    this.axisGroup.selectAll('line')
      .attr('stroke', d => {
        return this.specs.stroke;
      });

    this.axisGroup.selectAll('text')
      .attr('fill', d => {
        return this.specs.stroke;
      });
  }

  draw(svg, chartInfo, series) {
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
    return this.getValue(this.props.labelFunction, (value) => value, _.isFunction);
  }

  get tickValues() {
    return this.props.tickValues;
  }

  get strokeDashArray() {
    return this.getValue(this.props.strokeDashArray, '', _.isString);
  }
}

export {AxisNature, AxisSpec};
