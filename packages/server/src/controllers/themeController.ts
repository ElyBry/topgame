import { Request, Response } from 'express';
import { sequelize } from '../db';

export const updateUserTheme = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const themeId = String(req.body.theme);
    const authMethod = req.body.authMethod || 'global';
    const userName = req.body.userName || 'user';

    console.log({
      userId,
      themeId,
      authMethod,
      userName
    });

    const SiteTheme = sequelize.models.SiteTheme;
    const User = sequelize.models.User;

    const theme = await SiteTheme.findOne({ where: { theme: themeId }});

    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' });
    }

    const UserTheme = sequelize.models.UserTheme;

    let userTheme = await UserTheme.findOne({ where: { ownerId: userId } });

    if (userTheme) {
      (userTheme as any).themeId = (theme as any).id;
      await userTheme.save();
      return res.json({ message: 'Theme updated successfully' });
    } else {
      let user = await User.findOne({ where: { id: userId } });

      if (!user) {
        user = await User.create({
          id: userId,
          authMethod: authMethod,
          name: userName,
        });
      }
      
      await UserTheme.create({
        ownerId: userId,
        themeId: (theme as any).id,
      });
      return res.status(201).json({ message: 'Theme created successfully' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error updating user theme' });
  }
};

export const getUserTheme = async (req: Request, res: Response) => {
  const SiteTheme = sequelize.models.SiteTheme;
  const UserTheme = sequelize.models.UserTheme;

  console.log("Получен запрос на тему пользователя:", req.params.userId);
  console.log("Доступные модели:", Object.keys(sequelize.models));

  try {
    if (!sequelize.models.UserTheme) {
      console.error("Модель UserTheme не инициализирована!");
      return res.status(500).json({ message: 'Model not initialized' });
    }
    
    const userId = Number(req.params.userId);

    if (isNaN(userId)) {
      console.log("Некорректный userId:", req.params.userId);
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const userTheme = await UserTheme.findOne({
      where: { ownerId: userId },
      include: {
        model: SiteTheme,
        required: true,
        as: 'theme'
      },
    });

    if (userTheme) {
      console.log("Тема пользователя найдена:", userTheme.toJSON().theme);
      return res.json({ theme: userTheme.toJSON().theme });
    } else {
      console.log("Тема пользователя не найдена");
      return res.status(404).json({ message: 'User theme not found' });
    }
  } catch (error) {
    console.error("Ошибка при получении темы:", error);
    return res.status(500).json({ message: 'Error retrieving user theme' });
  }
};
