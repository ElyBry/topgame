import { axiosRequest } from '../lib/axiosConfig'
import { ENDPOINTS } from '../lib/endpoints'

type TLeaderboardNewLeaderRequest = {
  data: TFields,
  ratingFieldName: string,
}
type TGetLeaderboardRequest = {
  ratingFieldName: string,
  cursor: number,
  limit: number,
}

type TFields = {
  username: string;
  countMoves: number;
}

export interface TGetLeaderboardResponse {
  data: TFields;
}
const teamName = 'MyAwesomeGame'
export const leaderboardNewLeaderRequest = async ({ data, ratingFieldName }: TLeaderboardNewLeaderRequest) => {
  return await axiosRequest.post(ENDPOINTS.LEADERBOARD, {
    data,
    ratingFieldName,
    teamName
  })
}

export const getResults = async ({ ratingFieldName, cursor, limit }: TGetLeaderboardRequest) => {
  return await axiosRequest.post(ENDPOINTS.LEADERBOARD + '/' + teamName, {
    ratingFieldName,
    cursor,
    limit,
  })
}
