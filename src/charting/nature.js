import * as d3 from 'd3';

export default class Nature {
	
	constructor(specs) {
		this.specs = specs;
	}

	getKeys() {
		return this.specs.map(p => p.getKey());
	}

	draw(svg, scaleInfo, series) {
		throw 'Method not implemented';
	}
}