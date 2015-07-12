/**
 * Created by Yonatan.Vainer on 7/9/2015.
 */
angular.module('MainControllers', [])

    .controller('EditBookController', ['HttpService', function(HttpService){

        var vm = this;

        vm.title = "";
        vm.author = "";
        vm.year = "";
        vm.cover = "";
        vm.link = "";

        vm.popover = {
            templateUrl: 'views/editTemplate.html',
            title: 'Book Editor'
        };

        vm.submit = function(bookId){

            HttpService.edit(
                {
                    "title": vm.title,
                    "author": vm.author,
                    "year": vm.year,
                    "link": vm.link,
                    "cover": vm.cover,
                    "id": bookId
                }
            );
        }

    }])

    .controller('LoadBooksController', ['HttpService', function(HttpService){

        var vm = this;
        HttpService.get();

        vm.books = HttpService.books;

    }])

    .controller('InsertBookController', ['HttpService','CoverService','$location', function(HttpService,CoverService,$location){

        var vm = this;
        vm.title = "";
        vm.author = "";
        vm.year = "";
        vm.link = "";
        vm.cover = "";

        vm.submit = function(){

            vm.cover = CoverService.getCover();

            HttpService.create(
                {
                    "title": vm.title,
                    "author": vm.author,
                    "year": vm.year,
                    "link": vm.link,
                    "cover": vm.cover
                }
            );

            $location.path('/');

        };
    }])

    .controller('DeleteBookController', ['HttpService', function(HttpService){

        var vm = this;

        vm.submit = function(bookId) {

            HttpService.delete(bookId);
        };


    }])

    .controller('LoadImageController', ['FileUploader','CoverService', function(FileUploader,CoverService){
        var vm = this;
        vm.uploader = new FileUploader();

        vm.uploader.url = "http://localhost:3000/api/images";

        vm.uploader.onAfterAddingFile = function(item){

            CoverService.setCover(item.file.name);

        };

    }]);