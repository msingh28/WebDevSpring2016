"use strict";

var uuid = require('node-uuid');

module.exports = function() {

    var books = require("./book.mock.json");


    var api = {
        Create: Create,
        FindAll: FindAll,
        FindBooksByUserId: FindBooksByUserId,
        FindById: FindById,
        Delete: Delete,
        findBookByTitle: findBookByTitle
    };
    return api;

    function Create(book, userId) {
        book._id = uuid.v1();
        book.userId = userId;
        books.push(book);
        return book;
    }

    function FindAll() {
        return books;
    }

    function FindBooksByUserId(userId){
        var userBooks = [];
        for(var i=0; i < books.length; i++) {
            if(books[i].userId == userId){
                userBooks.push(books[i]);
            }
        }
        return userBooks;
    }


    function FindById(id) {
        var book=null;
        for(var i=0; i < books.length; i++) {
            if(books[i]._id==id){
                book = books[i];
            }
        }
        return book;
    }

    function Delete(id) {
        for (var i = 0; i < books.length; i++) {
            if (books[i]._id == id) {
                books.splice(i, 1);
                return books;
            }
        }
    }

    function findBookByTitle(title) {
        var book = null;
        for(var i=0; i < books.length; i++) {
            if(books[i].title == title){
                book = books[i];
            }
        }
        return book;
    }
}
