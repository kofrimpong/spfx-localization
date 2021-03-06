/**
 * Scripts exports english localization keys to the .csv file
 */

const path = require('path');
const fs = require('fs');
const ts =  require("typescript");
require('amd-loader');

const jsPlaceholder =
`
define([], () => {
  return {0};
});`;

const getSPLocalizationFileAsJSON = (basePath,locale) => {
  const locFilePath =  path.join(basePath,`${locale}.js`); 
  const tmpLocJSFilePath = path.join(__dirname, `${locale}-tmp.js`);
console.log(locFilePath)
  // Localization file doesn't exist
  if (!fs.existsSync(locFilePath)) {
    return null;
  }

  // Read en-us localization file and transpile if to JS
  // Add named module to avoid amdefine excpetion
  const enLocFileContent = fs.readFileSync(locFilePath, 'utf-8');
  let result = ts.transpileModule(enLocFileContent, { compilerOptions: { module: ts.ModuleKind.CommonJS }});

  // Create temp JS file
  fs.writeFileSync(tmpLocJSFilePath, result.outputText);

  var locResources = require(`./${locale}-tmp`);

  // Remove tmp file
  fs.unlinkSync(tmpLocJSFilePath);
  return locResources;
}

const replaceTranslatedKeysInJSON = (basePath,translatedObj, locale) => {
  const locFilePath = `${basePath}/${locale}.js`;
  const fileContent = jsPlaceholder.replace('{0}', JSON.stringify(translatedObj, null, 2));

  // Save file content
  fs.writeFileSync(locFilePath, fileContent);
}

module.exports = { getSPLocalizationFileAsJSON , replaceTranslatedKeysInJSON }
