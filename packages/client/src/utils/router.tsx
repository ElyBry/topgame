import {
  ForumPage,
  GamePage,
  LeaderboardPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  SigninPage,
  SignupPage,
  TopicPage,
	ServerErrorPage,
  TopicNewPage,
  StartGame,
  EndGame
} from '../pages'
import { ROUTES } from './routes'
import { OpenLayout } from '../layouts/OpenLayout'
import { PrivateLayout } from '../layouts/PrivateLayout'
import { AppDispatch, RootState } from '../store/config/store'
import { AppLayout } from '../layouts/AppLayout'
import { initPages } from '../layouts/AppLayout/ui/AppLayout'
import { initNotFoundPage } from '../pages/NotFound/ui/NotFoundPage'
import { ErrorBoundary } from '../components/ErrorBoundary'

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
    element: <ErrorBoundary><AppLayout /></ErrorBoundary>,
    children: [
      {
        element: <ErrorBoundary><OpenLayout /></ErrorBoundary>,
        children: [
          {
            element: <ErrorBoundary><SigninPage /></ErrorBoundary>,
            path: ROUTES.SIGN_IN,
          },
          {
            element: <ErrorBoundary><SignupPage /></ErrorBoundary>,
            path: ROUTES.SIGN_UP,
          },
        ],
      },
      {
        element: <PrivateLayout />,
        children: [
          {
            element: <ErrorBoundary><MainPage /></ErrorBoundary>,
            path: ROUTES.MAIN,
          },
          {
            element: <ErrorBoundary><ProfilePage /></ErrorBoundary>,
            path: ROUTES.PROFILE,
          },
          {
            element: <ErrorBoundary><GamePage /></ErrorBoundary>,
            path: ROUTES.GAME,
          },
          {
            element: <ErrorBoundary><LeaderboardPage /></ErrorBoundary>,
            path: ROUTES.LEADERBOARD,
          },
          {
            element: <ErrorBoundary><StartGame /></ErrorBoundary>,
            path: ROUTES.START_GAME,
          },
          {
            element: <ErrorBoundary><EndGame /></ErrorBoundary>,
            path: ROUTES.END_GAME,
          },
          {
            element: <ErrorBoundary><ForumPage /></ErrorBoundary>,
            path: ROUTES.FORUM,
          },
          {
            element: <ErrorBoundary><TopicPage /></ErrorBoundary>,
            path: ROUTES.FORUM_MESSAGE,
          },
          {
            element: <ErrorBoundary><TopicNewPage /></ErrorBoundary>,
            path: ROUTES.FORUM_NEW,
          },
        ],
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
