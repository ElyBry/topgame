import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import UserContext from '../../../context/userContext'
import { ROUTES } from '../../../utils/routes'

export const PrivateLayout = () => {
  const navigate = useNavigate()
  const context = useContext(UserContext)

  useEffect(() => {
    if (!context?.userInfo && !context?.loading) {
      navigate(ROUTES.SIGN_IN)
    }
  }, [context?.loading, context?.userInfo, navigate])

  if (!context?.userInfo) {
    return null
  }

  return <Outlet />
}
