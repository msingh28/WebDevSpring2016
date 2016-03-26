"use strict";

module.exports = function(app) {
    var userModel    = require("./models/user.model.js")();
    var bookModel   = require("./models/book.model.js")();
    var reviewModel = require("./models/review.model.js")();

    var UserService  = require("./services/user.service.server.js") (app, userModel);
    var BookService = require("./services/book.service.server.js")(app, bookModel);
    var ReviewsService = require("./services/review.service.server.js")(app, reviewModel)
};