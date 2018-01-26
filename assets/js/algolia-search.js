/* global instantsearch autocomplete */

var appID = 'Y63Q32NVDL',
    apiKey = '45bce7c03e206c4f2618e69a9f6acfc1',
    indices = {
        news: 'ABC_TEST_coremedia_article',
        iview: 'ABC_TEST_iview',
        radio: 'ABC_TEST_coremedia_audio',
        tv: 'ABC_TEST_coremedia_video'
    },
    lang = $("#language-select :selected").text(),
    currIndex = $('ul#indices-ul > li > a.active').text().toLowerCase();

app({
    appID,
    apiKey,
    articlesIndexName: indices[currIndex],
    lang
});

$("ul#indices-ul > li > a").click(function (e) {
    $("ul#indices-ul > li > a").removeClass("active");
    currIndex = e.target.text.toLowerCase();
    $(e.target).addClass("active");
    app({
        appID,
        apiKey,
        articlesIndexName: indices[currIndex],
        lang
    });
})


$("#language-select").change(function (e) {
    app({
        appID,
        apiKey,
        articlesIndexName: indices[currIndex],
        lang: e.target.value
    });
});

function app(opts) {
    var search = instantsearch({
        appId: opts.appID,
        apiKey: opts.apiKey,
        indexName: opts.articlesIndexName,
        urlSync: true,
        searchParameters: {
            filters: `lang:${opts.lang}`
        }
    });

    console.log('Using', search)

    if ($('.ais-search-box').length) {
        $('.ais-search-box').remove();
    }

    search.addWidget(
        instantsearch.widgets.searchBox({
            container: '#search-box',
            placeholder: 'Search the ABC for news...'
            // poweredBy: [boolean|SearchBoxPoweredByOption], 
            // reset: [boolean|SearchBoxResetOption], 
            // magnifier: [boolean|SearchBoxMagnifierOption], 
            // loadingIndicator: [boolean|SearchBoxLoadingIndicatorOption], 
            // wrapInput: [boolean], 
            // autofocus: [boolean|string], 
            // searchOnEnterKeyPressOnly: [boolean], 
            // cssClasses: [SearchBoxCSSClasses], 
            // queryHook: [function], 
        })
    );

    search.addWidget(
        instantsearch.widgets.stats({
            container: '#search-stats',
            // templates: [StatsWidgetTemplates], 
            // transformData: [StatsWidgetTransforms], 
            // autoHideContainer: [boolean], 
            // cssClasses: [StatsWidgetCssClasses], 
        })
    );

    search.addWidget(
        instantsearch.widgets.sortBySelector({
            container: '#sort-by-container',
            indices: [
                { name: 'ABC_TEST_coremedia_article', label: 'Relevance' },
                { name: 'newest-article', label: 'Newest' },
                { name: 'oldest-article', label: 'Oldest' }
            ],
            // autoHideContainer: [boolean], 
            // cssClasses: [SortByWidgetCssClasses], 
        })
    );


    search.addWidget(
        instantsearch.widgets.hits({
            container: '#hits',
            templates: {
                item: getTemplate('article')
            }
        })
    );

    search.addWidget(
        instantsearch.widgets.refinementList({
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
        })
    );

    search.addWidget(
        instantsearch.widgets.refinementList({
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
        })
    );

    search.addWidget(
        instantsearch.widgets.refinementList({
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
        })
    );


    search.addWidget(
        instantsearch.widgets.pagination({
            container: '#pagination-container',
            maxPages: 20,
            // default is to scroll to 'body', here we disable this behavior
            scrollTo: false,
            showFirstLast: false,
        })
    );

    search.addWidget(bestBetWidget);
    search.start();
}

function getTemplate(templateName) {
    return document.querySelector(`#${templateName}-template`).innerHTML;
}