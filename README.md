# ATELIER — Headless Shopify Storefront (Next.js 14)

Высокопроизводительный Headless-магазин для Shopify, созданный на современном стеке: **Next.js 14 (App Router)**, **Tailwind CSS**, **TypeScript** и **Shopify Storefront API**.

---

## 🚀 Ключевые возможности

- ⚡ **Молниеносный отклик**: SSR/SSG рендеринг и оптимизация изображений на стороне Next.js.
- 🛍️ **Shopify Storefront API**: Поддержка живых GraphQL-запросов к каталогу и чекауту Shopify.
- 🎨 **Современный UI**:
  - Адаптивный каталог с мгновенным поиском и фильтрацией по категориям.
  - Быстрый просмотр товаров (Quick View Modal) с переключением вариантов и галереей.
  - Выдвижная корзина (Slide-over drawer) с расчетом бесплатной доставки и промокодами.
- 🔄 **Два режима работы**:
  - **Demo Mode**: Работает из коробки на публичном API Shopify (Mock.shop) без необходимости настраивать магазин прямо сейчас.
  - **Live Storefront Mode**: Мгновенное переключение на ваш реальный Shopify-магазин прямо через модальное окно настроек в UI или через `.env.local`.

---

## 🛠️ Запуск проекта

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск локального сервера разработки
```bash
npm run dev
```
Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### 3. Сборка для продакшена
```bash
npm run build
npm run start
```

---

## 🔑 Подключение вашего реального магазина Shopify

### Способ 1: Через графический интерфейс (UI)
1. Нажмите на статус-индикатор **Shopify Mock API** в правом верхнем углу шапки сайта.
2. Введите ваш **Shopify Store Domain** (например, `my-brand.myshopify.com`) и **Storefront API Access Token**.
3. Нажмите **Сохранить подключение**.

### Способ 2: Через файл `.env.local`
Создайте файл `.env.local` в корне проекта:
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN="your-store-name.myshopify.com"
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN="shpat_xxxxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_SHOPIFY_API_VERSION="2024-01"
```

#### Как получить Storefront API Access Token в Shopify:
1. Войдите в панель **Shopify Admin**.
2. Перейдите в **Settings** (Настройки) → **Apps and sales channels**.
3. Нажмите **Develop apps** → **Create an app**.
4. В разделе **Configuration** настройте доступ к **Storefront API** (включите чтение товаров, корзин, чекаута).
5. Перейдите в **API credentials** и скопируйте **Storefront API access token**.

---

## 🌐 Деплой в продакшен

Проект готов к деплою в один клик:
- **Vercel**: `vercel deploy` (рекомендуется)
- **Netlify**: `netlify deploy`
- **Shopify Oxygen**: официальный хостинг Shopify для headless приложений
