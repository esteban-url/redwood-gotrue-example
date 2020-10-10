import { useAuth } from '@redwoodjs/auth'
import { FieldError, Form, PasswordField, Submit } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { useForm } from 'react-hook-form'
import GlobalLayout from 'src/layouts/GlobalLayout/GlobalLayout'
const PasswordResetPage = ({ token }) => {
  const { client } = useAuth()
  const formMethods = useForm({ mode: 'onBlur' })

  const [tokenError, setTokenError] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const currentPassword = formMethods.watch('password', '')

  React.useEffect(() => {
    client
      .recover(token)
      .then(() => {
        setUser(client.currentUser())
        setLoading(false)
      })
      .catch((error) => {
        setTokenError(error.status)
        setLoading(false)
      })
  }, [client, token])

  const onSubmit = (data) => {
    setError(null)
    setTokenError(null)
    if (user) {
      user
        .update({ password: data.password })
        .then(() => {
          navigate(routes.signin())
        })
        .catch((error) => {
          setError(error.message)
        })
    } else {
      setTokenError(404)
    }
  }

  return (
    <GlobalLayout>
      <h1>Reset your password</h1>
      {loading ? (
        <p>loading...</p>
      ) : tokenError ? (
        <p>
          The password reset token is{' '}
          {tokenError === 404 ? 'invalid' : 'missing'}, you can get a new one{' '}
          <Link to={routes.forgotPassword()}>here</Link>
        </p>
      ) : (
        <Form onSubmit={onSubmit} formMethods={formMethods}>
          {error ? <p>{error}</p> : null}
          <p>
            Enter your new password. After confirming, you will be asked to log
            in again.
          </p>
          <div>
            <PasswordField
              name="password"
              validation={{ required: true }}
              placeholder="new password"
            />
            <FieldError name="password" />
          </div>
          <div>
            <PasswordField
              name="passwordConfirmation"
              validation={{
                required: 'Password confirmation is required.',
                validate: (value) =>
                  value === currentPassword || 'The passwords do not match.',
              }}
              placeholder="confirm new password"
            />
            <FieldError name="passwordConfirmation" />
          </div>

          <Submit>Reset password</Submit>
        </Form>
      )}
    </GlobalLayout>
  )
}

export default PasswordResetPage
