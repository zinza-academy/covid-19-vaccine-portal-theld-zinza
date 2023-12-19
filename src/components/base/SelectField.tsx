import { MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import FieldErrorMsg from './FieldErrorMsg';
import FieldLabel from './FieldLabel';

interface SelectionObject {
  value: string | number | undefined;
  label: string | number;
}

interface Props {
  list: SelectionObject[];
  register: any;
  label: string;
  name: string;
  errorMsg?: string;
  required?: boolean;
  defaultValue?: number | string;
}

const SelectField: FC<Props> = ({
  list,
  register,
  label,
  name,
  required,
  errorMsg,
  defaultValue,
}) => {
  return (
    <div className="w-full">
      <FieldLabel label={label} required={required} htmlFor={name} />
      <Select
        className="w-full"
        displayEmpty
        id={name}
        autoWidth={false}
        variant="outlined"
        defaultValue={defaultValue ? defaultValue : ''}
        inputProps={{ 'aria-label': 'Without label' }}
        {...register(name)}
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
      <FieldErrorMsg msg={errorMsg} />
    </div>
  );
};

export default SelectField;
