<img src="Quas.png" style="margin-top: 10px; margin-bottom: 0; padding-bottom: 0">

# 🔮 Quas 

Quas - это полная альтернатива Tailwind CSS. Этот однострочный JS 
скрипт позволяет получить все преимущества Tailwind не устанавливая 
его сборщик. Ознакомиться с полной документацией Quas можно на 
официальном сайте Tailwind 4 (API не отличается).
https://tailwindcss.com/docs/styling-with-utility-classes

## ⚡️ Подключение

В `<head>` Вашего сайта добавьте этот скрипт:

```html 
<script src="https://cdn.jsdelivr.net/gh/wemmbley/quas@master/Source/Quas.js"></script>
```

Так же НАСТОЯТЕЛЬНО рекомендуем подключить ДЕБАГ в момент разработки:
```html 
<script src="https://cdn.jsdelivr.net/gh/wemmbley/quas@master/Source/QuasDebug.js"></script>
```

В консоли Вы увидете все потенциальные проблемы Вашего кода, конфликты классов и проч.

## 🦚 Компонентные библиотки

При желании Вы можете подключить любую готовую компонентую библиотеку. 

Пример:
- `PrebuiltUI` https://prebuiltui.com/components
- `HyperUI` https://hyperui.dev/
- `DaisyUI` https://daisyui.com/components/

Иконки:
- `Bootstrap` https://icons.getbootstrap.com/
- `UntitledUI` https://www.untitledui.com/free-icons

## ⚗️ Изолированный <css> тэг.

```html 
<div class="card">
  <h3>Заголовок карточки</h3>
  <p>Дополнительное описание</p>
  <button>Кнопка</button>

  <css>
    &: bg-white p-6 rounded-xl shadow-md;
    h3: text-xl font-bold text-gray-900;
    p: mt-2 text-gray-600;
    button: mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg;

    /* Ванильный CSS (изолированный) */
    h3 {
      letter-spacing: -0.02em;
    }
  </css>
</div>
```

## ⚙️ Настройки движка

```html 
<script>
  window.Q = {
    AutoDarkMode: true,   // Синхронизировать даркмод с операционной системой.
    CSSClassMode: true,   // Генерировать CSS для утилитарных классов найденных в DOM.
    CSSTagMode: true,     // Обрабатывать изолированные <css> тэги.
    CSSWarnings: true,    // Сообщать в консоль о нераспознаных утилитарных классах.
    CSSPerformance: true, // Логгировать количество классов и время их исполнения.
    CleanDOM: true,       // Удалять изолированные <css> тэги после обработки.
  };
</script>
```

## 🧬 Настройки темы

Загружать ДО подключения скрипта `Quas.js`:
```html 
<script>
  window.tailwind = {
    config: {
      theme: {
        extend: {
          colors: {
            brand: {
              100: '#e6f0ff',
              500: '#0066ff',
            }
          },
          fontFamily: {
            custom: ['"Comic Sans MS"', 'sans-serif']
          },
          boxShadow: {
            card: '0 8px 30px rgb(0 0 0 / 0.12)'
          }
        }
      }
    }
  }
</script>
```

## 🔨 Расширение утилитарных классов

Вы можете добавить новые утилитарные классы, цвета и префиксы. 
Скрипт выполнять ДО загрузки `Quas.js`:
```html 
<script>
  window.Q = window.Q || {};
  window.Q.cssExtensions = [{
    colors: {
        accent: {
            500: '#7c3aed',
        }
    },
    utilities: {
      // Добавляет класс, class="layout-grid"
      'layout-grid': 'display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem;',
    },
    prefixes: {
      // Добавляет префикс, class="touch:hidden"
      'touch': { type: 'wrapper', handler: rule => `@media (hover: none) {${rule}}` }
    }
  }];
</script>
```

# 💼 Мои другие продукты 

### Neo
Автономный PHP-движок без внешних зависимостей, лёгкий аналог Laravel.
<br><a href="https://github.com/wemmbley/neo">Ссылка на GitHub репозиторий</a>

### Wex 
Независимый реактивный JS-движок на базе jQuery, аналог Vue для CDN.
<br><a href="https://github.com/wemmbley/wex">Ссылка на GitHub репозиторий</a>
<br><a href="https://codeberg.org/wemmbley/wex">Ссылка на CodeBerg репозиторий</a>
