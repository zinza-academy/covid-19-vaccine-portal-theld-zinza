import * as Yup from 'yup';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import InputTextField from '../../../base/InputTextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@emotion/styled';
import FieldErrorMsg from '../../../base/FieldErrorMsg';

interface Document {
  id: number;
  title: string;
  file_path?: string;
}

interface Props {
  open: boolean;
  modelData?: Document;
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
  width: 600,
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const DocumentFormModel: FC<Props> = ({ open, modelData, handleClose, handleSubmitted }) => {
  const formSchema = Yup.object().shape({
    title: Yup.string().required('Tên tài liệu không được để trống'),
    file: Yup.mixed<File>()
      .nullable()
      .test('required', 'File không được để trống', (file) => {
        return !(!modelData && !file);
      }),
  });

  type Payload = Yup.InferType<typeof formSchema>;

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<Payload>({
    defaultValues: {
      title: modelData?.title,
      file: null,
    },
    resolver: yupResolver(formSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Payload> = (data) => {
    console.log(data);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      handleSubmitted();
    }, 1000);
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setValue('file', e.target.files[0]);
    trigger('file');
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
              {modelData ? 'Sửa Tài Liệu' : 'Thêm Mới Tài Liệu'}
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <Stack spacing={2}>
              <InputTextField
                label="Tên tài liệu"
                control={control}
                name="title"
                required={true}
                errorMsg={errors.title?.message}
              />
              <Typography component={getValues('file') ? 's' : 'span'}>
                {modelData?.file_path}
              </Typography>
              <p>{getValues('file')?.name}</p>
              <FieldErrorMsg msg={errors.file?.message} />
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleChangeFile} />
              </Button>
              <div className="mt-20">
                <Stack direction="row" spacing={1} justifyContent={'right'}>
                  <LoadingButton onClick={handleClose} variant="outlined">
                    Hủy
                  </LoadingButton>
                  <LoadingButton loading={loading} type="submit" variant="contained">
                    Xác nhận
                  </LoadingButton>
                </Stack>
              </div>
            </Stack>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default DocumentFormModel;
