# Сонцестояння — Galaktica зустрічає своє коріння

Статичний landing-запрошення на корпоративну подію в Карпатах (14–16 серпня, Східниця).

Стек: Vite · React · TypeScript · Tailwind CSS 4 · Motion (Framer Motion) · Lucide Icons.

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # прод-збірка в dist/
npm run preview  # перегляд прод-збірки
```

## Зображення

Сайт працює й без фото (показує стильні плейсхолдери з підказкою, який файл покласти).
Щоб фото зʼявились — просто покладіть файли з такими іменами:

```
public/images/hero/IMG_0001.webp         # слайдшоу hero — список файлів у src/data/hero.ts
public/images/inspiration/look-01.jpg    # ... look-01 … look-12 — галерея натхнення
public/images/hosts/andriy-vos.jpg       # Андрій ВОС
public/images/hosts/kolya-kapishon.jpg   # Коля Капішон
public/images/hosts/dj.jpg               # DJ
```

Фото для hero перелічені у `src/data/hero.ts` — додайте/приберіть шляхи там.
Великі фото краще стискати до ~1600px (наприклад `magick photo.webp -resize '1600x1600>' -quality 80 out.webp`).

Підписи галереї — у `src/data/gallery.ts`, картки ведучих (імена, описи, instagram) — у `src/data/people.ts`, тексти й програма — у `src/data/event.ts`.

## Деплой

Пуш у `main` автоматично збирає та деплоїть сайт на GitHub Pages
(workflow `.github/workflows/deploy.yml`). Кастомний домен: `sontsestoyannya.dvocorp.com`
(файл `public/CNAME`).

Одноразове налаштування в репозиторії:

1. **Settings → Pages → Source: GitHub Actions**
2. **Settings → Pages → Custom domain:** `sontsestoyannya.dvocorp.com`, після перевірки увімкнути **Enforce HTTPS**

DNS: CNAME-запис `sontsestoyannya` → `host-0123.github.io`
