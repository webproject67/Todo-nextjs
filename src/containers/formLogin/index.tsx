import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@/components/button';
import TextField from '@/components/textField';
import LayoutBox from '@/components/layoutBox';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectLoading } from '@/store/user/selectors';
import { loginAction } from '@/store/api-actions';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Введите корректный адрес электронной почты')
    .required('Заполните это поле'),
  password: yup
    .string()
    .min(8, 'Длина пароля должна составлять не менее 8 символов')
    .required('Заполните это поле'),
});

function FormLogin() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoading);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(loginAction(values));
    },
  });

  return (
    <LayoutBox marginBottom="small" width="full">
      <form onSubmit={formik.handleSubmit}>
        <LayoutBox marginBottom="small">
          <TextField
            id="email"
            label="Логин"
            value={formik.values.email}
            handleChange={formik.handleChange}
            isError={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </LayoutBox>
        <LayoutBox marginBottom="small">
          <TextField
            id="password"
            label="Пароль"
            type="password"
            value={formik.values.password}
            handleChange={formik.handleChange}
            isError={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </LayoutBox>
        <Button
          text="Войти"
          color="primary"
          type="submit"
          isDisabled={isLoading}
        />
      </form>
    </LayoutBox>
  );
}

export default React.memo(FormLogin);
