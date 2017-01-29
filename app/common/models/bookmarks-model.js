angular.module('eggly.models.bookmarks', [

    ])
    .service('BookmarksModel', function($http,$q) {
        var model = this,
            URLS = {
                FETCH: 'data/bookmarks.json'
            },
            bookmarks,
            bookmark;

        function extract(result){
            return result.data;
        }

        function cacheBookmarks(result){
            bookmarks = extract(result);
            return bookmarks;
        }

        function findBookmark(bookmarkId){
            return _.find(bookmarks,function(b){
                return b.id === parseInt(bookmarkId,10);
            })
        }

        model.getBookmarkById = function(bookmarkId){
            var deffered = $q.defer();

            if(bookmarks){
                deffered.resolve(findBookmark(bookmarkId));
            }else{
                model.getBookmarks().then(function(){
                    deffered.resolve(findBookmark(bookmarkId));
                });
            }

            return deffered.promise;
        }

        model.getBookmarks = function() {
            var deffered = $q.defer();

            if(bookmarks){
                deffered.resolve(bookmarks);
            }else{
                $http.get(URLS.FETCH).then(function(bookmarks){
                    deffered.resolve(cacheBookmarks(bookmarks));
                });
            }

            return deffered.promise;
        }

        model.createBookmark = function(bookmark){
            bookmark.id = bookmarks.length;
            bookmarks.push(bookmark);
        }

        model.updateBookmark = function(bookmark){
            var index = _.findIndex(bookmarks,function(b){
                return b.id == bookmark.id;
            });

            bookmarks[index] = bookmark;
        }

        model.deleteBookmark = function(bookmark){
            _.remove(bookmarks,function(b){
                return b.id == bookmark.id;
            })
        }

    });
