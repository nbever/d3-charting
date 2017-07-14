import {AxisNature, AxisSpec} from './axis_nature.js';

class HoverAxisNature extends AxisNature {

	initialize(svg, chartInfo) {
		this.axisGroup = svg.append('g').attr('class', 'hover-axis-' + this.specs.axisPosition);
	}

	draw(svg, chartInfo, series) {
		// do nothing
		this.svg = svg;
	}

	handleEvent(chartEvent) {
		if (chartEvent.eventType === 'mouseover') {
			this.showAxis(chartEvent.chartInfo, chartEvent.seriesKey);
    	}
    	else if (chartEvent.eventType === 'mouseout') {
    		this.hideAxis();
    	}
	}

	getYScale(spec, chartInfo) {
		if (spec.useGlobalScale === true) {
			return chartInfo.scales.yScales.y;
		}

		return chartInfo.scales.yScales[this.seriesKey];
	}

	getXScale(spec, chartInfo) {
		if (spec.useGlobalScale === true) {
			return chartInfo.scales.xScales.x;
		}

		return chartInfo.scales.xScales[this.seriesKey];
	}

	showAxis(chartInfo, key) {
		if (_.isUndefined(this.axisGroup)) {
			this.initialize(this.svg, chartInfo);
		}
		this.seriesKey = key;
		this.createAxisFunction(chartInfo);
		this.setAxisScale(chartInfo);
    	this.axisGroup.call(this.axis);
	}

	hideAxis(){
		this.axisGroup.remove();
		delete this.axisGroup;
	}
}

export {HoverAxisNature};