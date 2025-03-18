import { axiosRequest } from '../lib/axiosConfig'
import { ENDPOINTS } from '../lib/endpoints'

type TLeaderboardNewLeaderRequest = {
  data: TFields,
  ratingFieldName: string,
}
type TGetLeaderboardRequest = {
  teamName: string,
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

export const leaderboardNewLeaderRequest = async ({ data, ratingFieldName }: TLeaderboardNewLeaderRequest) => {
  return await axiosRequest.post(ENDPOINTS.LEADERBOARD, {
    data,
    ratingFieldName,
  })
}

export const getResults = async ({ teamName, ratingFieldName, cursor, limit }: TGetLeaderboardRequest) => {
  return await axiosRequest.post(ENDPOINTS.LEADERBOARD + '/' + teamName, {
    ratingFieldName,
    cursor,
    limit,
  })
}
