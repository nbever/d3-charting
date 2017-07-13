import * as d3 from 'd3';
import Nature from './nature.js';
import DrawSpec from './draw_spec.js';

class LineNature extends Nature{

	initialize(svg, chartInfo, series) {
		this.lineGroup = svg.append('g').attr('class', 'line_nature');
		const lines = this.lineGroup.selectAll('.line_nature_path').data(series[0]).enter()
			.append('g')
			.attr('class', 'line_nature_path_group');
		lines.append('path')
			.attr('class', 'line_nature_path')
			.attr('d', (d,i) => {
				return this.getLineMethod(chartInfo)(d.datapoints)
			})
			.attr('stroke', (d, i) => {
				return this.specs[i].color;
			})
			.attr('stroke-width', (d, i) => {
				return this.specs[i].thickness;
			})
			.attr('fill', 'none');

	}

	draw(svg, chartInfo, series) {
		if (_.isUndefined(this.lineGroup)) {
			this.initialize(svg, chartInfo, series);
		}

		this.lineGroup.selectAll('.line_nature_path')
			.data(series[0])
			.transition()
			.attr('d', (d, i) => {
				if (this.specs[i].show === false) {
					return;
				}

				return this.getLineMethod(chartInfo)(d.datapoints)
			});
	}

	getLineMethod( chartInfo ) {
		return d3.line()
			.x(d => chartInfo.scales.x(d.x))
			.y(d => chartInfo.scales.y(d.y));
	}
}

class LineSpec extends DrawSpec{

	get color() {
		return this.getValue(this.props.color, 'black', _.isString);
	}

	get thickness() {
		return this.getValue(this.props.thickness, 1.0, _.isNumber);
	}
}

export {LineNature, LineSpec};
