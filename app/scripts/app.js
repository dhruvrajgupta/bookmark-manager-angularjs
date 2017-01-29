'use strict';

/**
 * @ngdoc overview
 * @name egglyApp
 * @description
 * # egglyApp
 *
 * Main module of the application.
 */
angular
    .module('Eggly', [
            'ngAnimate',
            'ui.router',
            'categories',
            'categories.bookmarks'
        ])
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('eggly', {
                url:'/',
                abstract: true
            })
        ;

        $urlRouterProvider.otherwise('/');
    })
;