var articles = [
    {
        title: 'article number one',
        id: 1,
        dateSubmitted: '',
        url: 'website/articles/1',
        summary: 'summary text goes here',
        tagIds: [
            1, 3, 5
        ],
        content: ''
    },
    {
        title: 'article number two',
        id: 2,
        dateSubmitted: '',
        url: 'website/articles/2',
        summary: 'summary text goes here',
        tagIds: [
            1, 4
        ],
        content: ''
    },
    {
        title: 'another article',
        id: 3,
        dateSubmitted: '',
        url: 'website/articles/3',
        summary: 'summary text goes here',
        tagIds: [
            2, 4
        ],
        content: ''
    },
    {
        title: 'an article about something',
        id: 4,
        dateSubmitted: '',
        url: 'website/articles/4',
        summary: 'summary text goes here',
        tagIds: [
            2
        ],
        content: ''
    },
    {
        title: 'an article about another thing',
        id: 5,
        dateSubmitted: '',
        url: 'website/articles/5',
        summary: 'summary text goes here',
        tagIds: [
            3
        ],
        content: ''
    },
    {
        title: 'article article',
        id: 6,
        dateSubmitted: '',
        url: 'website/articles/6',
        summary: 'summary text goes here',
        tagIds: [
            3, 4
        ],
        content: ''
    },
    {
        title: 'title for an article',
        id: 7,
        dateSubmitted: '',
        url: 'website/articles/7',
        summary: 'summary text goes here',
        tagIds: [
            3
        ],
        content: ''
    }
];

for (var i = 8, max = 300; i < max; i += 1) {
    articles.push({
        title: 'title for an article',
        id: i,
        dateSubmitted: '',
        url: 'website/articles/' + i,
        summary: 'summary text goes here',
        tagIds: [
            3
        ],
        content: ''
    });
}

module.exports = articles;