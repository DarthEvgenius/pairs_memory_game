# Игра в пары

Цель игры &ndash; найти и раскрыть все пары карт на поле.\
Игра доступна по [ссылке](https://darthevgenius.github.io/pairs_memory_game/) на *github-Pages*.

## Интерфейс

Перед началом игры можно выбрать уровень сложности:

- **лёгкий**: размеры поля 4х4;
- **нормальный**: размеры поля 4х5;
- **сложный**: размеры поля 5х5;

Во время игры можно:

- перетасовать все карты и перезапустить игру на выбранном уровне сложности &ndash; кнопка `Refresh cards`
- вернуться к начальному меню выбора сложности &ndash; кнопка `Reset Game`

---

## Стек и описание проекта

Игра написана на чистом Javascript, CSS и HTML.

### Структура проекта и установка

```
├── docs
|  ├── css
|  ├── index.html
|  ├── pairs.bundle.js
|  ├── pairs.bundle.js.map
|  └── pairs.css
├── gulpfile.js
├── package.json
├── README.md
├── src
|  ├── css
|  ├── index.html
|  ├── js
|  ├── pairs.css
|  └── pairs.mjs
└── webpack.config.js
```
`docs` и `src` &ndash; основные папки проекта:
- В `src` находится исходный код.
- `docs` пересобирается на основе папки `src`, если в последней были изменены какие-либо файлы.

Для сборки используется таск-менеджер [Gulp](https://gulpjs.com/). Установите его, а также необходимые зависимости с помощью команды `npm install`, находясь в корневой папке проекта:

```sh
$ cd <pairs>
$ npm install
```

Далее команда `gulp` автоматически пересобирёт проект в папке `docs` на основе изменений в файлах папки `src`, а также запустит *live-server*.

### Описание

Игра выполнена в минималистичном дизайне, с простыми, но приятными анимациями.

Вёрстка адаптивна, UI/UX удобен и понятен на экранах любого размера благодаря отзывчивому размеру шрифта, определённому с помощью свойства `clamp()`, и размерам элементов в `em/rem`.

В основной js-логике приложения есть два главных объекта и функция создания новой игры:
- `startInterface` отвечает за создание интерфейса и элементов пользовательского управления.
- `gameConditions` отвечает за условия игры, победы и сложность.
- функция `newGame()` создаёт `gameConditions` в зависимости от выбранного пользователем уровня сложности, создаёт поле игры `gameField` и запускает главный скрипт игры `startGame()`.
