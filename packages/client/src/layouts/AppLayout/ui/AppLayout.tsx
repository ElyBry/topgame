import { selectUser, useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchUser } from '../../../store/slice/userSlice'
import { Outlet } from 'react-router-dom';
import { PageInitArgs } from '../../../utils/router'
import { usePage } from '../../../hooks/usePage'
import { useEffect } from 'react'
import { Loader } from '../../../components/Loader'

export const AppLayout = () => {
  usePage({ initPage: initPages })

  const { status } = useAppSelector(state => state.userSlice)
  // const { user } = useAppSelector(state => selectUser(state));

  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   if (status !== 'loading') {
  //       dispatch(fetchUser())
  //   }
  // }, [dispatch])

  if (status === 'loading') {
    return <Loader />
  }

  return <Outlet />
}

export const initPages = async ({ dispatch, state }: PageInitArgs) => {
  if (!selectUser(state).user) {
    return dispatch(fetchUser())
  }
}