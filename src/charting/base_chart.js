import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Nature from './nature.js';

class Chart extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			svg: undefined
		};
	}

	initializeChart() {
		if (!_.isUndefined(this.state.svg)) {
			return;
		}

		const svg = d3.select(this.root).append('svg').attr('width', '100%').attr('height', '100%');
		svg.append('g').append('text').attr('transform', 'translate(0, 0)').text('What up?');

		const xScale = this.computeDomain();
		const yScale = this.computeRange();

		this.setState({svg, x: xScale, y: yScale});

		this.drawNatures(svg, {x: xScale, y: yScale}, this.props.data);

	}

	drawNatures(svg, scaleInfo, data) {
		if (_.isUndefined(this.props.natures)) {
			return;
		}

		this.props.natures.forEach(n => {
			const natureData = [];
			natureData.push(n.getKeys().map(k => data[k]));
			n.draw(svg, scaleInfo, natureData);
		})
	}

	computeDomain() {
		return this.computeScale(d => d.x, [0,400]);
	}

	computeRange() {
		return this.computeScale(d => d.y, [0,300]);
	}

	computeScale(mapFunction, range) {
		let min = Number.MAX_VALUE;
		let max = Number.MIN_VALUE;

		for( let key in this.props.data) {
			const range = d3.extent(this.props.data[key].datapoints.map(mapFunction));
			min = Math.min(min, range[0]);
			max = Math.max(max, range[1]);
		}

		return d3.scaleLinear().domain([min,max]).range(range);
	}

	setRoot(elem) {
		this.root = elem;
		this.initializeChart();
	}

	componentWillReceiveProps(propsToBe) {
		console.log('here');
		this.drawNatures(this.state.svg, {x: this.state.x, y: this.state.y}, this.props.data);
	}

	render() {
		return (
			<div style={{width: '400px', height: '300px'}} ref={(r) => this.setRoot(r)}></div>
		);
	}
}

Chart.propTypes = {
	padding: PropTypes.number,
	data: PropTypes.object,
	natures: PropTypes.array
};

Chart.defaultProps = {
	padding: 8,
	natures: []
};

export default Chart;