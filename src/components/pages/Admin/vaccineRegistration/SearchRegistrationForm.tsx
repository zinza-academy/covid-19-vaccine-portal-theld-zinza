import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack } from '@mui/material';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import InputTextField from '../../../base/InputTextField';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';

const SearchRegistrationForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const vaccinationPlaceSchema = Yup.object().shape({
    name: Yup.string(),
    person_number: Yup.string(),
  });

  type Payload = Yup.InferType<typeof vaccinationPlaceSchema>;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Payload>({
    defaultValues: {
      name: '',
      person_number: '',
    },
    resolver: yupResolver(vaccinationPlaceSchema),
  });

  const onSubmit: SubmitHandler<Payload> = (data) => {
    if (!data.name && !data.person_number) {
      return;
    }

    console.log(data);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction="row">
          <div className="w-60">
            <InputTextField
              label="Họ tên"
              control={control}
              name="name"
              hideLabel={true}
              required={true}
              errorMsg={errors.name?.message}
            />
          </div>
          <div className="w-60">
            <InputTextField
              label="Số CMND/CCCD/Mã định danh công dân"
              control={control}
              name="person_number"
              hideLabel={true}
              required={true}
              errorMsg={errors.person_number?.message}
            />
          </div>
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            startIcon={<SearchIcon />}>
            TÌM KIẾM
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default SearchRegistrationForm;
