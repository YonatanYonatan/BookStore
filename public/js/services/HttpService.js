/**
 * Created by Yonatan.Vainer on 7/10/2015.
 */
angular.module('HttpService', [])

    .factory('HttpService', ['$http', function($http) {

        var books = {
            list: []
        };

        var obj = {};

        obj.books = books;

        obj.get = function(){
            return $http.get('/api/books')
                .then(function(booksData){
                    books.list = booksData.data;
                });
        };

        obj.create = function(bookData) {
            return $http.post('/api/books', bookData)
                .then(function(d){
                    obj.get();
                });
        };

        obj.delete = function(bookId) {
            return $http.delete('/api/books/'+bookId)
                .then(function(d){
                    obj.get();
                });
        };

        obj.edit = function(bookData) {
            return $http.put('/api/books', bookData)
                .then(function(d){
                    obj.get();
                });
        };

        return obj;
    }]);