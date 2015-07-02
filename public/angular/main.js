(function() {

    var app = angular.module('mainModule', ['ngRoute','ui.bootstrap']);

    app.service('StorageService', function(){

        var id = 3;
        var books = [
            {
                id: 1,
                title: "boo",
                author: "kremer",
                year: "1995"
            },
            {
                id: 2,
                title: "foo",
                author: "george",
                year: "1999"
            }];

        this.add = function(book){

            book.id = id;
            books.push(book);
            id++;
        };

        this.edit = function(id, nbook){

            for(i in books){
                if (books[i].id == id){
                    books[i] = nbook;
                }
            }
        };

        this.remove = function(id){

            for(i in books){
                if (books[i].id == id){
                    books.splice(i, 1);
                }
            }
        };

        this.list = function(){
            return books;
        };

    });

    app.config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when("/about", {templateUrl: "about.jsp", controller: "PageController"})
            .when("/add", {templateUrl: "add.jsp", controller: "PageController"})
            .when("/remove", {templateUrl: "remove.jsp", controller: "PageController"})
            .otherwise({redirectTo: '/'});

    }]);

    app.controller('PageController', function (StorageService) {

        var store = this;
        store.books = StorageService.list();
        store.queryBy = "$";

        store.ntitle = "";
        store.nauthor = "";
        store.nyear= "";

        store.editBook = function(id){

            StorageService.edit(id, {title: store.ntitle, author: store.nauthor, year: store.nyear, id: id});
        }

        store.dynamicPopover = {
            content: 'Hi!',
            templateUrl: 'editTemplate.html',
            title: 'Title...'
        };
    });

    app.controller('AddBooksController', function(StorageService) {

        var store = this;
        store.books = StorageService.list();

        store.newbook = {};

        store.addBook = function(){
            StorageService.add(store.newbook);
            store.newbook = {};
        }

    });

    app.controller('RemoveBooksController', function(StorageService) {

        var store = this;

        store.id = null;

        store.removeBook = function(){
            StorageService.remove(store.id);
            store.id = null;

        }

    });



})();