import { Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { FC } from 'react';

interface Props {
  label?: string;
  required?: boolean;
  htmlFor?: string;
}

const FieldLabel: FC<Props> = ({ label, required, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="text-base py-3.5">
      {label}{' '}
      {required ? (
        <Typography component="span" display="inline" color={red[600]}>
          (*)
        </Typography>
      ) : null}
    </label>
  );
};

export default FieldLabel;
