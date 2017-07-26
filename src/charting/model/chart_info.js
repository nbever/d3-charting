export default class ChartInfo {

  constructor(xRange, yRange, scales, eventHandler) {
    this.xRangeBF = xRange;
    this.yRangeBF = yRange;
    this._scaleObj = scales;
    this._eventHandler = eventHandler;
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
}
