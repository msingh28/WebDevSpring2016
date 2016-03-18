"use strict";

module.exports = function(app) {

    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.js")();
    var formModel   = require("./models/form.model.js")();

    var UserService  = require("./services/user.service.server.js") (app, userModel);
    var FormService = require("./services/form.service.server.js")(app, formModel);
    var FieldService = require("./services/field.service.server.js")(app, formModel)
};