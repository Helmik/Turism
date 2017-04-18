'use strict';
/**
 * Created by developeri on 4/17/17.
 */
var database = require('./database/index.js');
module.exports = function(app) {
  // Get all models
  var props = {
    all_models: require('../model-config.json'),
    exclude: ['User', '_meta', 'Email']
  };
  // Get model's key
  var getModels = function() {
    return Object.keys(props.all_models).filter(function(current) {return props.exclude.indexOf(current) < 0});
  };
  // Get mysql connection
  const mysql = app.dataSources.mysqlConnector;
  mysql.isActual(getModels(), function(error, actual) {
    if (error) throw error;
    if (!actual) {
      mysql.autoupdate(function(error, result) {
        if (error) throw error;
        console.log("Models created ", result);
        database(app);
      });
    } else {
      console.log("Models updated");
      database(app);
    }
  });
}
