import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import InputTextField from '../../../base/InputTextField';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import { SearchFormData } from './AdminVaccinationPlace';

interface Props {
  handleSearch: (searchData: SearchFormData) => void;
}

const SearchPlaceForm: FC<Props> = ({ handleSearch }) => {
  const vaccinationPlaceSchema = Yup.object().shape({
    name: Yup.string(),
    address: Yup.string(),
  });

  type Payload = Yup.InferType<typeof vaccinationPlaceSchema>;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Payload>({
    defaultValues: {
      name: '',
      address: '',
    },
    resolver: yupResolver(vaccinationPlaceSchema),
  });

  const onSubmit: SubmitHandler<Payload> = (data) => {
    handleSearch(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction="row">
          <div className="w-60">
            <InputTextField
              label="Điểm tiêm"
              control={control}
              name="name"
              hideLabel={true}
              required={true}
              errorMsg={errors.name?.message}
            />
          </div>
          <div className="w-60">
            <InputTextField
              label="Địa chỉ"
              control={control}
              name="address"
              hideLabel={true}
              required={true}
              errorMsg={errors.address?.message}
            />
          </div>
          <LoadingButton type="submit" variant="contained" startIcon={<SearchIcon />}>
            TÌM KIẾM
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default SearchPlaceForm;
