import * as d3 from 'd3';
import Nature from './nature.js';
import DrawSpec from './draw_spec.js';

class LineNature extends Nature{
	
	initializeLines(svg, scaleInfo, series, spec) {
		this.lineGroup = svg.append('g').attr('class', 'line_nature');
		const lines = this.lineGroup.selectAll('.line_nature_path').data(series[0]).enter()
			.append('g')
			.attr('class', 'line_nature_path_group');
		lines.append('path')
			.attr('class', 'line_nature_path')
			.attr('d', (d,i) => {
				return this.getLineMethod(scaleInfo)(d.datapoints)
			})
			.attr('stroke', (d, i) => {
				return this.specs[i].color;
			})
			.attr('stroke-width', (d, i) => {
				return this.specs[i].thickness;
			})
			.attr('fill', 'none');

	}

	draw(svg, scaleInfo, series) {
		if (_.isUndefined(this.lineGroup)) {
			this.initializeLines(svg, scaleInfo, series);
		}

		this.lineGroup.selectAll('.line_nature_path')
			.data(series[0])
			.transition()
			.attr('d', (d, i) => this.getLineMethod(scaleInfo)(d.datapoints));
	}

	getLineMethod( scaleInfo) {
		return d3.line()
			.x(d => scaleInfo.x(d.x))
			.y(d => scaleInfo.y(d.y));
	}
}

class LineSpec extends DrawSpec{

	get color() {
		const color = _.isUndefined(this.props.color) ? 'black' : this.props.color;
		return color;
	}

	get thickness() {
		const thickness = _.isUndefined(this.props.thickness) ? 1.0 : this.props.thickness;
		return thickness;
	}
}

export {LineNature, LineSpec};