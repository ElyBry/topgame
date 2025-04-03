import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/routes'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { fetchUser } from '../../../store/slice/userSlice'

export const PrivateLayout = () => {
  const navigate = useNavigate()
  const { user, status } = useAppSelector(state => state.userSlice)
  const dispatch = useAppDispatch()
  

  useEffect(() => {
    if (!user && status !== 'loading') {
      navigate(ROUTES.SIGN_IN)
    }

    if (!user) {
      dispatch(fetchUser())
    }
    
  }, [navigate, status, user])

  return <Outlet />
}
