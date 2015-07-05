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

    app.config(['$routeProvider','$locationProvider', function($routeProvider){
        $routeProvider
            .when("/", {templateUrl: "intro.html", controller: ""})
            .when("/about", {templateUrl: "about.html", controller: ""})
            .when("/add", {templateUrl: "add.html", controller: ""});
    }]);


    app.controller('EditBookController', ['$http', function($http){

        var vm = this;

        vm.title = "";
        vm.author = "";
        vm.year = "";

        vm.popover = {
            templateUrl: '/editTemplate.html',
            title: 'Book Editor'
        };

        vm.submit = function(id){

            $http.post('/', {"opp": "edit", "data": {"title": vm.title, "author": vm.author , "year": vm.year, "id": id}}).success(function(data) {

            });
        };
    }]);

    app.controller('LoadBooksController', ['$http', function($http){

        var vm = this;
        vm.books = [];

        $http.get('/books').success(function(data){
                vm.books = data;
        });

    }]);

    app.controller('InsertBookController', ['$http', function($http){

        var vm = this;
        vm.title = "";
        vm.author = "";
        vm.year = "";

        vm.submit = function(){

            $http.post('/', {"opp": "insert", "data": {"title": vm.title, "author": vm.author , "year": vm.year}}).success(function(data){

            });

        };
    }]);

    app.controller('DeleteBookController', ['$http', function($http){

        var vm = this;

        vm.submit = function(id) {

            $http.post('/', {"opp": "delete", "data": {"id": id}}).success(function (data) {

            });
        };


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


        store.removeBook = function(id){
            StorageService.remove(id);

        }

    });



})();