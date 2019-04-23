function ResultsViewModel() {
    var self = this;

    // non-editable

    self.tags = {
        1: {
            name: '',
            initSelected: true
        },
        2: {
            name: '',
            initSelected: false
        },
        3: {
            name: '',
            initSelected: true
        },
        4: {
            name: '',
            initSelected: false
        },
        5: {
            name: '',
            initSelected: true
        }
    };

    self.initResults = [
        {
            title: 'aaa',
            url: '',
            summary: '',
            tags: []
        },
        {
            title: 'bbb',
            url: '',
            summary: '',
            tags: []
        },
        {
            title: 'ccc',
            url: '',
            summary: '',
            tags: []
        }
    ];

    // editable

    self.tagsOrdered = ko.observableArray([
        1, 2, 3, 4, 5
    ]);

    self.tagsSelected = ko.observableArray([
        1, 3, 5
    ]);

    // computed

    self.currResults = ko.computed(function () {
        return self.initResults.filter(function (result) {
            result.tags.some(function (tag) {
                return self.tagsSelected.includes(tag);
            });
        }).sort();
    });

    // operations

    self.selectTag = function (tagId) {
        self.selectedTags.push(tagId);
    };

    self.deselectTag = function (tagId) {
        self.selectedTags.remove(tagId);
    };
}

ko.applyBindings(new ResultsViewModel());