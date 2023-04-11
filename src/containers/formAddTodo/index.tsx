import { useFormik } from 'formik';
import * as yup from 'yup';
import LayoutBox from '@/components/layoutBox';
import TextField from '@/components/textField';
import Button from '@/components/button';

const validationSchema = yup.object({
  text: yup.string().required('Заполните это поле'),
});

export default function FormAddTodo() {
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
        <Button text="Добавить" color="primary" type="submit" />
      </LayoutBox>
    </form>
  );
}
