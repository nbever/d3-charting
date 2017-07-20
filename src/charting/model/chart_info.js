export default class ChartInfo {

  constructor(xRange, yRange, scales, eventHandler, padding) {
    this._xRange = xRange;
    this._yRange = yRange;
    this._scaleObj = scales;
    this._eventHandler = eventHandler;
    this._padding = padding;
  }

  get scales() {
    return this._scaleObj
  }

  get xRange() {
    return this._xRange;
  }

  get yRange() {
    return this._yRange;
  }

  get fireEvent() {
    return this._eventHandler;
  }

  get padding() {
    return this._padding;
  }
}
