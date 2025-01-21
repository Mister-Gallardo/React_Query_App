# React Query + React + TypeScript

Это проект, созданный с использованием React, TypeScript и библиотеки React Query для управления состоянием и запросами к СОБСТВЕННОМУ API (https://mockapi.io/projects). Проект демонстрирует использование различных подходов к выполнению запросов и мутаций данных.

### Описание файлов

- **store/useQuery/**: Директория, содержащая компоненты для выполнения запросов к API.
  - **EasyQuery.tsx**: Простой пример использования useQuery для получения данных.
  - **NormalQuery.tsx**: Более сложный пример использования useQuery с дополнительными параметрами.

- **store/useMutation/**: Директория, содержащая компоненты для выполнения мутаций данных.
  - **EasyMutation.tsx**: Простой пример использования useMutation для отправки данных на сервер.
  - **NormalMutation.tsx**: Более сложный пример использования useMutation с обработкой состояния загрузки и ошибок.

- **store/QueryAndMutation.tsx**: Компонент, который объединяет функциональность запросов и мутаций, демонстрируя взаимодействие между ними.

- **App.tsx**: Основной компонент приложения, который рендерит другие компоненты.

- **main.tsx**: Точка входа в приложение, где происходит рендеринг App.

## Установка

1. Клонируйте репозиторий:
```bash
   [git clone https://github.com/Mister-Gallardo/React_Query_App.git](https://github.com/Mister-Gallardo/React_Query_App.git)
```   

2. Перейдите в директорию проекта:
```bash
   cd ваш_репозиторий
```

3. Установите зависимости:
```bash
   npm install
```
   
4. Запустите приложение:
```bash
   npm run dev
```   

## Использование

Проект демонстрирует использование React Query для работы с API. Вы можете изучить примеры в директориях useQuery и useMutation, чтобы понять, как выполнять запросы и мутации данных.
