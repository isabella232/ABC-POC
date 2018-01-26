/* global instantsearch autocomplete */

var appID = 'Y63Q32NVDL',
    apiKey = '45bce7c03e206c4f2618e69a9f6acfc1',
    indices = {
        news: newsSettings,
        iview: iviewSettings,
        radio: radioSettings,
        tv: tvSettings
    },
    lang = $("#language-select :selected").text(),
    currIndex = $('ul#indices-ul > li > a.active').text().toLowerCase();



app({
    appID,
    apiKey,
    lang,
    articlesIndexName: indices[currIndex].name,
    settings: indices[currIndex].settings

});

$("ul#indices-ul > li > a").click(function (e) {
    $("ul#indices-ul > li > a").removeClass("active");
    currIndex = e.target.text.toLowerCase();
    $(e.target).addClass("active");
    app({
        appID,
        apiKey,
        lang,
        articlesIndexName: indices[currIndex].name,
        settings: indices[currIndex].settings
    });
})


$("#language-select").change(function (e) {
    app({
        appID,
        apiKey,
        lang: e.target.value,
        articlesIndexName: indices[currIndex].name,
        settings: indices[currIndex].settings
    });
});

function app(opts) {
    console.log('current settings', opts.settings)
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
            placeholder: opts.settings.searchPlaceholder
        })
    );

    search.addWidget(
        instantsearch.widgets.stats({
            container: '#search-stats',
        })
    );

    search.addWidget(
        instantsearch.widgets.sortBySelector({
            container: '#sort-by-container',
            indices: opts.settings.sortByIndices
        })
    );


    search.addWidget(
        instantsearch.widgets.hits({
            container: '#hits',
            templates: {
                item: getTemplate(opts.settings.templateName)
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
    search.start();
}

function getTemplate(templateName) {
    return document.querySelector(`#${templateName}-template`).innerHTML;
}