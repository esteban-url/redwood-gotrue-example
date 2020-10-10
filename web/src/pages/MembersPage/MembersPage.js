import { useAuth } from '@redwoodjs/auth'

import GlobalLayout from 'src/layouts/GlobalLayout/GlobalLayout'

const SignupPage = () => {
  const { currentUser } = useAuth()

  return (
    <GlobalLayout>
      <h1>Members only page</h1>
      <p>Welcome {currentUser.email}</p>
    </GlobalLayout>
  )
}

export default SignupPage
