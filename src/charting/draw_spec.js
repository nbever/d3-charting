export default class DrawSpec {

	constructor(props) {

		if (_.isUndefined(props.key)) {
			throw 'Now key property was defined';
		}

		this.props = props;
		this.getKey = () => {
			return this.props.key;
		}
	}
}