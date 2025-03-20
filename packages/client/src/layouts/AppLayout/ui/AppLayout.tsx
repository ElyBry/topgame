import { selectUser, useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchUser } from '../../../store/slice/userSlice'
import { Outlet } from 'react-router-dom';
import { PageInitArgs } from '../../../utils/router'
import { usePage } from '../../../hooks/usePage'
import { useEffect } from 'react'

export const AppLayout = () => {
  usePage({ initPage: initPages })

  const { status } = useAppSelector(state => state.userSlice)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return <Outlet />
}

export const initPages = async ({ dispatch, state }: PageInitArgs) => {
  if (!selectUser(state).user) {
    return dispatch(fetchUser())
  }
}