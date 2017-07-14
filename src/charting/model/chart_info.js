export default class ChartInfo {

  constructor(xRange, yRange, scales, eventHandler) {
    this._xRange = xRange;
    this._yRange = yRange;
    this._scaleObj = scales;
    this._eventHandler = eventHandler;
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
}
