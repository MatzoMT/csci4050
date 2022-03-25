import { Formik, Field, Form } from 'formik';





export default function LoginForm() {

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}

            onSubmit={() => {

            }}
        >
            <Form>
                <Field id="username" name="username" placeholder="Username" />
                <Field type="password" id="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
            </Form>
        </Formik>
    )
}