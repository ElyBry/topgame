import { createContext } from 'react'
import { TUserInfoResponse } from '../api/auth/userInfoApi'

export type TUserContext = {
  userInfo: TUserInfoResponse | null
  loading: boolean;
  setUserInfo: (userData: TUserInfoResponse | null) => void
  setLoading: (flag: boolean) => void;
}

const UserContext = createContext<TUserContext | null>(null)

export const UserContextProvider = UserContext.Provider

export default UserContext
