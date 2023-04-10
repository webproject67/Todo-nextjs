import { useFormik } from 'formik';
import * as yup from 'yup';
import LayoutBox from '@/components/layoutBox';
import TextField from '@/components/textField';
import Button from '@/components/button';

const validationSchema = yup.object({
  name: yup.string().required('Заполните это поле'),
  surname: yup.string().required('Заполните это поле'),
  password: yup
    .string()
    .min(8, 'Длина пароля должна составлять не менее 8 символов')
    .required('Заполните это поле'),
});

export default function FormProfile() {
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      password: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <LayoutBox padding="small" color="light">
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
                isError={
                  formik.touched.surname && Boolean(formik.errors.surname)
                }
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
        <LayoutBox marginLeft="auto">
          <Button text="Сохранить" color="primary" type="submit" />
        </LayoutBox>
      </form>
    </LayoutBox>
  );
}
