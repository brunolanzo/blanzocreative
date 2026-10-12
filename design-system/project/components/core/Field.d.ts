/**
 * Underline text field / textarea. Blanzo forms have no boxes — only rules that light red-pink on focus.
 */
export interface FieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** set to render a textarea with this many rows */
  rows?: number;
  required?: boolean;
  hint?: string;
  id?: string;
}
export declare function Field(props: FieldProps): JSX.Element;
