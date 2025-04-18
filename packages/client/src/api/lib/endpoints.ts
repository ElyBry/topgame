export const ENDPOINTS = {
  SIGN_IN: '/auth/signin',
  SIGN_UP: '/auth/signup',
  LOGOUT: '/auth/logout',
  USER_INFO: '/auth/user',
  USER_AVATAR: '/user/profile/avatar',
  USER_PASSWORD: '/user/password',
  UPDATE_DATA: '/user/profile',
  OAUTH_SIGN_IN: '/oauth/yandex',
  OAUTH_SERVICE_ID: '/oauth/yandex/service-id',
  LEADERBOARD: '/leaderboard',
  THEME: '/theme',
  TOPICS_LIST: '/topics',
} as const
