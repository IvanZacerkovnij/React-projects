# Запуск бекенду

Потрібен запущений Docker Desktop. З цієї папки виконайте:

```sh
docker compose up -d --build
```

Compose запускає SQL Server 2022 Developer, чекає готовності БД,
застосовує всі наявні EF Core міграції до бази `store`, завантажує тестові дані
через `seed-demo.sql` і запускає API. Повторний запуск не дублює тестові записи.
На Apple Silicon SQL Server працює через емуляцію `linux/amd64`.

- Swagger: http://localhost:5097/swagger
- API: http://localhost:5097/api/v1
- БД з комп'ютера: `localhost,1438`, користувач `sa`, пароль `Homework8_Local!2026`.

Це локальні облікові дані для розробки. Пароль можна задати через
`SQL_SERVER_PASSWORD` у файлі `.env` перед першим запуском БД.
Зміна змінної не змінює пароль у вже створеному томі.

Перевірка стану та міграцій:

```sh
docker compose ps -a
docker compose logs migrations
docker compose logs seed
docker compose logs api
```

Зупинка зі збереженням БД і завантажених зображень:

```sh
docker compose down
```

Після додавання нових міграцій повторіть `docker compose up -d --build`.
