import * as d3 from 'd3';
const createSvgElement = (root, w, h) => {
  const svg =   d3
    .select<SVGElement,{}>(root)
    .append<SVGElement>('svg');

    svg.attr('width', w)
    .attr('height', h);
  return svg;
}

export { createSvgElement };