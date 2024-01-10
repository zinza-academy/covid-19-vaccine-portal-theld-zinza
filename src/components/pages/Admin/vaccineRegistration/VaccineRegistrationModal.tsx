import * as Yup from 'yup';
import { Box, Checkbox, FormControlLabel, Modal, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { getLabelByValue } from '../../../../utils/helper';
import SelectField from '../../../base/SelectField';
import {
  VaccineRegistrationStatus,
  dayPhases,
  genderList,
  injectStatus,
} from '../../../../utils/constants/constants';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Status, VaccineRegistration } from './AdminVaccineRegistration';
import useRegistrationApi from '../../../../hooks/useRegistration';
import { VaccinationPlace } from '../vaccinePlace/AdminVaccinationPlace';
import InputTextField from '../../../base/InputTextField';

interface Props {
  open: boolean;
  modelData?: VaccineRegistration;
  handleClose: () => void;
  handleSubmitted: () => void;
  vaccinePlaces: VaccinationPlace[];
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  width: 800,
  maxHeight: '90vh',
  overflow: 'auto',
};

interface DetailItemProp {
  title: string;
  value?: string | number;
}

const DetailItem: FC<DetailItemProp> = ({ title, value }) => {
  return (
    <div>
      <div className="block">
        <p>{title}</p>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );
};

const VaccineRegistrationModal: FC<Props> = ({
  open,
  modelData,
  handleClose,
  handleSubmitted,
  vaccinePlaces,
}) => {
  const formSchema = Yup.object().shape({
    status: Yup.number().required('Nhóm ưu tiên không được để trống'),
    vaccinationPlaceId: Yup.number().nullable(),
    injectedDate: Yup.string().nullable(),
  });

  type Payload = Yup.InferType<typeof formSchema>;

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Payload>({
    defaultValues: modelData,
    resolver: yupResolver(formSchema),
  });

  const [checked, setChecked] = useState(false);
  const useRegistration = useRegistrationApi();
  const listPlaces = vaccinePlaces.map((place) => {
    return { label: place.name, value: place.id };
  });

  watch('status');

  const onSubmit: SubmitHandler<Payload> = async (data) => {
    const payloadData = {
      ...data,
      id: modelData?.id,
    };

    if (checked) {
      payloadData.status = injectStatus.done;
    }

    const result = await useRegistration.update.mutateAsync(payloadData);

    if (result) {
      handleSubmitted();
    }
  };

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="border-b p-6 flex gap-4">
            <Typography id="modal-modal-title" variant="body1">
              Kết quả đăng ký
            </Typography>
            <div className="text-center w-40 ">
              <Status value={modelData?.status || 0} />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <Stack spacing={2}>
              <DetailItem title="Họ và tên" value={modelData?.user?.fullName} />
              <DetailItem title="Ngày sinh" value={modelData?.user?.birthday} />
              <DetailItem
                title="Giới tính"
                value={getLabelByValue(modelData?.user?.gender, genderList)}
              />
              <DetailItem
                title="Số CMND/CCCD/Mã định danh công dân"
                value={modelData?.user?.citizenCode}
              />
              <DetailItem title="Số thẻ BHYT" value={modelData?.insuranceCode} />
              <DetailItem
                title="Ngày tiêm mong muốn"
                value={`${modelData?.injectionDate} (${getLabelByValue(
                  modelData?.injectionPhase,
                  dayPhases,
                )})`}
              />
              {getValues('status') == injectStatus.done && (
                <>
                  <DetailItem title="Ngày tiêm thực tế" value={modelData?.injectedDate} />
                  <DetailItem
                    title="Điểm tiêm"
                    value={getLabelByValue(modelData?.vaccinationPlaceId, listPlaces)}
                  />
                </>
              )}
              {modelData?.status == injectStatus.pending && (
                <SelectField
                  list={VaccineRegistrationStatus}
                  label="Trạng thái"
                  control={control}
                  name="status"
                  required={true}
                  errorMsg={errors.status?.message}
                />
              )}
              {getValues('status') == injectStatus.accept && (
                <>
                  <SelectField
                    list={listPlaces}
                    label="Điểm tiêm"
                    control={control}
                    name="vaccinationPlaceId"
                    required={true}
                    errorMsg={errors.vaccinationPlaceId?.message}
                  />
                  <InputTextField
                    label="Ngày tiêm"
                    control={control}
                    type="date"
                    name="injectedDate"
                    required={true}
                    errorMsg={errors.injectedDate?.message}
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeCheckbox} />}
                    label="Xác nhận đã tiêm chủng"
                  />
                </>
              )}
            </Stack>
            <Stack direction="row" spacing={1} justifyContent={'right'} className="mt-4">
              <LoadingButton onClick={handleClose} variant="outlined">
                Hủy
              </LoadingButton>
              {(getValues('status') == injectStatus.accept ||
                getValues('status') == injectStatus.pending) && (
                <LoadingButton
                  loading={useRegistration.update.isPending}
                  type="submit"
                  variant="contained">
                  Xác nhận
                </LoadingButton>
              )}
            </Stack>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default VaccineRegistrationModal;
