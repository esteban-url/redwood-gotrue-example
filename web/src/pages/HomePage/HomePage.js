import { useHashRedirects } from 'src/hooks/useHashRedirects'
import GlobalLayout from 'src/layouts/GlobalLayout/GlobalLayout'

const HomePage = () => {
  useHashRedirects()
  return (
    <GlobalLayout>
      <h1>Home</h1>
      <p>My Gotrue Redwood Auth</p>
    </GlobalLayout>
  )
}

export default HomePage
