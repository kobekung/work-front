import { Control, useController } from "react-hook-form";
import Select from "react-select";

interface IOption {
  value: string;
  label: string;
}

const MultipleSelect = ({
  options,
  control,
  name,
}: {
  options: IOption[];
  control: Control<any>;
  name: string;
}) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });
  return (
    <div>
      <Select
        onChange={(e: any) => {
          const filter = e.map((item: IOption) => Number(item.value));
          onChange(filter);
        }}
        isMulti
        className="basic-multi-select"
        classNamePrefix="select"
        options={options}
      />
    </div>
  );
};

export default MultipleSelect;
