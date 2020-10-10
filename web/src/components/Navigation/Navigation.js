import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import SignoutBtn from 'src/components/SignoutBtn/SignoutBtn'

const Navigation = () => {
  const { isAuthenticated } = useAuth()
  return (
    <nav>
      {isAuthenticated ? (
        <SignoutBtn />
      ) : (
        <ul>
          <li>
            <Link to={routes.signup()}>Sign Up</Link>
          </li>
          <li>
            <Link to={routes.signin()}>Sign In</Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navigation
