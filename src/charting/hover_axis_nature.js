import { AxisNature, AxisSpec } from './axis_nature.js';

class HoverAxisNature extends AxisNature {
  initialize(svg, chartInfo) {
    this.axisGroup = svg.append('g').attr('class', `hover-axis-${this.specs.axisPosition}`);
  }

  draw(svg, chartInfo, series) {
    // do nothing
    this.svg = svg;
  }

  handleEvent(chartEvent, chartInfo) {
    if (chartEvent.eventType === 'mouseover') {
      this.showAxis(chartInfo, chartEvent.drawSpec);
    } else if (chartEvent.eventType === 'mouseout') {
      this.hideAxis();
    }
  }

  getYScale(spec, chartInfo) {
    if (this.useGlobalScale === true) {
      return chartInfo.scales.yScales.y;
    }

    return chartInfo.scales.yScales[this.seriesKey];
  }

  getXScale(spec, chartInfo) {
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

  showAxis(chartInfo, spec) {
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
