import { LoadingButton } from '@mui/lab';
import { Box, Modal, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import * as Yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputTextField from '../../../base/InputTextField';
import usePlaceApi from '../../../../hooks/UsePlace';

interface VaccinationPlace {
  id: number;
  name: string;
  address: string;
  managerName: string;
  tableAvailable: number;
}

interface Props {
  open: boolean;
  modelData?: VaccinationPlace;
  handleClose: () => void;
  handleSubmitted: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  width: 800,
};

const VaccinationPlaceModal: FC<Props> = ({ open, modelData, handleClose, handleSubmitted }) => {
  const usePlace = usePlaceApi();
  const vaccinationPlaceSchema = Yup.object().shape({
    name: Yup.string().required('Địa điểm tiêm không được bỏ trống'),
    address: Yup.string().required('Địa chỉ không được để trống'),
    managerName: Yup.string().required('Người đứng đầu cơ sở không được để trống'),
    tableAvailable: Yup.number().required('Số bàn tiêm không được để trống'),
  });

  const formAction = modelData ? usePlace.update : usePlace.create;

  const defaultFormValues = {
    name: '',
    address: '',
    managerName: '',
    tableAvailable: 0,
  };

  type Payload = Yup.InferType<typeof vaccinationPlaceSchema>;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Payload>({
    defaultValues: modelData ? modelData : defaultFormValues,
    resolver: yupResolver(vaccinationPlaceSchema),
  });

  const onSubmit: SubmitHandler<Payload> = async (data) => {
    const result = await formAction.mutateAsync(data);

    if (result) {
      handleSubmitted();
    }
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="border-b p-6">
            <Typography id="modal-modal-title" variant="body1">
              {modelData ? 'Cập Nhật Điểm Tiêm' : 'Thêm Mới Điểm Tiêm'}
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} className="p-6">
              <InputTextField
                label="Tên điểm tiêm"
                control={control}
                name="name"
                required={true}
                errorMsg={errors.name?.message}
              />
              <InputTextField
                label="Địa chỉ"
                control={control}
                name="address"
                required={true}
                errorMsg={errors.address?.message}
              />
              <InputTextField
                label="Người đứng đầu cơ sở"
                control={control}
                name="managerName"
                required={true}
                errorMsg={errors.managerName?.message}
              />
              <InputTextField
                type="number"
                label="Số bàn tiêm"
                control={control}
                name="tableAvailable"
                required={true}
                errorMsg={errors.tableAvailable?.message}
              />
              <Stack direction="row" spacing={1} justifyContent={'right'}>
                <LoadingButton onClick={handleClose} variant="outlined">
                  HỦY
                </LoadingButton>
                <LoadingButton loading={formAction.isPending} type="submit" variant="contained">
                  XÁC NHẬN
                </LoadingButton>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default VaccinationPlaceModal;
