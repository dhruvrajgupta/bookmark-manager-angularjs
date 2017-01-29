angular.module('categories.bookmarks', [
        'categories.bookmarks.create',
        'categories.bookmarks.edit',
        'eggly.models.categories',
        'eggly.models.bookmarks'
    ])
    .config(function($stateProvider) {
        $stateProvider
            .state('eggly.categories.bookmarks', {
                url: 'categories/:category',
                views: {
                    'bookmarks@': {
                        templateUrl: 'categories/bookmarks/bookmarks.tmpl.html',
                        controller: 'BookmarksListCtrl as bookmarksListCtrl'
                    }
                }
            })
    })
    .controller('BookmarksListCtrl', function($stateParams, BookmarksModel,CategoriesModel) {
        var bookmarksListCtrl = this;
        console.log($stateParams.category);
        CategoriesModel.setCurrentCategory($stateParams.category);

        BookmarksModel.getBookmarks()
            .then(function(bookmarks) {
                bookmarksListCtrl.bookmarks = bookmarks;
            });

        bookmarksListCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory;
        bookmarksListCtrl.getCurrentCategoryName = $stateParams.category;
        //bookmarksListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;

        bookmarksListCtrl.deleteBookmark = BookmarksModel.deleteBookmark;
    });
