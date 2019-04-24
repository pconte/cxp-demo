var vm = new ResultsViewModel();

ko.applyBindings(vm);
vm.loadTags();

function ResultsViewModel() {
    var self = this;


    // object model factories

    self.Tags = function (tags) {
        return tags.map(function (tag) {
            return self.Tag(tag)
        });
    }

    self.Tag = function (tag) {
        return {
            'id': tag.id,
            'name': tag.name,
            'isInitSelected': tag.selected,
            'isSelected': ko.observable(tag.selected)
        }
    }


    // data

    self.searchString = ko.observable();

    self.suggestions = ko.observableArray([]);

    self.serverResults = ko.observableArray([]);

    self.tags = ko.observableArray([]);


    // computed

    self.selectedTagIds = ko.computed(function () {
        return self.tags().filter(function (tag) {
            return tag.isSelected();
        }).map(function (tag) {
            return tag.id
        });
    });

    self.currResults = ko.computed(function () {
        if (self.selectedTagIds() && self.selectedTagIds().length > 0) {
            return ko.utils.arrayFilter(self.serverResults(), function (result) {
                return result.tagIds.some(function (tagId) {
                    return self.selectedTagIds().includes(tagId);
                });
            }).sort(function (a, b) {

            });
        }
        else {
            return self.serverResults();
        }
    });


    // handlers

    self.loadTags = function () {
        self.getTags(function (response) {
            self.tags(self.Tags(response.tags));
        });
    }

    self.submitSearch = function () {
        var formData = new FormData(document.getElementById('search-form'));
        var searchString = formData.get('searchString');
        var body = JSON.stringify({
            'searchString': searchString
        });

        event.preventDefault();

        if (searchString && searchString !== '') {
            self.postSearch(body, function (response) {
                self.serverResults(response.results);
                self.searchString('');
            });
        }
    }

    self.suggestSearchString = function () {
        if (self.searchString() && self.searchString() !== '') {
            self.getSearchSuggestions(self.searchString(), function (response) {
                self.suggestions(response.suggestions);
            });
        }
        else {
            self.suggestions([]);
        }
    }


    // operations

    self.getTags = function (callback) {
        var xmlhttp = new XMLHttpRequest();
    
        xmlhttp.open('GET', '/api/tags', true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
        xmlhttp.send();
    }

    self.getSearchSuggestions = function (searchString, callback) {
        var xmlhttp = new XMLHttpRequest();
    
        xmlhttp.open('GET', '/api/suggestions?search='+searchString, true);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
        xmlhttp.send();
    }

    self.postSearch = function (body, callback) {
        var xmlhttp = new XMLHttpRequest();
    
        xmlhttp.open('POST', '/api/search', true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
        xmlhttp.send(body);
    }
}