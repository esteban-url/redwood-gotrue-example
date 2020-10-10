import { useAuth } from '@redwoodjs/auth'
import { Form, Submit, TextField } from '@redwoodjs/forms'
import GlobalLayout from 'src/layouts/GlobalLayout/GlobalLayout'

const ForgotPasswordPage = () => {
  const { client } = useAuth()

  const [error, setError] = React.useState(null)
  const [complete, setComplete] = React.useState(false)

  const onSubmit = (data) => {
    setError(null)
    client
      .requestPasswordRecovery(data.email)
      .then(() => {
        setComplete(true)
      })
      .catch((error) => {
        setError(error.message)
      })
  }
  return (
    <GlobalLayout>
      <h1>Reset your password</h1>
      {complete ? (
        <p>
          We&apos;ve sent a recovery email to your account, follow the link
          there to reset your password.
        </p>
      ) : (
        <Form onSubmit={onSubmit}>
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <p>
                To reset your password, enter the email address you use to sign
                in.
              </p>
              <TextField name="email" placeholder="email" />
            </>
          )}
          <Submit>Get reset link</Submit>
        </Form>
      )}
    </GlobalLayout>
  )
}
export default ForgotPasswordPage
