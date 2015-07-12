/**
 * Created by Yonatan.Vainer on 7/9/2015.
 */
angular.module('appRoutes', [])
    .config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){

        $routeProvider
            .when("/", {
                templateUrl: "views/intro.html", controller: ""
            })
            .when("/about", {
                templateUrl: "views/about.html", controller: ""
            })
            .when("/add", {
                templateUrl: "views/add.html", controller: ""
            })
            .when("/upload", {
                templateUrl: "views/upload.html", controller: ""
            });

        $locationProvider.html5Mode(true);
}]);