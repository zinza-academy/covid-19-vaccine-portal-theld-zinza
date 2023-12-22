import { TextField } from '@mui/material';
import FieldErrorMsg from './FieldErrorMsg';
import FieldLabel from './FieldLabel';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

interface SelectFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  type?: string;
  errorMsg?: string;
  required?: boolean;
  hideLabel?: boolean;
  multiline?: number;
}

const InputTextField = <T extends FieldValues>({
  control,
  label,
  type,
  name,
  required,
  errorMsg,
  hideLabel,
  multiline,
}: SelectFieldProps<T>) => {
  return (
    <div>
      {!hideLabel && <FieldLabel label={label} required={required} htmlFor={name} />}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            className="w-full"
            type={type}
            id={name}
            placeholder={label}
            variant="outlined"
            multiline={!!multiline}
            rows={multiline}
            {...field}
          />
        )}
      />

      <FieldErrorMsg msg={errorMsg} />
    </div>
  );
};

export default InputTextField;
