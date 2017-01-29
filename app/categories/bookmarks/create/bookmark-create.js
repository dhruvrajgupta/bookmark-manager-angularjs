angular.module('categories.bookmarks.create', [

    ])
    .config(function($stateProvider) {
        $stateProvider
            .state('eggly.categories.bookmarks.create', {
                url: '/bookmarks/create',
                templateUrl: 'categories/bookmarks/create/bookmark-create.tmpl.html',
                controller: 'CreateBookmarkCtrl as createBookmarkCtrl'
            });
    })
    .controller('CreateBookmarkCtrl', function($state,$stateParams,BookmarksModel) {
        var createBookmarkCtrl = this;

        function returnToBookmarks(){
            $state.go('eggly.categories.bookmarks',{
                category: $stateParams.category
            });
        }

        createBookmarkCtrl.cancelCreating = function(){
            returnToBookmarks();
        }

        createBookmarkCtrl.createBookmark = function(bookmark){
            console.log("new Bookmark : "+bookmark);
            BookmarksModel.createBookmark(bookmark);
            returnToBookmarks();
        }

        function resetForms(){
            createBookmarkCtrl.newBookmark = {
                title: '',
                url: '',
                category: $stateParams.category
            }
        }

        resetForms();
    })
;