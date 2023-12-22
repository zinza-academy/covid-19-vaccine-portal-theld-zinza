import * as Yup from 'yup';
import { Box, Modal, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { ConvertGenderText } from '../../../../utils/helper';
import SelectField from '../../../base/SelectField';
import { VaccineRegistrationStatus } from '../../../../utils/constants/constants';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';

interface VaccineRegistration {
  id: number;
  name: string;
  birthday: string;
  gender: number;
  person_id: string;
  status: number;
}

interface Props {
  open: boolean;
  modelData?: VaccineRegistration;
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

interface DetailItemProp {
  title: string;
  value?: string | number;
}

const DetailItem: FC<DetailItemProp> = ({ title, value }) => {
  return (
    <div className="mt-4">
      <div className="block">
        <p>{title}</p>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );
};

const VaccineRegistrationModal: FC<Props> = ({ open, modelData, handleClose, handleSubmitted }) => {
  const formSchema = Yup.object().shape({
    status: Yup.number().required('Nhóm ưu tiên không được để trống'),
  });

  type Payload = Yup.InferType<typeof formSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Payload>({
    defaultValues: modelData,
    resolver: yupResolver(formSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Payload> = (data) => {
    console.log(modelData?.id, data.status);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      handleSubmitted();
    }, 1000);
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
              Kết quả đăng ký
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <DetailItem title="Họ và tên" value={modelData?.name} />
            <DetailItem title="Ngày sinh" value={modelData?.birthday} />
            <DetailItem title="Giới tính" value={ConvertGenderText(modelData?.gender)} />
            <DetailItem title="Số CMND/CCCD/Mã định danh công dân" value={modelData?.person_id} />
            <div className="my-4">
              <SelectField
                list={VaccineRegistrationStatus}
                label="Trạng thái"
                control={control}
                name="status"
                required={true}
                errorMsg={errors.status?.message}
              />
            </div>
            <Stack direction="row" spacing={1} justifyContent={'right'}>
              <LoadingButton onClick={handleClose} variant="outlined">
                Hủy
              </LoadingButton>
              <LoadingButton loading={loading} type="submit" variant="contained">
                Xác nhận
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default VaccineRegistrationModal;
