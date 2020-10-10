import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import GlobalLayout from 'src/layouts/GlobalLayout/GlobalLayout'

const ConfirmEmailPage = ({ token }) => {
  const { client } = useAuth()
  const [tokenError, setTokenError] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    client
      .confirm(token)
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false)
        setTokenError(error.status)
      })
  }, [client, token])
  return (
    <GlobalLayout>
      {loading ? (
        <p>loading...</p>
      ) : tokenError ? (
        <p>
          The confirmation token is {tokenError === 404 ? 'invalid' : 'missing'}
          .
        </p>
      ) : (
        <p>
          Thanks for confirming you email, you can{' '}
          <Link to={routes.signin()}>sign in</Link> now!
        </p>
      )}
    </GlobalLayout>
  )
}

export default ConfirmEmailPage
