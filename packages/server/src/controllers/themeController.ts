// import { Request, Response } from 'express';
// import { sequelize } from '../db';
// //import { UserTheme } from '../database/models/UserTheme';
// //import { SiteTheme } from '../database/models/SiteTheme';


// export const updateUserTheme = async (req: Request, res: Response) => {
//   try {
//     const userId = Number(req.params.userId);
//     const themeId = String(req.body.theme);

//     console.log({
//       userId,
//       themeId
//     })
//     // if (isNaN(userId) || isNaN(themeId)) {
//     //   return res.status(400).json({ message: 'Invalid userId or themeId' });
//     // }

//     const SiteTheme = sequelize.models.SiteTheme;
//     const User = sequelize.models.User;

//     // const theme = await SiteTheme.findByPk(themeId);
//     const theme = await SiteTheme.findOne( {where: { theme: themeId }});

//     if (!theme) {
//       return res.status(404).json({ message: 'Theme not found' });
//     }

//     const UserTheme = sequelize.models.UserTheme;

//     let userTheme = await UserTheme.findOne({ where: { ownerId: userId } });

//     if (userTheme) {
//       (userTheme as any).themeId = (theme as any).id;
//       await userTheme.save();
//       return res.json({ message: 'Theme updated successfully' });
//     } else {

//       let user = await User.findOne({ where: { id: userId } });

//       console.log(user);

//       if (!user) {
//         await User.create({
//           id: userId,
//           authMethod: 'global',
//           name: 'foo',
//         });
//       }
      
//       await UserTheme.create({
//         ownerId: userId,
//         themeId: (theme as any).id,
//       });
//       return res.status(201).json({ message: 'Theme created successfully' });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ message: 'Error updating user theme' });
//   }
// };

// export const getUserTheme = async (req: Request, res: Response) => {
//   const SiteTheme = sequelize.models.SiteTheme;
//   const UserTheme = sequelize.models.UserTheme;

//   console.log("Получен запрос на тему пользователя:", req.params.userId);

//   console.log("Доступные модели:", Object.keys(sequelize.models));
//   console.log("UserTheme из импорта:", UserTheme);
//   console.log("UserTheme в моделях:", sequelize.models.UserTheme);

//   try {
//     // Явная проверка модели
//     if (!sequelize.models.UserTheme) {
//       console.error("Модель UserTheme не инициализирована!");
//       return res.status(500).json({ message: 'Model not initialized' });
//     }
    
//     const userId = Number(req.params.userId);

//     if (isNaN(userId)) {
//       console.log("Некорректный userId:", req.params.userId);
//       return res.status(400).json({ message: 'Invalid user ID' });
//     }

//     const userTheme = await UserTheme.findOne({
//       where: { ownerId: userId },
//       include: {
//         model: SiteTheme,
//         required: true,
//         as: 'theme'
//       },
//     });

//     console.log(JSON.stringify(userTheme, null, 2));

//     if (userTheme) {
//       console.log(userTheme.toJSON().theme);  // ID темы
//       console.log("Тема пользователя найдена:", userTheme.toJSON().theme);
//       return res.json({ theme: userTheme.toJSON().theme });
//     } else {
//       console.log("Тема пользователя не найдена");
//       return res.status(404).json({ message: 'User theme not found' });
//     }
//   } catch (error) {
//     console.error("Ошибка при получении темы:", error);
//     return res.status(500).json({ message: 'Error retrieving user theme' });
//   }
// };




import { Request, Response } from 'express';
import { sequelize } from '../db';

export const updateUserTheme = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const themeId = String(req.body.theme);
    // Получаем метод авторизации из запроса, если он есть, иначе используем 'global'
    const authMethod = req.body.authMethod || 'global';
    // Получаем имя пользователя, если оно есть в запросе
    const userName = req.body.userName || 'user';

    console.log({
      userId,
      themeId,
      authMethod,
      userName
    });

    const SiteTheme = sequelize.models.SiteTheme;
    const User = sequelize.models.User;

    // Поиск темы по имени
    const theme = await SiteTheme.findOne({ where: { theme: themeId }});

    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' });
    }

    const UserTheme = sequelize.models.UserTheme;

    // Проверяем, есть ли у пользователя уже тема
    let userTheme = await UserTheme.findOne({ where: { ownerId: userId } });

    if (userTheme) {
      // Обновляем существующую тему
      (userTheme as any).themeId = (theme as any).id;
      await userTheme.save();
      return res.json({ message: 'Theme updated successfully' });
    } else {
      // У пользователя еще нет темы, проверяем существует ли пользователь
      let user = await User.findOne({ where: { id: userId } });

      // Если пользователя нет в базе данных, создаем его
      if (!user) {
        user = await User.create({
          id: userId,
          authMethod: authMethod, // Используем переданный метод авторизации
          name: userName, // Используем переданное имя пользователя
        });
      }
      
      // Создаем запись темы пользователя
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
    // Проверка существования модели
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
      // Если пользователь существует, но у него нет темы
      console.log("Тема пользователя не найдена");
      return res.status(404).json({ message: 'User theme not found' });
    }
  } catch (error) {
    console.error("Ошибка при получении темы:", error);
    return res.status(500).json({ message: 'Error retrieving user theme' });
  }
};