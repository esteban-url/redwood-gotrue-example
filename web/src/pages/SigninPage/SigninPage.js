import { Form, TextField, PasswordField, Submit } from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

import GlobalLayout from 'src/layouts/GlobalLayout/GlobalLayout'

const SigninPage = () => {
  const { logIn } = useAuth()
  const [error, setError] = React.useState(null)

  const onSubmit = (data) => {
    setError(null)
    logIn({ email: data.email, password: data.password, remember: true })
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
        <Submit>Sign In</Submit>
      </Form>
    </GlobalLayout>
  )
}

export default SigninPage
