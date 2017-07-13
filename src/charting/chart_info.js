export default class ChartInfo {

  constructor(xRange, yRange, scales) {
    this._xRange = xRange;
    this._yRange = yRange;
    this._scaleObj = scales;
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
}
