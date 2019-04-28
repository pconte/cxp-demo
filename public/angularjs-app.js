// App
var app = angular.module('App', [
    'Results',
    'Tags',
    'Search'
]);

app.controller('AppController', function ($rootScope) {
    $rootScope.tags = [];
    $rootScope.selectedTagIds = [];
    $rootScope.results = [];
    $rootScope.clientResults = [];
});


// Search
var searchModule = angular.module('Search', []);
searchModule.service('SearchService', function ($http) {
    this.postSearch = function (body) {
        return $http.post('/api/search', body).then(function (response) {
            return response.data.results;
        });
    };
});
searchModule.controller('SearchController', function ($rootScope, $scope, SearchService, ResultsService) {
    $scope.searchString = '';

    $scope.submitSearch = function () {
        var body = JSON.stringify({
            'searchString': $scope.searchString
            // additional options can go here
            // also can capture the user session and environment for analytics
        });

        if ($scope.searchString !== '') {
            SearchService.postSearch(body).then(function (results) {
                $rootScope.results = results;
                $rootScope.clientResults = ResultsService.filterResults();
            });
        }
    };
});


// Tags
var tagsModule = angular.module('Tags', []);
tagsModule.service('TagsService', function ($http, $rootScope) {
    this.getTags = function () {
        return $http.get('/api/tags').then(function (response) {
            return response.data.tags;
        });
    };
    this.getSelectedTags = function () {
        return $rootScope.tags.filter(function (tag) {
            return tag.isSelected;
        }).map(function (tag) {
            return tag.id;
        });
    };
});
tagsModule.controller('TagsController', function ($rootScope, $scope, TagsService, ResultsService) {
    TagsService.getTags().then(function (tags) {
        $rootScope.tags = tags;
    });

    $scope.toggleTag = function () {
        $rootScope.selectedTagIds = TagsService.getSelectedTags();
        $rootScope.clientResults = ResultsService.filterResults();
    };
});


// Results
var resultsModule = angular.module('Results', []);
resultsModule.service('ResultsService', function ($rootScope) {
    this.filterResults = function () {
        return $rootScope.selectedTagIds.length > 0
            ? $rootScope.results.filter(function (result) {
                return result.tagIds.some(function (tagId) {
                    return $rootScope.selectedTagIds.includes(tagId)
                });
            })
            : $rootScope.results;
    }
});
resultsModule.controller('ResultsController', function ($rootScope, $scope, ResultsService) {});