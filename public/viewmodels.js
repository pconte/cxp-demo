function ResultsViewModel() {
    var self = this;

    // non-editable

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

    self.tags = ko.observableArray([
        {
            id: 1,
            name: 'aaa',
            isInitSelected: true,
            isSelected: true
        },
        {
            id: 2,
            name: 'bbb',
            isInitSelected: false,
            isSelected: false
        },
        {
            id: 3,
            name: 'ccc',
            isInitSelected: true,
            isSelected: true
        },
        {
            id: 4,
            name: 'ddd',
            isInitSelected: false,
            isSelected: false
        },
        {
            id: 5,
            name: 'eee',
            isInitSelected: true,
            isSelected: true
        }
    ]);

    // computed

    self.selectedTagIds = ko.computed(function () {
        return self.tags().filter(function (tag) {
            return tag.selected;
        }).map(function (tag) {
            return tag.id
        });
    });

    self.currResults = ko.computed(function () {
        return self.initResults.filter(function (result) {
            result.tags.some(function (tag) {
                return self.selectedTagIds.includes(tag.id);
            });
        }).sort(function (a, b) {

        });
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