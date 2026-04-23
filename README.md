# EMR Frontend

Фронтенд системы ЭМК (электронной медкарты) на Vue 3, Vue Router, Pinia, TanStack Query, Axios, Tailwind и DaisyUI.

## Что реализовано

### Аутентификация и доступ

- Вход по логину/паролю (`POST /api/v1/auth/login`)
- Сохранение токена и роли в localStorage
- Route guards по авторизации и роли (`admin`, `doctor`, `patient`)
- Автоперенаправление на соответствующий дашборд после входа

### Администратор

- Добавление врача (`POST /api/v1/admin/doctors`)
- Добавление пациента (`POST /api/v1/admin/patients`)
- Экран активности с отображением добавленных врачей и пациентов в текущей сессии

### Врач

- Список закрепленных пациентов (`GET /api/v1/doctors/me/patients`)
- Список доступных пациентов (`GET /api/v1/doctors/me/patients/available`)
- Прикрепление пациента (`POST /api/v1/doctors/me/patients/{patient_id}/assign`)
- Просмотр карты выбранного пациента (`GET /api/v1/doctors/me/patients/{patient_id}`)
- Добавление медзаписи (`POST /api/v1/doctors/me/patients/{patient_id}/medical-records`)
- Добавление рецепта (`POST /api/v1/doctors/me/patients/{patient_id}/prescriptions`)

### Пациент

- Просмотр своей карты (`GET /api/v1/patients/me`)
- Обновление контактных данных (`PATCH /api/v1/patients/me`)
- Просмотр истории медзаписей и рецептов

## Вложенные маршруты (Nested Routes)

- `/admin`
  - `/admin/doctors`
  - `/admin/patients`
  - `/admin/activity`
- `/doctor`
  - `/doctor/patients`
  - `/doctor/care`
- `/patient`
  - `/patient/profile`
  - `/patient/history`

## UI и тема

- Интерфейс переведен на русский язык
- Добавлена кастомная тема DaisyUI 
- Обновлены цвета `primary/secondary/accent/base` и состояния `success/error/warning`
- Улучшена визуальная структура карточек/табов/форм для desktop и mobile

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

## Docker

```bash
docker build -t spda-frontend .
docker run --rm -p 8080:80 spda-frontend
```

После запуска приложение доступно на `http://localhost:8080`.
