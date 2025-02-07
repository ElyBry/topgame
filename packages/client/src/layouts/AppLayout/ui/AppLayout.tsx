import { ReactNode, useContext, useEffect, useState } from 'react'
import UserContext from '../../../context/userContext'
import { getUserInfo } from '../../../api/auth/userInfoApi'

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const context = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!context?.userInfo) {
      context?.setLoading(true)
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
          context?.setLoading(false)
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!context?.userInfo && isLoading) {
    null
  }

  return <>{children}</>
}
