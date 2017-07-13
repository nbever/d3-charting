import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Nature from './nature.js';
import ChartInfo from './chart_info.js';

class Chart extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			svg: undefined
		};
	}

	componentWillMount() {
		window.addEventListener('resize', this.resizeChart.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeChart.bind(this));
	}

	resizeChart() {
		const chartInfo = this.buildScales();
		this.drawNatures(this.state.svg, chartInfo, this.props.data);
	}

	initializeChart() {
		if (!_.isUndefined(this.state.svg)) {
			return;
		}

		const svg = d3.select(this.root).append('svg').attr('width', '100%').attr('height', '100%');

		const chartInfo = this.buildScales();

		this.setState({...this.state, chartInfo, svg});

		this.drawNatures(svg, chartInfo, this.props.data);

	}

	drawNatures(svg, chartInfo, data) {
		if (_.isUndefined(this.props.natures)) {
			return;
		}

		this.props.natures.forEach(n => {
			const natureData = [];
			natureData.push(n.getKeys().map(k => data[k]));
			n.draw(svg, chartInfo, natureData);
		})
	}

	buildScales() {
		delete this._xRange;
		delete this._yRange;

		const xScales = this.computeDomain();
		const yScales = this.computeRange();

		const chartInfo = new ChartInfo({min: this.xRange[0], max: this.xRange[1]},
			{min: this.yRange[1], max: this.yRange[0]},
			{x: xScales.x, y: yScales.y});

		return chartInfo;
	}

	computeDomain() {
		const xScales = this.computeScales(d => d.x, this.xRange);
		xScales.x = xScales.full;
		delete xScales.full;
		return xScales;
	}

	computeRange() {
		const yScales = this.computeScales(d => d.y, this.yRange);
		yScales.y = yScales.full;
		delete yScales.full;
		return yScales;
	}

	computeScales(mapFunction, range) {
		let min = Number.MAX_VALUE;
		let max = Number.MIN_VALUE;
		const scales = {};

		for( let key in this.props.data) {
			const sub_range = d3.extent(this.props.data[key].datapoints.map(mapFunction));
			scales[key] = d3.scaleLinear().domain(sub_range).range(range);
			min = Math.min(min, sub_range[0]);
			max = Math.max(max, sub_range[1]);
		}

		scales['full'] = d3.scaleLinear().domain([min,max]).range(range);
		return scales;
	}

	setRoot(elem) {
		this.root = elem;
		this.initializeChart();
	}

	get xRange() {
		if (_.isUndefined(this._xRange)) {
			this._xRange = [this.props.padding, this.root.parentElement.clientWidth - this.props.padding];
		}

		return this._xRange;
	}

	get yRange() {
		if (_.isUndefined(this._yRange)) {
			this._yRange = [this.root.parentElement.clientHeight - this.props.padding, this.props.padding];
		}

		return this._yRange;
	}

	componentDidUpdate() {
		const chartInfo = this.buildScales(false);
		this.drawNatures(this.state.svg, chartInfo, this.props.data);
	}

	render() {
		return (
			<div ref={(r) => this.setRoot(r)}></div>
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
