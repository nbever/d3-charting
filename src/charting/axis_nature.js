import * as d3 from 'd3';
import Nature from './nature.js';
import DrawSpec from './draw_spec.js';

class AxisNature extends Nature {

  initialize(svg, chartInfo, series) {
    this.axisGroup = svg.append('g').attr('class', 'axis-' + this.specs.axisPosition);

    switch(this.specs.axisPosition) {
      case 'top':
        this.axis = d3.axisBottom(chartInfo.scales.x);
        break;
      case 'bottom':
        this.axis = d3.axisBottom(chartInfo.scales.x);
        this.axisGroup.attr('transform', 'translate(0,' + chartInfo.yRange.max + ')');
        break;
      case 'left':
        this.axis = d3.axisLeft(chartInfo.scales.y);
        this.axisGroup.attr('transform', 'translate( ' + chartInfo.yRange.min + ', 0)');
        break;
      case 'right':
        this.axis = d3.axisRight(chartInfo.scales.y);
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
        this.axis.scale(chartInfo.scales.x);
        break;
      case 'bottom':
        this.axis.scale(chartInfo.scales.x);
        this.axisGroup.attr('transform', 'translate(0,' + chartInfo.yRange.max + ')');
        break;
      case 'left':
        this.axis.scale(chartInfo.scales.y);
        this.axisGroup.attr('transform', 'translate( ' + chartInfo.yRange.min + ', 0)');
        break;
      case 'right':
        this.axis.scale(chartInfo.scales.y);
        break;
      default:
        throw 'Invalid axis position type';
    }
  }

  draw(svg, chartInfo, series) {
    if (_.isUndefined(this.axisGroup)) {
      this.initialize(svg, chartInfo, series);
    }

    this.setAxisScale(chartInfo);
    this.axisGroup.call(this.axis);
  }
}

class AxisSpec extends DrawSpec {

  static positionTypes = ['top', 'bottom', 'left', 'right'];

  get axisPosition() {
    const position = (!_.isUndefined(this.props.position) && _.includes(AxisSpec.positionTypes, this.props.position)) ? this.props.position : 'bottom';
    return position;
  }

  get tickPosition() {
    const position = (!_.isUndefined(this.props.position) && _.includes(AxisSpec.positionTypes, this.props.position)) ? this.props.position : 'bottom';
    return position;
  }

  get ticks() {
    return this.props.ticks;
  }

  get labelFunction() {
    const labelFx = _.isUndefined(this.props.labelFunction) ? (value) => value : this.props.labelFunction;
    return labelFx;
  }
}

export {AxisNature, AxisSpec};
