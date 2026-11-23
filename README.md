# 🏂 PROBOARD SHOP — Headless E-Commerce & Dropshipping Storefront

![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Shopify](https://img.shields.io/badge/Shopify-Storefront_API-95BF47?style=for-the-badge&logo=shopify)
![Vercel](https://img.shields.io/badge/Vercel-Production_Live-black?style=for-the-badge&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)

> **Високопродуктивний інтернет-магазин бордспорту та дропшипінгу нового покоління, створений на базі Next.js 14, TypeScript та Shopify Storefront GraphQL API за зразком провідного магазину Proboardshop.**

🔗 **Живе демо (Vercel Edge):** [https://shopify-store-nine-nu.vercel.app](https://shopify-store-nine-nu.vercel.app)  
☁️ **Живий сервер (Oracle Cloud Dedicated VPS + Nginx + PM2):** [https://findarticles-striking-partners-control.trycloudflare.com](https://findarticles-striking-partners-control.trycloudflare.com)  
📊 **Адмін-панель замовлень (CRM):** [https://shopify-store-nine-nu.vercel.app/admin](https://shopify-store-nine-nu.vercel.app/admin)  
📦 **Трекінг посилок для клієнтів:** [https://shopify-store-nine-nu.vercel.app/track-order](https://shopify-store-nine-nu.vercel.app/track-order)

---

## 📸 Галерея проєкту

| Головна сторінка & Hero | Картка товару (PDP) з характеристиками |
| :---: | :---: |
| ![Homepage](portfolio/01_proboard_homepage_hero.png) | ![Snowboard Detail](portfolio/02_proboard_snowboard_nitro.png) |

| Burton Custom Flying V & Огляди | Оптика Anon M4 Magna-Tech |
| :---: | :---: |
| ![Burton Custom](portfolio/03_proboard_burton_custom.png) | ![Anon Optics](portfolio/04_proboard_anon_optics.png) |

| Інтерактивний трекінг посилки | CRM Панель керування замовленнями |
| :---: | :---: |
| ![Track Order](portfolio/05_proboard_track_order.png) | ![Admin CRM](portfolio/06_proboard_admin_crm.png) |

---

## ⚡ Ключові можливості та архітектура

### 1. 🏂 Спеціалізований каталог екстремального спорядження
* **Провідні світові бренди:** *Nitro, Burton, Capita, Union, ThirtyTwo, Santa Cruz, Anon, Oakley, Montec*.
* **Категорії:** Сноуборди, Скейтборди, Кріплення & Черевики, Оптика & Маски, Шоломи & Захист, Анораки & Одяг, Сервіс & Парафін.
* **Технічні мікро-бейджи:** відображення індексу жорсткості (`Flex: 8/10`), форми (`Directional Twin`, `True Twin`), прогину (`Trüe Camber`, `Flying V`), мембрани (`20,000 mm`) та технологій захисту (`MIPS`).

### 2. 📏 Онлайн-калькулятор підбору ростовки (`BoardSizeCalculatorModal`)
* Інтерактивний алгоритм для сноубордистів:
  * Враховує вагу, зріст, стиль катання (*All-Mountain*, *Park/Freestyle*, *Freeride/Powder*), рівень катання та розмір ноги.
  * Розраховує діапазон довжини в сантиметрах (наприклад, `156 – 160 см`).
  * Виявляє потребу у версії **WIDE (W)** для взуття 44.5+ EU для запобігання чіплянню схилу носками.
  * Рекомендує оптимальний індекс Flex та форму прогину з можливістю застосувати фільтр до каталогу.

### 3. ⚡ 1-Click Checkout з месенджер-маршрутизацією
* Форма оформлення замовлення за 10 секунд без реєстрації.
* Вибір зручного каналу зв'язку: **Telegram**, **Viber** або телефонний дзвінок менеджера.
* Введення міста та відділення / поштомату **Нової Пошти**.
* Підтримка оплати при отриманні (**Накладений платіж COD**) та онлайн-еквайрингу.

### 4. 📊 Вбудована CRM-панель замовлень (`/admin`)
* Реальний REST API (`/api/orders`) для обробки замовлень.
* Зміна життєвого циклу статусу: `Новий` ➔ `В обробці` ➔ `Відправлено` ➔ `Виконано`.
* Метрики продажів: загальна виручка, середній чек, кількість замовлень.
* Кнопки швидкого дзвінка та відкриття чату в Telegram.
* Налаштування Telegram Webhook для миттєвих сповіщень про нові ліди.

### 5. 📦 Інтерактивний трекінг замовлень (`/track-order`)
* Клієнт може ввести номер замовлення (`ORD-...`) або номер телефону.
* 4-кроковий візуальний прогрес-бар від підтвердження до отримання у відділенні Нової Пошти.

### 6. 💱 Мультивалютний рушій
* Миттєвий перерахунок цін між **UAH (₴)**, **USD ($)**, **EUR (€)** та **GBP (£)** у реальному часі.

### 7. 🎁 Комплекти зі знижкою (Frequently Bought Together)
* Крос-сейл блоки на сторінці товару (наприклад, Сноуборд + Кріплення Union зі знижкою -15%).

---

## 🛠️ Стек технологій

| Сфера | Технології |
| :--- | :--- |
| **Фронтенд** | Next.js 14 (App Router, Server & Client Components), React 18, TypeScript |
| **Стилізація** | Tailwind CSS, Lucide React Icons |
| **Електронна комерція** | Shopify Storefront GraphQL API (v2026-10) + Cart API (`cartCreate`) + Fallback Catalog |
| **Бекенд / API** | Next.js Route Handlers (`/api/orders`), Atomic Write Queue, x-admin-key Auth |
| **Безпека** | HTML Sanitization (XSS guard), API Key Middleware/Gate, Whitelisted Statuses |
| **SEO & Продуктивність** | Dynamic Metadata, OpenGraph, `sitemap.xml`, `robots.txt` |
| **Деплой & Хостинг** | Oracle Cloud VPS (Ubuntu 22.04 + PM2 + Nginx + Cloudflare Tunnel) |

---

## 🚀 Швидкий запуск проєкту локально

### 1. Клонування репозиторію
```bash
git clone https://github.com/DudarDev/proboard-shop.git
cd proboard-shop
```

### 2. Встановлення залежностей
```bash
npm install
```

### 3. Конфігурація змінних оточення
Створіть файл `.env.local` на основі `.env.local.example`:
```bash
cp .env.local.example .env.local
```

| Змінна | Обов'язкова | Опис |
| :--- | :---: | :--- |
| `ADMIN_API_KEY` | **Так (для CRM)** | Секретний ключ для захисту `GET/PATCH /api/orders` та входу в панель `/admin`. Передається клієнтом у заголовку `x-admin-key`. |
| `NEXT_PUBLIC_SHOPIFY_API_VERSION` | Ні | Версія Storefront API (за замовчуванням `2026-10`). |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Ні | Домен вашого Shopify-магазину (наприклад, `my-shop.myshopify.com`). Якщо порожньо — працює Demo Mode. |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Ні | Публічний Storefront Access Token із додатку Shopify. |
| `TELEGRAM_BOT_TOKEN` | Ні | Токен Telegram-бота для надсилання сповіщень про нові замовлення. |
| `TELEGRAM_CHAT_ID` | Ні | Chat ID для отримання сповіщень у Telegram. |

### 4. Запуск у режимі розробки
```bash
npm run dev
```
Відкрийте [http://localhost:3000](http://localhost:3000) у вашому браузері.

### 5. Збірка для продакшену
```bash
npm run build
npm run start
```

---

## 🔑 Підключення до реального магазину Shopify та Cart API

Проєкт підтримує два режими:
1. **Автономний демо-режим (за замовчуванням):** повний каталог автентичного бордспорту (Capita, Burton, Lib Tech тощо) з локальною обробкою замовлень у CRM та симуляцією чекауту.
2. **Shopify Live Storefront:**
   * Вкажіть змінні у файлі `.env.local`:
     ```env
     NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN="your-shop-name.myshopify.com"
     NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN="your_storefront_access_token"
     NEXT_PUBLIC_SHOPIFY_API_VERSION="2026-10"
     ```
   * Або скористайтеся модальним вікном налаштувань прямо в інтерфейсі (кнопка в футері сайту) — воно містить автоматичний тест валідності ключів через `testShopifyConnection()`.
   * При оформленні замовлення через кошик (`CartDrawer`) викликається мутація `cartCreate` Storefront API, яка повертає захищений `checkoutUrl` і редіректить покупця безпосередньо на офіційний платіжний шлюз Shopify.

---

## 👨‍💻 Розробник & Портфоліо

Розроблено як high-ticket демонстраційний проєкт для портфоліо e-commerce розробки.

* **GitHub:** [@DudarDev](https://github.com/DudarDev)
* **Live Store:** [https://shopify-store-nine-nu.vercel.app](https://shopify-store-nine-nu.vercel.app)
* **Категорія:** Headless Shopify / Full-Stack Next.js E-Commerce / Dropshipping Platform

---

## 📄 Ліцензія
MIT License © 2026 PROBOARD SHOP / DudarDev
