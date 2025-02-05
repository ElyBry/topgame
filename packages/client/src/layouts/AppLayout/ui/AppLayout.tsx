import {
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import UserContext from '../../../context/userContext'
import { getUserInfo } from '../../../api/auth/userInfoApi'

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const context = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!context?.userInfo) {
      setIsLoading(true)
      getUserInfo()
        .then(res => {
          if (res) {
            context?.setUserInfo(res)
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [context])

  if (!context?.userInfo && isLoading) {
    null
  }

  return <>{children}</>
}
