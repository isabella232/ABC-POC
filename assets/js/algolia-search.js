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
        indexName: indices[currIndex].name,
        settings: indices[currIndex].settings,
        query: ''
    });
});

$("#full-text-select").change(function (e) {
    console.log(e.target.value)
    console.log('from click handler', $('input.ais-search-box--input').val())
    if (e.target.value === 'on') {
        app({
            appID,
            apiKey,
            lang: $('#language-select option:selected').val(),
            indexName: indices[currIndex].name,
            settings: indices[currIndex].settings,
            query: $('input.ais-search-box--input').val(),
            callFromIS: true,
        });
    }
    else {
        app({
            appID,
            apiKey,
            lang: $('#language-select option:selected').val(),
            indexName: indices[currIndex].name,
            settings: indices[currIndex].settings,
            query: $('input.ais-search-box--input').val(),
            restrict: ['title', 'keywords', 'synopsis'],
            callFromIS: true,
        });
    }

});

$("ul#indices-ul > li > a").click(function (e) {
    var query = '';
    if ($('input.ais-search-box--input').length) {
        query = $('input.ais-search-box--input').val()
    } else if ($('input.aa-input').length) {
        query = $('input.aa-input').val()
    }
    app({
        appID,
        apiKey,
        lang,
        indexName: indices[e.target.text].name,
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
        indexName: opts.indexName,
        urlSync: false,
        searchFunction: function (helper) {
            // console.log('getStateAsQueryString', helper.getStateAsQueryString())
            // console.log('getQueryStringFromState', helper)
            // if (helper.getIndex() !== opts.indexName) {

            //     if (helper.getIndex().slice(0, 6) !== 'newest' && helper.getIndex().slice(0, 6) !== 'oldest')
            //         helper.clearRefinements().setIndex(opts.indexName);
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

    if (opts.indexName === 'ABC_TEST_coremedia_article') {
        let searchableArr = opts.restrict ? opts.restrict : ['title', 'keywords', 'synopsis', 'text'];
        console.log('searchable Attributes', searchableArr, 'query', opts.query);
        search = instantsearch(Object.assign(searchOptions, {
            searchParameters: {
                filters: `lang:${opts.lang}`,
                restrictSearchableAttributes: searchableArr
            }
        })
        );
    } else {
        search = instantsearch(searchOptions);
    }
    console.log('search', search);

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