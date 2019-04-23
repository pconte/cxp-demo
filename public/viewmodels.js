function ResultsViewModel() {
    var self = this;

    // editable

    self.serverResults = ko.observableArray([
        {
            title: 'article number one',
            id: 1,
            dateSubmitted: '',
            url: 'website/articles/1',
            summary: 'summary text goes here',
            tagIds: [
                1, 3, 5
            ]
        },
        {
            title: 'article number two',
            id: 2,
            dateSubmitted: '',
            url: 'website/articles/2',
            summary: 'summary text goes here',
            tagIds: [
                1, 4
            ]
        },
        {
            title: 'another article',
            id: 3,
            dateSubmitted: '',
            url: 'website/articles/3',
            summary: 'summary text goes here',
            tagIds: [
                2, 4
            ]
        }
    ]);

    self.tags = ko.observableArray([
        {
            id: 1,
            name: 'aaa',
            isInitSelected: true,
            isSelected: ko.observable(true)
        },
        {
            id: 2,
            name: 'bbb',
            isInitSelected: false,
            isSelected: ko.observable(false)
        },
        {
            id: 3,
            name: 'ccc',
            isInitSelected: true,
            isSelected: ko.observable(true)
        },
        {
            id: 4,
            name: 'ddd',
            isInitSelected: false,
            isSelected: ko.observable(false)
        },
        {
            id: 5,
            name: 'eee',
            isInitSelected: true,
            isSelected: ko.observable(true)
        }
    ]);

    // computed

    self.selectedTagIds = ko.computed(function () {
        return self.tags().filter(function (tag) {
            return tag.isSelected();
        }).map(function (tag) {
            return tag.id
        });
    });

    self.currResults = ko.computed(function () {
        return ko.utils.arrayFilter(self.serverResults(), function (result) {
            return result.tagIds.some(function (tagId) {
                return self.selectedTagIds().includes(tagId);
            });
        }).sort(function (a, b) {

        });
    });

    // handlers

    self.submitSearch = function () {
        var formData = new FormData(document.getElementById('searchForm'));
        var body = JSON.stringify({
            'searchString': formData.get('searchString')
        });

        event.preventDefault();

        self.postSearch(body, function (response) {
            console.log(response);
            document.getElementById('searchesList').innerHTML = response.searches;
            self.serverResults(response.results);
        });
    }

    // operations

    self.selectTag = function (tagId) {
        self.selectedTags.push(tagId);
    };

    self.deselectTag = function (tagId) {
        self.selectedTags.remove(tagId);
    };

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

ko.applyBindings(new ResultsViewModel());