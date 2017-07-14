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
        this.axis = d3.axisLeft(this.getYScale(this.specs, chartInfo));
        this.axisGroup.attr('transform', 'translate( ' + chartInfo.yRange.min + ', 0)');
        break;
      case 'right':
        this.axis = d3.axisRight(this.getYScale(this.specs, chartInfo));
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
  }

  draw(svg, chartInfo, series) {
    if (_.isUndefined(this.axisGroup)) {
      this.initialize(svg, chartInfo, series);
      this.createAxisFunction(chartInfo);
    }

    this.setAxisScale(chartInfo);
    this.axisGroup.call(this.axis);
  }
}

class AxisSpec extends DrawSpec {

  static positionTypes = ['top', 'bottom', 'left', 'right'];

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
}

export {AxisNature, AxisSpec};
