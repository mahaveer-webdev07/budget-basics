import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

// Wrap any route that should require sign-in with this component.
// If no user is logged in, it redirects to the sign-in page instead
// of rendering the protected content (so no data can be stored either).
export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext)

  if (!isLoggedIn) {
    return <Navigate to="/auth?mode=signin" replace />
  }

  return children
}
