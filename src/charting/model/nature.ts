
import * as _ from 'lodash';


import ChartInfo  from './chart_info';
 interface IspecsObj { 
   [key: string]: any ,
   [index: number]: any ,
   
   getKey:any
   };

abstract class Nature {
  specs: IspecsObj | IspecsObj[];

  constructor(specs?:any) {
    this.specs = specs;
  }

  getKeys() {
    if ( this.specs instanceof Array ) {
      return this.specs.map(p => p.getKey());
    }

    return [this.specs.getKey()];
  }

  abstract draw(svg?: any, scaleInfo?: any, series?: any): void;
  abstract handleEvent?(chartEvent: any, chartInfo: ChartInfo): void;
  // { // 
    
  //   throw new Error('Method not implemented');
  // }

  getXScale(spec:any, chartInfo: ChartInfo) {
    if (spec.useGlobalScale === true) {
      return chartInfo.scales.xScales.x;
    }

    return chartInfo.scales.xScales[spec.getKey()];
  }

  getYScale(spec:any, chartInfo: ChartInfo) {
    if (spec.useGlobalScale === true) {
      return chartInfo.scales.yScales.y;
    }

    return chartInfo.scales.yScales[spec.getKey()];
  }
}
export {IspecsObj, Nature};