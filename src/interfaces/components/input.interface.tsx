import { UseFormRegisterReturn, Control } from "react-hook-form";
import { INPUT_TYPE_ENUM } from "../../enums/input.enum";

export interface IInput {
  disable?: boolean;
  defaultValue?: any;
  label: string;
  dataSelect?: any[];
  control?: Control<any, any>;
  required?: boolean;
  errors?: any;
  name?: string;
  type?: INPUT_TYPE_ENUM;
  readonly?: boolean;
  register?: UseFormRegisterReturn;
}
