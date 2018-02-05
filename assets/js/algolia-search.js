/* global instantsearch autocomplete */

var appID = 'Y63Q32NVDL',
    apiKey = '45bce7c03e206c4f2618e69a9f6acfc1',
    indices = {
        news: newsSettings,
        iview: iviewSettings,
        radio: radioSettings,
        television: tvSettings
    },
    lang = 'en',
    currIndex = 'news';

$("#language-select").change(function (e) {
    app({
        appID,
        apiKey,
        lang: e.target.value,
        articlesIndexName: indices[currIndex].name,
        settings: indices[currIndex].settings,
        query: ''
    });
});

$("ul#indices-ul > li > a").click(function (e) {
    var query = $('input.ais-search-box--input').val() || '';
    // console.log('query from new app() call:', query);
    app({
        appID,
        apiKey,
        lang,
        articlesIndexName: indices[e.target.text].name,
        settings: indices[e.target.text].settings,
        callFromIS: true,
        query
    });
})

function app(opts) {
    var search;
    var searchOptions = {
        appId: opts.appID,
        apiKey: opts.apiKey,
        indexName: opts.articlesIndexName,
        urlSync: false,
        searchFunction: function (helper) {
            // console.log('getStateAsQueryString', helper.getStateAsQueryString())
            // console.log('getQueryStringFromState', helper)
            // if (helper.getIndex() !== opts.articlesIndexName) {

            //     if (helper.getIndex().slice(0, 6) !== 'newest' && helper.getIndex().slice(0, 6) !== 'oldest')
            //         helper.clearRefinements().setIndex(opts.articlesIndexName);
            // }
            // console.log('Current index:', helper.getIndex())
            // $('input.ais-search-box--input').val(opts.query)
            if (opts.query && opts.callFromAa) {
                helper.setQuery(opts.query).search();
                opts.callFromAa = false;
            } else {
                if (opts.query && opts.callFromIS) {
                    helper.setQuery(opts.query).search();
                    $('input.ais-search-box--input').val(opts.query);
                    opts.callFromIS = false;
                } else {
                    helper.search();
                }
            }
        }
    }

    if (opts.articlesIndexName === 'ABC_TEST_coremedia_article') {
        search = instantsearch(Object.assign(searchOptions, {
            searchParameters: {
                filters: `lang:${opts.lang}`
            }
        })
        );
    } else {
        search = instantsearch(searchOptions);
    }

    if ($('.ais-search-box').length) {
        $('.ais-search-box').remove();
    }

    $('#genre-facet').empty();
    $('#keyword-facet').empty();
    $('#author-facet').empty();

    search.addWidget(
        instantsearch.widgets.searchBox({
            container: '#search-box',
            placeholder: opts.settings.searchPlaceholder
        })
    );

    search.addWidget(
        instantsearch.widgets.stats({
            container: '#search-stats',
        })
    );

    search.addWidget(
        instantsearch.widgets.currentRefinedValues({
            container: '#current-refined-values',
            clearAll: 'after',
            clearsQuery: true,
            attributes: opts.settings.clearRefinedAttributes,
            onlyListedAttributes: true,
        })
    );

    search.addWidget(
        instantsearch.widgets.hits({
            container: '#hits',
            templates: {
                item: getTemplate(opts.settings.templateName),
                empty: getTemplate('empty')
            }
        })
    );

    opts.settings.refinementLists.forEach(list => {
        search.addWidget(
            instantsearch.widgets.refinementList(list)
        )
    });

    search.addWidget(
        instantsearch.widgets.pagination({
            container: '#pagination-container',
            maxPages: 20,
            scrollTo: false,
            showFirstLast: false,
        })
    );

    search.addWidget(bestBetWidget);

    search.addWidget(
        instantsearch.widgets.sortBySelector({
            container: '#sort-by-container',
            indices: opts.settings.sortByIndices
        })
    );


    search.start();
}

function getTemplate(templateName) {
    return document.querySelector(`#${templateName}-template`).innerHTML;
}