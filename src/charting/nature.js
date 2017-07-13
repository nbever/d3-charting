import * as d3 from 'd3';

export default class Nature {

	constructor(specs) {
		this.specs = specs;
	}

	getKeys() {

		if (_.isArray(this.specs)) {
			return this.specs.map(p => p.getKey());
		}

		return [this.specs.getKey()];
	}

	draw(svg, scaleInfo, series) {
		throw 'Method not implemented';
	}
}
