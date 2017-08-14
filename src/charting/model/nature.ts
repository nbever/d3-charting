import * as _ from 'lodash';

import { IChartDataObject, IScaleObject, ISeries, Ixy } from '../util/chartinfo_factory';
import {ChartSpecs} from '../base_chart_config'
import ChartInfo from './chart_info';
export interface IspecsObj {
  [key: string]: any,
  [index: number]: any,
  getKey: any
};

export abstract class Nature {
  constructor(public specs: IspecsObj | IspecsObj[]) {
  }

  abstract draw(svg: d3.Selection<SVGElement, ISeries[][], HTMLElement, any>, chartInfo: ChartInfo, series: [IChartDataObject] | ISeries[][]): void;
  abstract handleEvent?(chartEvent: any, chartInfo: ChartInfo): void;

  getKeys() {
    if (this.specs instanceof Array) {
      return this.specs.map(p => p.getKey());
    }
    return [this.specs.getKey()];
  }


  getXScale(spec: ChartSpecs, chartInfo: ChartInfo) {
    if (spec.useGlobalScale ) {
      return chartInfo.scales.xScales.x;
    }
    return chartInfo.scales.xScales[spec.getKey()];
  }

  getYScale(spec: ChartSpecs, chartInfo: ChartInfo) {
    if (spec.useGlobalScale ) {
      return chartInfo.scales.yScales.y;
    }
    return chartInfo.scales.yScales[spec.getKey()];
  }
}
