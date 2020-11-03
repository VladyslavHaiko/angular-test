import {Meta} from './meta.interface';

export interface ServerResponse<T> {
  data: Array<T>;
  meta: Meta;
}
