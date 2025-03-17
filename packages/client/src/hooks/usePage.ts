import { useEffect } from 'react'
import { useAppDispatch, useStore } from '../store/config/store'
import { useAppSelector } from '../store/hooks'

import {
  setPageHasBeenInitializedOnServer,
  selectPageHasBeenInitializedOnServer,
} from '../store/slice/ssrSlice'
import { PageInitArgs, PageInitContext } from '../utils/router'

const getCookie = (name: string) => {
  console.log(document.cookie, 'document.cookie');

  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
      // eslint-disable-next-line
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
      '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const createContext = (): PageInitContext => ({
  authCookie: getCookie('authCookie'),
  uuid: getCookie('uuid'),
})

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>
}

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useAppDispatch()
  const pageHasBeenInitializedOnServer = useAppSelector(
    selectPageHasBeenInitializedOnServer
  )
  const store = useStore()

  useEffect(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false))
      return
    }
    initPage({ dispatch, state: store.getState(), ctx: createContext() })
  }, [])
}