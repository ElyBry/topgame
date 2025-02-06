import { redirect, RouteObject } from 'react-router-dom'
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
} from '../pages'
import { ROUTES } from './routes'
import { OpenLayout } from '../layouts/OpenLayout'
import { PrivateLayout } from '../layouts/PrivateLayout'

export const router: RouteObject[] = [
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
      {
        element: <NotFoundPage />,
        path: ROUTES.NOT_FOUND,
      },
      {
        element: <TestCore />,
        path: ROUTES.TEST_CORE,
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
        element: <ForumPage />,
        path: ROUTES.FORUM,
      },
      {
        element: <TopicPage />,
        path: ROUTES.FORUM_MESSAGE,
      },
    ],
  },
  {
    element: <NotFoundPage />,
    path: ROUTES.NOT_FOUND,
  },
  {
    path: '*',
    loader: () => redirect(ROUTES.NOT_FOUND),
  },
]
