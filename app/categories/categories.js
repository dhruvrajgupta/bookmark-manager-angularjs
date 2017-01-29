angular.module('categories', [
        'eggly.models.categories'
    ])
    .config(function($stateProvider) {
        $stateProvider
            .state('eggly.categories', {
                url: '',
                views: {
                    'categories@': {
                        controller: 'CategoriesListCtrl as categoriesListCtrl',
                        templateUrl: 'categories/categories.tmpl.html'
                    },
                    'bookmarks@': {
                        controller: 'BookmarksListCtrl',
                        templateUrl: 'categories/bookmarks/bookmarks.tmpl.html'
                    }
                }
            })
    })
    .controller('CategoriesListCtrl', function CategoriesCtrl(CategoriesModel) {
        var categoriesListCtrl = this;
        CategoriesModel.getCategories()
            .then(function(result) {
                categoriesListCtrl.categories = result;
            });
    });
