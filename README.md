
Script executes the translation of the localization keys for the provided languages with the usage of the Azure Cognitive services.
In case the language localization file doesn't exist, it is going to be created.
Only languages supported by Azure Cognitive services are supported.
English is used as a main language. The translation is executed for the keys which are the same as in English or are missing.

Example

```js
/* translate.js */
const translator = require('spfx-localization'));
translator.run('src/webparts/timeline/loc',["fr-fr"]);
```