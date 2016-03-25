"use strict";

module.exports = function(app, bookModel) {
    app.get("/api/project/user/:userId/book", getBooks);
    app.get("/api/project/book/:bookId", getBookById);
    app.delete("/api/project/book/:bookId", deleteBook);
    app.post("/api/project/book/:userId/book", createBook);
    app.get("/api/project/book?bookTitle=bookTitle", getBookByTitle);

    function createBook(req, res) {
        var bookId = req.params.userId;
        var book = req.body;
        res.json(bookModel.Create(book, bookId));
    }

    function getBooks(req, res) {
        var bookId = req.params.bookId;
        res.json(bookModel.FindBooksByUserId(bookId));
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