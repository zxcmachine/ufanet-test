# Ufanet Test (ufanet-test)

ufanet

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).


# Задача
Реализовать приложение для управления заметками пользователя

## Функциональные требования
- В качестве фреймворка/библиотеки компонентов использовать quasar/bootstrap-vue
- Экран аутентификации
  - Аутентификация по логину/паролю
- Авторизованный доступ к ресурсам
  - В случае отсутствия/инвалидации токена авторизации перенаправлять на экран аутентификации
- Ролевой доступ к ресурсам
  - Доступные роли: user, admin
    - user имеет права на управление заметками, не должен видеть и переходить на экран управления пользователями
    - admin имеет все права
- Управление заметками пользователя
  - Список заметок
  - Добавление заметки
  - Редактирование заметки
  - Удаление заметки
- Управление пользователями
  - Список пользователей
  - Регистрация пользователя
  - Активация пользователя
  - Деактивация пользователя
  - Смена роли пользователя
  - Удаление пользователя

## API

### Аутентификация

POST /todo/public/api/v1/auth/login
{
	"login": string,
	"password": string
}

200 OK
{
	error: boolean,
	message: string,
	data: {
		"token": string
	}
}

401 Unauthorized
{
	error: boolean,
	message: string,
	data: null
}

----

POST /todo/public/api/v1/auth/logout

200OK
{
	error: boolean,
	message: string,
	data: null
}

### Управление заметками

1. Список заметок

GET /todo/public/api/v1/notes

200 OK
{
	error: boolean,
	message: string,
	data: [{
		"id": number,
		"title": string,
		"message": string
	}]
}

401 Unauthorized
{
	error: boolean,
	message: string,
	data: null
}

403 Forbidden
{
	error: boolean,
	message: string,
	data: null
}

2. Добавление заметки

POST /todo/public/api/v1/notes

{
	"title": string,
	"message": string
}

200 OK
{
	error: boolean,
	message: string,
	data: [{
		"id": number,
		"title": string,
		"message": string
	}]
}

401 Unauthorized
{
	error: boolean,
	message: string,
	data: null
}

403 Forbidden
{
	error: boolean,
	message: string,
	data: null
}

3. Редактирование заметки

PUT /todo/public/api/v1/notes/{id}

{
	"title": string,
	"message": string
}

200 OK
{
	error: boolean,
	message: string,
	data: [{
		"id": number,
		"title": string,
		"message": string
	}]
}

401 Unauthorized
{
	error: boolean,
	message: string,
	data: null
}

403 Forbidden
{
	error: boolean,
	message: string,
	data: null
}

4. Удаление заметки

DELETE /todo/public/api/v1/notes/{id}

200 OK
{
	error: boolean,
	message: string,
	data: null
}

401 Unauthorized
{
	error: boolean,
	message: string,
	data: null
}

403 Forbidden
{
	error: boolean,
	message: string,
	data: null
}

### Управление пользователями

1. Список пользователей

GET /todo/public/api/v1/users

200 OK
{
	error: boolean,
	message: string,
	data: [{
		"id": number,
		"title": string,
		"role": string,
		"active": boolean
	}]
}

401 Unauthorized
{
	error: boolean,
	message: string,
	data: null
}

403 Forbidden
{
	error: boolean,
	message: string,
	data: null
}

2. Регистрация пользователя

POST /todo/public/api/v1/users

{
	"title": string
}

200 OK
{
	error: boolean,
	message: string,
	data: [{
		"id": number,
		"title": string,
		"role": string,
		"active": boolean
	}]
}

401 Unauthorized
{
	error: boolean,
	message: string,
	data: null
}

403 Forbidden
{
	error: boolean,
	message: string,
	data: null
}

3. Активация/деактивация пользователя

PATCH /todo/public/api/v1/users/{id}/active

{
	"active": boolean
}

200 OK
{
	error: boolean,
	message: string,
	data: [{
		"id": number,
		"title": string,
		"role": string,
		"active": boolean
	}]
}

401 Unauthorized
{
	error: boolean,
	message: string,
	data: null
}

403 Forbidden
{
	error: boolean,
	message: string,
	data: null
}

4. Смена роли пользователя

PATCH /todo/public/api/v1/users/{id}/role

{
	"role": string
}

200 OK
{
	error: boolean,
	message: string,
	data: [{
		"id": number,
		"title": string,
		"role": string,
		"active": boolean
	}]
}

401 Unauthorized
{
	error: boolean,
	message: string,
	data: null
}

403 Forbidden
{
	error: boolean,
	message: string,
	data: null
}

4. Удаление пользователя

DELETE /todo/public/api/v1/users/{id}

200 OK
{
	error: boolean,
	message: string,
	data: null
}

401 Unauthorized
{
	error: boolean,
	message: string,
	data: null
}

403 Forbidden
{
	error: boolean,
	message: string,
	data: null
}



















