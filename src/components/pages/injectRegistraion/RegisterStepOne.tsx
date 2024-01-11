import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import * as Yup from 'yup';
import {
  incrementStep,
  injectRegistrationFormData,
  updateForm,
} from '../../../store/slices/injectRegistrationSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../store';
import NavigationButton from './NavigationButton';
import { dayPhases, priorities } from '../../../utils/constants/constants';
import { InjectRegisterStepOneTexts } from '../../../utils/constants/texts';
import SelectField from '../../base/SelectField';
import InputTextField from '../../base/InputTextField';

const RegisterStepOne: FC = () => {
  const formSchema = Yup.object().shape({
    priority: Yup.number()
      .min(0, 'Nhóm ưu tiên không được để trống')
      .required('Nhóm ưu tiên không được để trống'),
    insuranceCode: Yup.string(),
    job: Yup.string(),
    workplace: Yup.string(),
    address: Yup.string(),
    injectionDate: Yup.string()
      .typeError('Ngày tiêm không được để trống')
      .required('Ngày tiêm không được để trống'),
    injectionPhase: Yup.number()
      .min(0, 'Buổi tiêm không được để trống')
      .required('Buổi tiêm không được để trống'),
  });

  type Payload = Yup.InferType<typeof formSchema>;
  const modelData = useAppSelector(injectRegistrationFormData);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Payload>({
    defaultValues: modelData,
    resolver: yupResolver(formSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Payload> = (data) => {
    dispatch(updateForm(data));
    dispatch(incrementStep());
  };

  return (
    <Box>
      <form id="childForm" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant="h6">1. Thông tin người đăng ký tiêm</Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SelectField
              list={priorities}
              label="Nhóm ưu tiên"
              control={control}
              name="priority"
              required={true}
              errorMsg={errors.priority?.message}
            />
            <InputTextField
              label="Số thẻ BHYT"
              control={control}
              name="insuranceCode"
              errorMsg={errors.insuranceCode?.message}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InputTextField
              label="Nghề nghiệp"
              control={control}
              name="job"
              errorMsg={errors.job?.message}
            />
            <InputTextField
              label="Đơn vị công tác"
              control={control}
              name="workplace"
              errorMsg={errors.workplace?.message}
            />
            <InputTextField
              label="Địa chỉ hiện tại"
              control={control}
              name="address"
              errorMsg={errors.address?.message}
            />
          </div>
          <Typography variant="h6">2. Thông tin đăng ký tiêm chủng</Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InputTextField
              label="Ngày muốn được tiêm (dự kiến)"
              control={control}
              type="date"
              name="injectionDate"
              required={true}
              errorMsg={errors.injectionDate?.message}
            />
            <SelectField
              list={dayPhases}
              label="Buổi tiêm mong muốn"
              control={control}
              name="injectionPhase"
              required={true}
              errorMsg={errors.injectionPhase?.message}
            />
          </div>
          <Typography variant="body1" className="text-red-700 text-bold">
            Lưu ý:
          </Typography>
          <div className="text-red-700">
            <ul className="ml-4 list-inside list-disc">
              {InjectRegisterStepOneTexts.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </div>
        </Stack>
        <NavigationButton />
      </form>
    </Box>
  );
};

export default RegisterStepOne;
