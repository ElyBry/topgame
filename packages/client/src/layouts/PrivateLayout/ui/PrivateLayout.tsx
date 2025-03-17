import { useEffect } from 'react'
import { ROUTES } from '../../../utils/routes'
import { useAppSelector } from '../../../store/hooks'
import { Outlet, useNavigate } from 'react-router-dom';

export const PrivateLayout = () => {
  const navigate = useNavigate()
  const { user, status } = useAppSelector(state => state.userSlice)

  useEffect(() => {
    if (!user && status !== 'loading') {
      navigate(ROUTES.SIGN_IN)
    }
  }, [navigate, status, user])

  return <Outlet />
}
