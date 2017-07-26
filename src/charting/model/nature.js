import * as d3 from 'd3';

export default class Nature {
  constructor(specs) {
    this.specs = specs;
  }

  getKeys() {
    if (_.isArray(this.specs)) {
      return this.specs.map(p => p.getKey());
    }

    return [this.specs.getKey()];
  }

  draw(svg, scaleInfo, series) {
    throw new Error('Method not implemented');
  }

  getXScale(spec, chartInfo) {
    if (spec.useGlobalScale === true) {
      return chartInfo.scales.xScales.x;
    }

    return chartInfo.scales.xScales[spec.getKey()];
  }

  getYScale(spec, chartInfo) {
    if (spec.useGlobalScale === true) {
      return chartInfo.scales.yScales.y;
    }

    return chartInfo.scales.yScales[spec.getKey()];
  }
}
