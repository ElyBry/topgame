import { Request, Response, NextFunction } from 'express';

function containsDangerousChars(text: string): boolean {
  const dangerousChars = /[&<>"']/;
  return dangerousChars.test(text);
}

function checkForDangerousInput<T>(input: T, path: string = ''): void {
  if (typeof input === 'string') {
    if (containsDangerousChars(input)) {
      throw new Error(`Обнаружены опасные символы в поле ${path || 'входные данные'}`);
    }
  }
  else if (Array.isArray(input)) {
    input.forEach((item, index) => {
      checkForDangerousInput(item, `${path}[${index}]`);
    });
  }
  else if (typeof input === 'object' && input !== null) {
    for (const key in input) {
      checkForDangerousInput(input[key], path ? `${path}.${key}` : key);
    }
  }
}

export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body) {
      checkForDangerousInput(req.body);
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        error: 'Некорректные данные',
        message: error.message,
        details: {
          field: error.message.split('в поле ')[1] || null,
          rule: 'Запрещены символы &, <, >, ", \''
        }
      });
    } else {
      res.status(500).json({ error: 'Неизвестная ошибка'})
    }
  }
};