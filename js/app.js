<<<<<<< HEAD

var app = angular.module('MyApp', ['ngRoute','ngMessages']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/firstpage', {
      controller: "firstpageController",
      templateUrl: "views/firstpage.html"
    })
    .when('/yesterday', {
      controller: "yesterdayController",
      templateUrl: "views/yesterday.html"
    })
    .when('/projects', {
      controller: "projectsController",
      templateUrl: "views/projects.html"
    })
    .when('/aboutme', {
      controller: "aboutmeController",
      templateUrl: "views/aboutme.html"
    })
    .otherwise({
      redirectTo: '/firstpage'
    });
});
=======
var app = angular.module('MyApp', ['ui.router','ngMap','ngAutocomplete']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('result', {
        url: '/result',
        templateUrl: './views/result.html',
        controller: 'resultController',
    });

    $urlRouterProvider.otherwise('result');
    
}]);


>>>>>>> 5234c3f8ac3993a7d06ce59aff3e2b9673c328a4

