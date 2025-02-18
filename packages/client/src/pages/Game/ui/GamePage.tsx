import ChessBoard from "../../../components/ChessBoard/ChessBoard";
import { useAppSelector } from '../../../store/hooks'

export const GamePage = () => {
  const { settings } = useAppSelector(state => state.gameSlice)

  const {time, color, addTimeMove} = settings;

  return (
    <ChessBoard time={time} chessColor={color} addTimeMove={addTimeMove}/>
  );
}