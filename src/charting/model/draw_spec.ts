
import * as _ from 'lodash';


export interface ISpecInitProp{
  key: string,
  show?: boolean,
  useGlobalScale?: boolean,
  cursor? : string

}


export class DrawSpec <TInitProp extends ISpecInitProp> {
  public getKey: ()=> string;

  constructor(public props: TInitProp ) {
    if (_.isUndefined(props.key)) {
      throw new Error('No key property was defined');
    }

    this.getKey = () => this.props.key;
  }

  getValue(value: any, defaultValue: any, typeFx: (value: any)=>boolean = _.isString) {
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
