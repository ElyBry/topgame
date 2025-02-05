import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import UserContext from '../../../context/userContext'
import { ROUTES } from '../../../utils/routes'

export const PrivateLayout = () => {
  const navigate = useNavigate()
  const context = useContext(UserContext)

  useEffect(() => {
    if (!context?.userInfo) {
      navigate(ROUTES.SIGN_IN)
    }
  }, [context?.userInfo, navigate])

  if (!context?.userInfo) {
    return null
  }

  return <Outlet />
}
