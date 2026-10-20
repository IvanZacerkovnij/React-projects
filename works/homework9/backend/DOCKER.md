# Docker

Потрібен Docker Desktop. З папки `backend`:

```sh
docker compose up -d --build
```

Compose запускає три контейнери:

- `db` — SQL Server 2022 Developer із постійним томом для даних.
- `initialize-database` — чекає готовності SQL Server, створює базу `homework9`
  і таблиці через EF Core `EnsureCreated`, після чого завершує роботу з кодом 0.
- `api` — ASP.NET Core API, запускається після успішного створення бази.

API: http://localhost:5099/api/v1/health.
Фронт продовжує працювати через `npm run dev`, його проксі вже налаштоване на 5099.
Перед запуском контейнера зупиніть локальний `dotnet run` на цьому порту.

SQL Server з комп’ютера: `localhost,1439`, база `homework9`, користувач `sa`,
пароль `Homework9_Local!2026`. База окрема від домашньої роботи 8, дані з неї
не переносяться. На Apple Silicon SQL Server працює через емуляцію `linux/amd64`.

Ці стандартні пароль і JWT-ключ призначені лише для локальної домашньої роботи.
Для власних значень задайте `SQL_SERVER_PASSWORD` та `JWT_KEY` у середовищі
або в локальному `.env` перед першим запуском. JWT-ключ має містити не менше
32 байтів. Зміна пароля в налаштуваннях не змінює пароль у вже створеному томі.
User-secrets локального .NET у контейнери не передаються.

```sh
docker compose ps -a
docker compose logs api initialize-database
docker compose down
```

`down` зберігає дані. Повторний `up` не дублює таблиці та користувачів.
`EnsureCreated` не оновлює існуючу схему: для її зміни знадобляться міграції.
Список відкликаних JWT залишається в пам’яті API і очищається після перезапуску.
