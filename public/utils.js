
var utils = {

    // object factories

    Tags: function (tags) {
        return tags.map(function (tag) {
            return utils.Tag(tag)
        });
    },

    Tag: function (tag) {
        return {
            'id': tag.id,
            'name': tag.name,
            'isInitSelected': tag.selected,
            'isSelected': tag.selected
        }
    },

    // event handlers

    loadTags: function () {
        utils.getTags(function (response) {
            container.$data.tags = utils.Tags(response.tags);
        });
    },

    submitSearch: function (event) {
        var formData = new FormData(document.getElementById('search-form'));
        var searchString = formData.get('searchString');
        var body = JSON.stringify({
            'searchString': searchString
        });

        event.preventDefault();

        if (searchString && searchString !== '') {
            utils.postSearch(body, function (response) {
                container.$data.serverResults = response.results;
                container.$data.clientResults = response.results;
                container.$data.searchString = '';
            });
        }
    },

    suggestSearchString: function (event) {
        var searchString = event.target.value;

        if (searchString !== '') {
            utils.getSearchSuggestions(searchString, function (response) {
                container.$data.suggestions = response.suggestions;
            });
        }
        else {
            container.$data.suggestions = [];
        }
        console.log(container.$data.suggestions);
    },

    // operations

    getTags: function (callback) {
        var xmlhttp = new XMLHttpRequest();
    
        xmlhttp.open('GET', '/api/tags', true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
        xmlhttp.send();
    },

    getSearchSuggestions: function (searchString, callback) {
        var xmlhttp = new XMLHttpRequest();
    
        xmlhttp.open('GET', '/api/suggestions?search='+searchString, true);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
        xmlhttp.send();
    },

    postSearch: function (body, callback) {
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
};