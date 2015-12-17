var app = angular.module('MyApp', ['ui.router','ngMap','ngAutocomplete']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('firstpage', {
        url: '/firstpage',
        templateUrl: 'views/firstpage.html',
        controller: 'firstpageController',
    })
    .state('result', {
        url: '/result',
        templateUrl: './views/result.html',
        controller: 'resultController',
    });

    $urlRouterProvider.otherwise('result');
    
}]);



