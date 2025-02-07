import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import UserContext from '../../../context/userContext'
import { ROUTES } from '../../../utils/routes'

export const OpenLayout = () => {
  const navigate = useNavigate()
  const context = useContext(UserContext)

  useEffect(() => {
    if (context?.userInfo) {
      navigate(ROUTES.MAIN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  return <Outlet />
}
