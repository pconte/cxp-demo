Vue.component('searchForm', {

});

Vue.component('suggestion', {
    props: ['suggestion'],
    template: `
        <li>
            {{ suggestion.suggestion }} ({{ suggestion.count }})
        </li>
    `,
});

Vue.component('tag', {
    props: ['tag'],
    template: `
        <div>
            <input
                type="checkbox"
                v-bind:id="tag.id"
                v-model="tag.isSelected"
                v-on:change="toggleTag"
            >
            <span class="name">{{ tag.name }}</span>
        </div>
    `,
    methods: {
        toggleTag: function () {
            var selectedTagIds = container.$data.tags.filter(function (tag) {
                return tag.isSelected;
            }).map(function (tag) {
                return tag.id;
            });

            container.$data.clientResults = container.$data.serverResults.filter(function (result) {
                return result.tagIds.some(function (tagId) {
                    return selectedTagIds.includes(tagId)
                });
            });
        },
    }
});

Vue.component('result', {
    props: ['result'],
    template: `
        <div class="result">
            <span class="title">{{ result.title }}</span>
            <span class="url">{{ result.url }}</span>
            <span class="summary">{{ result.summary }}</span>
        </div>
    `
});

var container = new Vue({
    el: '#container',
    data: {
        searchString: '',
        suggestions: [],
        tags: [],
        selectedTags: [],
        serverResults: [],
        clientResults: []
    },
    mounted() {
        this.loadTags();
    },
    methods: {
    
        // object factories
    
        Tags: function (tags) {
            var self = this;
            return tags.map(function (tag) {
                return self.Tag(tag)
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
            var self = this;
            this.getTags(function (response) {
                container.$data.tags = self.Tags(response.tags);
            });
        },
    
        submitSearch: function (event) {
            var searchString = container.$data.searchString;
            var body = JSON.stringify({
                'searchString': searchString
            });
    
            event.preventDefault();
    
            if (searchString && searchString !== '') {
                this.postSearch(body, function (response) {
                    container.$data.serverResults = response.results;
                    container.$data.clientResults = response.results;
                    container.$data.searchString = '';
                });
            }
        },
    
        suggestSearchString: function (event) {
            var searchString = container.$data.searchString;
    
            if (searchString !== '') {
                this.getSearchSuggestions(searchString, function (response) {
                    container.$data.suggestions = response.suggestions;
                });
            }
            else {
                container.$data.suggestions = [];
            }
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
    }
});
