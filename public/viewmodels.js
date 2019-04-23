function ResultsViewModel() {
    var self = this;

    // non-editable

    self.initResults = [
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
            return tag.isSelected;
        }).map(function (tag) {
            return tag.id
        });
    });

    self.currResults = ko.computed(function () {
        return self.initResults.filter(function (result) {
            return result.tagIds.some(function (tagId) {
                return self.selectedTagIds().includes(tagId);
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