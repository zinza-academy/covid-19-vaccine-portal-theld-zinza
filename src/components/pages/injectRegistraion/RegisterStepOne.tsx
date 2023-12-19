import { Box, Stack, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import SelectField from '../../base/SelectField';
import * as Yup from 'yup';
import {
  incrementStep,
  injectRegistrationFormData,
  updateForm,
} from '../../../store/slices/injectRegistrationSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FieldLabel from '../../base/FieldLabel';
import FieldErrorMsg from '../../base/FieldErrorMsg';
import { useAppDispatch, useAppSelector } from '../../../store';
import NavigationButton from './NavigationButton';
import { dayPhases, priorities } from '../../../utils/constants/constants';

const RegisterStepOne: FC = () => {
  const formSchema = Yup.object().shape({
    priority: Yup.number()
      .typeError('Nhóm ưu tiên không được để trống')
      .required('Nhóm ưu tiên không được để trống'),
    insurance_number: Yup.string(),
    career: Yup.string(),
    workplace: Yup.string(),
    current_address: Yup.string(),
    injection_date: Yup.string()
      .typeError('Ngày tiêm không được để trống')
      .required('Ngày tiêm không được để trống'),
    injection_phase: Yup.number()
      .typeError('Buổi tiêm không được để trống')
      .required('Buổi tiêm không được để trống'),
  });

  type Payload = Yup.InferType<typeof formSchema>;
  const modelData = useAppSelector(injectRegistrationFormData);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Payload>({
    defaultValues: { ...modelData },
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
              register={register}
              label="Nhóm ưu tiên"
              defaultValue={getValues('priority')}
              name="priority"
              required={true}
              errorMsg={errors.priority?.message}
            />
            <div className="input-group">
              <FieldLabel label="Số thẻ BHYT" htmlFor="insurance_number" />
              <TextField
                className="w-full"
                id="insurance_number"
                placeholder="Số thẻ BHYT"
                variant="outlined"
                {...register('insurance_number')}
              />
              <FieldErrorMsg msg={errors.insurance_number?.message} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="input-group">
              <FieldLabel label="Nghề nghiệp" htmlFor="career" />
              <TextField
                className="w-full"
                id="career"
                placeholder="Nghề nghiệp"
                variant="outlined"
                {...register('career')}
              />
              <FieldErrorMsg msg={errors.career?.message} />
            </div>
            <div className="input-group">
              <FieldLabel label="Đơn vị công tác" htmlFor="workplace" />
              <TextField
                className="w-full"
                id="workplace"
                placeholder="Đơn vị công tác"
                variant="outlined"
                {...register('workplace')}
              />
              <FieldErrorMsg msg={errors.workplace?.message} />
            </div>
            <div className="input-group">
              <FieldLabel label="Địa chỉ hiện tại" htmlFor="current_address" />
              <TextField
                className="w-full"
                id="current_address"
                placeholder="Địa chỉ hiện tại"
                variant="outlined"
                {...register('current_address')}
              />
              <FieldErrorMsg msg={errors.current_address?.message} />
            </div>
          </div>
          <Typography variant="h6">2. Thông tin đăng ký tiêm chủng</Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="input-group">
              <FieldLabel
                label="Ngày muốn được tiêm (dự kiến)"
                required={true}
                htmlFor="injection_date"
              />
              <TextField
                className="w-full"
                id="injection_date"
                type="date"
                variant="outlined"
                {...register('injection_date')}
              />
              <FieldErrorMsg msg={errors.injection_date?.message} />
            </div>
            <SelectField
              list={dayPhases}
              register={register}
              label="Buổi tiêm mong muốn"
              defaultValue={getValues('injection_phase')}
              name="injection_phase"
              required={true}
              errorMsg={errors.injection_phase?.message}
            />
          </div>
          <Typography variant="body1" className="text-red-700 text-bold">
            Lưu ý:
          </Typography>
          <div className="text-red-700">
            <ul className="ml-4 list-inside list-disc">
              <li>
                Việc đăng ký thông tin hoàn toàn bảo mật và phục vụ cho chiến dịch tiêm chủng Vắc
                xin COVID - 19
              </li>
              <li>
                Xin vui lòng kiểm tra kỹ các thông tin bắt buộc(VD: Họ và tên, Ngày tháng năm sinh,
                Số điện thoại, Số CMND/CCCD/Mã định danh công dân/HC ...)
              </li>
              <li>
                Bằng việc nhấn nút "Xác nhận", bạn hoàn toàn hiểu và đồng ý chịu trách nhiệm với các
                thông tin đã cung cấp.
              </li>
              <li>
                Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa vào danh sách đặt tiêm.
                Cơ sở y tế sẽ thông báo lịch tiêm khi có vắc xin và kế hoạch tiêm được phê duyệt.
                Trân trọng cảm ơn!
              </li>
            </ul>
          </div>
        </Stack>
        <NavigationButton />
      </form>
    </Box>
  );
};

export default RegisterStepOne;
