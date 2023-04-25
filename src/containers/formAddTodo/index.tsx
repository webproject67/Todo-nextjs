import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LayoutBox from '@/components/layoutBox';
import TextField from '@/components/textField';
import Button from '@/components/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUserData } from '@/store/user/selectors';
import { selectLoading } from '@/store/task/selectors';
import { addTaskAction } from '@/store/api-actions';

const validationSchema = yup.object({
  text: yup.string().required('Заполните это поле'),
});

function FormAddTodo() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const isLoading = useAppSelector(selectLoading);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    onSubmit: (values, helpers) => {
      dispatch(
        addTaskAction({
          text: values.text,
          user: userData.email,
        })
      );
      helpers.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <LayoutBox marginBottom="small">
        <TextField
          id="text"
          label="Новая задача"
          value={formik.values.text}
          variant="standard"
          handleChange={formik.handleChange}
          isError={formik.touched.text && Boolean(formik.errors.text)}
          helperText={formik.touched.text && formik.errors.text}
        />
      </LayoutBox>
      <LayoutBox width="small">
        <Button
          text="Добавить"
          color="primary"
          type="submit"
          isDisabled={isLoading}
        />
      </LayoutBox>
    </form>
  );
}

export default React.memo(FormAddTodo);
