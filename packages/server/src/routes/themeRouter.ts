import express from 'express';
import bodyParser from 'body-parser';
import { getUserTheme, updateUserTheme } from '../controllers/themeController';

const themeRouter = express.Router();

themeRouter.get('/theme/:userId', getUserTheme);
themeRouter.post('/theme/:userId', bodyParser.json(), updateUserTheme);

export default themeRouter;
