# Quas: справочник

Runtime-движок утилитных классов в стиле Tailwind. Сборки нет: движок сканирует DOM, генерирует CSS «на лету» и держит его в `<style id="q-css-utilities">`.
Здесь собрано то, что нужно в 90% случаев. Всё проверено по исходнику движка.

<a id="toc"></a>

## Оглавление

| Раздел | Что внутри |
|---|---|
| [Быстрый старт](#quickstart) | Подключение, принципы работы |
| [Настройка](#config) | Опции `window.Quas`, совместимость с `tailwind.config` |
| [Синтаксис классов](#syntax) | Числа, дроби, `[произвольные]`, `!important`, `-negative`, `/opacity` |
| [Адаптивная вёрстка](#responsive) | Брейкпоинты, `max-*`, media-варианты, `container` |
| [Состояния и варианты](#variants) | `hover:`, `focus:`, `group-*`, `peer-*`, `data-[]`, `[&>p]:` |
| [Отображение и позиционирование](#display) | `block`, `hidden`, `absolute`, `inset`, `z`, `overflow` |
| [Flexbox](#flex) | `flex`, `justify-*`, `items-*`, `gap`, `grow`, `basis` |
| [Grid](#grid) | `grid-cols-*`, `col-span-*`, `place-*` |
| [Отступы](#spacing) | `p-*`, `m-*`, `space-*`, шкала значений |
| [Размеры](#sizing) | `w-*`, `h-*`, `size-*`, `min/max`, `aspect` |
| [Типографика](#typography) | Размеры, начертание, выравнивание, `truncate`, `line-clamp` |
| [Цвета](#colors) | Палитра, семантические цвета, прозрачность, где применимы |
| [Фоны и градиенты](#backgrounds) | `bg-*`, `bg-gradient-to-*`, `from/via/to` |
| [Границы, скругления, обводка](#borders) | `border`, `rounded`, `ring`, `outline`, `divide` |
| [Тени и эффекты](#effects) | `shadow`, `opacity`, `blur`, `backdrop-*`, `mix-blend` |
| [Трансформации, переходы, анимации](#transforms) | `translate`, `scale`, `transition`, `duration`, `animate-*` |
| [Интерактивность и скролл](#interactivity) | `cursor`, `select`, `pointer-events`, `snap`, `sr-only` |
| [Таблицы, списки, SVG](#misc) | `table-*`, `list-*`, `fill`, `stroke` |
| [Тёмная тема](#darkmode) | Класс `dark`, `dark:`, тема через CSS-переменные |
| [Тег css и scoped-стили](#csstag) | `<css>`, `&`, префиксы на уровне строки |
| [Расширение и JS API](#extend) | `cssExtensions`, `Q.css`, `Q.scan`, `Q.processClasses` |
| [Частые ошибки и ограничения](#pitfalls) | Что не работает и почему |

---

<a id="quickstart"></a>

## Быстрый старт

```html
<script src="https://cdn.jsdelivr.net/gh/wemmbley/quas@master/Source/quas.js"></script>

<div class="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:p-6 dark:bg-gray-900">
  Привет
</div>
```

Альтернативный вариант, если хотим избавиться от миганий.
Работает с localStorage, по ключу `theme`. Реализация на Вас.
```html 
```html
<!-- Тема: класс .dark ставим до первой отрисовки, чтобы не мигало -->
<script>try { const t = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');document.documentElement.classList.toggle('dark', t === 'dark');document.documentElement.style.colorScheme = t;} catch (e) {}</script>
<!-- Конфиг Quas (до quas.js). Важно: именно window.Quas, а не window.Q -->
<script>window.Quas = { AutoDarkMode: false };</script>
<script src="https://cdn.jsdelivr.net/gh/wemmbley/quas@master/Source/quas.js"></script>

<div class="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:p-6 dark:bg-gray-900">
  Привет
</div>
```
```

| Принцип | Что значит |
|---|---|
| Runtime | Классы из DOM собираются при загрузке и дальше отслеживаются через `MutationObserver` (добавление узлов, смена атрибута `class`). Динамические классы из JS работают |
| Игнор обычных классов | `card`, `modal` и подобные молча пропускаются. Для классов, похожих на утилиту, но неверных, в консоль идёт предупреждение |
| Порядок не важен | Порядок классов в атрибуте не влияет. Побеждает более специфичная утилита (`px` над `p`), а вариант выигрывает у базы (`md:` над обычным) |
| Шкала | Число `n` = `n × 0.25rem` (`p-4` = `1rem` = 16px) |
| Preflight | В комплекте сброс стилей: `margin/padding: 0`, `box-sizing: border-box`, `border: 0 solid`, ссылки наследуют цвет и без подчёркивания, заголовки без размера и веса, списки без маркеров, `img/svg/video` в `display: block` |
| Transitions при старте | До первого кадра все transitions отключены, чтобы не было «дёрганья» |

[↑ К оглавлению](#toc)

---

<a id="config"></a>

## Настройка

Объект `window.Quas` объявляется до подключения `quas.js`.

| Опция | По умолчанию | Описание |
|---|---|---|
| `AutoDarkMode` | `true` | Автоматически ставит и снимает класс `dark` на `<html>` по системной теме. Для ручного переключателя ставьте `false` |
| `CSSClassMode` | `true` | Сканирование классов и observer. При `false` классы обрабатываются только вручную (`Q.scan`, `Q.processClasses`) |
| `CSSTagMode` | `true` | Обработка тегов `<css>`. Если не используете, ставьте `false` |
| `CSSWarnings` | `true` | `false` отключает предупреждения. Можно передать функцию `(token, message) => boolean` для фильтрации |
| `CSSPerformance` | `true` | Логировать статистику в `console.debug`. В проде лучше `false` |
| `CleanDOM` | `true` | `<css>` заменяется пустым комментарием. При `false` тег остаётся скрытым (`hidden`) |
| `CSSNonce` | из `<script nonce>` | Nonce для генерируемых `<style>` (CSP) |
| `cssExtensions` | `[]` | Расширения: цвета, утилиты, префиксы ([см. раздел](#extend)) |

### Совместимость с tailwind.config

Читаются только три ветки `window.tailwind.config.theme.extend`, и объект объявляется до `quas.js`:

| Ветка | Что делает | Ограничение |
|---|---|---|
| `colors` | Добавляет цвета (`brand`, `brand-500`; `DEFAULT` даёт имя без суффикса). Вложенность поддерживается | Только hex: `#rgb` или `#rrggbb`. `var(--x)`, `oklch()`, `rgb()` пропускаются с предупреждением |
| `boxShadow` | Добавляет `shadow-<имя>` (`DEFAULT` даёт `shadow`) | Значение строка или массив |
| `fontFamily` | Добавляет `font-<имя>` | Значение строка или массив |

```html
<script>
window.tailwind = { config: { theme: { extend: {
  colors: { brand: { DEFAULT: '#4f46e5', 500: '#6366f1' } },   // bg-brand, text-brand-500
  fontFamily: { display: ['Inter', 'sans-serif'] }             // font-display
} } } };
</script>
```

[↑ К оглавлению](#toc)

---

<a id="syntax"></a>

## Синтаксис классов

| Форма | Пример | Результат |
|---|---|---|
| Число по шкале | `p-4`, `gap-2.5`, `w-64` | `1rem`, `0.625rem`, `16rem` |
| Дробь | `w-1/2`, `basis-1/3`, `top-1/2` | `50%`, `33.33%`, `50%` |
| Ключевое слово | `w-full`, `h-screen`, `mx-auto`, `w-px` | `100%`, `100vh`, `auto`, `1px` |
| Произвольное значение | `w-[320px]`, `top-[10px]`, `p-[3px]` | Значение как есть |
| Пробелы в `[]` | `grid-cols-[1fr_2fr]`, `shadow-[0_4px_10px_black]` | `_` превращается в пробел. Для настоящего `_` пишите `__` |
| `calc/min/max/clamp` | `w-[calc(100%-2rem)]` | Пробелы вокруг `+` и `-` добавляются автоматически |
| Отрицательное | `-mt-4`, `-translate-x-1/2`, `-top-[10px]`, `-z-10` | Только там, где утилита это поддерживает (см. ниже) |
| `!important` | `!p-4`, `md:!p-4` | `!` ставится перед утилитой и после вариантов |
| Прозрачность цвета | `bg-red-500/50`, `text-base-content/60` | Модификатор `/0` … `/100` |
| Варианты | `md:hover:bg-red-500`, `dark:md:p-8` | Любая цепочка префиксов |

**Отрицательные значения поддерживают:** `m*`, `inset*`, `top/right/bottom/left`, `z`, `order`, `translate-*`, `rotate`, `skew`, `indent`, `space-x/y`, `hue-rotate`, `outline-offset`, `scroll-m*`.

[↑ К оглавлению](#toc)

---

<a id="responsive"></a>

## Адаптивная вёрстка

Подход mobile-first: класс без префикса действует всегда, `md:` и т.п. работают от ширины и выше.

| Префикс | Условие | Ширина |
|---|---|---|
| `sm:` | `min-width: 40rem` | 640px |
| `md:` | `min-width: 48rem` | 768px |
| `lg:` | `min-width: 64rem` | 1024px |
| `xl:` | `min-width: 80rem` | 1280px |
| `2xl:` | `min-width: 96rem` | 1536px |
| `max-sm:` | `max-width: 39.999rem` | до 640px |
| `max-md:` | `max-width: 47.999rem` | до 768px |
| `max-lg:` | `max-width: 63.999rem` | до 1024px |
| `max-xl:` | `max-width: 79.999rem` | до 1280px |
| `max-2xl:` | `max-width: 95.999rem` | до 1536px |

Другие media-варианты:

| Префикс | Условие |
|---|---|
| `landscape:` / `portrait:` | Ориентация экрана |
| `print:` | Печать |
| `motion-safe:` / `motion-reduce:` | `prefers-reduced-motion` |
| `contrast-more:` / `contrast-less:` | `prefers-contrast` |

Примеры:

```html
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">…</div>
<aside class="hidden md:block">Только на десктопе</aside>
<nav class="flex md:hidden">Только на мобильном</nav>
<div class="hidden md:max-lg:block">Только на планшете (768–1023px)</div>
<div class="px-4 md:px-6 xl:px-10">…</div>
```

| Нюанс | Пояснение |
|---|---|
| `container` | Это готовый CSS из preflight: `width: 100%` плюс `max-width` на каждом брейкпоинте. Он **не центрирует**: пишите `container mx-auto` |
| `max-w-*` не равен брейкпоинтам | `max-w-md` = `28rem`, а не 768px (см. [Размеры](#sizing)) |
| Свои брейкпоинты | Только через `cssExtensions.prefixes` ([см. раздел](#extend)). Произвольных `min-[600px]:` нет |

[↑ К оглавлению](#toc)

---

<a id="variants"></a>

## Состояния и варианты

Варианты ставятся перед утилитой и комбинируются: `md:hover:bg-red-500`.

### Интерактивные состояния

| Префикс | Селектор |
|---|---|
| `hover:` | `:hover` |
| `focus:` | `:focus` |
| `focus-visible:` | `:focus-visible` |
| `focus-within:` | `:focus-within` |
| `active:` | `:active` |
| `visited:` | `:visited` |
| `target:` | `:target` |
| `disabled:` / `enabled:` | `:disabled` / `:enabled` |
| `checked:` / `indeterminate:` | `:checked` / `:indeterminate` |
| `required:` / `optional:` | `:required` / `:optional` |
| `valid:` / `invalid:` | `:valid` / `:invalid` |
| `read-only:` | `:read-only` |
| `placeholder-shown:` | `:placeholder-shown` |
| `open:` | `[open]` (для `<details>`, `<dialog>`) |

### Позиция в списке

| Префикс | Селектор |
|---|---|
| `first:` / `last:` / `only:` | `:first-child` / `:last-child` / `:only-child` |
| `odd:` / `even:` | `:nth-child(odd)` / `:nth-child(even)` |
| `first-of-type:` / `last-of-type:` / `only-of-type:` | Аналогично по типу элемента |
| `empty:` | `:empty` |

### Псевдоэлементы

| Префикс | Селектор | Пример |
|---|---|---|
| `before:` / `after:` | `::before` / `::after` | `before:content-['']` |
| `placeholder:` | `::placeholder` | `placeholder:text-gray-400` |
| `file:` | `::file-selector-button` | `file:px-3 file:rounded-md` |
| `marker:` | `::marker` (и у потомков) | `marker:text-red-500` |
| `selection:` | `::selection` (и у потомков) | `selection:bg-yellow-200` |
| `first-letter:` / `first-line:` | Соответствующие псевдоэлементы | |

### Контекст

| Префикс | Что делает |
|---|---|
| `dark:` | `html.dark …` ([тёмная тема](#darkmode)) |
| `rtl:` / `ltr:` | `[dir="rtl"] …` / `[dir="ltr"] …` |
| `aria-checked:`, `aria-disabled:`, `aria-expanded:`, `aria-hidden:`, `aria-pressed:`, `aria-readonly:`, `aria-required:`, `aria-selected:` | `[aria-…="true"]` |
| `aria-[current=page]:` | Произвольный `aria`-атрибут |
| `data-[state=open]:` | Произвольный `data`-атрибут. Без значения `data-[active]:` значит `[data-active]` |
| `[&>p]:mt-4` | Произвольный вариант. `&` заменяется на селектор элемента, `_` на пробел: `[&_svg]:h-4` |
| `child:` | Кастомный: ко всем прямым потомкам, кроме первого (`> :not([hidden]) ~ :not([hidden])`) |

### Group и peer

Класс `group` ставится на родителя, `peer` на предыдущего соседа. Состояния: `hover`, `focus`, `focus-within`, `focus-visible`, `active`, `visited`, `target`, `disabled`, `enabled`, `checked`, `indeterminate`, `placeholder-shown`, `autofill`, `required`, `valid`, `invalid`, `in-range`, `out-of-range`, `read-only`, `open`.

```html
<a class="group flex gap-2">
  <svg class="text-gray-400 group-hover:text-blue-500">…</svg>
</a>

<input type="checkbox" class="peer">
<div class="hidden peer-checked:block">Показывается при :checked</div>  <!-- peer строго перед ним -->
```

[↑ К оглавлению](#toc)

---

<a id="display"></a>

## Отображение и позиционирование

| Классы | Что делают |
|---|---|
| `block`, `inline`, `inline-block`, `inline-flex`, `inline-grid`, `inline-table`, `flow-root`, `contents`, `list-item`, `hidden` | `display` (`flex`, `grid`, `table`: см. свои разделы) |
| `visible` / `invisible` | `visibility` |
| `box-border` / `box-content` | `box-sizing` |
| `isolate` / `isolation-auto` | `isolation` |
| `static`, `relative`, `absolute`, `fixed`, `sticky` | `position` |
| `inset-0`, `inset-x-0`, `inset-y-0`, `inset-1/2`, `inset-px`, `inset-auto`, `inset-full` | `inset` (все стороны, оси, дроби, `px`, `auto`, `100%`) |
| `top-0`, `right-4`, `bottom-1/2`, `left-full`, `top-auto`, `-top-2`, `top-[10px]` | Отдельные стороны |
| `z-10`, `z-50`, `z-auto`, `z-[999]`, `-z-10` | `z-index` |
| `overflow-auto/hidden/clip/visible/scroll` | `overflow` (также `overflow-x-*`, `overflow-y-*`) |
| `overscroll-auto/contain/none` | `overscroll-behavior` (также `-x`, `-y`) |
| `float-left/right/none/start/end`, `clear-left/right/both/none/start/end` | `float`, `clear` |
| `object-cover/contain/fill/none/scale-down` | `object-fit` |
| `object-center/top/bottom/left/right/left-top/right-top/left-bottom/right-bottom` | `object-position` |
| `columns-3`, `columns-auto`, `columns-sm`, `columns-[20rem]` | CSS-колонки |

[↑ К оглавлению](#toc)

---

<a id="flex"></a>

## Flexbox

| Классы | CSS |
|---|---|
| `flex` | `display: flex` |
| `flex-row`, `flex-row-reverse`, `flex-col`, `flex-col-reverse` | `flex-direction` |
| `flex-wrap`, `flex-wrap-reverse`, `flex-nowrap` | `flex-wrap` |
| `flex-1` | `flex: 1 1 0%` |
| `flex-auto` | `flex: 1 1 auto` |
| `flex-initial` | `flex: 0 1 auto` |
| `flex-none` | `flex: none` |
| `flex-[2]` | Произвольное значение `flex` |
| `grow`, `grow-0` | `flex-grow` |
| `shrink`, `shrink-0` | `flex-shrink` |
| `basis-1/2`, `basis-64`, `basis-full`, `basis-auto`, `basis-md` | `flex-basis` |
| `order-1`, `order-first`, `order-last`, `order-none`, `-order-1` | `order` (`first` = −9999, `last` = 9999) |
| `gap-4`, `gap-x-2`, `gap-y-6` | `gap`, `column-gap`, `row-gap` |

### Выравнивание (работает и для grid)

| Класс | Значения |
|---|---|
| `justify-*` | `start`, `end`, `center`, `between`, `around`, `evenly`, `stretch`, `normal`, `baseline` (`justify-start` = `flex-start`) |
| `items-*` | `start`, `end`, `center`, `baseline`, `stretch` |
| `self-*` | `auto`, `start`, `end`, `center`, `stretch`, `baseline` |
| `content-*` | `align-content`: `start`, `end`, `center`, `between`, `around`, `evenly`, `stretch`, `baseline`, `normal` |
| `justify-items-*`, `justify-self-*` | `start`, `end`, `center`, `stretch` |
| `place-content-*`, `place-items-*`, `place-self-*` | `center`, `start`, `end`, `stretch`, … |
| Вариант `safe` | `justify-center-safe`, `items-end-safe` |

```html
<div class="flex items-center justify-between gap-4">…</div>
<div class="flex min-h-screen flex-col"><main class="flex-1">…</main></div>
```

[↑ К оглавлению](#toc)

---

<a id="grid"></a>

## Grid

| Классы | CSS |
|---|---|
| `grid` | `display: grid` |
| `grid-cols-3` | `repeat(3, minmax(0, 1fr))` |
| `grid-cols-none`, `grid-cols-subgrid` | `none`, `subgrid` |
| `grid-cols-[200px_1fr]`, `grid-cols-[minmax(0,1fr)_17rem]` | Произвольный шаблон |
| `grid-rows-*` | То же для строк |
| `col-span-2`, `col-span-full` | `span 2 / span 2`, `1 / -1` |
| `col-start-2`, `col-end-4`, `col-auto`, `col-1` | Позиция колонки |
| `row-span-2`, `row-span-full`, `row-start-*`, `row-end-*` | То же для строк |
| `grid-flow-row`, `grid-flow-col`, `grid-flow-dense`, `grid-flow-row-dense`, `grid-flow-col-dense` | `grid-auto-flow` |
| `auto-cols-auto/min/max/fr`, `auto-rows-*` | `grid-auto-columns`, `grid-auto-rows` |
| `gap-*`, `gap-x-*`, `gap-y-*` | Промежутки |

```html
<div class="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_17rem]">
  <main>…</main>
  <aside class="order-first md:order-none">…</aside>
</div>
```

[↑ К оглавлению](#toc)

---

<a id="spacing"></a>

## Отступы

| Классы | Свойство |
|---|---|
| `p-*` | `padding` |
| `px-*` / `py-*` | По осям (`left+right` / `top+bottom`) |
| `pt-*`, `pr-*`, `pb-*`, `pl-*` | Отдельные стороны |
| `m-*`, `mx-*`, `my-*`, `mt-*`, `mr-*`, `mb-*`, `ml-*` | `margin`. Дополнительно `auto` и отрицательные значения |
| `space-x-*` / `space-y-*` | Отступы между дочерними элементами. Есть `space-x-reverse` и отрицательные |
| `scroll-m*`, `scroll-p*` | `scroll-margin`, `scroll-padding` |

Шкала значений (`n × 0.25rem`):

| Класс | rem | px |
|---|---|---|
| `*-px` | `1px` | 1 |
| `*-0.5` | 0.125rem | 2 |
| `*-1` | 0.25rem | 4 |
| `*-2` | 0.5rem | 8 |
| `*-3` | 0.75rem | 12 |
| `*-4` | 1rem | 16 |
| `*-6` | 1.5rem | 24 |
| `*-8` | 2rem | 32 |
| `*-12` | 3rem | 48 |
| `*-16` | 4rem | 64 |
| `*-[13px]` | произвольное | 13 |

```html
<div class="mx-auto max-w-6xl px-4 py-6 md:px-6">…</div>
<ul class="space-y-2">…</ul>
```

[↑ К оглавлению](#toc)

---

<a id="sizing"></a>

## Размеры

| Классы | Свойство |
|---|---|
| `w-*`, `h-*` | `width`, `height` |
| `size-*` | `width` и `height` сразу |
| `min-w-*`, `max-w-*`, `min-h-*`, `max-h-*` | Ограничения |
| `aspect-square`, `aspect-video`, `aspect-auto`, `aspect-16/9`, `aspect-[4/3]` | `aspect-ratio` |

Допустимые значения:

| Значение | Результат | Где |
|---|---|---|
| `4`, `64`, `0.5` | по шкале ×0.25rem | везде |
| `1/2`, `2/3` | проценты | везде |
| `full` | `100%` | везде |
| `px` | `1px` | везде (кроме `max-w`) |
| `auto` | `auto` | `w`, `h`, `min-*` |
| `min`, `max`, `fit` | `min-content`, `max-content`, `fit-content` | везде |
| `screen` | `100vw` / `100vh` | `w`, `h`, `min-*`, `max-*` |
| `svh`, `lvh`, `dvh` | `100svh/lvh/dvh` | `h`, `min-h`, `max-h` |
| `svw`, `lvw`, `dvw` | `100svw/lvw/dvw` | `w`, `min-w`, `max-w` |
| `none` | `none` | `max-w`, `max-h` |
| `lh` | `1lh` | `min-h` |

Именованные ширины для `min-w-*` и `max-w-*` (и `basis-*`, `columns-*`):

| Имя | Значение | Имя | Значение |
|---|---|---|---|
| `3xs` | 16rem (256px) | `xl` | 36rem (576px) |
| `2xs` | 18rem (288px) | `2xl` | 42rem (672px) |
| `xs` | 20rem (320px) | `3xl` | 48rem (768px) |
| `sm` | 24rem (384px) | `4xl` | 56rem (896px) |
| `md` | 28rem (448px) | `5xl` | 64rem (1024px) |
| `lg` | 32rem (512px) | `6xl` | 72rem (1152px) |
| | | `7xl` | 80rem (1280px) |

Подвохи: `max-w-prose` и `max-w-screen-xl` в движке отсутствуют.

[↑ К оглавлению](#toc)

---

<a id="typography"></a>

## Типографика

### Размер текста

| Класс | Размер | line-height |
|---|---|---|
| `text-xs` | 0.75rem | 1.333 |
| `text-sm` | 0.875rem | 1.429 |
| `text-base` | 1rem | 1.5 |
| `text-lg` | 1.125rem | 1.556 |
| `text-xl` | 1.25rem | 1.4 |
| `text-2xl` | 1.5rem | 1.333 |
| `text-3xl` | 1.875rem | 1.2 |
| `text-4xl` | 2.25rem | 1.111 |
| `text-5xl` | 3rem | 1 |
| `text-6xl` / `7xl` / `8xl` / `9xl` | 3.75 / 4.5 / 6 / 8 rem | 1 |
| `text-[13px]` | произвольный размер | не меняется |

### Остальное

| Классы | Что делают |
|---|---|
| `font-sans`, `font-serif`, `font-mono` | Семейство шрифта (плюс ваши из `fontFamily`) |
| `font-thin` (100), `extralight` (200), `light` (300), `normal` (400), `medium` (500), `semibold` (600), `bold` (700), `extrabold` (800), `black` (900) | Насыщенность |
| `font-[600]`, `font-[Inter]` | Число даёт вес, иначе семейство |
| `italic` / `not-italic` | `font-style` |
| `text-left`, `text-center`, `text-right`, `text-justify` | Выравнивание |
| `uppercase`, `lowercase`, `capitalize` | `text-transform` |
| `underline`, `overline`, `line-through`, `no-underline` | `text-decoration` |
| `decoration-2`, `decoration-red-500`, `decoration-wavy`, `decoration-dashed`, `underline-offset-4` | Толщина, цвет, стиль и отступ подчёркивания |
| `leading-none` (1), `tight` (1.25), `snug` (1.375), `normal` (1.5), `relaxed` (1.625), `loose` (2), `leading-6` (1.5rem) | `line-height` |
| `tracking-tighter/tight/normal/wide/wider/widest` | `letter-spacing` (−0.05em … 0.1em) |
| `truncate` | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` |
| `line-clamp-3`, `line-clamp-none` | Обрезка по числу строк |
| `text-ellipsis`, `text-clip` | `text-overflow` |
| `text-wrap`, `text-nowrap`, `text-balance`, `text-pretty` | `text-wrap` |
| `whitespace-normal/nowrap/pre/pre-line/pre-wrap/break-spaces` | `white-space` |
| `break-words`, `break-all`, `break-normal` | Переносы слов |
| `hyphens-none/manual/auto` | `hyphens` |
| `indent-4` | `text-indent` |
| `align-baseline/top/middle/bottom/text-top/text-bottom` | `vertical-align` |
| `tabular-nums`, `lining-nums`, `oldstyle-nums`, `slashed-zero`, `ordinal`, `normal-nums` | `font-variant-numeric` |
| `antialiased` / `subpixel-antialiased` | Сглаживание шрифтов |
| `text-shadow-sm`, `text-shadow-md`, `text-shadow-lg`, `text-shadow-none`, `text-shadow-red-500/50` | Тень текста |

Цвет текста: `text-red-500`, `text-base-content/60`, `text-[#333]` ([Цвета](#colors)).

[↑ К оглавлению](#toc)

---

<a id="colors"></a>

## Цвета

Формат: `{утилита}-{цвет}[-{оттенок}][/{прозрачность}]`, например `bg-blue-500`, `text-gray-900/70`, `border-base-300`.

### Источники цвета

| Группа | Имена | Во что превращается |
|---|---|---|
| Палитра | `amber`, `blue`, `cyan`, `emerald`, `fuchsia`, `gray`, `green`, `indigo`, `lime`, `neutral`, `orange`, `pink`, `purple`, `red`, `rose`, `sky`, `slate`, `stone`, `teal`, `violet`, `yellow`, `zinc` + оттенки `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950` | `rgb(r g b)` |
| Базовые | `white`, `black`, `transparent`, `current` (`currentColor`), `inherit` | как есть |
| Семантические | `base-100`, `base-200`, `base-300`, `base-content`, `primary`, `secondary`, `accent`, `neutral`, `info`, `success`, `warning`, `error` и их варианты `*-content` | `var(--color-<имя>)` |
| Свои | Через `tailwind.config` или `cssExtensions` (hex) | см. [Настройка](#config) |

Семантические цвета ждут, что вы сами определите переменные `--color-…` (движок их значений не задаёт):

```css
:root { --color-base-100: #fff; --color-base-content: #0a0a0a; --color-primary: #171717; --color-primary-content: #fafafa; }
.dark { --color-base-100: #0a0a0a; --color-base-content: #fafafa; --color-primary: #fafafa; --color-primary-content: #171717; }
```

### Прозрачность

| Запись | Результат |
|---|---|
| `bg-red-500/50` | `rgb(… / 0.5)` |
| `text-base-content/60` | `color-mix(in oklab, var(--color-base-content) 60%, transparent)` |
| `bg-opacity-50`, `text-opacity-50`, `border-opacity-50` | Старый стиль, только для цветов палитры |

### Где применяются цвета

| Утилита | Свойство |
|---|---|
| `text-*` | `color` |
| `bg-*` | `background-color` |
| `border-*`, `border-x/y/t/r/b/l-*` | Цвет границы |
| `outline-*` | `outline-color` |
| `ring-*`, `ring-offset-*` | Цвет кольца и отступа кольца |
| `divide-*` | Цвет разделителей |
| `shadow-*`, `inset-shadow-*` | Цвет тени |
| `text-shadow-*` | Цвет тени текста |
| `decoration-*` | Цвет подчёркивания |
| `fill-*`, `stroke-*` | SVG |
| `accent-*`, `caret-*`, `placeholder-*` | `accent-color`, `caret-color`, цвет placeholder |
| `from-*`, `via-*`, `to-*` | Стопы градиента |

### Произвольные цвета

Цвет распознаётся только по форматам `#hex` (3–8 символов), `rgb(…)`, `rgba(…)`, `hsl(…)`, `hsla(…)`.

| Пример | Работает |
|---|---|
| `bg-[#1da1f2]`, `text-[rgb(10_20_30)]`, `border-[#ccc]` | Да |
| `bg-[var(--x)]`, `text-[var(--x)]`, `bg-[oklch(…)]` | **Нет:** `bg-` трактует это как `background-image`, `text-` как `font-size`. Используйте семантические имена через `--color-*` |

[↑ К оглавлению](#toc)

---

<a id="backgrounds"></a>

## Фоны и градиенты

| Классы | CSS |
|---|---|
| `bg-white`, `bg-gray-100`, `bg-primary`, `bg-black/50` | `background-color` ([Цвета](#colors)) |
| `bg-[url(/img/a.jpg)]` | `background-image` |
| `bg-none` | `background-image: none` |
| `bg-cover`, `bg-contain`, `bg-auto` | `background-size` |
| `bg-center`, `bg-top`, `bg-bottom`, `bg-left`, `bg-right`, `bg-top-left`, `bg-top-right`, `bg-bottom-left`, `bg-bottom-right` | `background-position` |
| `bg-repeat`, `bg-no-repeat`, `bg-repeat-x`, `bg-repeat-y`, `bg-repeat-round`, `bg-repeat-space` | `background-repeat` |
| `bg-fixed`, `bg-local`, `bg-scroll` | `background-attachment` |
| `bg-clip-border`, `bg-clip-padding`, `bg-clip-content`, `bg-clip-text` | `background-clip` |
| `bg-origin-border`, `bg-origin-padding`, `bg-origin-content` | `background-origin` |
| `bg-blend-multiply`, `bg-blend-overlay`, … | `background-blend-mode` |

### Градиенты

| Классы | Что делают |
|---|---|
| `bg-gradient-to-t`, `-b`, `-l`, `-r`, `-tl`, `-tr`, `-bl`, `-br` | Линейный градиент в сторону |
| `bg-gradient-to-[45deg]` | Произвольный угол |
| `bg-radial`, `bg-conic` | Радиальный, конический |
| `from-blue-500` | Начальный цвет |
| `via-purple-500` | Средний цвет |
| `to-pink-500` | Конечный цвет |
| `from-10%`, `via-30%`, `to-90%` | Позиции стопов |

```html
<div class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">…</div>
<h1 class="bg-gradient-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent">Градиентный текст</h1>
```

Названия `bg-linear-*` (из Tailwind v4) не работают, используйте `bg-gradient-to-*`. Для `from/via/to` берите цвета палитры или семантические: произвольные `from-[#fff]` ломают градиент.

[↑ К оглавлению](#toc)

---

<a id="borders"></a>

## Границы, скругления, обводка

### Border

| Классы | Что делают |
|---|---|
| `border` | `1px` по всем сторонам. Стиль `solid` приходит из preflight |
| `border-0`, `border-2`, `border-4`, `border-[3px]` | Толщина в px |
| `border-x`, `border-y`, `border-t`, `border-r`, `border-b`, `border-l` | Стороны (и с толщиной: `border-b-2`) |
| `border-solid`, `border-dashed`, `border-dotted`, `border-double`, `border-none` | Стиль |
| `border-gray-200`, `border-base-300`, `border-t-red-500`, `border-transparent` | Цвет |
| `border-collapse`, `border-separate`, `border-spacing-2`, `border-spacing-x-2` | Таблицы |

Цвет по умолчанию `#e5e7eb`. Чтобы не писать цвет в каждом элементе, задайте один раз: `*, ::before, ::after { border-color: var(--color-base-300); }`.

### Rounded

| Класс | Радиус |
|---|---|
| `rounded-none` | 0 |
| `rounded-sm` | 0.125rem |
| `rounded` | 0.25rem |
| `rounded-md` | 0.375rem |
| `rounded-lg` | 0.5rem |
| `rounded-xl` | 0.75rem |
| `rounded-2xl` | 1rem |
| `rounded-3xl` | 1.5rem |
| `rounded-full` | 9999px |
| `rounded-4`, `rounded-[11px]` | по шкале, произвольный |

Стороны и углы: `rounded-t`, `-r`, `-b`, `-l`, `-tl`, `-tr`, `-bl`, `-br` (например `rounded-t-xl`).

### Ring, outline, divide

| Классы | Что делают |
|---|---|
| `ring` | Кольцо `1px` (не 3px, как в Tailwind v3) |
| `ring-2`, `ring-4`, `ring-[3px]` | Толщина кольца |
| `ring-blue-500/50`, `ring-base-content/30` | Цвет кольца |
| `ring-inset` | Внутреннее кольцо |
| `ring-offset-2`, `ring-offset-white` | Отступ кольца и его цвет |
| `outline` | `outline-width: 1px` |
| `outline-2`, `outline-red-500` | Толщина, цвет |
| `outline-none` | `outline-style: none` |
| `outline-solid`, `-dashed`, `-dotted`, `-double` | Стиль |
| `outline-hidden` | `outline: 2px solid transparent; outline-offset: 2px` (невидим, но остаётся в режиме высокого контраста) |
| `outline-offset-2` | Отступ |
| `divide-x`, `divide-y`, `divide-x-2` | Линии между дочерними элементами |
| `divide-gray-200`, `divide-base-300` | Цвет линий |
| `divide-dashed`, `divide-dotted` | Стиль линий |
| `divide-x-reverse`, `divide-y-reverse` | Для `flex-row-reverse` и подобных |

```html
<input class="rounded-md border px-3 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50">
<ul class="divide-y divide-gray-200">…</ul>
```

[↑ К оглавлению](#toc)

---

<a id="effects"></a>

## Тени и эффекты

| Классы | Что делают |
|---|---|
| `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-inner`, `shadow-none` | Тень блока |
| `shadow-red-500/50` | Цвет тени |
| `shadow-[0_4px_10px_black]` | Произвольная тень |
| `inset-shadow-2xs`, `-xs`, `-sm`, `-none` | Внутренняя тень |
| `drop-shadow-sm`, `drop-shadow`, `-md`, `-lg`, `-xl`, `-2xl`, `-none` | Фильтр `drop-shadow` (по форме содержимого) |
| `opacity-50` | `opacity: 0.5` (значения 0–100) |
| `mix-blend-multiply`, `-screen`, `-overlay`, `-difference`, … | `mix-blend-mode` |
| `blur-sm` (4px), `blur` (8px), `blur-md` (12px), `blur-lg` (16px), `blur-xl` (24px), `blur-2xl` (40px), `blur-3xl` (64px), `blur-none` | Размытие |
| `brightness-50`, `contrast-125`, `saturate-150` | Значение / 100 (`100` = без изменений) |
| `grayscale`, `invert`, `sepia` | 100%. С числом: `grayscale-50` |
| `hue-rotate-90`, `-hue-rotate-90` | Поворот оттенка в градусах |
| `filter-none` | Сброс фильтров |
| `backdrop-blur`, `backdrop-blur-sm`, `backdrop-brightness-*`, `backdrop-contrast-*`, `backdrop-grayscale`, `backdrop-hue-rotate-*`, `backdrop-invert`, `backdrop-saturate-*`, `backdrop-sepia` | `backdrop-filter` |

```html
<header class="sticky top-0 border-b bg-white/80 backdrop-blur">…</header>
```

Фильтры и тени стыкуются: `blur-sm brightness-110` складываются в один `filter`.

[↑ К оглавлению](#toc)

---

<a id="transforms"></a>

## Трансформации, переходы, анимации

### Transform

Класс `transform` указывать не нужно: любая из утилит ниже сама подключает базу.

| Классы | Что делают |
|---|---|
| `translate-x-4`, `translate-y-1/2`, `-translate-x-full`, `translate-x-[10px]` | Сдвиг (по шкале, дроби, `full`) |
| `scale-95`, `scale-110`, `scale-x-50`, `scale-y-50` | Масштаб: число / 100 (`scale-110` = 1.1) |
| `rotate-45`, `-rotate-12`, `rotate-[17deg]` | Поворот в градусах |
| `skew-x-6`, `skew-y-3` | Скос в градусах |
| `origin-center`, `origin-top`, `origin-top-left`, `origin-bottom-right`, … | `transform-origin` |
| `transform-3d`, `transform-flat` | `transform-style` |
| `backface-visible` / `backface-hidden` | `backface-visibility` |
| `perspective-500`, `perspective-none` | Перспектива в px |

Центрирование абсолютом: `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`.

### Transition

| Классы | Что делают |
|---|---|
| `transition` | Цвета, фон, рамка, тень, `opacity`, `transform`, `filter`, `backdrop-filter` (150ms, `cubic-bezier(0.4,0,0.2,1)`) |
| `transition-colors`, `-opacity`, `-shadow`, `-transform`, `-all`, `-none` | Конкретные свойства |
| `transition-[width]` | Произвольный список свойств |
| `duration-300`, `duration-[2s]` | Длительность (число в ms) |
| `delay-150` | Задержка (ms) |
| `ease-linear`, `ease-in`, `ease-out`, `ease-in-out` | Функция времени |
| `will-change-transform`, `-scroll-position`, `-contents`, `-auto` | `will-change` |

### Animate

| Класс | Анимация |
|---|---|
| `animate-spin` | Вращение, 1s linear infinite |
| `animate-ping` | Пульсирующий «радар» |
| `animate-pulse` | Мерцание прозрачности |
| `animate-bounce` | Подпрыгивание |
| `animate-fade` | Кастомная: `opacity` 1 → 0.5 → 1 |
| `animate-none` | Отключить |
| `animate-[wiggle_1s_infinite]` | Своя анимация (`@keyframes wiggle` пишете сами) |

В preflight есть готовые CSS-классы `*-enter-active`, `*-leave-active`, `*-enter-from`, `*-leave-to` для переходов `fade`, `slide-up`, `zoom` и `bounce-in`. Они нужны, если ваш фреймворк умеет подставлять такие классы при появлении и скрытии элементов.

[↑ К оглавлению](#toc)

---

<a id="interactivity"></a>

## Интерактивность и скролл

| Классы | Что делают |
|---|---|
| `cursor-pointer`, `cursor-default`, `cursor-not-allowed`, `cursor-wait`, `cursor-grab`, `cursor-grabbing`, `cursor-text`, `cursor-move`, `cursor-help`, `cursor-[url(...)]` | `cursor` (полный набор значений CSS) |
| `select-none`, `select-text`, `select-all`, `select-auto` | `user-select` |
| `pointer-events-none` / `pointer-events-auto` | `pointer-events` |
| `resize`, `resize-x`, `resize-y`, `resize-none` | `resize` |
| `appearance-none` | Сброс нативного вида |
| `accent-blue-500`, `caret-red-500` | Цвета чекбоксов и каретки |
| `touch-auto`, `touch-none`, `touch-pan-x`, `touch-pan-y`, `touch-manipulation`, `touch-pinch-zoom` | `touch-action` |
| `scroll-smooth` / `scroll-auto` | `scroll-behavior` |
| `snap-x`, `snap-y`, `snap-both`, `snap-none` | `scroll-snap-type` |
| `snap-mandatory`, `snap-proximity` | Строгость привязки (ставить вместе с `snap-x`) |
| `snap-start`, `snap-center`, `snap-end`, `snap-align-none` | `scroll-snap-align` |
| `snap-normal` / `snap-always` | `scroll-snap-stop` |
| `scroll-mt-16`, `scroll-pt-16` | Отступы при прокрутке к якорю |
| `sr-only` / `not-sr-only` | Скрыть визуально, оставить для скринридеров |

[↑ К оглавлению](#toc)

---

<a id="misc"></a>

## Таблицы, списки, SVG

| Классы | Что делают |
|---|---|
| `table`, `table-row`, `table-cell`, `table-caption`, `table-column`, `table-column-group`, `table-header-group`, `table-footer-group`, `table-row-group` | `display` для таблиц |
| `table-auto` / `table-fixed` | `table-layout` |
| `caption-top` / `caption-bottom` | `caption-side` |
| `border-collapse` / `border-separate` | `border-collapse` |
| `border-spacing-2`, `border-spacing-x-2`, `border-spacing-y-2` | Промежутки в `border-separate` |
| `list-none`, `list-disc`, `list-decimal` | `list-style-type` |
| `list-inside` / `list-outside` | `list-style-position` |
| `fill-current`, `fill-red-500`, `fill-none` | `fill` |
| `stroke-current`, `stroke-blue-500`, `stroke-none` | Цвет обводки |
| `stroke-2`, `stroke-[1.5]` | Толщина обводки |

SVG-иконка, наследующая цвет текста: `<svg class="h-4 w-4 fill-none stroke-current stroke-2">`.

[↑ К оглавлению](#toc)

---

<a id="darkmode"></a>

## Тёмная тема

Режим по классу: `dark:` превращается в `html.dark <селектор>`. Работает, если на `<html>` есть класс `dark`.

| Тема | Описание |
|---|---|
| `AutoDarkMode: true` (по умолчанию) | Движок сам включает и выключает `dark` по `prefers-color-scheme` |
| `AutoDarkMode: false` | Класс вы ведёте сами (ручной переключатель, сохранение в `localStorage`) |
| Порядок | `dark:` всегда внешний контекст, остальные варианты вкладываются внутрь: `dark:hover:bg-gray-800`, `dark:md:p-8` |

### Подход 1: классы `dark:`

```html
<div class="bg-white text-black dark:bg-gray-900 dark:text-white">…</div>
```

### Подход 2: переменные (меньше классов)

Определите семантические цвета в `:root` и `.dark` ([пример в разделе Цвета](#colors)) и пишите `bg-base-100 text-base-content`. Тема переключается подменой переменных, и `dark:` не нужен вообще.

### Ручной переключатель без мигания

```html
<script>
try {
  const t = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', t === 'dark');
} catch (e) {}
</script>
<script>window.Quas = { AutoDarkMode: false };</script>
<script src=".../quas.js"></script>
```

```js
function toggleTheme() {
  const dark = document.documentElement.classList.toggle('dark');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
}
```

[↑ К оглавлению](#toc)

---

<a id="csstag"></a>

## Тег css и scoped-стили

Работает при `CSSTagMode: true`. Тег `<css>` описывает стили для **родительского** элемента: родителю добавляется уникальный класс `q-css-N`, и все правила привязываются к нему. Сам тег заменяется комментарием.

```html
<div class="card">
  <css>
    &: p-4 rounded-xl border;               // сам родитель
    h2: text-lg font-semibold;              // потомки по селектору
    button: px-3 py-1 bg-blue-500 text-white rounded-md;
    button:hover: bg-blue-600;              // вариант в конце селектора
    &:dark: bg-gray-900;                    // вариант на корень
    &:md: p-8;                              // адаптив на корень
    .title { color: red; }                  /* нативный CSS тоже можно, он будет scoped */
  </css>
  <h2>Заголовок</h2>
  <button>Кнопка</button>
</div>
```

| Синтаксис | Что значит |
|---|---|
| `селектор: классы;` | Утилиты на селектор. **После двоеточия обязателен пробел**, строка заканчивается `;` |
| `&` | Корневой элемент (тот, у кого есть `<css>`) |
| `селектор:вариант: классы;` | Вариант применяется ко всем классам строки (`button:hover:`, `&:dark:`, `&:md:`) |
| `селектор { … }` | Нативный CSS, автоматически получает префикс области. `&` внутри селектора заменяется на корень |
| `::before { … }` | Псевдоэлемент самого корня |
| `<css id="name">` | Именованная область: переиспользуется по `id`, класс получается `q-css-name` |
| Комментарии | `/* … */`, `// …` (после `//` нужен пробел, чтобы не ломать URL) и `<!-- … -->` |

Ограничения:

| Ограничение | Пояснение |
|---|---|
| Нет вложенных правил и `@`-правил | `@media { … }` не поддерживается: используйте префиксы `md:`, `print:` и др. |
| Селекторы от документа | `html`, `body`, `.dark` в начале дают предупреждение: не сматчатся изнутри компонента. Используйте `&` |
| Область применяется к родителю | Тег `<css>` кладите внутрь нужного элемента |

[↑ К оглавлению](#toc)

---

<a id="extend"></a>

## Расширение и JS API

### cssExtensions

Расширения применяются при старте, до генерации любого CSS.

```html
<script>
window.Quas = {
  cssExtensions: [{
    // Цвета (только hex): bg-brand, bg-brand-500
    colors: { brand: { DEFAULT: '#4f46e5', 500: '#6366f1' } },

    // Утилиты, глубоко сливаются в конфиг движка
    utilities: {
      'stack': 'display: flex; flex-direction: column; gap: 1rem',     // class="stack"
      'rounded': { 'pill': '9999px' }                                  // rounded-pill
    },

    // Свои варианты
    prefixes: {
      'tablet': { type: 'wrapper', handler: rule => `@media (min-width: 700px) {${rule}}` },   // tablet:flex
      'hocus':  { type: 'pseudo',  handler: sel => `${sel}:hover, ${sel}:focus` }               // hocus:underline
    }
  }]
};
</script>
```

| Поле | Тип | Описание |
|---|---|---|
| `colors` | объект | Как `tailwind.config.extend.colors`, только hex |
| `utilities` | объект | Строка CSS (`'display: flex'`) или вложенный объект значений. Мержится в `UTILITY_CONFIG` |
| `prefixes` | объект | `type: 'wrapper'` оборачивает правило (`@media …`), `type: 'pseudo'` меняет селектор |

Собственные префиксы попадают в конец каскада (после встроенных).

### JS API

| Метод | Что делает |
|---|---|
| `Quas.scan(root = document)` | Собрать классы из поддерева (в том числе отсоединённого) и сгенерировать CSS |
| `Quas.processClasses(strOrIterable)` | Зарегистрировать классы вручную: `'p-4 md:p-8'` или массив. Работает и при `CSSClassMode: false` |
| `Quas.css(text, id?)` | Скомпилировать scoped-стили (синтаксис как в `<css>`), вернуть имя класса области |
| `` Quas.css`...` `` | То же в виде tagged template |

```js
const el = document.createElement('div');
el.className = 'p-4 bg-red-500';
Quas.scan(el);                       // классы из отсоединённого узла
document.body.append(el);

const scope = Quas.css(`&: p-4 rounded-lg; button: px-3 bg-blue-500;`, 'my-card');
el.classList.add(scope);             // 'q-css-my-card'
```

[↑ К оглавлению](#toc)

---

<a id="pitfalls"></a>

## Частые ошибки и ограничения

| Симптом | Причина и решение |
|---|---|
| Настройки не действуют | Объект должен называться `window.Quas` (не `window.Q`) и объявляться **до** `quas.js` |
| `AutoDarkMode: false` игнорируется | Тот же случай: конфиг не прочитан, и движок сам переключает `dark` |
| Кастомный цвет не работает, в консоли «skipped» | В `tailwind.config` и `cssExtensions.colors` разрешён только hex. Для CSS-переменных используйте имена `--color-base-100`, `--color-primary` и др. |
| `bg-[var(--x)]` рисует не цвет | Не-цветовая запись у `bg-` значит `background-image`, у `text-` значит `font-size`. Цветом считаются только `#hex`, `rgb()`, `hsl()` |
| Градиент с `from-[#fff]` не рисуется | Для `from/via/to` цвета берите из палитры или семантические |
| Классы внутри `<template>` не стилизуются | Узлы вне DOM не сканируются. После вставки в документ observer их подхватит, для остального вызовите `Quas.scan(root)` |
| Класс не работает, в консоли «Unknown class» | Проверьте имя. Подсказка в сообщении: «Did you mean …» |
| `bg-linear-to-r`, `max-w-prose`, `max-w-screen-xl` | В движке нет. Используйте `bg-gradient-to-r`, `max-w-3xl` и т.п. |
| `ring` слишком тонкое | Голый `ring` = 1px. Для 3px пишите `ring-3` |
| `container` не по центру | Добавьте `mx-auto` |
| `-order-1`, `-w-4` | Отрицательные значения только у [перечисленных утилит](#syntax) |
| Вариант не применился | Проверьте порядок: `hover:md:` и `md:hover:` равнозначны, а имя варианта должно быть известно (неизвестные пропускаются с предупреждением) |
| `placeholder:text-gray-400` не красит | Используйте именно префикс `placeholder:` (псевдоэлемент) |
| Пробелы в `calc` | `w-[calc(100%-2rem)]` работает: пробелы вокруг `+`/`-` движок добавляет сам |

### Чего нет в движке

| Возможность | Альтернатива |
|---|---|
| `@apply`, `@layer`, `@theme` | Scoped-стили через [`<css>`](#csstag) или `cssExtensions.utilities` |
| Container queries (`@md:`), `has-*`, `not-*`, `nth-*`, `supports-*`, `min-[…]`, `*:` | Произвольный вариант `[&:has(img)]:p-0` или `[&>*]:p-2` |
| Произвольные свойства `[mask-type:alpha]` | Обычный CSS или `utilities` в расширении |
| `prose` (типографика) | Свой CSS |

[↑ К оглавлению](#toc)