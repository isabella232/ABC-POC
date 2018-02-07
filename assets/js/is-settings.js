var newsSettings = {
    name: 'ABC_TEST_coremedia_article',
    settings: {
        searchPlaceholder: 'Search the ABC for news by title, keyword, or author...',
        sortByIndices: [
            { name: 'ABC_TEST_coremedia_article', label: 'Newest' },
            // { name: 'newest-articles', label: 'Newest' },
            { name: 'oldest-articles', label: 'Oldest' }
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
        ],
        clearRefinedAttributes: [
            { name: 'genre', label: 'Genre' },
            { name: 'keywords', label: 'Keyword' },
            { name: 'attribution', label: 'Author' },
        ]
    }
}

var iviewSettings = {
    name: 'ABC_TEST_iview',
    settings: {
        searchPlaceholder: 'Search for iView programs by series, episode title, or keyword...',
        sortByIndices: [
            { name: 'ABC_TEST_iview', label: 'Newest' },
            // { name: 'newest-iview', label: 'Newest' },
            { name: 'oldest-iview', label: 'Oldest' }
        ],
        templateName: 'iview',
        refinementLists: [
            {
                container: '#genre-facet',
                attributeName: 'classification',
                operator: 'or',
                limit: 5,
                showMore: {
                    templates: {
                        active: '<div class="show-more"><button class="ais-RefinementList__showMore">Show less</button></div>',
                        inactive: '<div class="show-more"><button class="ais-RefinementList__showMore">Show more</button></div>'
                    }
                },
                templates: {
                    header: 'Rating'
                }
            },
            {
                container: '#keyword-facet',
                attributeName: 'channel.title',
                operator: 'or',
                limit: 5,
                searchForFacetValues: {
                    placeholder: 'Search for channels'
                },
                showMore: {
                    templates: {
                        active: '<div class="show-more"><button class="ais-RefinementList__showMore">Show less</button></div>',
                        inactive: '<div class="show-more"><button class="ais-RefinementList__showMore">Show more</button></div>'
                    }
                },
                templates: {
                    header: 'Channel'
                }
            },
            {
                container: '#author-facet',
                attributeName: 'series.title',
                operator: 'or',
                limit: 5,
                searchForFacetValues: {
                    placeholder: 'Search for series'
                },
                showMore: {
                    templates: {
                        active: '<div class="show-more"><button class="ais-RefinementList__showMore">Show less</button></div>',
                        inactive: '<div class="show-more"><button class="ais-RefinementList__showMore">Show more</button></div>'
                    }
                },
                templates: {
                    header: 'Series'
                }
            }
        ],
        clearRefinedAttributes: [
            { name: 'classification', label: 'Rating' },
            { name: 'channel.title', label: 'Channel' },
            { name: 'series.title', label: 'Series' },
        ]
    }
}

var radioSettings = {
    name: 'ABC_TEST_coremedia_audio',
    settings: {
        searchPlaceholder: 'Search for radio programs by title or keyword...',
        sortByIndices: [
            { name: 'ABC_TEST_coremedia_audio', label: 'Newest' },
            // { name: 'newest-radio', label: 'Newest' },
            { name: 'oldest-radio', label: 'Oldest' }
        ],
        templateName: 'radio',
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
                attributeName: 'source',
                operator: 'or',
                limit: 5,
                searchForFacetValues: {
                    placeholder: 'Search for sources'
                },
                showMore: {
                    templates: {
                        active: '<div class="show-more"><button class="ais-RefinementList__showMore">Show less</button></div>',
                        inactive: '<div class="show-more"><button class="ais-RefinementList__showMore">Show more</button></div>'
                    }
                },
                templates: {
                    header: 'Source'
                }
            }
        ],
        clearRefinedAttributes: [
            { name: 'genre', label: 'Genre' },
            { name: 'keywords', label: 'Keyword' },
            { name: 'source', label: 'Source' },
        ]
    }
}

var tvSettings = {
    name: 'ABC_TEST_coremedia_video',
    settings: {
        searchPlaceholder: 'Search for television programs by title or keyword...',
        sortByIndices: [
            { name: 'ABC_TEST_coremedia_video', label: 'Newest' },
            // { name: 'newest-tv', label: 'Newest' },
            { name: 'oldest-tv', label: 'Oldest' }
        ],
        templateName: 'tv',
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
        ],
        clearRefinedAttributes: [
            { name: 'genre', label: 'Genre' },
            { name: 'keywords', label: 'Keyword' },
            { name: 'attribution', label: 'Author' },
        ]
    }
}

var heywireSettings = {
    name: 'media_aggregate',
    settings: {
        searchPlaceholder: 'Search Heywire for news by title, keyword, or author...',
        sortByIndices: [
            { name: 'media_aggregate', label: 'Newest' },
            { name: 'oldest-aggregate', label: 'Oldest' }
        ],
        templateName: 'heywire',
        refinementLists: [
            {
                container: '#genre-facet',
                attributeName: 'docType',
                operator: 'or',
                limit: 5,
                showMore: {
                    templates: {
                        active: '<div class="show-more"><button class="ais-RefinementList__showMore">Show less</button></div>',
                        inactive: '<div class="show-more"><button class="ais-RefinementList__showMore">Show more</button></div>'
                    }
                },
                templates: {
                    header: 'Media Type'
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
            // {
            //     container: '#author-facet',
            //     attributeName: 'attribution',
            //     operator: 'or',
            //     limit: 5,
            //     searchForFacetValues: {
            //         placeholder: 'Search for authors'
            //     },
            //     showMore: {
            //         templates: {
            //             active: '<div class="show-more"><button class="ais-RefinementList__showMore">Show less</button></div>',
            //             inactive: '<div class="show-more"><button class="ais-RefinementList__showMore">Show more</button></div>'
            //         }
            //     },
            //     templates: {
            //         header: 'Author'
            //     }
            // }
        ],
        clearRefinedAttributes: [
            { name: 'docType', label: 'Media Type' },
            { name: 'keywords', label: 'Keyword' },
        ]
    }
}

