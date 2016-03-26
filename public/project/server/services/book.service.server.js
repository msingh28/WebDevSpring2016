"use strict";

module.exports = function(app, bookModel) {
    app.get("/api/project/book/:userId", getBooks);
    app.get("/api/project/book/:bookId", getBookById);
    app.delete("/api/project/book/:bookId", deleteBook);
    app.post("/api/project/book/:userId/book", createBook);
    app.get("/api/project/book?bookTitle=bookTitle", getBookByTitle);

    function createBook(req, res) {
        var book = req.body;
        res.json(bookModel.Create(book));
    }

    function getBooks(req, res) {
        var userId = req.params.userId;
        res.json(bookModel.FindBooksByUserId(userId));
    }

    function getBookById(req, res) {
        var bookId = req.params.bookId;
        res.json(bookModel.FindById(bookId));
    }

    function deleteBook(req, res) {
        var bookId = req.params.bookId;
        res.json(bookModel.Delete(bookId));
    }

    function getBookByTitle(req, res) {
        var bookTitle = req.param("bookTitle");
        res.json(bookModel.findFormByTitle(bookTitle));
    }
}