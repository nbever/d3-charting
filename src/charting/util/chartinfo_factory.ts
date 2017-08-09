import * as d3 from 'd3';
import ChartInfo from '../model/chart_info';
import * as _ from 'lodash';
export interface IScaleObject {
  [key: string]: d3.ScaleLinear<number, number>,
  full: d3.ScaleLinear<number, number>,
  x: d3.ScaleLinear<number, number>,
  y: d3.ScaleLinear<number, number>
};

export interface IScalesContainer {
  xScales: IScaleObject, yScales: IScaleObject
};

export interface Ixy {
  x: number,
  y: number
};

export interface ISeries {
  [key: string]: Ixy[],
  [index: number]: Ixy[],
  datapoints: Ixy[]
};
export interface IChartDataObject {
  [index: string]: ISeries
};


const computeScales = (data: IChartDataObject,
  mapFunction: (num: Ixy) => number,
  range: [number],
  scalePadding: number) => {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  const scales = <IScaleObject>{};

  _.forOwn(data, (value, key) => {
    const myArray = data[key].datapoints.map(mapFunction);
    if (myArray.length > 0) {
      const subRange = <[number, number]>d3.extent(myArray);
      //if (typeof subRange[0] === 'number' && typeof subRange[1] === 'number') {
      const padAmount = (subRange[1] - subRange[0]) * (scalePadding / 100.0);
      subRange[0] -= padAmount;
      subRange[1] += padAmount;
      scales[key] = d3.scaleLinear().domain(subRange).range(range);
      min = Math.min(min, subRange[0]);
      max = Math.max(max, subRange[1]);
    }    //}
  });

  scales.full = d3.scaleLinear().domain([min, max]).range(range);
  if (min === Number.MAX_VALUE || max === Number.MIN_VALUE)
    scales.full = d3.scaleLinear().domain([0, 0]).range(range)
  return scales;
};

const computeRange = (data: IChartDataObject, yRange: [number], rangePadding: number) => {
  const yScales = computeScales(data, d => d.y, yRange, rangePadding);
  yScales.y = yScales.full;
  delete yScales.full;
  return yScales;
};

const computeDomain = (data: IChartDataObject, xRange: [number], domainPadding: number) => {
  const xScales = computeScales(data, d => d.x, xRange, domainPadding);
  xScales.x = xScales.full;
  delete xScales.full;
  return xScales;
};

export const buildChartInfoObject = (data: IChartDataObject,
  xRange: [number], domainPadding: number,
  yRange: [number], rangePadding: number, eventHandler: any) => {
  const xScales = computeDomain(data, xRange, domainPadding);
  const yScales = computeRange(data, yRange, rangePadding);


  const chartInfo = new ChartInfo(
    { min: xRange[0], max: xRange[1] },
    { min: yRange[1], max: yRange[0] },
    { yScales, xScales },
    eventHandler);

  return chartInfo;
};
