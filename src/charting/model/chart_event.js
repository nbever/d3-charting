class ChartEvent {
	
	constructor(eventType, data, seriesKey, chartInfo){
		this._eventType = eventType;
		this._data = data;
		this._seriesKey = seriesKey;
		this._chartInfo = chartInfo;
	}

	get eventType() {
		return this._eventType;
	}

	get data() {
		return this._data;
	}

	get seriesKey() {
		return this._seriesKey;
	}

	get chartInfo() {
		return this._chartInfo;
	}
}

export default ChartEvent;