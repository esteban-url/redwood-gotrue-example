import { Form, TextField, PasswordField, Submit } from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'

import GlobalLayout from 'src/layouts/GlobalLayout/GlobalLayout'
import { Link, navigate, routes } from '@redwoodjs/router'

const SignupPage = () => {
  const { client } = useAuth()
  const [error, setError] = React.useState(null)
  const onSubmit = (data) => {
    setError(null)
    client
      .signup(data.email, data.password)
      .then(() => navigate(routes.members()))
      .catch((error) => setError(error.message))
  }

  return (
    <GlobalLayout>
      <h1>Sign Up</h1>
        <>
          <Form onSubmit={onSubmit}>
            {error ? <p>{error}</p> : null}
            <TextField name="email" placeholder="email" />
            <PasswordField name="password" placeholder="password" />
            <Submit>Sign Up</Submit>
          </Form>
          <p>
            Already a member? <Link to={routes.signin()}>Sign in</Link> instead
          </p>
        </>
    </GlobalLayout>
  )
}

export default SignupPage
