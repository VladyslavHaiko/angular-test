export interface FormField {
  id: number;
  is_required: boolean;
  max: string | null;
  max_length: number;
  min: string | null;
  order: number;
  title: string;
  type: string;
  created_at: string;
  updated_at: string;
}
