# Signup/Login App — Inforce Backend Task

Просте REST API на Node.js/Express з JWT-автентифікацією та рольовим доступом (admin / user) до ресурсів `users` та `books`.

## Технічний стек

- **Node.js** + **Express**
- **MongoDB** (hosted, MongoDB Atlas) + **Mongoose**
- **JWT** (`jsonwebtoken`) — автентифікація
- **bcrypt** — хешування паролів
- **celebrate / Joi** — валідація вхідних даних
- **http-errors** — обробка помилок

## Встановлення та запуск

```bash
# 1. Встановити залежності
npm install

# 2. Створити .env файл у корені проєкту (див. розділ "Змінні середовища")

# 3. Запустити у dev-режимі
npm run dev
```

Сервер запускається на порту, вказаному в `.env` (за замовчуванням `3000`).

## Змінні середовища

Створи файл `.env` у корені проєкту зі змінними:

```dotenv
PORT=3000
MONGO_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=<довільний секретний рядок>
```

> ⚠️ Файл `.env` не комітиться в git (додано в `.gitignore`). Реальні значення передаються окремо.

## Моделі даних

**User**

```
{
  name: string,
  email: string,
  password: string,   // зберігається у захешованому вигляді (bcrypt)
  role: 'user' | 'admin'
}
```

**Book**

```
{
  name: string,
  author: string,
  pageCount: number
}
```

## Ролі та права доступу

| Дія                                                         | user | admin |
| ----------------------------------------------------------- | ---- | ----- |
| Перегляд списку книг / книги за id                          | ✅   | ✅    |
| Створення / редагування / видалення книги                   | ❌   | ✅    |
| Перегляд / створення / редагування / видалення користувачів | ❌   | ✅    |

Доступ до захищених роутів визначається через:

- **`authenticate`** middleware — перевіряє наявність і валідність JWT-токена (`Authorization: Bearer <token>`)
- **`authorize(['admin'])`** middleware — перевіряє роль користувача, отриману з токена

## Ендпоінти API

### Auth

| Метод | Роут      | Опис                                               | Доступ    |
| ----- | --------- | -------------------------------------------------- | --------- |
| POST  | `/signup` | Реєстрація нового користувача (роль завжди `user`) | публічний |
| POST  | `/login`  | Автентифікація, повертає JWT токен                 | публічний |

### Books

| Метод  | Роут         | Опис                 | Доступ      |
| ------ | ------------ | -------------------- | ----------- |
| GET    | `/books`     | Список книг          | user, admin |
| GET    | `/books/:id` | Отримати книгу за id | user, admin |
| POST   | `/books`     | Створити книгу       | admin       |
| PATCH  | `/books/:id` | Оновити книгу        | admin       |
| DELETE | `/books/:id` | Видалити книгу       | admin       |

### Users

| Метод  | Роут         | Опис                                      | Доступ |
| ------ | ------------ | ----------------------------------------- | ------ |
| GET    | `/users`     | Список користувачів (з пагінацією)        | admin  |
| GET    | `/users/:id` | Отримати користувача за id                | admin  |
| POST   | `/users`     | Створити користувача (можна вказати роль) | admin  |
| PATCH  | `/users/:id` | Оновити користувача                       | admin  |
| DELETE | `/users/:id` | Видалити користувача                      | admin  |

## Приклади запитів

**Signup**

```json
POST /signup
{
  "email": "user@mail.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Login**

```json
POST /login
{
  "email": "user@mail.com",
  "password": "password123"
}
```

Відповідь містить JWT токен:

```json
{
  "token": "eyJhbGciOi...",
  "user": { "_id": "...", "email": "...", "role": "user", ... }
}
```

Токен передається в наступних запитах у заголовку:

```
Authorization: Bearer <token>
```

## Обробка помилок

- Усі помилки повертаються у форматі `{ "message": "..." }` (для помилок бізнес-логіки) або з деталями валідації (для помилок celebrate/Joi)
- Невалідний формат `id` в параметрах роута повертає `400 Bad Request`
- Відсутній/невалідний токен → `401 Unauthorized`
- Недостатньо прав (роль) → `403 Forbidden`
- Ресурс не знайдено → `404 Not Found`
- Необроблені винятки та unhandled promise rejections логуються та не призводять до аварійного завершення процесу

## Тестування

У репозиторії є Postman-колекція (`*.postman_collection.json`) з готовими запитами та автоматичними тестами для перевірки:

- реєстрації/логіну
- доступу за ролями (user / admin) до `/books` та `/users`
- обробки некоректних id та відсутніх токенів

## Структура проєкту

```
src/
├── config/           # конфігурація (підключення до БД тощо)
├── controllers/      # логіка обробки запитів
├── db/               # підключення до MongoDB
├── middleware/        # authenticate, authorize, errorHandler, notFoundHandler, logger
├── models/           # Mongoose-схеми (User, Book)
├── routes/           # визначення роутів
├── validation/       # Joi-схеми валідації (celebrate)
└── server.js         # точка входу
```
