
var app = angular.module('MyApp', ['ngRoute','ngMessages']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/firstpage', {
      controller: "firstpageController",
      templateUrl: "views/firstpage.html"
    })
    .otherwise({
      redirectTo: '/firstpage'
    });
});

