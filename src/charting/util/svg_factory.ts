import * as d3 from 'd3';

import { buildChartInfoObject, IChartDataObject, IScaleObject, ISeries } from './chartinfo_factory';

const createSvgElement = (root: any, w: any, h: any) => {
  const svg =   d3
    .select<SVGElement,ISeries[][]>(root)
    .append<SVGElement>('svg');

    svg.attr('width', w)
    .attr('height', h);
  return svg;
}

export { createSvgElement };