import {FormFieldValue} from './formFieldValue.interface';

export interface Form {
  id: number;
  type: string;
  user_id: number;
  form_field_values: Array<FormFieldValue>;
  created_at: string;
  updated_at: string;
}
