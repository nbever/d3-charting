export default class ChartInfo {

  constructor(xRange, yRange, scales, eventHandler, padding) {
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
