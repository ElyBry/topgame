import express from 'express';
import bodyParser from 'body-parser';
import { getUserTheme, updateUserTheme } from '../controllers/themeController';

const themeRouter = express.Router();

themeRouter.get('/:userId', getUserTheme);
themeRouter.post('/:userId', bodyParser.json(), updateUserTheme);

export default themeRouter;
