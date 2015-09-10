
var app = angular.module('MyApp', ['ngRoute','ngMessages']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/yesterday', {
      controller: "yesterdayController",
      templateUrl: "views/yesterday.html"
    })
    .when('/projects', {
      controller: "projectsController",
      templateUrl: "views/projects.html"
    })
    .otherwise({
      redirectTo: '/'
    });
});

