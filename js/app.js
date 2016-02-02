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



