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
	ServerErrorPage,
  TopicNewPage,
  StartGame,
  EndGame
} from '../pages'
import { ROUTES } from './routes'
import { OpenLayout } from '../layouts/OpenLayout'
import { PrivateLayout } from '../layouts/PrivateLayout'
import {ErrorBoundary} from "../components/ErrorBoundary";

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
    element: <NotFoundPage />,
    path: ROUTES.NOT_FOUND,
  },
  {
    element: <ServerErrorPage />,
    path: ROUTES.SERVER_ERROR,
  },
  {
    path: '*',
    loader: () => redirect(ROUTES.NOT_FOUND),
  },
]
