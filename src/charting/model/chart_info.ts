import { IScaleObject, IScalesContainer } from '../util/chartinfo_factory';

interface IRange { min: number, max: number };


export default class ChartInfo {
  private xRangeBF: IRange;
  private yRangeBF: IRange;
  private _scaleObj: IScalesContainer;
  private _eventHandler: any;
  private _padding: any;


  constructor(xRange: IRange, yRange: IRange,
    scales: IScalesContainer,
    eventHandler,
    padding = 0) {
    this.xRangeBF = xRange;
    this.yRangeBF = yRange;
    this._scaleObj = scales;
    this._eventHandler = eventHandler;
    this._padding = padding;
  }

  get scales() {
    return this._scaleObj
  }

  get xRange() {
    return this.xRangeBF;
  }

  get yRange() {
    return this.yRangeBF;
  }

  get fireEvent() {
    return this._eventHandler;
  }

  get padding() {
    return this._padding;
  }
}
