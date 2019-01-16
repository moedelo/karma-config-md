# karma-config
Попытка создать универсальный конфигурационный файл к набору инструментов для тестирования

## Подключение

*/karma.conf.js*
```javascript
const config = require('@moedelo/karma-config');

module.exports = config({
   baseUrl: path.resolve('./')
});
```

*/package.json*
```json
"scripts": {
  "test": "karma start karma.conf.js --single-run",
  "test:watch": "yarn test -- --auto-watch --no-single-run"
},
"devDependencies": {
  "@moedelo/karma-config": "*"
}
```

## Зависимости
* в конечном репозитории должен быть подключеен ```@moedelo/webpack2-build```

Далее создаем тесты и в нужных папках с именами, соответствующими маске *.test.js.
