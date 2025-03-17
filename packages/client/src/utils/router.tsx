import { RouteObject } from 'react-router'
import {
  ForumPage,
  GamePage,
  LeaderboardPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  SigninPage,
  SignupPage,
  TestCore,
  TopicPage,
	ServerErrorPage,
  TopicNewPage,
  StartGame,
  EndGame
} from '../pages'
import { ROUTES } from './routes'
import { OpenLayout } from '../layouts/OpenLayout'
import { PrivateLayout } from '../layouts/PrivateLayout'
import {ErrorBoundary} from "../components/ErrorBoundary";
import { redirect } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/config/store'
import { AppLayout } from '../layouts/AppLayout'
import { initPages } from '../layouts/AppLayout/ui/AppLayout'
import { initNotFoundPage } from '../pages/NotFound/ui/NotFoundPage'

export type PageInitContext = {
  uuid?: string | undefined
  authCookie?: string | undefined
}

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
  ctx: PageInitContext
}

export const router = [
  {
    fetchData: initPages,
    element: <AppLayout />,
    children: [
      {
        element: <OpenLayout />,
        children: [
          {
            element: <SigninPage />,
            path: ROUTES.SIGN_IN,
          },
          {
            element: <SignupPage />,
            path: ROUTES.SIGN_UP,
          },
        ],
      },
      {
        element: <PrivateLayout />,
        children: [
          {
            element: <MainPage />,
            path: ROUTES.MAIN,
          },
          {
            element: <ProfilePage />,
            path: ROUTES.PROFILE,
          },
          {
            element: <GamePage />,
            path: ROUTES.GAME,
          },
          {
            element: <LeaderboardPage />,
            path: ROUTES.LEADERBOARD,
          },
          {
            element: <StartGame />,
            path: ROUTES.START_GAME,
          },
          {
            element: <EndGame />,
            path: ROUTES.END_GAME,
          },
          {
            element: <ForumPage />,
            path: ROUTES.FORUM,
          },
          {
            element: <TopicPage />,
            path: ROUTES.FORUM_MESSAGE,
          },
          {
            element: <TopicNewPage />,
            path: ROUTES.FORUM_NEW,
          },
        ],
      },
      {
        element: <ErrorBoundary><TestCore /></ErrorBoundary>,
        path: ROUTES.TEST_CORE,
      },
      {
        element: <ServerErrorPage />,
        path: ROUTES.SERVER_ERROR,
      },
      {
        path: '*',
        element: <NotFoundPage />,
        fetchData: initNotFoundPage,
      },
    ],
  }
]
