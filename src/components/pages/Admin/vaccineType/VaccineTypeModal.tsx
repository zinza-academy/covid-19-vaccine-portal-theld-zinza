import { LoadingButton } from '@mui/lab';
import { Box, Modal, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import * as Yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputTextField from '../../../base/InputTextField';
import useTypeApi from '../../../../hooks/UseType';

interface VaccineType {
  id: number;
  name: string;
  batchNumber: string;
}

interface Props {
  open: boolean;
  modelData?: VaccineType;
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

const VaccineTypeModal: FC<Props> = ({ open, modelData, handleClose, handleSubmitted }) => {
  const useType = useTypeApi();
  const vaccineTypeSchema = Yup.object().shape({
    name: Yup.string().required('Tên vaccine không được bỏ trống'),
    batchNumber: Yup.string().required('Số lô không được để trống'),
  });

  const formAction = modelData ? useType.update : useType.create;

  const defaultFormValues = {
    name: '',
    batchNumber: '',
  };

  type Payload = Yup.InferType<typeof vaccineTypeSchema>;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Payload>({
    defaultValues: modelData ? modelData : defaultFormValues,
    resolver: yupResolver(vaccineTypeSchema),
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
                label="Tên vaccine"
                control={control}
                name="name"
                required={true}
                errorMsg={errors.name?.message}
              />
              <InputTextField
                label="Số lô"
                control={control}
                name="batchNumber"
                required={true}
                errorMsg={errors.batchNumber?.message}
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

export default VaccineTypeModal;
