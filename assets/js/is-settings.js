var newsSettings = {
    name: 'ABC_TEST_coremedia_article',
    settings: {
        searchPlaceholder: 'Search the ABC for news by title, keyword, or author...',
        sortByIndices: [
            { name: 'ABC_TEST_coremedia_article', label: 'Relevance' },
            { name: 'newest-article', label: 'Newest' },
            { name: 'oldest-article', label: 'Oldest' }
        ],
        templateName: 'article',
        refinementLists: [
            {
                container: '#genre-facet',
                attributeName: 'genre',
                operator: 'or',
                limit: 5,
                showMore: {
                    templates: {
                        active: '<div class="show-more"><button class="ais-RefinementList__showMore">Show less</button></div>',
                        inactive: '<div class="show-more"><button class="ais-RefinementList__showMore">Show more</button></div>'
                    }
                },
                templates: {
                    header: 'Genre'
                }
            },
            {
                container: '#keyword-facet',
                attributeName: 'keywords',
                operator: 'or',
                limit: 5,
                searchForFacetValues: {
                    placeholder: 'Search for keywords'
                },
                showMore: {
                    templates: {
                        active: '<div class="show-more"><button class="ais-RefinementList__showMore">Show less</button></div>',
                        inactive: '<div class="show-more"><button class="ais-RefinementList__showMore">Show more</button></div>'
                    }
                },
                templates: {
                    header: 'Keywords'
                }
            },
            {
                container: '#author-facet',
                attributeName: 'attribution',
                operator: 'or',
                limit: 5,
                searchForFacetValues: {
                    placeholder: 'Search for authors'
                },
                showMore: {
                    templates: {
                        active: '<div class="show-more"><button class="ais-RefinementList__showMore">Show less</button></div>',
                        inactive: '<div class="show-more"><button class="ais-RefinementList__showMore">Show more</button></div>'
                    }
                },
                templates: {
                    header: 'Author'
                }
            }
        ]
    }
}

var iviewSettings = {
    name: 'ABC_TEST_iview',
    settings: {
        searchPlaceholder: 'Search for iView programs by series, episode title, or keyword...',
        sortByIndices: [
            { name: 'ABC_TEST_iview', label: 'Relevance' },
            { name: 'shortest-iview', label: 'Shortest' },
            { name: 'longest-iview', label: 'Longest' }
        ],
        templateName: 'iview',
        refinementLists: []
    }
}

var radioSettings = {
    name: 'ABC_TEST_coremedia_audio',
    settings: {
        searchPlaceholder: 'Search for radio programs by title or keyword...',
        sortByIndices: [
            { name: 'ABC_TEST_coremedia_audio', label: 'Relevance' },
            { name: 'newest-radio', label: 'Newest' },
            { name: 'oldest-radio', label: 'Oldest' }
        ],
        templateName: 'radio',
        refinementLists: []
    }
}

var tvSettings = {
    name: 'ABC_TEST_coremedia_video',
    settings: {
        searchPlaceholder: 'Search for television programs by title or keyword...',
        sortByIndices: [
            { name: 'ABC_TEST_coremedia_video', label: 'Relevance' },
            { name: 'shortest-tv', label: 'Shortest' },
            { name: 'longest-tv', label: 'Longest' }
        ],
        templateName: 'tv',
        refinementLists: []
    }
}

