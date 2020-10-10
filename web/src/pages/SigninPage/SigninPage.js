import {
  Form,
  TextField,
  PasswordField,
  Submit,
  CheckboxField,
  Label,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'

import GlobalLayout from 'src/layouts/GlobalLayout/GlobalLayout'

const SigninPage = () => {
  const { logIn } = useAuth()
  const [error, setError] = React.useState(null)

  const onSubmit = (data) => {
    setError(null)
    logIn({
      email: data.email,
      password: data.password,
      remember: data.remember,
    })
      .then(() => navigate(routes.members()))
      .catch((error) => setError(error.message))
  }

  return (
    <GlobalLayout>
      <h1>Sign In</h1>
      <Form onSubmit={onSubmit}>
        {error ? <p>{error}</p> : null}
        <TextField name="email" placeholder="email" />
        <PasswordField name="password" placeholder="password" />
        <CheckboxField name="remeber" />
        <Label name="remeber">Remember me</Label>
        <Submit>Sign In</Submit>
      </Form>
      <p>
        Not a member? <Link to={routes.signup()}>Sign up</Link> now!
      </p>
    </GlobalLayout>
  )
}

export default SigninPage
