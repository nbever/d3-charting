class ChartEvent {

	constructor(eventType, data, drawSpec, chartInfo){
		this._eventType = eventType;
		this._data = data;
		this._drawSpec = drawSpec;
		this._chartInfo = chartInfo;
	}

	get eventType() {
		return this._eventType;
	}

	get data() {
		return this._data;
	}

	get drawSpec() {
		return this._drawSpec;
	}

	get chartInfo() {
		return this._chartInfo;
	}
}

export default ChartEvent;
