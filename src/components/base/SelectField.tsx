import { MenuItem, Select } from '@mui/material';
import FieldErrorMsg from './FieldErrorMsg';
import FieldLabel from './FieldLabel';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

interface SelectionObject {
  value: string | number | undefined;
  label: string | number;
}

interface SelectFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  list: SelectionObject[];
  label: string;
  errorMsg?: string;
  required?: boolean;
}

const SelectField = <T extends FieldValues>({
  list,
  control,
  label,
  name,
  required,
  errorMsg,
}: SelectFieldProps<T>) => {
  return (
    <div>
      <FieldLabel label={label} required={required} htmlFor={name} />
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            className="w-full"
            id={name}
            variant="outlined"
            inputProps={{ 'aria-label': 'Without label' }}
            {...field}
            MenuProps={{
              PaperProps: {
                style: {
                  maxWidth: 800,
                },
              },
            }}>
            <MenuItem value="" disabled>
              {label}
            </MenuItem>
            {list.map((item) => (
              <MenuItem key={name + item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FieldErrorMsg msg={errorMsg} />
    </div>
  );
};

export default SelectField;
