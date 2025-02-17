import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/routes'
import { useAppSelector } from '../../../store/hooks'

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
