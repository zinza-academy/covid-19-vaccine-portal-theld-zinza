import { Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { FC } from 'react';

interface Props {
  msg?: string | undefined;
}

const FieldErrorMsg: FC<Props> = ({ msg }) => {
  return (
    <Typography component="span" color={red[600]}>
      {msg}
    </Typography>
  );
};

export default FieldErrorMsg;
