import * as d3 from 'd3';
const createSvgElement = (root: any, w: any, h: any) => {
  const svg =   d3
    .select<SVGElement,{}>(root)
    .append<SVGElement>('svg');

    svg.attr('width', w)
    .attr('height', h);
  return svg;
}

export { createSvgElement };