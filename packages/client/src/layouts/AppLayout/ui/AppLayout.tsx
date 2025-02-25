import { ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchUser } from '../../../store/slice/userSlice'

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { status } = useAppSelector(state => state.userSlice)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return <>{children}</>
}
