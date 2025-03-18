# Отчет по утечкам памяти
## Главная страница
### Загрузка страницы с нуля
![img.png](memoryLeaks/img.png)
### Нажатие кнопки начать играть
![img_1.png](memoryLeaks/img_1.png)
## Проифль
### Загрузка страницы с нуля
![img_4.png](memoryLeaks/img_4.png)
### Изменение данных
![img_5.png](memoryLeaks/img_5.png)
### Изменение пароля
![img_6.png](memoryLeaks/img_6.png)
### Изменение аватара
![img_7.png](memoryLeaks/img_7.png)
## Форум
### Загрузка страницы с нуля
![img_8.png](memoryLeaks/img_8.png)
### Создать топик
![img_10.png](memoryLeaks/img_10.png)
### Открытие топика
![img_9.png](memoryLeaks/img_9.png)
## Лидерборд
### Загрузка страницы с нуля(Здесь почему-то не успевает очистить мусор за 5 секунд)
![img_11.png](memoryLeaks/img_11.png)
### В простое
![img_12.png](memoryLeaks/img_12.png)
И здесь уже 8,5МБ памяти, но есть скачки-_-
## Переход на страницу лидерборда
![img_13.png](memoryLeaks/img_13.png)
И тут уже всё ок
## Выход из аккаунта
![img_2.png](memoryLeaks/img_2.png)
## Вход через логин + пароль
![img_3.png](memoryLeaks/img_3.png)
### Игра
## Первая часть(70сек)
Скачки обусловлены частыми ререндерами, 
но в целом память почти не растёт
![img_14.png](memoryLeaks/img_14.png)
## Вторая часть(90сек)
![img_15.png](memoryLeaks/img_15.png)
## Конец игры
![img_16.png](memoryLeaks/img_16.png)

В целом утечек нету