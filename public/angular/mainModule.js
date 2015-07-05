(function() {

    var app = angular.module('mainModule', ['ngRoute','ui.bootstrap']);

    app.factory('LoadService', ['$http', function($http) {

        var books =  {
                list: []
            };

        return {
            books: books,
            loadData: function () {
                $http.get('/books')
                    .then(function (booksData) {
                        books.list = booksData.data;
                    })
            }
        }
    }]);

    app.config(['$routeProvider','$locationProvider', function($routeProvider){
        $routeProvider
            .when("/", {templateUrl: "intro.html", controller: ""})
            .when("/about", {templateUrl: "about.html", controller: ""})
            .when("/add", {templateUrl: "add.html", controller: ""});
    }]);


    app.controller('EditBookController', ['$http','LoadService', function($http,LoadService){

        var vm = this;


        vm.title = "";
        vm.author = "";
        vm.year = "";
        vm.link = "";

        vm.popover = {
            templateUrl: '/editTemplate.html',
            title: 'Book Editor'
        };

        vm.submit = function(id){

            $http.post('/', {"opp": "edit", "data": {"title": vm.title, "author": vm.author , "year": vm.year, "id": id, "link": vm.link}}).success(function(data) {
                LoadService.loadData();
            });
        };
    }]);

    app.controller('LoadBooksController', ['LoadService', function(LoadService){

        var vm = this;
        LoadService.loadData();

        vm.books = LoadService.books;

    }]);

    app.controller('InsertBookController', ['$http', 'LoadService', '$location', function($http,LoadService,$location){

        var vm = this;
        vm.title = "";
        vm.author = "";
        vm.year = "";
        vm.link = "";

        vm.submit = function(){

            $http.post('/', {"opp": "insert", "data": {"title": vm.title, "author": vm.author , "year": vm.year, "link": vm.link}}).success(function(data){
                LoadService.loadData();
            });
            $location.path('/');

        };
    }]);

    app.controller('DeleteBookController', ['$http','LoadService', function($http,LoadService){

        var vm = this;

        vm.submit = function(id) {

            $http.post('/', {"opp": "delete", "data": {"id": id}}).success(function (data) {
                LoadService.loadData();
            });
        };


    }]);


})();