
import * as _ from 'lodash';
 interface IspecsObj { getKey:any, [key: string]: any };

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

  abstract draw(svg?, scaleInfo?, series?): void;
  
  // { // 
    
  //   throw new Error('Method not implemented');
  // }

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
export {IspecsObj, Nature};