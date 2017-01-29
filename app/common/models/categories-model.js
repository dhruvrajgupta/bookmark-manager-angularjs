angular.module('eggly.models.categories', [

    ])
    .service('CategoriesModel', function($http,$q) {
        var model = this,
            URLS = {
                FETCH: 'data/categories.json'
            },
            categories,
            currentCategory;

        function extract(result){
            return result.data;
        }

        function cacheCategories(result){
            categories = extract(result);
            return categories;
        }

        model.getCategories = function() {
            return (categories) ? $q.when(categories) : $http.get(URLS.FETCH).then(cacheCategories);
        }

        model.setCurrentCategory = function(categoryName){
            return model.getCategoryByName(categoryName)
                .then(function(category){
                    currentCategory = category;
                    console.log("currentCategory : "+currentCategory);
                });
        }

        model.getCurrentCategory = function(){
            return currentCategory;
        }

        model.getCurrentCategoryName = function(){
            return currentCategory ? currentCategory.name : '';
        }

        model.getCategoryByName = function(categoryName){
            var deffered = $q.defer();

            //finding if it includes in the cache
            function findCategory(){
                return _.find(categories,function(c){
                    c.name == categoryName;
                });
            }

            if(categories){
                deffered.resolve(findCategory());
            }else{
                model.getCategories().then(function(result){
                    deffered.resolve(findCategory());
                })
            }

            return deffered.promise;
        }
    });
