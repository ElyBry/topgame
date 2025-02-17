import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/routes'
import { useAppSelector } from '../../../store/hooks'

export const PrivateLayout = () => {
  const navigate = useNavigate()

  const { user, status } = useAppSelector(state => state.userSlice)

  useEffect(() => {
    if (!user && status !== 'loading') {
      navigate(ROUTES.SIGN_IN)
    }
  }, [navigate, status, user])

  if (!user) {
    return null
  }

  return <Outlet />
}
