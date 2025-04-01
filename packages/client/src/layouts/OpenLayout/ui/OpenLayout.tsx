import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/routes'
import { selectUser, useAppSelector } from '../../../store/hooks'

export const OpenLayout = () => {
  const navigate = useNavigate()

  const { status, user } = useAppSelector(state => {

    return state.userSlice
  })

  useEffect(() => {
    if (user) {
      navigate(ROUTES.MAIN)
    }
  }, [user, navigate])

  return <Outlet />
}
