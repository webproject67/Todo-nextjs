import cn from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@/components/button';
import TextField from '@/components/textField';
import styles from './FormLogin.module.scss';

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

export default function FormLogin() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className={cn(styles.root)} onSubmit={formik.handleSubmit}>
      <div className={cn(styles.textField)}>
        <TextField
          id="email"
          label="Логин"
          value={formik.values.email}
          handleChange={formik.handleChange}
          isError={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </div>
      <div className={cn(styles.textField)}>
        <TextField
          id="password"
          label="Пароль"
          type="password"
          value={formik.values.password}
          handleChange={formik.handleChange}
          isError={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </div>
      <Button text="Войти" color="primary" type="submit" />
    </form>
  );
}
