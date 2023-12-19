import { MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import FieldErrorMsg from './FieldErrorMsg';
import FieldLabel from './FieldLabel';
import { Control, Controller } from 'react-hook-form';

interface SelectionObject {
  value: string | number | undefined;
  label: string | number;
}

export interface FormData {
  priority: number;
  insurance_number?: string;
  career?: string | undefined;
  workplace?: string;
  current_address?: string;
  injection_date: string;
  injection_phase: number;
}

interface Props {
  list: SelectionObject[];
  control: Control<FormData>;
  label: string;
  errorMsg?: string;
  required?: boolean;
  name:
    | 'priority'
    | 'insurance_number'
    | 'career'
    | 'workplace'
    | 'current_address'
    | 'injection_date'
    | 'injection_phase';
}

const SelectField: FC<Props> = ({ list, control, label, name, required, errorMsg }) => {
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
