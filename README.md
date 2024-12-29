# Сайт для бронирования билетов в кинотеатр, с информационной системой для администрирования залов, сеансов и предварительного бронирования билетов.

### Стэк технологий, используемых в процессе работы над проектом.
> React, React Router, React Hooks, React-bootstrap, Bootstrap.<br>
> HTML, SCSS, TypeScript.<br>
> Vite, Figma. <br>
  
- [Страница на gh-pages](https://h1znt.github.io/Diploma-shfe/  "Ссылка на сайт")
  
- [Макет страниц в Figma](https://www.figma.com/file/zGf2lm7mUBGeXWlZQyf9LH/%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD-%D0%BC%D0%B0%D0%BA%D0%B5%D1%82-(1)?type=design&mode=design "Макет страницы в Figma")
 
### Описание проекта


- сайт бронирования билетов онлайн,
- административная часть сайта.

#### 1. Сущности

- **Кинозал** – помещение, в котором демонстрируются фильмы. Режим работы определяется расписанием на день. Зал — прямоугольный, состоит из `N*M` различных зрительских мест.

- **Зрительское место** – место в кинозале. Зрительские места могут быть VIP и обычные.

- **Фильм** – информация о фильме заполняется администратором. Фильм связан с сеансом в кинозале.

- **Сеанс** – это временной промежуток, в котором в кинозале будет показываться фильм. На сеанс могут быть забронированы билеты.

- **Билет**  – QR-код c уникальным кодом бронирования, в котором обязательно указаны: Дата, Время, Название фильма, Зал, Ряд, Место, Стоимость, Фраза _"Билет действителен строго на свой сеанс"_.

#### 2. Роли пользователей системы

-   Гость — неавторизованный посетитель сайта.
-   Администратор — авторизованный пользователь.

#### 3. Возможности гостя
-   Просмотр расписания
-   Просмотр информации о фильмах
-   Выбор места в кинозале
-   Бронирование билета

#### 4. Возможности администратора
-   Создание или редактирование залов.
-   Создание или редактирование списка фильмов.
-   Настройка цен.
-   Создание или редактирование расписания сеансов фильмов.

