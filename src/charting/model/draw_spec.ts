
import * as _ from 'lodash';


export default class DrawSpec {
  private getKey: any;

  constructor(public props: any) {
    if (_.isUndefined(props.key)) {
      throw new Error('No key property was defined');
    }

    this.getKey = () => this.props.key;
  }

  getValue(value, defaultValue, typeFx: (value: any)=>boolean = _.isString) {
    const rtn = (_.isUndefined(value) || !typeFx(value)) ? defaultValue : value;
    return rtn;
  }

  get show() {
    const showIt = _.isUndefined(this.props.show) ||
      !_.isBoolean(this.props.show) ? true : this.props.show;
    return showIt;
  }

  set show(val) {
    this.props.show = val;
  }

  get useGlobalScale() {
    return this.getValue(this.props.useGlobalScale, true, _.isBoolean);
  }

  get cursor() {
    return this.getValue(this.props.cursor, 'auto', _.isString);
  }
}
