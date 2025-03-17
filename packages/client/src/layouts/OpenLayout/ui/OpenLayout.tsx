import { useEffect } from 'react'
import { ROUTES } from '../../../utils/routes'
import { useAppSelector } from '../../../store/hooks'
import { Outlet, useNavigate } from 'react-router-dom';

export const OpenLayout = () => {
  const navigate = useNavigate()

  const { user } = useAppSelector(state => state.userSlice)

  useEffect(() => {
    if (user) {
      navigate(ROUTES.MAIN)
    }
  }, [user, navigate])

  return <Outlet />
}

