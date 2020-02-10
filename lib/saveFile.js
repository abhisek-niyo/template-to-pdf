/**
  * @module saveFile
  * @param {string} tempFile rendered html templates
  * @param {string} filePath desired file name
  * @param {string} fileName path to pdftk
  * @return {string} path to the file saved
  * @example
  *
  * var saveFile = require('./lib/saveFile');
  * var tempFile = "./tmp/tempFile.pdf";
  * var filePath = "./pdf-files/";
  * var fileName = "newFile.pdf";
  * saveFile(options, templates, fileName, pdftkPath)
  *   .then(function (newFilePath) {
  *     console.log(newFilePath);
  *   })
  * .catch(function (error) {
  *     console.log(error);
  * })
  */

var { promises: fsPromises } = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

module.exports = function save(tempFile, filePath, fileName) {
  return new Promise(function(resolve, reject) {
    var pathData = path.parse(filePath);
    return mkdirp(pathData.dir)
      .then(function() {
        return fsPromises
          .rename(tempFile, filePath + fileName)
          .then(function() {
            return filePath + fileName;
          });
      })
      .then(resolve)
      .catch(reject);
  });
};
