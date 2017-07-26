import * as d3 from 'd3';
import ChartInfo from '../model/chart_info';
import * as _ from 'lodash';

interface IdataObject { [index: string]: {datapoints: number[] } };

const computeScales = (data: IdataObject,
       mapFunction: (number)=>number ,
       range: [number], 
       scalePadding:number) => {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  const scales =<any> {};

  _.forOwn(data, (value, key) => {
    const subRange = d3.extent(data[key].datapoints.map(mapFunction));
    const padAmount = (subRange[1] - subRange[0]) * (scalePadding / 100.0);
    subRange[0] -= padAmount;
    subRange[1] += padAmount;
    scales[key] = d3.scaleLinear().domain(subRange).range(range);
    min = Math.min(min, subRange[0]);
    max = Math.max(max, subRange[1]);
  });

  scales.full = d3.scaleLinear().domain([min, max]).range(range);
  return scales;
};

const computeRange = (data: IdataObject, yRange:[number], rangePadding: number) => {
  const yScales = computeScales(data, d => d.y, yRange, rangePadding);
  yScales.y = yScales.full;
  delete yScales.full;
  return yScales;
};

const computeDomain = (data: IdataObject, xRange: [number], domainPadding: number) => {
  const xScales = computeScales(data, d => d.x, xRange, domainPadding);
  xScales.x = xScales.full;
  delete xScales.full;
  return xScales;
};

const buildChartInfoObject = (data:IdataObject,
  xRange:[number], domainPadding:number ,
  yRange:[number], rangePadding: number, eventHandler) => {
  const xScales = computeDomain(data, xRange, domainPadding);
  const yScales = computeRange(data, yRange, rangePadding);


  const chartInfo = new ChartInfo(
    { min: xRange[0], max: xRange[1] },
    { min: yRange[1], max: yRange[0] },
    { yScales, xScales },
    eventHandler);

  return chartInfo;
};


export { buildChartInfoObject };
