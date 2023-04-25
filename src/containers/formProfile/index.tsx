import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUserData, selectLoading } from '@/store/user/selectors';
import { updateAction } from '@/store/api-actions';
import LayoutBox from '@/components/layoutBox';
import TextField from '@/components/textField';
import Button from '@/components/button';

const validationSchema = yup.object({
  password: yup
    .string()
    .min(8, 'Длина пароля должна составлять не менее 8 символов')
    .required('Заполните это поле'),
});

function FormProfile() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoading);
  const userData = useAppSelector(selectUserData);

  const formik = useFormik({
    initialValues: {
      name: userData.name,
      surname: userData.surname,
      password: '',
      email: userData.email,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updateAction(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <LayoutBox display="flex">
        <LayoutBox width="half">
          <LayoutBox height="min">
            <TextField
              id="name"
              label="Имя"
              value={formik.values.name}
              variant="standard"
              handleChange={formik.handleChange}
              isError={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </LayoutBox>
          <LayoutBox height="min">
            <TextField
              id="surname"
              label="Фамилия"
              value={formik.values.surname}
              variant="standard"
              handleChange={formik.handleChange}
              isError={formik.touched.surname && Boolean(formik.errors.surname)}
              helperText={formik.touched.surname && formik.errors.surname}
            />
          </LayoutBox>
        </LayoutBox>
        <LayoutBox width="half">
          <LayoutBox height="min">
            <TextField
              id="password"
              label="Пароль"
              value={formik.values.password}
              variant="standard"
              handleChange={formik.handleChange}
              isError={
                formik.touched.password && Boolean(formik.errors.password)
              }
              helperText={formik.touched.password && formik.errors.password}
            />
          </LayoutBox>
          <LayoutBox height="min">
            <TextField
              id="email"
              label="Логин"
              value={formik.values.email}
              variant="standard"
              isDisabled
              handleChange={formik.handleChange}
              isError={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </LayoutBox>
        </LayoutBox>
      </LayoutBox>
      <LayoutBox width="small" marginLeft="auto">
        <Button
          text="Сохранить"
          color="primary"
          type="submit"
          isDisabled={isLoading}
        />
      </LayoutBox>
    </form>
  );
}

export default React.memo(FormProfile);
